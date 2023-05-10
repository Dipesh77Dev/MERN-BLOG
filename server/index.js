const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

const articlesInfo = {
    "react":{
        comments: [],
    },
    "react1":{
        comments: [],
    },
    "node":{
        comments: [],
    }
}

// Middleware -
// We can use bodyparser but now we have built-in middleware. Functn of express. It parses the incoming JSON Payload.
app.use(express.json({extended: false}));

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
app.post("/api/articles/:name/add-comments", (req, res) => {
    const {username, text} = req.body
    const articleName = req.params.name
    articlesInfo[articleName].comments.push({username, text});
    res.status(200).send(articlesInfo[articleName]);
})

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