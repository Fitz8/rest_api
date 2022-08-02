require("./db/connection"); //runs connection immediately
const express = require("express");
const userRouter = require("./user/routes");
const app = express();

//add routes and controllers to app before listen runs
app.use(express.json());
app.use(userRouter);

app.listen(5001, () => {
    console.log("Listening on port 5001");
})