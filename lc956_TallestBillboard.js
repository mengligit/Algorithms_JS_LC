/*
思路：
将问题转化为求数组和为0时的组合
 
对任何一个数，可以用三种方式对待它，乘以1，-1或0，目标是求和为0时的最大正数和
 
例如，[1，2，3], 可以对1，2乘以1，3乘以-1，此时和为0， 最大正数和为1+2=3
用字典来存储每一步的结果，键和值分别是(k:v) 总和以及正数和，
初始化时dp={0:0},表示和为0时的最大长度为0
那么最后只需要求dp[0]的最大值就ok辣
 
遍历所有钢筋：
对每根钢筋都有三种处理方式：加，减，丢 （对应乘以1，-1或0）
 
如：[1,2,3]
第一步: 用钢筋1，对初始的0，操作
如果加，那么总和是1，正数是1；如果减，总和是-1，正数0；如果丢，维持不变；更新dp={0:0, 1:1, -1:0}
第二步: 用钢筋2，对第一步中dp的键0，1，-1的基础上分别进行“加，减，丢 ”的操作
在0:0基础上，如果加，也就是变为2：2；如果减，变为 -2：0； 如果丢，变成0：0
类似的，在1：1基础上，加减丢变为3：3，-1：1，1：1
类似的，在-1：0基础上，加减丢变为1：2，-3：0，-1：0
每个键取较大值，用粗体标识了，然后更新dp={0:0, 1:2, 2:2, -1:1, 3:3, -2:0, -3:0}
总和为1时，相比第一步时的正数和为1，第二步时正数和变为了2，将dp[1]修改为更大的2
总和为-1时，相比第一步时的正数和为0，第二步时正数和变为了1，将dp[-1]修改为更大的1
最后返回dp[0]

作者：liuchang
链接：https://leetcode-cn.com/problems/tallest-billboard/solution/yi-quan-ji-ben-mei-shuo-ming-bai-de-zhe-pian-kan-l/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
*/

/**
 * @param {number[]} rods
 * @return {number}
 */
var tallestBillboard = function(rods) {
    
    //key: sum; value: sum of positive numbers
    let res = new Map();
    //init
    res.set(0, 0);
    
    for(let i=0;i<rods.length;i++){
        let cur = rods[i];
        
        //deep copy of the res map from the previous level
        let resPrevious = new Map(res);
            
        for(let key of resPrevious.keys()){
        // +
        //注意这里取值的时候从上一层取key1/value1, 但更新的时候取值是从新的map里取
        let key1 = key+cur;
        let value1 = resPrevious.get(key) + cur;
        if(res.has(key1))
          {res.set(key1, Math.max(res.get(key1), value1));}
        else {
           res.set(key1, value1);
        }
        
        //-
        let key2 = key-cur;
        let value2 = resPrevious.get(key);
        if(res.has(key2)) {
            res.set(key2, Math.max(res.get(key2), value2));
        }
        else{
            res.set(key2, value2);
        } 
            
        }
        
        console.log(res.get(-6));
    }
    return res.get(0);
};

tallestBillboard([1,2,3,6]);