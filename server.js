import { fastify } from 'fastify'
import { DatabaseMemory } from './db-memory.js'

const db = new DatabaseMemory()

const server = fastify()

//request body

server.post('/video', (req, res) => {
    const {title, description, duration} = req.body; 
    db.create({
        title: title,
        description: description,
        duration: duration
    })

    console.log(db.list())

    return res.status(201).send();
    
})

server.get('/video', () => {
    const videos = db.list()
    return videos
})

server.put('/video/:id', (req, res) => {
    const videoId = req.params.id;
    const {title, description, duration} = req.body; 
    
    db.update(videoId, {
        title: title,
        description: description,
        duration: duration
    })
    return res.status(204).send();
})

server.delete('/video/:id', (req, res) => {
    const videoId = req.params.id
    db.delete(videoId);

    return res.status(204).send();
})

server.listen({
    port: 3333,
})