const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const connectToMongo = require('./db/connection');
// const swaggerDoc = require('./swagger.json');
const fundsRoutes = require('./routes/funds');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/funds', fundsRoutes);

app.get('/', (req, res) => {
    // console.log('Here');
    res.end();
});
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: ' Express API with Swagger',
            version: '0.1.0',
            description: 'Capstone Project Documentation',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
        },
        servers: [
            {
                url: 'http://localhost:3003',
            },
        ],
        host: 'http://localhost:3003',
    },
    apis: ['./src/docs/**/*.yaml'],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);

/**
 * @swagger
 * /:
 *   get:
 *     description:  Endpoint for everything
 */
app.get('/', (req, res) => {
    res.json({ message: 'everything!' });
});
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        // TODO replace this with a logger
        // console.log(`Server listening on port ${port}`);
        connectToMongo();
    });
}

module.exports = app;
