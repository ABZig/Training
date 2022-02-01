//merge 2 arrays in 3 difffrent ways

arr1 = ["abhishek", "chavda"];
arr2 = ["zignuts", "technolab"];
 
function taskA(arr1, arr2) {
  answer = arr1.concat(arr2);
  console.log(answer);
}
taskA(arr1, arr2);
 
 
arr3 = ["abhishek", "chavda"];
arr4 = ["zignuts", "technolab"];
 
function taskB(arr3, arr4) {
  merge = [...arr3, ...arr4];
  console.log(merge);
}
taskB(arr3, arr4);
 
 
arr5 = ["abhishek", "chavda"];
arr6 = ["zignuts", "technolab"];
 
function taskC(arr5, arr6){
arr5.push(...arr6);
console.log(arr5);
}
taskC(arr5, arr6);
