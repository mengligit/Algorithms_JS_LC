/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function(amount, coins) {

    
    if(amount <0 || typeof coins == undefined) return 0;
    let res = Array.from(Array(coins.length+1), () => new Array(amount+1));
    
    //res[use first i types of coins][total amount]
    
    //initialization
    res[0][0] = 1;
    for(let i=1;i<=amount;i++){
            res[0][i] = 0;
    }
    
    for(let i=1; i<=coins.length; i++){
       
       let val = coins[i-1];
       for(let j=0; j<=amount; j++){
         res[i][j] = 0;
         //t: the ith coin is used t times
           for(let t=0; t*val<=j; t++)
           {
              res[i][j] += res[i-1][j-val*t];
                
           }
           
        }
    }
    
    return res[coins.length][amount];
};