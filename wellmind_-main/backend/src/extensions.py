from flask_sqlalchemy import SQLAlchemy

# Centralized extensions registry for the Flask app
# This avoids circular imports and allows clean testing configuration

db = SQLAlchemy()
