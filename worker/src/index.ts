import { createClient } from "redis";

const client = createClient();

const startWorker = async () => {
    try {
        await client.connect();
        console.log("Worker connected");
        while(1){
            const response = await client.brPop("submission", 0);
            console.log(response);
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    } catch (error) {
        console.error(error);
    }
}
startWorker();