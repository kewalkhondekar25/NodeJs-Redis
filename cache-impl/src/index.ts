import axios from "axios";
import express from "express";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "nodejs-redis"
  })
});

app.get("/meals", async (req, res) => {
  try {
    const {data} = await axios.get("https://vegan-meals-api.vercel.app/api/v1/meals");
    return res.status(200).json({
      data: data
    })
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: error.message
    })
  }
});

app.listen(port, () => console.log(`server started on port: ${port}`));