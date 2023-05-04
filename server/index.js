const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT =
  "0552a2d10252d8cedc6d3eef3b8080072d06c87bbdf83511073cbad72df607ef";

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const { proof, name } = req.body;

  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  // TODO: prove that a name is in the list
  if (isInTheList) {
    res.send("you got a toy robot!");
  } else {
    res.send("you're not nice apparently :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
