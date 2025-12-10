// Project

require("dotenv").config();
console.log("Loaded DB_URL =", process.env.DB_URL);
const express = require("express");
const connectDB = require("./shared/middlewares/connect-db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const hostname = "0.0.0.0";
const port = 3000;

const app = express();

// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cors({ origin: "https://climbing-gym-project.vercel.app", credentials: true }));
// app.use(cors({ origin: "https://climbinggymproject.onrender.com", credentials: true }));


const { productsRoute } = require("./modules/products/products-routes");
const { usersRoute } = require("./modules/users/users-routes");
const {
  membershipsRoute,
} = require("./modules/memberships/memberships-routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.TOKEN_SECRET));

app.use(connectDB);

app.use(productsRoute);
app.use(usersRoute);
app.use(membershipsRoute);

app.use((req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);
  req.token = token;
  next();
});

app.use((error, req, res, next) => {
  console.log(error);
  if (res.headersSent) {
    return;
  }
  res.status(500).json({ error: "Oops! Internal Server Error!" });
});

app.use((req, res, next) => {
  res
    .status(404)
    .json({ error: `Error 404: ${req.method} ${req.path} not found.` });
});

app.listen(port, hostname, (error) => {
  if (error) console.log(error.message);
  else console.log(`Server running at http://${hostname}:${port}`);
});
