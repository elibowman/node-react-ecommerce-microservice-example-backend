const ROUTES = {
    serviceRoutes: [
        {
            name: 'auth-server',
            url: '/auth',
            auth: false,
            rateLimit: {
                windowMs: 15 * 60 * 1000,
                max: 5
            },
            proxy: {
                target: "http://localhost:3001",
            }
        },
        {
            name: 'user-server',
            url: '/user',
            auth: false,
            rateLimit: {
                windowMs: 15 * 60 * 1000,
                max: 5
            },
            proxy: {
                target: "http://localhost:3002",
            }
        },
        {
            name: 'product-service',
            url: '/product',
            auth: false,
            rateLimit: {
                windowMs: 15 * 60 * 1000,
                max: 5
            },
            proxy: {
                target: "http://localhost:3004",
            }
        },
        {
            name: 'cart-service',
            url: '/cart',
            auth: false,
            rateLimit: {
                windowMs: 15 * 60 * 1000,
                max: 5
            },
            proxy: {
                target: "http://localhost:3005",
            }
        },
        {
            name: 'order-service',
            url: '/order',
            auth: false,
            rateLimit: {
                windowMs: 15 * 60 * 1000,
                max: 5
            },
            proxy: {
                target: "http://localhost:3006",
            }
        },
        {
            name: 'payment-service',
            url: '/payment',
            auth: false,
            rateLimit: {
                windowMs: 15 * 60 * 1000,
                max: 5
            },
            proxy: {
                target: "http://localhost:3007",
            }
        }
    ]
}

export default ROUTES;