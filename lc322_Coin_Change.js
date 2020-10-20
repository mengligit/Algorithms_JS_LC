/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
   
    if(amount<0 || typeof amount == undefined) return -1;
    
    //dp[total amount] = min number of coins
    let res = [];
    
    //initialization
    coins.sort((a, b) => a-b);
    
    res[0] = 0;
    
    for(let i=1;i<=amount;i++){
       
         res[i] = Number.MAX_VALUE;
         if(coins.includes(i)) {
                 res[i] =1;
                 continue;
         }
        
        for(let j=0;j<coins.length;j++){     
            let val = coins[j];
            if(i-val<0 || res[i-val]=== Number.MAX_VALUE) continue;
            res[i] = Math.min(res[i-val] + 1, res[i]);
        }
    
    }
    
    return res[amount]=== Number.MAX_VALUE? -1: res[amount];
};