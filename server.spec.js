const request = require('supertest');
const server = require('./server');


// does it return the correct status code for the input provided?
// does it return the data in the expected format?
// does the data returned, if any, has the right content?

describe('wingsuit server tests', () => {

  describe('endpoint [/wingsuits] GET', () => {

    //TEST GET REQUESTS
    it('should return a status code of 200', async () => {
      const expected = 200;
      const response = await request(server).get('/wingsuits').then(response => {
        expect(response.status).toEqual(expected);
      })
    })

    it('should return data in JSON Format', async () => {
      const expected = 'application/json';
      const response = await request(server).get('/wingsuits').then(response => {
        expect(response.type).toEqual(expected);
      })
    })

    it('should return data in JSON Format', async () => {

      const expected = {
        "mock_wingsuits": [{
          "experience": "beginner",
          "id": 0,
          "name": "tribird",
          "style": "acrobatic"
        }, {
          "experience": "intermediate",
          "id": 1,
          "name": "R-Bird 2",
          "style": "flocking"
        }]
      }

      const response = await request(server).get('/wingsuits').then(response => {
        expect(response.body.wingsuits).toEqual(expected);
      })
    })

  })

  //TEST POST REQUESTS
  describe('endpoint [/wingsuits] POST', () => {
    it('should return a status of 200 with a valid POST to /wingsuits', async () => {
      const expected = 200;
      const response = await request(server).post('/wingsuits').send({
        "name": "Gnar-Bird",
        "experience": "intermediate",
        "style": "Acrobatic"
      })

      expect(response.status).toBe(expected)
    })

    it('should return JSON', async () => {
      const expected = 'application/json';
      const response = await request(server).post('/wingsuits').send({
        "name": "Gnar-Bird",
        "experience": "intermediate",
        "style": "Acrobatic"
      })

      expect(response.type).toBe(expected)
    })

    it('should return data formatted in JSON', async () => {

      const expected = {
        "newsuits": [{
          "experience": "beginner",
          "name": "tribird",
          "style": "acrobatic",
          'id': 0
        }, {
          "experience": "intermediate",
          "name": "R-Bird 2",
          "style": "flocking",
          'id': 1
        }, {
          "experience": "intermediate",
          "name": "Gnar-Bird",
          "style": "Acrobatic",
          'id': 2
        }]
      };

      const response = await request(server).post('/wingsuits').send({
        "experience": "intermediate", 
        "name": "Gnar-Bird",
        "style": "Acrobatic",
        'id': 2
      })

      expect(response.body).toEqual(expected);
      
    })
  })

describe('endpoint [/wingsuits] DELETE', ()=>{
  it('should delete the item with the value passed as the ID', async ()=>{
    const id = {"id": 0};
    const result = await request(server).delete('/wingsuits').send(id);
    const expected = {
      "newsuits": [{
        "experience": "beginner",
        "id": 0,
        "name": "tribird",
        "style": "acrobatic"
      }],
      "result": "id 0 deleted"
    }
    
    expect(result.body).toEqual(expected);

  })
})

})