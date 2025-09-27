const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info:{
        title: 'CSE341-JS API',
        description:'API for managing users and products with full CRUD operations',
        version: '1.0.0'
    },
    host:'localhost:8080',
    schemes:['http', 'https']
};

const outputfile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputfile, endpointsFiles, doc);

//   "host": "cse341-js-producst.onrender.com",
//   "basePath": "/",
//   "schemes": [
//     "https"
//   ],