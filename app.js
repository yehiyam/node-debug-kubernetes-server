const { createServer } = require('./lib/api/server');

const main = async () => {
    await createServer();
};

main();
