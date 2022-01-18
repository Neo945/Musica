const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

module.exports = (app) => {
    const swaggerOptions = {
        swaggerDefinition: {
            info: {
                version: '1.0.0',
                title: 'Customer API',
                description: 'Customer API Information',
                contact: {
                    name: 'Amazing Developer',
                },
                servers: ['http://localhost:5000'],
            },
        },
        apis: ['src/routes/*.js', 'src/router.js'],
    };

    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
