const request = require('supertest');
const app = require('../app'); // Ensure your Express app is imported
const jwt = require('jsonwebtoken');

const token = jwt.sign({ id: 'testUser' }, process.env.JWT_SECRET, { expiresIn: '1h' });

describe('Queue API Security', () => {
    it('should block unauthenticated users from adding songs', async () => {
        const res = await request(app)
            .post('/api/queue/123')
            .send({ title: 'Song', url: 'http://example.com' });

        expect(res.status).toBe(401);
        expect(res.body.msg).toBe('No token, authorization denied');
    });

    it('should allow authenticated users to add songs', async () => {
        const res = await request(app)
            .post('/api/queue/123')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Song', url: 'http://example.com' });

        expect(res.status).toBe(200);
    });
});