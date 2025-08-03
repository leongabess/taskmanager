const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const routes = require('./routes/routes.js');
const cors = require("cors");
app.use(cors({
    origin: "*",
    credentials: true
}))

app.use(express.json());
app.use('/api', routes)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

