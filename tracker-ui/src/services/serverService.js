import axios from 'axios';

const testApiBaseUrl = 'https://pokeapi.co/api/v2/pokemon/ditto';
const testApiClient = axios.create({
    baseURL: testApiBaseUrl
});

const serverBaseUrl = 'https://localhost:7284';
const serverApiClient = axios.create({
    baseURL: serverBaseUrl
});


export function testApiCall() {
    console.log('called testApiCall');
    testApiClient.get()
        .then((result) => 
            console.log('result from test api = ', result)
        )
        .catch((err) => 
            console.log('error ocurred, ', err)
        );
}

export function getExpenseCategories() {
    console.log('getting expense categories');
    serverApiClient.get()
        .then((result) => {
            console.log('expense categories = ', result.data)
        })
        .catch((err) => {
            console.log('error getting categories ', err)
        });
}