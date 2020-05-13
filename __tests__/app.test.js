const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const request = require('supertest');
const app = require('../lib/app');
const Note = require('../lib/models/Note');

describe('note-taker-be routes', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a note with POST', () => {
    return request(app)
      .post('/api/v1/notes')
      .send({
        title: 'test title',
        body: 'test body'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'test title',
          body: 'test body',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0
        });
      });
  });
  it('gets all notes with get', async() => {
    await Note.create({
      title: 'test title',
      body: 'test body'
    });
    return request(app)
      .get('/api/v1/notes')
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.any(String),
          title: 'test title',
          body: 'test body',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0
        }]);
      });
  });
});
