const express = require("express");
const app = express();
const router = require("./routers");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.use(router);
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`); // eslint-disable-line no-console
});
