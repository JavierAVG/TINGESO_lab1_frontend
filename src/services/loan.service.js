import httpClient from "../http-common";

const calculateMonthlyFee = (interest_rate,duration,amount) => {
    return httpClient.get('/api/v1/loan/simulate', {params:{interest_rate,duration,amount}});
}

const update = data => {
    return httpClient.put('/api/v1/loan/', data);
}

const create = data => {
    return httpClient.post("/api/v1/loan/", data);
}

const get = id => {
    return httpClient.get(`/api/v1/loan/${id}`);
}

const getAll = () => {
    return httpClient.get('/api/v1/loan/');
}

const getAllByClientId = (id) => {
    return httpClient.get(`/api/v1/loan/client/${id}`);
}

const getCosts = id => {
    return httpClient.get(`/api/v1/loan/${id}/costs`);
}

const updateState = (id,state) => {
    return httpClient.post(`/api/v1/loan/${id}/${state}`);
}

export default { calculateMonthlyFee, update, create, get, getAll, getCosts, updateState, getAllByClientId };