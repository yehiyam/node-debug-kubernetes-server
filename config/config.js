const config = {
    api_port: process.env.PORT || 3000,
    kube_api_server: {
        host: process.env.KUBERNETES_SERVICE_HOST,
        port: process.env.KUBERNETES_SERVICE_PORT,
        schema: process.env.KUBERNETES_SERVICE_SCHEMA || 'https',
    },
};

module.exports = config;
