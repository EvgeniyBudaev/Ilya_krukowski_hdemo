const hre = require("hardhat");
const ethers = hre.ethers;
const TransfersArtifact = require("../artifacts/contracts/Transfers.sol/Transfers.json");

async function currentBalance(address, msg = "") {
    // provider - объект, с помощью которого мы выполняем подключение
    // к нашему блокчейну и отправляем транзакции
    const rawBalance = await ethers.provider.getBalance(address);
    console.log(msg, ethers.utils.formatEther(rawBalance));
}

// Попробуем перебросить со второго аккаунта на наш смарт-контракт 
async function main() {
    const [account1, account2] = await ethers.getSigners();
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    // transfersContract - теперь мы можем вызывать функции которые прописаны
    // в самом смарт-контракте
    const transfersContract = new ethers.Contract(
        contractAddress,
        TransfersArtifact.abi,
        account1
    );

    // const transaction = {
    //     to: contractAddress,
    //     value: ethers.utils.parseEther("1")
    // }

    // const transactionSend = await account2.sendTransaction(transaction);
    // await transactionSend.wait();

    // await currentBalance(contractAddress, "Contract balance: ");
    // await currentBalance(account2.address, "Account 2 balance: ");

    // const result = await transfersContract.getTransfer(0);
    // // Кол-во эфира получено от ...
    // console.log(ethers.utils.formatEther(result["amount"]), result["sender"]);

    // Проверяем чтобы левый пользователь не смог вывести деньги
    // const result = await transfersContract.connect(account2).withdrawTo(account2.address);
    // console.log(result); // Должна быть ошибка

    const result = await transfersContract.withdrawTo(account2.address);
    console.log(result);
    await currentBalance(contractAddress, "Contract balance: ");
    await currentBalance(account2.address, "Account 2 balance: ");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
