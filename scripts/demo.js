const hre = require("hardhat");

async function main() {
    // Вывод учетных записей
    // const signer = await hre.ethers.getSigners(); // array
    const [signer] = await hre.ethers.getSigners(); // первый аккаунт из массива
    const balance = await signer.getBalance();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
