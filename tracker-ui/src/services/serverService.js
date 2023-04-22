import axios from 'axios';

const serverBaseUrl = 'https://localhost:7284';
const serverApiClient = axios.create({
    baseURL: serverBaseUrl
});

export function getExpenseCategories() {
    console.log('getting expense categories');
    serverApiClient.get("/api/expenses/expenseCategories")
        .then((result) => {
            console.log('expense categories = ', result.data);
            return result?.data;
        })
        .catch((err) => {
            console.log('error getting categories ', err)
        });
}