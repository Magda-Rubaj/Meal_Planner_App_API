import json
from django.test import TestCase
from rest_framework.test import force_authenticate
from .models import CustomUser
from rest_framework.test import APITestCase



class PostUserTestCase(APITestCase):

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
        
    def test_valid_user(self):
        response = self.client.post(
            'http://127.0.0.1:8000/api/users/',
            data=json.dumps(self.valid_user),
            content_type='application/json'
            )
        self.assertEqual(response.status_code, 201)

    def test_invalid_user(self):
        response = self.client.post(
            'http://127.0.0.1:8000/api/users/',
            data=json.dumps(self.invalid_user),
            content_type='application/json'
            )
        self.assertEqual(response.status_code, 400)

class GetUsersTestCase(APITestCase):

    def setUp(self):
        self.user = CustomUser.objects.create(
            username='user', email='example@example.com', password='pass', currentWeight='123', desiredWeight='23')
    
    def test_get_unauthorized(self):
        response = self.client.get('http://127.0.0.1:8000/api/users/')
        self.assertEqual(response.status_code, 401)

    def test_get_authorized(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get('http://127.0.0.1:8000/api/users/')
        self.assertEqual(response.status_code, 200)

class PaginationTestCase(APITestCase):

    def setUp(self):
        user = CustomUser.objects.create(
            username='user', email='example@example.com', password='pass', currentWeight='123', desiredWeight='23')
        self.client.force_authenticate(user=user)

    def test_get_valid_page(self):
        response = self.client.get('http://127.0.0.1:8000/api/products/?page=1')
        self.assertEqual(response.status_code, 200)
        
    def test_get_invalid_page(self):
        response = self.client.get('http://127.0.0.1:8000/api/products/?page=12345')
        self.assertEqual(response.status_code, 404)



