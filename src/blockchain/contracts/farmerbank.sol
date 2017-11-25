pragma solidity ^0.4.0;

contract Bank{

    address owner;
    uint256 previousBalance;

    function Bank() {
        owner = msg.sender;
        members[owner] = member(true, true, 100, 0, 0);
        previousBalance = this.balance;
    }

    struct member{
        bool isMember;
        bool isPermitted;
        uint maxAmount;
        uint256 loanGranted;
        uint256 amountAddedToThePool;
    }

    mapping(address => member) members;

    modifier onlyowner(){
        if(msg.sender == owner){
            _;
        }else{
            throw;
        }
    }

    modifier onlymember(){
        if(members[msg.sender].isMember == true){
            _;
        }else{
            throw;
        }
    }

    function addMembers(address _memberaddress, uint _maxAmount) onlyowner{
        members[_memberaddress] = member(true, true, _maxAmount, 0, 0);
    }

    function removeMembers(address _memberaddress) onlymods{
        delete members[_memberaddress];
    }

    function addFundsorPayLoan() payable onlymember{
        uint256 changeInBalance = this.balance - previousBalance;
        members[msg.sender].amountAddedToThePool += changeInBalance;
        if(members[msg.sender].loanGranted > 0 && members[msg.sender].loanGranted <= members[msg.sender].amountAddedToThePool){
            members[msg.sender].amountAddedToThePool -= members[msg.sender].loanGranted;
            members[msg.sender].loanGranted = 0;
            members[msg.sender].isPermitted = true;
            //transfer function
        }
        addedFunds(msg.sender, changeInBalance);
        previousBalance = this.balance;
    }

    function getBalance() constant returns(uint256){
        return this.balance;
    }
}