import httpClient from "../http-common";

const create = data => {
    return httpClient.post("/api/v1/client/", data);
}

const remove = id => {
    return httpClient.delete(`/api/v1/client/${id}`);
}

const getAll = () => {
    return httpClient.get('/api/v1/client/');
}

const get = id => {
    return httpClient.get(`/api/v1/client/${id}`);
}

export default { create, remove, getAll, get };