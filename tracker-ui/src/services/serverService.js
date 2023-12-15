import axios from 'axios';

const serverBaseUrl = 'http://localhost:5284';
const serverApiClient = axios.create({
    baseURL: serverBaseUrl
});

const getExpenseCategories = async () => {
    // serverApiClient.get("/api/expenses/expense-categories")
    //     .then((result) => {
    //         console.log('expense categories = ', result.data);
    //         return result?.data;
    //     })
    //     .catch((err) => {
    //         console.log('error getting categories ', err)
    //     });
    
    try {
        const response = await serverApiClient.get("/api/expenses/expense-categories");
        return response.data;
    } catch(error) {
        throw error;
    }

    // return [
    //     "Grocery",
    //     "Zeus",
    //     "Misc",
    //     "Eating out"
    // ];
}

export { getExpenseCategories };