/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeightII = function(stones) {
    
    let val =0;
    for(let i=0; i<stones.length; i++)
        {
            val += stones[i];
        }
    
    let res = Array.from(Array(stones.length+1), () => new Array(val+1));
    
    //res[first ith stones][sum] = 0 -> possible; 1 -> impossible
    
    //init
    for(let i=0;i<stones.length+1;i++)
     for(let j=0;j<val+1; j++){
         if(j==0){res[i][j] =0;}
         else
         {res[i][j] = 1;}
     }

     let d=val;
     for(let i=1;i<=stones.length;i++)
         for(let j=1; j<=val; j++)
             {
                 let choose = j-stones[i-1]<0? 1: res[i-1][j-stones[i-1]];
                 let notChoose = res[i-1][j];
                 res[i][j] = (choose === 0 || notChoose === 0)? 0: 1;
                 if(res[i][j] == 0 && i==stones.length)
                 {
                     let d1 = Math.abs(j - (val-j));
                     if(d1<d) d = d1;
                 }
             }
    
    // let d=val%2;
    // for(;d<=val;d++)
    //     {
    //         if(res[stones.length][(val-d)/2] === 0) break;
    //     }
    
    return d;
};



