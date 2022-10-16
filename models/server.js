const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: '/api/auth',
      users: '/api/users',
      categories: '/api/categories'
    }

    // Connect to database
    this.connectToDatabase();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  async connectToDatabase() {
    await dbConnection();
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
    this.app.use(this.paths.auth, require('../routes/auth.routes'));
    this.app.use(this.paths.users, require('../routes/users.routes'));
    this.app.use(this.paths.categories, require('../routes/categories.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Example app listening on port', process.env.PORT);
    });
  }
}

module.exports = Server;