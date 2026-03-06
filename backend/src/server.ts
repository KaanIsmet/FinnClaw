import fastify, { FastifyRequest, FastifyReply} from  "fastify";

const app = fastify({logger: true})

app.get('/', function (req: FastifyRequest, reply: FastifyReply) {
    return {
        message: 'Hello World!'
    };
});

app.get('/health', (req: FastifyRequest, reply: FastifyReply) => {
    return {
        message: 'Ok'
    };
});

const start = async (): Promise<void> => {
    try {
        await app.listen({ port: 3000 });
        console.log('Server is running on http://localhost:3000');
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();