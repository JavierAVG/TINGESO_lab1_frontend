import {useEffect, useState} from "react";
import loanService from "../services/loan.service.js";
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";


const LoanCosts = () =>{
    const {id, setId} = useParams();
    const [monthlyFee, setMonthlyFee] = useState(null);
    const [insurance1, setInsurance1] = useState(null);
    const [insurance2, setInsurance2] = useState(null);
    const [commission, setCommission] = useState(null);
    const [monthlyCost, setMonthlyCost] = useState(null);
    const [totalCost, setTotalCost] = useState(null);

    useEffect(() => {
        loanService.getCosts(id)
            .then((response) => {
                setMonthlyFee(response.data[0]);
                setInsurance1(response.data[1]);
                setInsurance2(response.data[2]);
                setCommission(response.data[3]);
                setMonthlyCost(response.data[4]);
                setTotalCost(response.data[5]);
            })
    }, []);

    return (
        <Box sx={{width: '100%', maxWidth: 500}}>
            <hr/>
            <Typography variant="h5" gutterBottom>
                Monthly fee: {monthlyFee}
            </Typography>
            <hr/>
            <Typography variant="h5" gutterBottom>
                Credit life insurance: {insurance1}
            </Typography>
            <Typography variant="h5" gutterBottom>
                Fire insurance: {insurance2}
            </Typography>
            <hr/>
            <Typography variant="h5" gutterBottom>
                Administration fee: {commission}
            </Typography>
            <hr/>
            <Typography variant="h5" gutterBottom>
                Monthly costs: {monthlyCost}
            </Typography>
            <hr/>
            <Typography variant="h3" gutterBottom>
                Loan's total costs: {totalCost}
            </Typography>
        </Box>
    );

}

export default LoanCosts;