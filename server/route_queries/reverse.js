const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
arr.reverse();
// const used = process.memoryUsage().heapUsed / 1024 / 1024;
// console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
const used = process.memoryUsage();
for (let key in used) {
  console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
}

const v8 = require('v8');
console.log("v8"+JSON.stringify(v8.getHeapStatistics()));