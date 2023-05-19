const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Kids Zone is running")
})

app.listen(port, () => {
    console.log(`Kids Zone is running on ${port}`)
})