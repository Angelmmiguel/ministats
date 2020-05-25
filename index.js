const fastify = require('fastify')();
const fastifyStatic = require('fastify-static');
const path = require('path')

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

// Static files
fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public')
});

// API Route
fastify.get('/api', async () => {
  return { hello: 'world' }
});

// SPA
fastify.setNotFoundHandler(function (request, reply) {
  reply.sendFile('index.html');
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(port, host);
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start();