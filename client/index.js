const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  readline.question("What is your name?\n", async (name) => {
    const merkleTree = new MerkleTree(niceList);
    const index = niceList.findIndex((n) => n === name);
    const proof = merkleTree.getProof(index);
    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      // TODO: add request body parameters here!
      proof: proof,
      name: name,
    });
    if (gift == "you got a toy robot!") {
      console.log(`Hey there ${name}!, ${gift}`);
    } else {
      console.log(`Sorry ${name}, ${gift}`);
    }
    readline.close();
  });
}

main();
