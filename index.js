//Node JS server without framework
const https = require('http');
const PORT = 3000;
const { setup } = require('./app/services/streamService');
const config = require('./config.json');

setup(config);


const server = https.createServer((req, res) => {
  res.end('Hola, Mundo');
}
);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
}
);