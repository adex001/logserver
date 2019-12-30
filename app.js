const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const logs =[];
const port = process.env.PORT || 8001

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'OK',
    totalLogs: logs.length
  })
});


app.post('/redirect', (req, res) => {
  const data = req.body.data;
  if(!data){
    return res.status(400).json({
      Status: false,
      statusCode: 400,
      message: 'bad request',
      description: 'You did not send the data',
      responsecode: '99'
    })
  }
  logs.push(data);
  return res.status(200).json({
    Status: true,
    statusCode: 200,
    message: 'OK',
    description: 'Message successfully received!',
    responsecode: '00',
    data
  });
});

app.listen(port, () => {
  console.log('Server listening on port ' +port);
});
