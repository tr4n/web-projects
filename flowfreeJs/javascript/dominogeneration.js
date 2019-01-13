maps = {};
for (let n = 0; n < 21; n++) {
    let map = [],
        count = 0;
    for (let i = 0; i < n; i++) {
        let row = [];
        for (let j = 0; j < n; j++) {
            if (j % 2 == 0) row.push(++count);
            else row.push(count);
        }
        if (i % 2 && n % 2) {
            row[n - 1] = map[i - 1][n - 1];
            count --; 
        }
        map.push(row);
    }
    if (n % 2) map[n - 1][n - 1] = -1;
    maps["" + n] = map;
}

console.log(maps);