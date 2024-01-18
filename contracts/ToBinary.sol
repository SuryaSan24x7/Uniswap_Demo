// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract ToBinary {
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
                temp = concatenateStrings(temp, "0");
                n = n - 1;
            }
            return concatenateStrings(temp, a);
        }
    }

    function toBinary(uint256 n) public pure returns (string memory) {
        if (n == 0) {
            return "00000000";
        }

        string memory BinaryOutput = "";
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
