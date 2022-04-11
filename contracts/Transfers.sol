//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// Ведется учет всех платежей, которые в этот контракт приходят

contract Transfers {
    struct Transfer {
        uint amount; // кол-во полученных денежных средств
        uint timestamp; // время отправления денежных средств
        address sender; // адрес отправителя денежных средств
    }

    Transfer[] transfers;

    address owner; // владелец смарт-контракта
    uint8 maxTransfers; // ограничение максимального кол-ва трансферов для этого контракта
    uint8 currentTransfers;

    constructor(uint8 _maxTransfers) {
        owner= msg.sender;
        maxTransfers = _maxTransfers;
    }

    // Получение информации о конкретном трансфере 
    function getTransfer(uint _index) public view returns(Transfer memory) {
        // Проверяем,что index не выходит за пределы размерности массива
        require(_index < transfers.length, "Cannot find this transfer.");
        return transfers[_index];
    }

    // Проверка на владельца
    modifier requireOwner() {
        require(owner == msg.sender, "Not an owner");
        _;
    }

    // Функция вывода денежных средств из смарт-контракта
    function withdrawTo(address payable _to) public requireOwner {
        _to.transfer(address(this).balance);
    }

    // Функция receive вызовется автоматически, если в контракт придет 
    // некая транзакция без указания функции, но зато с денежными средствами
    receive() external payable {
        // Проверяем на максимально допустимое кол-во трансферов
        if(currentTransfers >= maxTransfers) {
            revert("Cannot accept more transfers.");
        }

        Transfer memory newTransfer = Transfer(msg.value, block.timestamp,msg.sender);
        transfers.push(newTransfer);
        currentTransfers++;
    }
}