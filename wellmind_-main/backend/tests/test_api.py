import pytest
from main import create_app
from src.extensions import db


@pytest.fixture(scope='session')
def app():
    """Create a Flask app configured for testing with an in-memory SQLite DB."""
    application = create_app(testing=True, database_uri='sqlite:///:memory:')
    return application


@pytest.fixture(autouse=True)
def _db_setup(app):
    """Create all tables once per test session and clear state per test."""
    with app.app_context():
        db.create_all()
        yield
    
        # Clean up DB state between tests
        for table in reversed(db.metadata.sorted_tables):
            db.session.execute(table.delete())
        db.session.commit()


@pytest.fixture
def client(app):
    with app.test_client() as c:
        yield c


def assert_json_response(resp, status=200):
    assert resp.status_code == status
    assert resp.headers.get('Content-Type', '').startswith('application/json')


def test_users_crud(client):
    # List users
    resp = client.get('/api/users')
    assert_json_response(resp, 200)
    assert isinstance(resp.get_json(), list)

    # Create user
    resp = client.post('/api/users', json={'username': 'alice', 'email': 'alice@example.com'})
    assert_json_response(resp, 201)
    assert 'Location' in resp.headers
    data = resp.get_json()
    assert data['username'] == 'alice'
    assert 'id' in data

    user_id = data['id']

    # Retrieve user
    resp = client.get(f'/api/users/{user_id}')
    assert_json_response(resp, 200)
    data = resp.get_json()
    assert data['email'] == 'alice@example.com'

    # Update user (using PUT as implemented)
    resp = client.put(f'/api/users/{user_id}', json={'username': 'alice2'})
    assert_json_response(resp, 200)
    data = resp.get_json()
    assert data['username'] == 'alice2'

    # Delete user
    resp = client.delete(f'/api/users/{user_id}')
    assert resp.status_code == 204

    # Not found after delete
    resp = client.get(f'/api/users/{user_id}')
    assert resp.status_code == 404


def test_mood_endpoints(client):
    resp = client.post('/api/mood', json={'mood_level': 'happy', 'notes': 'Feeling good'})
    assert_json_response(resp, 201)
    data = resp.get_json()
    assert data['mood']['mood_level'] == 'happy'

    resp = client.get('/api/mood')
    assert_json_response(resp, 200)
    items = resp.get_json()
    assert isinstance(items, list)
    assert len(items) >= 1


def test_mood_validation(client):
    resp = client.post('/api/mood', json={'notes': 'No mood'})
    assert_json_response(resp, 400)
    body = resp.get_json()
    assert 'error' in body

    # Duplicate user scenario
    resp = client.post('/api/users', json={'username': 'bob', 'email': 'bob@example.com'})
    assert_json_response(resp, 201)
    resp = client.post('/api/users', json={'username': 'bob', 'email': 'bob2@example.com'})
    assert resp.status_code == 409
    resp = client.post('/api/users', json={'username': 'bob2', 'email': 'bob@example.com'})
    assert resp.status_code == 409


def test_test_results_endpoints(client):
    resp = client.post('/api/test-result', json={'test_type': 'stress', 'score': 5, 'result_category': 'low'})
    assert_json_response(resp, 201)
    data = resp.get_json()
    assert data['result']['test_type'] == 'stress'

    resp = client.get('/api/test-results')
    assert_json_response(resp, 200)
    items = resp.get_json()
    assert isinstance(items, list)
    assert len(items) >= 1
