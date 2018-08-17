const express = require('express');
const server = express();
server.use(express.json());
const mock_wingsuits = require('./data');



server.get('/wingsuits', (req, res) => {
  res.status(200).json({
    api: 'tonysuits server running', wingsuits: {mock_wingsuits}
  });
});

server.post('/wingsuits', (req, res) => {
  const name = req.body.name;
  const style = req.body.style;
  const experience = req.body.experience;
  const id = req.body.id;
  const newWingsuit = {
    name,
    style,
    experience,
    id
  }
  const newsuits = Object.assign([...mock_wingsuits, newWingsuit])

  res.status(200).json({newsuits})
})

server.delete('/wingsuits', (req, res)=>{
  const id = req.body.id;
  let newsuits = mock_wingsuits;
  let newdelsuits = newsuits.splice(id, 1)
  
  res.json({"result": `id ${id} deleted`, "newsuits": newdelsuits})
})

module.exports = server;