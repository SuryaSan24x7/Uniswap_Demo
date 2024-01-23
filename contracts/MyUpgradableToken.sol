// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";

contract MyUpgradableToken is Initializable, ERC20Upgradeable, OwnableUpgradeable, ReentrancyGuardUpgradeable {
    IUniswapV2Router02 public uniswapRouter;
    address public uniswapPair;

    function initialize(address _admin, IUniswapV2Router02 _uniswapRouter) initializer public {
        __ERC20_init("MyUpgradableToken", "MUT");
        __Ownable_init();
        __ReentrancyGuard_init();

        uniswapRouter = _uniswapRouter;

        // Create Uniswap pair
        uniswapPair = IUniswapV2Factory(uniswapRouter.factory()).createPair(address(this), uniswapRouter.WETH());
        
        // Mint initial supply to the owner
        _mint(_admin, 1000000 * 10**decimals());
    }

    function swapTokensForETH(uint256 tokenAmount) external nonReentrant {
        require(tokenAmount > 0, "Token amount must be greater than zero");
        require(balanceOf(msg.sender) >= tokenAmount, "Insufficient balance");

        // Approve Uniswap to spend tokens
        _approve(msg.sender, address(uniswapRouter), tokenAmount);

        // Perform the swap
        uniswapRouter.swapExactTokensForETH(
            tokenAmount,
            0, // Accept any amount of ETH
            getPathForTokenToETH(),
            address(this),
            block.timestamp + 1 hours
        );
    }

    function addLiquidity(uint256 tokenAmount, uint256 ethAmount) external nonReentrant {
        require(tokenAmount > 0 && ethAmount > 0, "Amounts must be greater than zero");
        require(balanceOf(msg.sender) >= tokenAmount, "Insufficient balance");

        // Approve Uniswap to spend tokens
        _approve(msg.sender, address(uniswapRouter), tokenAmount);

        // Add liquidity to Uniswap
        uniswapRouter.addLiquidityETH{value: ethAmount}(
            address(this),
            tokenAmount,
            0, // Min amount of tokens to receive
            0, // Min amount of ETH to receive
            msg.sender,
            block.timestamp + 1 hours
        );
    }

    function getPathForTokenToETH() private view returns (address[] memory) {
        address[] memory path = new address[](2);
        path[0] = address(this);
        path[1] = uniswapRouter.WETH();

        return path;
    }
}
