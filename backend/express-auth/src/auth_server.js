const express = require("express");
const cors = require("cors");
const middleware = require("./middleware/verifyer");

const app = express();
const port = process.env.PORT || 5002;

app.use(cors());
app.use(middleware.decodeToken);
app.get('/api/verify', (req, res) => {
  return res.send(req.headers.authorization.split(' ')[1]);
})

app.listen(port, () => {
  console.log("Server is running on", port);
})