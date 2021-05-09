// const add = (a, b, callback) => {
//     setTimeout(() => {
//         let sum = a + b;

//         callback(sum);
//     }, 2000);
// };

// add(2,3, (sum) => {
//     console.log(sum);
// })

const doWorkCallback = (callback) => {
    setTimeout(() => {
        //callback('This is my error!', undefined);
        callback(undefined, [1, 4, 7]);
    }, 2000);
};

doWorkCallback((error, result) => {
    if(error) {
        return console.log(error);
    }

    console.log(result);
});