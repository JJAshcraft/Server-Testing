const express = require('express');

const server = express();

server.use(express.json());

const mock_wingsuits = 
  [
    {'name': 'tribird', 'experience':'beginner', 'style': 'acrobatic'},
    {'name': 'R-Bird 2', 'experience':'intermediate', 'style': 'flocking'},
]


server.get('/', (req, res) => {
  res.status(200).json({
    api: 'tonysuits server running', wingsuits: {mock_wingsuits}
  });
});

server.post('/wingsuits', (req, res) => {
  const name = req.body.name;
  const style = req.body.style;
  const experience = req.body.experience;
  const newWingsuit = {name, style, experience};
  mock_wingsuits.push(newWingsuit)

  res.status(200).json({newWingsuit})
})

module.exports = server;