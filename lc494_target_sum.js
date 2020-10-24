/**
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */
var findTargetSumWays = function(nums, S) {
    
    let SV = Math.abs(S);
    let val = 0;
    for(let i=0;i<nums.length; i++)
    {
        val += nums[i];
    }

    if(val<SV) return 0;
    
    let max = Math.max(SV, val);
    
    let res = Array.from(Array(nums.length+1), () => new Array(max+1));
    
    //res[iterate to ith element in the nums array][total] = number of ways
    
    //initialization
    for(let i=0;i<nums.length+1;i++)
     for(let j=0;j<max+1; j++){
         res[i][j] = 0;
     }

     res[0][0] = 1;
    
    for(let i=1;i<=nums.length;i++)
    {
        //j: total sum
        for(let j= 0;j<=max;j++){
           //根据对称性只用算一边
           //避免超界
           let right = Math.abs(j+nums[i-1])> val? 0: res[i-1][Math.abs(j+nums[i-1])];
           res[i][j] = res[i-1][Math.abs(j-nums[i-1])] + right;
        }  
    }
    
    console.log(res[nums.length][SV]);
    return res[nums.length][SV];
};

