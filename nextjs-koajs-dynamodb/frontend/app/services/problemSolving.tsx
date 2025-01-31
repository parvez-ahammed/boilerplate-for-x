const myMap: Map<string, number> = new Map();
myMap.set("codeforces", 1423);
myMap.set("codechef", 1602);
myMap.set("atcoder", 1200);


function getProblemSolvingData(platform: any): number {
    return myMap.get(platform) || 0;
}

export { getProblemSolvingData }