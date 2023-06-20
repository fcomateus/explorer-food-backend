require('express-async-errors');
require("dotenv/config");
const express = require('express');
const cors = require("cors");
const app = express();
const routes = require('./routes');
const AppError = require('./utils/AppError');

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3333;

app.use(routes);

app.use(( error, request, response, next ) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.log(error);

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))