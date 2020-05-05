import json
from django.test import TestCase
from .models import CustomUser
from rest_framework.test import APITestCase

class UserTestCase(APITestCase):

    def setUp(self):

        self.valid_user = {
            'email' : 'testuser@email.com',
            'username' : 'testuser',
            'password' : 'pass',
            'currentWeight' : 80,
            'desiredWeight' : 70
        }
        self.invalid_user = {
            'email' : 'testuser@email.com',
            'username' : '',
            'password' : 'pass',
            'currentWeight' : 80,
            'desiredWeight' : 70
        }
        
    def test__valid_user(self):
        response = self.client.post(
            'http://127.0.0.1:8000/api/users/',
            data=json.dumps(self.valid_user),
            content_type='application/json'
            )
        self.assertEqual(response.status_code, 201)

    def test__invalid_user(self):
        response = self.client.post(
            'http://127.0.0.1:8000/api/users/',
            data=json.dumps(self.invalid_user),
            content_type='application/json'
            )
        self.assertEqual(response.status_code, 400)

class PermissionTestCase(TestCase):
    pass

