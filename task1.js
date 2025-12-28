function pickPropArray(arr, prop) {
  const result = [];
  
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].hasOwnProperty(prop)) {
      result.push(arr[i][prop]);
    }
  }
  
  return result;
}

const students = [
   { name: 'Павел', age: 20 },
   { name: 'Иван', age: 20 },
   { name: 'Эдем', age: 20 },
   { name: 'Денис', age: 20 },
   { name: 'Виктория', age: 20 },
   { age: 40 },
]

const result = pickPropArray(students, 'name')

console.log(result)