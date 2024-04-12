import express from "express";
import {createClient} from "redis";

const client = createClient();

const app = express();

app.use(express.json());

app.post("/submit", async (req, res) => {
    const {userId, problemId, codeSnip, lang} = req.body;
    await client.lPush("submission", JSON.stringify({userId, problemId, codeSnip, lang}));
    res.json({
        message: "Submission recieved"
    })
})

const startServer = async () => {
    try {
        await client.connect();
        console.log("connected to redis");
        app.listen(8080, () => {
            console.log("server is listening on port 8080");
        })
    } catch (error) {
        console.error(error);
        
    }
};

startServer();