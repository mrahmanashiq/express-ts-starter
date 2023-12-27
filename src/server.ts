import express, { Request, Response } from 'express';
import { router } from './routes/auth.route';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

app.post('/users', (req: Request, res: Response) => {
    const userInfo = req.body;
    console.log(userInfo);
    res.send(userInfo);
});

app.use(router);

app.listen(3333, () => {
    console.log('Server started on port 3333');
});