const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

require("dotenv").config();

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Password}@cluster0.83ramik.mongodb.net/?retryWrites=true&w=majority`;

// console.log(process.env.DB_User, process.env.DB_Password);

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        await client.connect();

        const database = client.db("insertToy");
        const toyCollection = database.collection("toy");

        app.post('/addToy', async (req, res) => {
            const addToy = req.body;
            console.log(addToy);
            const result = await toyCollection.insertOne(addToy);
            res.send(result);
        });

        app.get('/addToy', async (req, res) => {
            const result = await toyCollection.find().toArray();
            res.send(result);
        })

        app.get("/myToys/:email", async (req, res) => {
            console.log(req.params.email);
            const result = await toyCollection.find({ email: req.params.email }).toArray();
            res.send(result)
        })

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Kids Zone is running")
})

app.listen(port, () => {
    console.log(`Kids Zone is running on ${port}`)
})
