require("dotenv/config");
const express = require('express');
const cors = require("cors");
const app = express();
const routes = require('./routes')

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3333;

app.use(routes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
