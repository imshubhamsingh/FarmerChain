pragma solidity ^0.4.0;

contract Bank{

    address owner;
    uint256 previousBalance;

    event addedFunds(address whoAdded, uint256 howMuch);

    function Bank() {
        owner = msg.sender;
        mods[owner] = mod("FarmerBank", true);
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

    struct mod{
        string name;
        bool status;
    }

    mapping(address => member) members;
    mapping(address => mod) mods;
    mapping(address => uint256) loanGranted;

    modifier onlyowner(){
        if(msg.sender == owner){
            _;
        }else{
            throw;
        }
    }

    modifier onlymods(){
        if(mods[msg.sender].status == true){
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

    function addMods(address _modAddress, string _modName) onlyowner{
        mods[_modAddress] = mod(_modName, true);
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

    function requestLoan(uint256 loanAmount) onlymember constant returns(bool status){
        if(members[msg.sender].isPermitted && loanAmount <= 2*members[msg.sender].amountAddedToThePool && loanAmount <= this.balance/2){
            members[msg.sender].isPermitted == false;
            members[msg.sender].loanGranted = loanAmount;
            return true;
        }
        else{
            return false;
        }
    }

    function getBalance() constant returns(uint256){
        return this.balance;
    }
}