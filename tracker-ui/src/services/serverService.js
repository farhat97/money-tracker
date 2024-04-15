import axios from 'axios';

import tunnels from '../ngrok-tunnels.json';

// Get server uri (generated when running ngrok and populating ngrok-tunnels.json)
let clientTunnel = tunnels.tunnels.filter(tunnel => tunnel.name === "server");
const localServerBaseUrl = 'http://localhost:5284';

const serverApiClient = axios.create({
    baseURL: clientTunnel[0].public_url,
    // baseURL: localServerBaseUrl
});
const axiosOptions = {
    headers: {
      "ngrok-skip-browser-warning": true,
    }
};

const getExpenseCategories = async () => {    
    try {
        const response = await serverApiClient.get("/api/expenses/expense-categories", axiosOptions);
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

const postNewExpense = async (expense) => {
    console.log('expense = ', expense);
    try {
        const response = await serverApiClient.post("/api/expenses/add-expense", expense, axiosOptions);
        return response.data;
    } catch(error) {
        throw error;
    }
}

export { getExpenseCategories, postNewExpense };