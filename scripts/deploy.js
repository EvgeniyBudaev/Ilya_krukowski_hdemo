const hre = require("hardhat");
const ethers = hre.ethers;

// Помещаем контракт в блокчейн
async function main() {
    const [signer] = await ethers.getSigners();
    // const Transfers = await ethers.getContractFactory("Transfers", signer);
    // const transfers = await Transfers.deploy(3); // 3 - maxTransfers в конструкторе
    // await transfers.deployed(); // ждем когда транзакция будет выполнена
    // console.log(transfers.address);

    const Greeter = await ethers.getContractFactory("Greeter", signer);
    const greeter = await Greeter.deploy();
    await greeter.deployed();
    console.log(greeter.address); // 0x5FC8d32690cc91D4c39d9d3abcBD16989F875707
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
