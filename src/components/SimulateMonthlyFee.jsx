import { useState } from "react";
import {InputLabel, Select} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import loanService from "../services/loan.service";
import CalculateIcon from "@mui/icons-material/Calculate";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

const SimulateMonthlyFee = () => {
    const [type, setType] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [interestRateError, setInterestRateError] = useState(false);
    const [duration, setDuration] = useState("");
    const [amount, setAmount] = useState("");
    const [monthlyFee, setMonthlyFee] = useState(0);

    const navigate = useNavigate();

    const handleSimulateMonthlyFee = (e) => {
        e.preventDefault();

        if (e.target.checkValidity()) {
            loanService
                .calculateMonthlyFee(interestRate,duration,amount)
                .then((response) => {
                    console.log("monthly fee:", response.data);
                    setMonthlyFee(response.data);
                })
                .catch((error) => {
                    console.log(
                        "There has been an error calculating the monthly fee.",
                        error
                    );
                });
        } else {
        alert("Invalid values, Please check the fields");
        }
    };

    const handleInterestRateChange = e => {
        setInterestRate(e.target.value)
        if (e.target.checkValidity()) {
            setInterestRateError(false);
        } else {
            setInterestRateError(true);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSimulateMonthlyFee}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            noValidate
        >
            <hr/>

            <FormControl fullWidth>
                <InputLabel id="type">Type of loan</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="Type"
                    value={type}
                    label="Type of loan"
                    onChange={(e) => {setType(e.target.value)}}
                    variant="standard"
                >
                    <MenuItem value="firsthome">First home</MenuItem>
                    <MenuItem value={"secondhome"}>Second home</MenuItem>
                    <MenuItem value="commercialproperties">Commercial properties</MenuItem>
                    <MenuItem value={"remodeling"}>Remodeling</MenuItem>
                </Select>
            </FormControl>
            <hr/>
            <TextField
                required
                id="duration"
                label="Duration of the loan in years"
                value={duration}
                onChange={e => {if (/^\d{0,2}$/.test(e.target.value)) setDuration(e.target.value)}}
                helperText={"E.g. 20"}
            />
            <hr/>
            <TextField
                required
                id="amount"
                label="Amount"
                value={amount}
                onChange={e => {if (/^\d*$/.test(e.target.value)) setAmount(e.target.value)}}
                helperText={"E.g. 20000000"}
            />
            <hr/>
            <TextField
                required
                id="interestRate"
                label="Annual interest rate"
                value={interestRate}
                onChange={handleInterestRateChange}
                error={interestRateError}
                helperText={interestRateError ? "Type valid interest rate: E.g. 3.5" : "E.g. 3.5"}
                slotProps={{
                    htmlInput: {
                        pattern: "[0-9]{1,2}\.[0-9]+",
                    },
                }}
            />
            <hr/>
            <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{marginLeft: "0.5rem"}}
                startIcon={<CalculateIcon/>}
            >
                Simulate
            </Button>
            <hr/>
            <Typography variant="h5" gutterBottom> YOUR MONTHLY FEE: {monthlyFee} </Typography>

        </Box>
    );
};

export default SimulateMonthlyFee;