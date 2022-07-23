const express = require('express');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.pathUsers = '/api/users';

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Defined 'public' directory
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.pathUsers, require('../routes/users.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Example app listening on port', process.env.PORT);
    });
  }
}

module.exports = Server;