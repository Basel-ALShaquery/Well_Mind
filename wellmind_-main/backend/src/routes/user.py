from flask import Blueprint, jsonify, request, abort
from sqlalchemy import or_
from src.models.user import User
from src.extensions import db
from flask_cors import cross_origin

user_bp = Blueprint('user', __name__)

@user_bp.route('/users', methods=['GET'])
@cross_origin()
def get_users():
    """Get all users"""
    try:
        users = User.query.all()
        return jsonify([user.to_dict() for user in users])
    except Exception as e:
        return jsonify({'error': 'Failed to fetch users', 'details': str(e)}), 500

@user_bp.route('/register', methods=['POST'])
@cross_origin()
def register():
    """Register a new user"""
    try:
        data = request.get_json() or {}
        
        # Required fields
        required_fields = ['username', 'email', 'password']
        missing_fields = [field for field in required_fields if not data.get(field)]
        
        if missing_fields:
            return jsonify({
                'error': 'Missing required fields',
                'missing': missing_fields
            }), 400

        username = data.get('username').strip()
        email = data.get('email').strip().lower()
        password = data.get('password')

        # Validation
        if len(username) < 3:
            return jsonify({'error': 'Username must be at least 3 characters'}), 400
        
        if len(password) < 6:
            return jsonify({'error': 'Password must be at least 6 characters'}), 400

        # Check duplicates
        existing_user = User.query.filter(
            or_(User.username == username, User.email == email)
        ).first()
        
        if existing_user:
            if existing_user.username == username:
                return jsonify({'error': 'Username already exists'}), 409
            else:
                return jsonify({'error': 'Email already exists'}), 409

        # Create user
        user = User(username=username, email=email)
        user.set_password(password)
        
        db.session.add(user)
        db.session.commit()

        response_data = {
            'message': 'User registered successfully',
            'user': user.to_dict()
        }
        
        resp = jsonify(response_data)
        resp.status_code = 201
        return resp

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Registration failed', 'details': str(e)}), 500

@user_bp.route('/login', methods=['POST'])
@cross_origin()
def login():
    """User login - accepts both email and username"""
    try:
        data = request.get_json() or {}
        login_identifier = data.get('email') or data.get('username')
        password = data.get('password')

        if not login_identifier or not password:
            return jsonify({'error': 'Email/username and password are required'}), 400

        # Search by email first, then username
        user = User.query.filter(
            or_(User.email == login_identifier, User.username == login_identifier)
        ).first()

        if user and user.check_password(password):
            return jsonify({
                'message': 'Login successful',
                'user': user.to_dict()
            })
        
        return jsonify({'error': 'Invalid email/username or password'}), 401

    except Exception as e:
        return jsonify({'error': 'Login failed', 'details': str(e)}), 500

@user_bp.route('/users/<int:user_id>', methods=['GET'])
@cross_origin()
def get_user(user_id):
    """Get specific user by ID"""
    try:
        user = db.session.get(User, user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        return jsonify(user.to_dict())
    except Exception as e:
        return jsonify({'error': 'Failed to fetch user', 'details': str(e)}), 500

@user_bp.route('/users/<int:user_id>', methods=['PUT'])
@cross_origin()
def update_user(user_id):
    """Update user information"""
    try:
        user = db.session.get(User, user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404

        data = request.get_json() or {}
        new_username = data.get('username', user.username).strip()
        new_email = data.get('email', user.email).strip().lower()

        # Validation
        if len(new_username) < 3:
            return jsonify({'error': 'Username must be at least 3 characters'}), 400

        # Check for duplicates (excluding current user)
        conflict_user = User.query.filter(
            or_(User.username == new_username, User.email == new_email),
            User.id != user.id
        ).first()

        if conflict_user:
            if conflict_user.username == new_username:
                return jsonify({'error': 'Username already exists'}), 409
            else:
                return jsonify({'error': 'Email already exists'}), 409

        # Update user
        user.username = new_username
        user.email = new_email
        
        db.session.commit()
        
        return jsonify({
            'message': 'User updated successfully',
            'user': user.to_dict()
        })

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Update failed', 'details': str(e)}), 500

@user_bp.route('/users/<int:user_id>', methods=['DELETE'])
@cross_origin()
def delete_user(user_id):
    """Delete user account"""
    try:
        user = db.session.get(User, user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404

        db.session.delete(user)
        db.session.commit()
        
        return jsonify({'message': 'User deleted successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Deletion failed', 'details': str(e)}), 500

@user_bp.route('/health', methods=['GET'])
@cross_origin()
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'user_api'})

@user_bp.route('/check-email', methods=['POST'])
@cross_origin()
def check_email():
    """Check if email is available"""
    try:
        data = request.get_json() or {}
        email = data.get('email', '').strip().lower()
        
        if not email:
            return jsonify({'error': 'Email is required'}), 400

        existing_user = User.query.filter_by(email=email).first()
        return jsonify({'available': existing_user is None})

    except Exception as e:
        return jsonify({'error': 'Check failed', 'details': str(e)}), 500

@user_bp.route('/check-username', methods=['POST'])
@cross_origin()
def check_username():
    """Check if username is available"""
    try:
        data = request.get_json() or {}
        username = data.get('username', '').strip()
        
        if not username:
            return jsonify({'error': 'Username is required'}), 400

        existing_user = User.query.filter_by(username=username).first()
        return jsonify({'available': existing_user is None})

    except Exception as e:
        return jsonify({'error': 'Check failed', 'details': str(e)}), 500