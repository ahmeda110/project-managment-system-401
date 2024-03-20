const express = require("express");
const cors = require("cors");

const PORT = 3100;

const app = express();
app.use(express.json());
app.use(cors());



app.post('/api/dashboard', (req, res) => {
    console.log("active")
    res.send("Dashboard");
});

app.get('/dashboard', (req, res) => {
    console.log("active")
    res.send("Dashboard");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

