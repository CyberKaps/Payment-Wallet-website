
import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import { router } from './routes/index';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT  = process.env.PORT || 3000;

app.use(cors()); //middleware to enable CORS
app.use(express.json()); //middleware to parse JSON bodies



app.use("/api/v1", router);



app.get("/", (req: Request, res: Response) => {

    res.json({
        message: "payment wallet app"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});