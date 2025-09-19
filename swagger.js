const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info:{
        title: 'Users Api',
        description:'Users Api'
    },
    host:'localhost:3001',
    schemas:['http', 'https']
};

const outputfile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputfile, endpointsFiles, doc);