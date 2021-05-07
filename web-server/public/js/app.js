console.log('Client side javascript file is loaded.');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message1');
const messageTwo = document.querySelector('#message2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    messageOne.textContent = "Loading...";
    messageTwo.textContent = '';

    fetch('/weather?address='+location).then((response) => {
        response.json().then((res) => {

            if(res.errorMessage) {
                messageOne.textContent = res.errorMessage;
                return;
            }

            const { location, data } = res;

            messageOne.textContent = location;
            messageTwo.textContent =  data.weatherDesc + '. Current temperature is ' + data.current + ' degrees. Real feel is ' + data.feelslike + ' degrees.';
            console.log(data.data);
        })
    });
});