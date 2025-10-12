from datetime import datetime, timezone
from src.extensions import db

class Mood(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)  # Allow anonymous mood tracking
    mood_level = db.Column(db.String(20), nullable=False)  # 'very_happy', 'happy', 'neutral', 'sad', 'very_sad'
    notes = db.Column(db.Text, nullable=True)
    date_created = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    
    def __repr__(self):
        return f'<Mood {self.mood_level} on {self.date_created}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'mood_level': self.mood_level,
            'notes': self.notes,
            'date_created': self.date_created.isoformat() if self.date_created else None
        }

class TestResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)  # Allow anonymous test taking
    test_type = db.Column(db.String(50), nullable=False)  # 'depression', 'anxiety', 'stress', etc.
    score = db.Column(db.Integer, nullable=False)
    result_category = db.Column(db.String(20), nullable=False)  # 'low', 'moderate', 'high'
    date_created = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    
    def __repr__(self):
        return f'<TestResult {self.test_type}: {self.score}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'test_type': self.test_type,
            'score': self.score,
            'result_category': self.result_category,
            'date_created': self.date_created.isoformat() if self.date_created else None
        }

