import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { config } from 'dotenv';

// config();

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Orders API',
            version: '1.0.0',
            description: 'API para processamento de pedidos',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 7777}`,
                description: 'Local Server',
            },
        ],
    },
    apis: ['./*.controller.ts'],
};

const specs = swaggerJsdoc(options);

export const swaggerMiddleware = {
    serve: swaggerUi.serve,
    setup: swaggerUi.setup(specs)
};
