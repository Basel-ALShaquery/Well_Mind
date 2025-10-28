from flask import Blueprint, request, jsonify
from src.models.mood import Mood, TestResult
from src.extensions import db
from datetime import datetime

mood_bp = Blueprint('mood', __name__)

@mood_bp.route('/mood', methods=['POST'])
def save_mood():
    try:
        data = request.get_json()
        mood_level = data.get('mood_level')
        notes = data.get('notes', '')

        if mood_level is None:
            return jsonify({'error': 'Mood level is required'}), 400

        # Map numbers to strings
        mood_mapping = {
            1: 'very_sad',
            2: 'sad',
            3: 'neutral',
            4: 'happy',
            5: 'very_happy'
        }

        if isinstance(mood_level, int) and mood_level in mood_mapping:
            mood_level = mood_mapping[mood_level]
        elif isinstance(mood_level, str) and mood_level in mood_mapping.values():
            pass  # Already correct
        else:
            return jsonify({'error': 'Invalid mood level'}), 400

        mood = Mood(
            mood_level=mood_level,
            notes=notes
        )

        db.session.add(mood)
        db.session.commit()

        return jsonify({
            'message': 'Mood saved successfully',
            'mood': mood.to_dict()
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@mood_bp.route('/mood', methods=['GET'])
def get_moods():
    try:
        moods = Mood.query.order_by(Mood.date_created.desc()).limit(10).all()

        # Map strings back to numbers for frontend
        mood_reverse_mapping = {
            'very_sad': 1,
            'sad': 2,
            'neutral': 3,
            'happy': 4,
            'very_happy': 5
        }

        result = []
        for mood in moods:
            mood_dict = mood.to_dict()
            mood_dict['mood'] = mood_reverse_mapping.get(mood.mood_level, 3)
            mood_dict['date'] = mood.date_created.date().isoformat() if mood.date_created else None
            result.append(mood_dict)

        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@mood_bp.route('/test-result', methods=['POST'])
def save_test_result():
    try:
        data = request.get_json()
        test_type = data.get('test_type')
        score = data.get('score')
        result_category = data.get('result_category')
        
        if not all([test_type, score is not None, result_category]):
            return jsonify({'error': 'All fields are required'}), 400
        
        test_result = TestResult(
            test_type=test_type,
            score=score,
            result_category=result_category
        )
        
        db.session.add(test_result)
        db.session.commit()
        
        return jsonify({
            'message': 'Test result saved successfully',
            'result': test_result.to_dict()
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@mood_bp.route('/test-results', methods=['GET'])
def get_test_results():
    try:
        results = TestResult.query.order_by(TestResult.date_created.desc()).limit(10).all()
        return jsonify([result.to_dict() for result in results])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

