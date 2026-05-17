import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
        title: "Smart Leads API",

        version: "1.0.0",
        },

        servers: [
        {
            url: "http://localhost:5000",
        },
        ],
    },

    apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;