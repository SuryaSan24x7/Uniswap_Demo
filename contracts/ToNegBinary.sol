// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ToNegBinary {
    function concatenateStrings(string memory a, string memory b) private pure returns (string memory) {
        return string(abi.encodePacked(a, b));
    }

    function getStringLength(string memory str) private pure returns (uint) {
        return bytes(str).length;
    }

    function getEightbits(string memory a) private pure returns (string memory) {
        if (getStringLength(a) >= 8) {
            return a;
        } else {
            uint n = 8 - getStringLength(a);
            string memory temp = "";
            while (n > 0) {
                temp = concatenateStrings(temp, "1");
                n = n - 1;
            }
            return concatenateStrings(temp, a);
        }
    }
    function calculateTwosComplement(uint256 decimalValue) private pure returns (uint256) {
        // Calculate the two's complement
        uint256 twosComplement = (~decimalValue + 1) & ((1 << 256) - 1);

        return uint8(twosComplement);
    }

    function toBinary(int a) public pure returns (string memory) {
        require(-128 <= a && a <= 0, "Input out of range");

        if (a == 0) {
            return "00000000"; // 8-bit representation of zero
        }

        uint256 n;
        string memory BinaryOutput = "";

        if (a < 0) {
            // If the number is negative, calculate two's complement
            n = calculateTwosComplement(uint256(-a));
        } else {
            n = calculateTwosComplement(uint256(a));
        }

        while (n > 0) {
            if (n % 2 == 1) {
                BinaryOutput = concatenateStrings("1", BinaryOutput);
            } else {
                BinaryOutput = concatenateStrings("0", BinaryOutput);
            }
            n = n / 2;
        }

        return getEightbits(BinaryOutput);
    }
}
