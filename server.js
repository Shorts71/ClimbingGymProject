const express = require("express");
const hostname = "127.0.0.1";
const port = 3000;

const app = express();

app.get("/", (req, res, next) => {
    res.send("Hello World!");;
})

app.get("/products", (req, res, next) => {
    res.send("This page features all of the available climbing gear and other products.");
});

app.get("/products/shoes", (req, res, next) => {
    res.send("This page feature only shoes.");
});

app.get("/products/shoes/:id", (req, res, next) => {
    res.send("This page features a particular shoe based on its id.");
});

app.get("/admissions", (req, res, next) => {
    res.send("This page will let users check which admissions/memberships they have that are active/inactive.");
});

app.post("/admissions", (req, res, next) => {
    res.send("This page will let users submit their data to apply for admissions/climbing memberships.");
});

app.put("/admissions/update", (req, res, next) => {
    res.send("This page will let users update their account regarding waivers, memberships, postal info, etc.");
})

app.delete("/admissions/remove", (req, res, next) => {
    res.send("This page will remove/end a user's membership if they wish for it to be done.");
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});