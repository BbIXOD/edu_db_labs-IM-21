import { FastifyRequest, FastifyReply } from 'fastify'

export const getCategory = (request: FastifyRequest, reply: FastifyReply) => {
  try {

  } catch (e: any) {
    reply.code(500).send(e.message)
  }
}
