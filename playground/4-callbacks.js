const add = (a, b, callback) => {
    setTimeout(() => {
        let sum = a + b;

        callback(sum);
    }, 2000);
};

add(2,3, (sum) => {
    console.log(sum);
})