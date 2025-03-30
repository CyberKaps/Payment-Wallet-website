
import express, {Request, Response} from 'express';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const PORT  = process.env.PORT || 3000;

app.use(express.json()); //middleware to parse JSON bodies


app.get("/", (req: Request, res: Response) => {

    res.json({
        message: "payment wallet app"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
});