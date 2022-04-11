const hre = require("hardhat");
const ethers = hre.ethers;
const GreeterArtifact = require("../artifacts/contracts/Greeter.sol/Greeter.json");

async function main() {
    const [signer] = await ethers.getSigners();
    const greeterAddr = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

    const greeterContract = new ethers.Contract(
        greeterAddr,
        GreeterArtifact.abi,
        signer
    );

    const setGreetResult = await greeterContract.setGreet("Hello, World!");
    console.log(setGreetResult);
    await setGreetResult.wait();

    const result = await greeterContract.getGreet();
    console.log(result);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
