const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Link Shortener and QR Code Generator API',
        version: '1.0.0',
        description: 'An API for creating shortened URLs, generating QR codes, and providing analytics and link history.',
    },
    servers: [
        {
            url: 'http://localhost:4003',
            description: 'Local server',
        },
    ],
    components: {
        securitySchemes: {
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            ShortUrl: {
                type: 'object',
                properties: {
                    shortId: {
                        type: 'string',
                    },
                    destination: {
                        type: 'string',
                    },
                    customAlias: {
                        type: 'string',
                    },
                    clicks: {
                        type: 'integer',
                    },
                    auth0Id: {
                        type: 'string',
                    },
                    createdAt: {
                        type: 'string',
                        format: 'date-time',
                    },
                },
            },
            Analytics: {
                type: 'object',
                properties: {
                    shortId: {
                        type: 'string',
                    },
                    referrer: {
                        type: 'string',
                    },
                    userAgent: {
                        type: 'string',
                    },
                    ipAddress: {
                        type: 'string',
                    },
                    auth0Id: {
                        type: 'string',
                    },
                },
            },
        },
    },
    security: [
        {
            BearerAuth: [],
        },
    ],
    paths: {
        '/shorten': {
            post: {
                summary: 'Create a shortened URL',
                operationId: 'createShortUrl',
                security: [
                    {
                        BearerAuth: [],
                    },
                ],
                requestBody: {
                    description: 'URL to be shortened',
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    destination: {
                                        type: 'string',
                                    },
                                    customAlias: {
                                        type: 'string',
                                    },
                                },
                                required: ['destination'],
                            },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'Successfully created short URL',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ShortUrl',
                                },
                            },
                        },
                    },
                    '400': {
                        description: 'Invalid request',
                    },
                    '401': {
                        description: 'User not authenticated',
                    },
                    '500': {
                        description: 'Internal Server Error',
                    },
                },
            },
        },
        '/analytics': {
            get: {
                summary: 'Get analytics for URLs created by the user',
                operationId: 'getAnalytics',
                security: [
                    {
                        BearerAuth: [],
                    },
                ],
                responses: {
                    '200': {
                        description: 'Analytics data retrieved',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        analyticsData: {
                                            type: 'array',
                                            items: {
                                                $ref: '#/components/schemas/Analytics',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    '401': {
                        description: 'User not authenticated',
                    },
                    '500': {
                        description: 'Internal Server Error',
                    },
                },
            },
        },
        '/history': {
            get: {
                summary: 'Get link history for the authenticated user',
                operationId: 'getLinkHistory',
                security: [
                    {
                        BearerAuth: [],
                    },
                ],
                responses: {
                    '200': {
                        description: 'Link history retrieved',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/ShortUrl',
                                    },
                                },
                            },
                        },
                    },
                    '401': {
                        description: 'User not authenticated',
                    },
                    '500': {
                        description: 'Internal Server Error',
                    },
                },
            },
            delete: {
                summary: 'Clear link history for the authenticated user',
                operationId: 'handleClearHistory',
                security: [
                    {
                        BearerAuth: [],
                    },
                ],
                responses: {
                    '200': {
                        description: 'History cleared successfully',
                    },
                    '401': {
                        description: 'User not authenticated',
                    },
                    '500': {
                        description: 'Internal Server Error',
                    },
                },
            },
        },
        '/generate': {
            get: {
                summary: 'Generate a QR code',
                operationId: 'getQRCode',
                parameters: [
                    {
                        name: 'data',
                        in: 'query',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'QR code image',
                        content: {
                            'image/png': {
                                schema: {
                                    type: 'string',
                                    format: 'binary',
                                },
                            },
                        },
                    },
                    '400': {
                        description: 'Invalid data',
                    },
                    '500': {
                        description: 'Error generating QR code',
                    },
                },
            },
        },
        '/{shortId}': {
            get: {
                summary: 'Redirect to the original URL',
                operationId: 'handleRedirect',
                parameters: [
                    {
                        name: 'shortId',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                responses: {
                    '302': {
                        description: 'Redirects to the original URL',
                    },
                    '404': {
                        description: 'Short URL not found',
                    },
                    '500': {
                        description: 'Internal Server Error',
                    },
                },
            },
        },
    },
};

export default swaggerDefinition;
