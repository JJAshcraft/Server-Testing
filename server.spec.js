const request = require('supertest');
const server = require('./server');

describe('wingsuit server tests', ()=>{
  describe('endpoint [/] testing', ()=>{
    it('should return a status code of 200', async ()=>{
    const expected = 200;
    const response = await request(server).get('/').then(response=>{
      expect(response.status).toEqual(expected);
    })
    })

  })

})