import os
from dotenv import load_dotenv
from flask import Flask, send_from_directory
from flask_cors import CORS
from src.extensions import db
from src.routes.user import user_bp
from src.routes.mood import mood_bp

# Load environment variables
load_dotenv()

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_FOLDER = os.path.join(BASE_DIR, 'database')
DIST_PATH = os.path.join(BASE_DIR, 'src', 'static')

os.makedirs(DB_FOLDER, exist_ok=True)
DB_PATH = os.path.join(DB_FOLDER, 'app.db')


def create_app(testing: bool = False, database_uri: str | None = None) -> Flask:
    """Application factory to create configured Flask app instances.

    Args:
        testing: Enable testing mode.
        database_uri: Optional explicit database URI. If not provided,
                      defaults to SQLite file under database folder.
    """
    app = Flask(__name__, static_folder=DIST_PATH, template_folder=DIST_PATH)
    app.config['SECRET_KEY'] = 'change-me-in-prod'

    # Database configuration
    if database_uri:
        app.config['SQLALCHEMY_DATABASE_URI'] = database_uri
    else:
        app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_PATH}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['TESTING'] = testing

    db.init_app(app)

    # Enable CORS
    CORS(app)

    # Register Blueprints
    app.register_blueprint(user_bp, url_prefix='/api')
    app.register_blueprint(mood_bp, url_prefix='/api')

    # Create tables if they don't exist
    with app.app_context():
        # Ensure models are imported before create_all
        from src.models import user as _user  # noqa: F401
        from src.models import mood as _mood  # noqa: F401
        db.create_all()

    # Serve frontend with API key replacement
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        if path != '' and os.path.exists(os.path.join(DIST_PATH, path)):
            return send_from_directory(DIST_PATH, path)
        else:
            # Read index.html and replace API key placeholder
            index_path = os.path.join(DIST_PATH, 'index.html')
            with open(index_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # Inject API key as JavaScript variable
            api_key = os.getenv('GOOGLE_API_KEY')
            print(f"DEBUG: api_key = {api_key}")
            if not api_key:
                # Fallback to a placeholder if not set, but log warning
                print("Warning: GOOGLE_API_KEY not found, using fallback")
                api_key = 'fallback-key'
            content = content.replace(
                "const API_KEY = window.API_KEY || 'fallback-key';",
                f"const API_KEY = '{api_key}';"
            )

            from flask import Response
            return Response(content, mimetype='text/html')

    return app


# Development entry point
if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000)
