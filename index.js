const express = require("express");
const app = express();
const port = 3000;

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const penjualanRoute = require('./server/penjualan');
const trackingRoute = require('./server/tracking');
const userRouter = require('./server/auth');
const helper = require('./server/helper');
const database = require('./server/database')

database.generateAdmin();

app.use(express.json());
app.use("/", express.static("./client"));
app.use('/scripts', express.static(__dirname + '/node_modules/'));


app.use("/api", penjualanRoute);
app.use("/api/tracking", trackingRoute);
app.use("/api/auth", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
