pragma solidity ^0.4.0;

contract Farmerbank{

    address owner;
    uint256 previousBalance;

    event addedFunds(address whoAdded, uint256 howMuch);

    function Farmerbank() {
        owner = msg.sender;
        mods[owner] = mod("FarmerBank", true);
        members[owner] = member(true, true, 0, 0);
        previousBalance = this.balance;
    }

    struct member{
        bool isMember;
        bool isPermitted;
        //uint maxAmount;
        uint256 loanGranted;
        uint256 amountAddedToThePool;
    }

    struct mod{
        string name;
        bool status;
    }

    mapping(address => member) members;
    mapping(address => mod) mods;
    mapping(address => uint256) loanGranted;

    modifier onlyowner(){
        require(msg.sender == owner);

        _;
    }

    modifier onlymods(){
        require(mods[msg.sender].status == true);
            _;
    }

    modifier onlymember(){
        require(members[msg.sender].isMember == true);
            _;
    }

    function addMods(address _modAddress, string _modName) onlyowner{
        mods[_modAddress] = mod(_modName, true);
    }

    function addMembers(address _memberaddress) onlymods{
        members[_memberaddress] = member(true, true, 0, 0);
    }

    function removeMembers(address _memberaddress) onlymods{
        delete members[_memberaddress];
    }

    function addFundsorPayLoan() payable onlymember{
        // uint256 changeInBalance = this.balance - previousBalance;
        members[msg.sender].amountAddedToThePool += msg.value;
        if(members[msg.sender].loanGranted > 0 && members[msg.sender].loanGranted >= msg.value){
            members[msg.sender].loanGranted -= msg.value;
        }
        else if(members[msg.sender].loanGranted < msg.value){
            members[msg.sender].isPermitted = true;
            members[msg.sender].loanGranted = 0;
        }
        addedFunds(msg.sender, msg.value);
        // previousBalance = this.balance;
    }

    function requestLoan(uint256 loanAmount) onlymember returns(bool status){
        if(members[msg.sender].isPermitted && loanAmount <= 2*members[msg.sender].amountAddedToThePool && loanAmount <= this.balance/2){
            members[msg.sender].isPermitted = false;
            members[msg.sender].loanGranted = loanAmount;
            members[msg.sender].amountAddedToThePool -= loanAmount;
            msg.sender.transfer(loanAmount);
            // previousBalance = this.balance;
            return true;
        }
        else{
            revert();
        }
    }
    
    function getLoanGranted() constant returns(uint256){
        return members[msg.sender].loanGranted;
    }

    function getBalance() constant returns(uint256){
        return this.balance;
    }

    function getAmoundAdded() constant returns(uint256){
        return members[msg.sender].amountAddedToThePool;
    }
}