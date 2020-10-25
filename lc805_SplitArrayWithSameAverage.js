/**
 * @param {number[]} A
 * @return {boolean}
 */

//reference: https://www.cnblogs.com/grandyang/p/10285531.html
var splitArraySameAverage = function(A) {
    let val = 0;
    for(let i=0;i<A.length; i++)
    {
        val += A[i];
    }
    
    //pruning
    let n1Set = [];
    for(let n1=1;n1<=A.length/2; n1++){
        if(n1*val%A.length === 0)
            {n1Set.push(n1);}
    }
    
    if(n1Set.length == 0) return false;
    
    //sort the array
    A.sort(function(a, b){return a-b});
    
    for(let n1 of n1Set)
    {
        let sum1 = val*n1/A.length;
        if(helper(sum1, n1, 0, A, val*1.0/A.length) === true){
            return true;
        }
    }
    
    return false;
    
    
    
};

//sum: left sum
//n: left n
//i: current position
function helper(sum, n, i, A){
    if(sum ==0 && n == 0) return true;
    if(sum == 0 || n == 0 || i >=A.length) return false;
    
    let cur = A[i]
    
    //看若当前要加入的数字大于当前的平均值，则直接返回 false，因为已经给原数组排过序了，之后的数字只会越来越大，一旦超过了平均值，就不可能再降下来了
    if(cur>sum*1.0/n || sum<cur) return false;
    
    let pick = helper(sum-cur, n-1, i+1, A);
    if(pick) return true;

    //如果不取当前这个数，跳过和当前数一样的后面的数
    while(i+1<A.length){
        if(A[i+1] != A[i]) 
        {break;}
        i++;
    }

    let notPick = helper(sum, n, i+1, A);
    if(notPick) return true;
    
    return false;
    
}

splitArraySameAverage([1,2,3,4,5,6,7,8]);