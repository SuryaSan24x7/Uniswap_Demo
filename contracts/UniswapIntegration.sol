// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract UniswapIntegration {
    IUniswapV2Router02 public uniswapRouter;

    constructor(address _uniswapRouter) {
        uniswapRouter = IUniswapV2Router02(_uniswapRouter);
    }

    function swapTokens(
        address tokenIn,
        uint256 amountIn,
        address tokenOut,
        uint256 amountOutMin
    ) external {
        IERC20(tokenIn).approve(address(uniswapRouter), amountIn);

        address[] memory path = new address[](2);
        path[0] = tokenIn;
        path[1] = tokenOut;

        uniswapRouter.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            address(this),
            block.timestamp + 1 hours
        );
    }
}
