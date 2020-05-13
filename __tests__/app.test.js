const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');

describe('note-taker-be routes', () => {
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
});
