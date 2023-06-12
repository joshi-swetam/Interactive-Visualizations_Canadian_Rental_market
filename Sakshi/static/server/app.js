const express = require('express');
const app = express();
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

app.use(cors());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/rental_data', async (req, res) => {
    const connection = await client.connect();
    const collection = connection.db("rental_data").collection("canadian_rental_market");

    collection.find().toArray((err, result) => {
        if (err) throw err;
        res.json(result);
        connection.close();
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));

