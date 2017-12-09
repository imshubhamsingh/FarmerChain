var Farmerbank = artifacts.require('Farmerbank');

module.exports = function(deployer) {
    deployer.deploy(Farmerbank);
};