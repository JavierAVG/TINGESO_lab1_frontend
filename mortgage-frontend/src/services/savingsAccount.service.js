import httpClient from "../http-common";

const create = (idloan, salaryArray, withdrawalArray, depositArray) => {
    const savings = {
        idloan: idloan,
        salary: salaryArray,
        withdrawal: withdrawalArray,
        deposit: depositArray
    };
    console.log("Save savings:", savings); // Log the payload to verify
    return httpClient.post("/api/v1/savingsaccount/", savings);
};

const update = (idloan, ids, salaryArray, withdrawalArray, depositArray) => {
    const savings = {
        idloan: idloan,
        ids: ids,
        salary: salaryArray,
        withdrawal: withdrawalArray,
        deposit: depositArray
    };
    console.log("Update savings:", savings); // Log the payload to verify
    return httpClient.put("/api/v1/savingsaccount/", savings);
};

const getByIdLoan = (idLoan) => {
    return httpClient.get(`/api/v1/savingsaccount/${idLoan}`);
}

export default { create, update, getByIdLoan };