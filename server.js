// Criando um server com o node nativo
// import { createServer } from 'node:http';

// const server = createServer((request, response) => {
//     response.write('olaa')

//     return response.end();
// })

// server.listen(3333)

// Usando o Fastify
import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();

// const database = new DatabaseMemory();

const database = new DatabasePostgres();


server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body

    await database.create({
        title,
        description,
        duration
    })

    return reply.status(201).send();
})

server.get('/videos', async (request, reply) => {
    const search = request.query.search

    return await database.list(search)
})

server.put('/videos/:id', (request, reply) => {
    const videoId = request.params.id;
    const { title, description, duration } = request.body

    database.update(videoId, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', (requset, reply) => {
    const videoId = requset.params.id;

    database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
});