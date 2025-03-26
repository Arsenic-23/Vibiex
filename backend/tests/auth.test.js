const request = require('supertest');
const express = require('express');
const authMiddleware = require('../middleware/auth');
const jwt = require('jsonwebtoken');

const app = express();

// Mock protected route
app.get('/protected', authMiddleware, (req, res) => {
    res.json({ msg: 'Access granted', user: req.user });
});

describe('JWT Authentication Middleware', () => {
    it('should allow access with a valid token', async () => {
        const token = jwt.sign({ id: '12345' }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const res = await request(app)
            .get('/protected')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('user');
    });

    it('should deny access without a token', async () => {
        const res = await request(app).get('/protected');
        expect(res.status).toBe(401);
        expect(res.body.msg).toBe('No token, authorization denied');
    });

    it('should deny access with an invalid token', async () => {
        const res = await request(app)
            .get('/protected')
            .set('Authorization', 'Bearer invalidtoken');

        expect(res.status).toBe(401);
        expect(res.body.msg).toBe('Invalid token');
    });
});