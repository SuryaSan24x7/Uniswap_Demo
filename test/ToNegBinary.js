const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  
  describe("ToNegBinary", function () {
    async function deployToNegBinaryFixture() {
      const ToNegBinary = await ethers.getContractFactory("ToNegBinary");
      const toNegBinary = await ToNegBinary.deploy();
      return { toNegBinary };
    }
  
    describe("Conversion", function () {
      it("Should convert 0 to Binary as '0'", async function () {
        const { toNegBinary } = await loadFixture(deployToNegBinaryFixture);
        const NegBinaryResult = await toNegBinary.toBinary(0);
        expect(NegBinaryResult).to.equal("00000000");
      });
  
      it("Should convert a non-zero negative number to Binary", async function () {
        const { toNegBinary } = await loadFixture(deployToNegBinaryFixture);
        const NegBinaryResult = await toNegBinary.toBinary(-52);
        expect(NegBinaryResult).to.equal("11001100");
      });
    });
  
    describe("Output String Length", function () {
      
  
      it("Should ensure a Binary string has at least 8 bits", async function () {
        const { toNegBinary } = await loadFixture(deployToNegBinaryFixture);
        const result = await toNegBinary.toBinary("-1");
        expect(result).to.equal("11111111");
      });
    });
    describe("Positive Integer", function () {
      
  
      it("Should give (out of bound) Error when positive number is entered ", async function () {
        const { toNegBinary } = await loadFixture(deployToNegBinaryFixture);
        try {
          await toNegBinary.toBinary("10");
          // If the above line doesn't throw an error, fail the test
          expect.fail("Expected an error to be thrown");
        } catch (error) {
          // Check if the error message includes the expected string
          expect(error.message).to.include("VM Exception");
        }
      });
      
      
    });
    
  });
  