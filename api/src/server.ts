import fastify, { FastifyRequest, FastifyReply} from  "fastify";
import { stockQuoteRoute, stockProfileRoute } from './routes/routes.js'
import { registerUserRoute, getUserByIdRoute, getAllUsersRoute } from './routes/userRoutes.js'
const app = fastify({logger: true});


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

app.register(stockQuoteRoute)
app.register(stockProfileRoute)
app.register(registerUserRoute)
app.register(getUserByIdRoute)
app.register(getAllUsersRoute)

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