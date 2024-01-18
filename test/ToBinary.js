const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("ToBinary", function () {
  async function deployToBinaryFixture() {
    const ToBinary = await ethers.getContractFactory("ToBinary");
    const toBinary = await ToBinary.deploy();
    return { toBinary };
  }

  describe("Conversion", function () {
    it("Should convert 0 to binary as '0'", async function () {
      const { toBinary } = await loadFixture(deployToBinaryFixture);
      const binaryResult = await toBinary.toBinary(0);
      expect(binaryResult).to.equal("00000000");
    });

    it("Should convert a non-zero number to binary", async function () {
      const { toBinary } = await loadFixture(deployToBinaryFixture);
      const binaryResult = await toBinary.toBinary(42);
      expect(binaryResult).to.equal("00101010");
    });
  });

  describe("Output String Length", function () {
    

    it("Should ensure a binary string has at least 8 bits", async function () {
      const { toBinary } = await loadFixture(deployToBinaryFixture);
      const result = await toBinary.toBinary("101");
      expect(result).to.equal("01100101");
    });
  });
  describe("Negative Integer", function () {
    

    it("Should give (out of bound) Error when negative number is entered ", async function () {
      const { toBinary } = await loadFixture(deployToBinaryFixture);
      try {
        await toBinary.toBinary("-10");
        // If the above line doesn't throw an error, fail the test
        expect.fail("Expected an error to be thrown");
      } catch (error) {
        // Check if the error message includes the expected string
        expect(error.message).to.include("value out-of-bounds");
      }
    });
    
    
  });
  
});
