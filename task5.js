function findPrefix(strs) {
    if (strs.length == 0) return "";
    
    let shortest = strs[0];
    for (let str of strs) {
        if (str.length < shortest.length) {
            shortest = str;
        }
    }
    
    let longest = "";
    
    for (let i = 0; i < shortest.length; i++) {
        for (let j = i + 2; j <= shortest.length; j++) {
            let substring = shortest.substring(i, j);
            let isCommon = true;
            
            for (let str of strs) {
                if (!str.includes(substring)) {
                    isCommon = false;
                    break;
                }
            }
            
            if (isCommon && substring.length > longest.length ) {
                longest = substring;
            }
        }
    }
    
    return longest;
}

strs = ["цветок","поток","хлопок"]
const result = findPrefix(strs);
console.log(result)

strs = ["собака","гоночная машина","машина"]
const result2 = findPrefix(strs);
console.log(result2)