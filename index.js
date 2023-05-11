const express = require("express");

const app = express();

const PORT = process.env.PORT || 8080;

const { MongoClient } = require("mongodb");

// Middleware -
// We can use bodyparser but now we have built-in middleware. Functn of express. It parses the incoming JSON Payload.
app.use(express.json({ extended: false }));

// test route -
app.get("/", (req, res) => {
  res.send("Hello, World!!!");
});

app.post("/", (req, res) => {
  res.send("Hello, World!!!");
});

app.post("/name", (req, res) => {
  res.send(`Hello, ${req.body.name}`);
});

app.get("/hello/:name", (req, res) => {
  res.send(`Hello, this is - ${req.params.name}`);
});

// actual route -

const withDB = async (operations, res) => {
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017");
    const db = client.db("mernblog");
    await operations(db);
    client.close();
  } catch (err) {
    res.status(500).json({ message: "Connection error", err });
  }
};

/*
app.post("/api/articles/:name/add-comments", (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;
  articlesInfo[articleName].comments.push({ username, text });
  res.status(200).send(articlesInfo[articleName]);
});
*/

app.post("/api/articles/:name/add-comments", (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;
  withDB(async (db) => {
    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    await db.collection("articles").updateOne(
      { name: articleName },
      {
        $set: {
          comments: articleInfo.comments.concat({ username, text }),
        },
      }
    );
    const updateArticleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    res.status(200).json(updateArticleInfo);
  }, res);
});

/*
app.get("/api/articles/:name", async (req, res) => {
  try {
    const articleName = req.params.name;
    const client = await MongoClient.connect("mongodb://localhost:27017");
    const db = client.db("mernblog");
    const articlesInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    res.status(200).json(articlesInfo);
    client.close();
  } catch (err) {
    res.status(500).json({ message: "Connection error", err });
  }
});
*/

// By using withDB -
app.get("/api/articles/:name", async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;
    const articlesInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    res.status(200).json(articlesInfo);
  }, res);
});

app.listen(PORT, () => console.log(`Server started at port - ${PORT}`));

// app.listen(8080, () => console.log("Server started at port 8080"));

/* 
Postman - 
http://localhost:8080/api/articles/react/add-comments
Before restarting server -
{
    "comments": [
        {
            "username": "Raj",
            "text": "I Like this article"
        },
        {
            "username": "Rohit",
            "text": "I Like this react article"
        }
    ]
}

After restarting server -
{
    "comments": [
        {
            "username": "Rohit",
            "text": "I Like this react article"
        }
    ]
}
*/

/* 
Before using middleware -
No need for dummy data bcoz we are using mongodb =>
const articlesInfo = {
  react: {
    comments: [],
  },
  react1: {
    comments: [],
  },
  node: {
    comments: [],
  },
};
*/

/*
fetch('/api/articles/...', {
  method: 'POST', // POST/GET
  body: 
});
*/
