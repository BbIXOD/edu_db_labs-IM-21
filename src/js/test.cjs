const fastify = require('fastify')()

fastify.get('/', (request, reply) => 
{ 
  try {
    reply.code(201).send([{ hello: 'world' }])
  }
  catch (e) {
    
  }
 })
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})