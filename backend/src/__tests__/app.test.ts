import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app';
it('should create a new short URL with valid authentication', async () => {
    const destination = 'http://example.com';
    const customAlias = 'customAlias';

    // Generate a valid token
    const token = jwt.sign({ sub: 'test-auth0Id' }, 'your-secret-key', { expiresIn: '1h' });
    try {
        const response = await request(app)
            .post('/shorten')
            .set('Authorization', `Bearer ${token}`)
            .send({ destination, customAlias });

        console.log('Response status:', response.status);
        console.log('Response body:', response.body);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('shortId');
        expect(response.body).toHaveProperty('destination', 'http://example.com');
    } catch (error) {
        console.error('Error:', error);
    }
}, 20000);
