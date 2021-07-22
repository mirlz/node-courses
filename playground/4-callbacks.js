// const add = (a, b, callback) => {
//     setTimeout(() => {
//         let sum = a + b;

//         callback(sum);
//     }, 2000);
// };

// add(2,3, (sum) => {
//     console.log(sum);
// })

// const doWorkCallback = (callback) => {
//     setTimeout(() => {
//         //callback('This is my error!', undefined);
//         callback(undefined, [1, 4, 7]);
//     }, 2000);
// };

// doWorkCallback((error, result) => {
//     if(error) {
//         return console.log(error);
//     }

//     console.log(result);
// });

// ------------------------ CALLBACK ----------------------------

// const array1 = [1, 2, 4, 5, 8];

// const getEven = (arr, callback) => {
//   let temp = [];
  
//   arr.forEach(el => {
//     if(el%2 ===0) {
//       temp.push(el);
//     }
//   });
  
//   callback(temp);
// };

// getEven(array1, (result) => {
//   console.log(result)
// });

// ------------------------ PROMISE ----------------------------

// const array1 = [1, 5];

// const getEven = (arr) => {
//     let temp = [];
    
//     return new Promise((res, rej) => {
//         arr.forEach(el => {
//             if(el%2 ===0) {
//                 temp.push(el);
//             }
//         });

//         if(temp.length > 0) {
//             res(temp);
//         } else {
//             rej('Array does not contain even number!');
//         }
//     });
// };

// getEven(array1).then(res => {
//     console.log(res);
// }).catch(e => {
//     console.log('error: ', e);
// });

// ------------------------ ASYNC / AWAIT ----------------------------

const array1 = [1, 2, 5];

const getEven = (arr) => {
    let temp = [];
    
    arr.forEach(el => {
        if(el%2 ===0) {
            temp.push(el);
        }
    });

    return temp;
};

const res = async(res) => {
    try {
        res = await getEven(array1);
        return console.log(res);
    } catch (e) {
        console.log('error: ', e);
    }
};

res();