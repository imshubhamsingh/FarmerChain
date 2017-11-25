pragma solidity ^0.4.0;

contract Bank{

    address owner;

    function Bank() {
        owner = msg.sender;
    }

    struct member{
        bool isMember;
        bool isPermitted;
        uint maxAmount;
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

    function getBalance() constant returns(uint256){
        return this.balance;
    }




}