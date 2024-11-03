import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";
import loanService from "../services/loan.service";
import {InputLabel, Select} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import savingsAccountService from "../services/savingsAccount.service.js";

const AddEditLoan = () => {
    const { idClient, id } = useParams();
    const [type, setType] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [interestRateError, setInterestRateError] = useState(false);
    const [duration, setDuration] = useState("");
    const [amount, setAmount] = useState("");

    const [docDicomHistory, setDocDicomHistory] = useState(null);
    const [pdfError, setPdfError] = useState('');

    const [monthlyIncome, setMonthlyIncome] = useState("");
    const [employmentLongevity, setEmploymentLongevity] = useState("");
    const [totalDebt, setTotalDebt] = useState("");
    const [propertyValue, setPropertyValue] = useState("");
    const [accumulatedSalary, setAccumulatedSalary] = useState("");
    const [savingsAccountLongevity, setSavingsAccountLongevity] = useState("");
    const [state, setState] = useState("");

    const [rows, setRows] = useState(Array.from({ length: 12 }, () => ({
        id: null,
        salary: 0,
        withdrawal: 0,
        deposit: 0
    })));

    const navigate = useNavigate();

    const [titleLoanForm, setTitleLoanForm] = useState("");

    useEffect(() => {
        if (id) {
            setTitleLoanForm("Update Loan");
            console.log("loan id: ",id)
            const fetchSavingsAccounts = () => {
                savingsAccountService.getByIdLoan(id).then((response) => {
                    const updatedRows = response.data.map((months) => ({
                        id: months.id,
                        salary: months.salary,
                        withdrawal: months.withdrawal,
                        deposit: months.deposit
                    }));
                    setRows(updatedRows);
                })
                    .catch((error) => {
                    console.error("Failed to fetch savings accounts", error);
                });
            };

            loanService
                .get(id)
                .then((loan) => {
                    setType(loan.data.type);
                    setInterestRate(loan.data.interestRate);
                    setDuration(loan.data.duration);
                    setAmount(loan.data.amount);

                    setMonthlyIncome(loan.data.monthlyIncome);
                    setEmploymentLongevity(loan.data.employmentLongevity);
                    setTotalDebt(loan.data.totalDebt);
                    setPropertyValue(loan.data.propertyValue);
                    setAccumulatedSalary(loan.data.accumulatedSalary);
                    setSavingsAccountLongevity(loan.data.savingsAccountLongevity);

                    fetchSavingsAccounts();
                })
                .catch((error) => {
                    console.log("There has been an error.", error);
                });
        } else {
            setTitleLoanForm("New Loan");
        }
        setState("In evaluation");
    }, []);

    const handleAddEditLoan = e => {
        e.preventDefault();

        const loan = { id, idClient ,type, interestRate, duration, amount, monthlyIncome,
            employmentLongevity, totalDebt, propertyValue, accumulatedSalary, savingsAccountLongevity,
            state };

        const ids = rows.map(row => row.id);
        const salaries = rows.map(row => row.salary);
        const deposits = rows.map(row => row.deposit);
        const withdrawals = rows.map(row => row.withdrawal);

        if (e.target.checkValidity()) {
            if (id) {
                loanService.update(loan).then((response) => {
                    console.log("Loan has been updated.", response.data);
                    savingsAccountService
                        .update(response.data.id,ids,salaries,withdrawals,deposits)
                        .then((response) => {
                            console.log("Savings have been updated.", response.data);
                            navigate(`/client/${idClient}/loanlist`);
                        })
                }).catch((error) => {
                    console.log(
                        "There has been an error updating the loan.",
                        error
                    );
                });
                alert("Loan has been updated.");
            } else {
                loanService.create(loan).then((response) => {
                    console.log("Loan has been added.", response.data);
                    savingsAccountService
                        .create(response.data.id,salaries,withdrawals,deposits)
                        .then((response) => {
                            console.log("Savings have been added.", response.data);
                            navigate(`/client/${idClient}`);
                        })
                }).catch((error) => {
                    console.log(
                        "There has been an error adding the loan.",
                        error
                    );
                });
                alert("Loan has been saved.");
            }
        } else {
            alert("Invalid, Please check the fields");
        }
    };

    const handleInterestRateChange = e => {
        setInterestRate(e.target.value)
        if (e.target.checkValidity()) { // could replace for: setInterestRateError(!e.target.checkValidity());
            setInterestRateError(false);
        } else {
            setInterestRateError(true);
        }
    };

    const handleTableChange = (index, column, value) => {
        const updatedRows = [...rows];
        if (/^\d*$/.test(value)){
            updatedRows[index][column] = value === "" ? 0 : parseInt(value, 10);
            setRows(updatedRows);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setDocDicomHistory(file);
            setPdfError('');
        } else {
            setPdfError('Please select a valid PDF file.');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleAddEditLoan}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            noValidate
        >
            <h3>{titleLoanForm}</h3>
            <hr/>

            <FormControl fullWidth>
                <InputLabel id="type">Type of loan</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="Type"
                    value={type}
                    label="Type of loan"
                    onChange={(e) => setType(e.target.value)}
                    variant="standard"
                >
                    <MenuItem value="First home">First home</MenuItem>
                    <MenuItem value={"Second home"}>Second home</MenuItem>
                    <MenuItem value="Commercial properties">Commercial properties</MenuItem>
                    <MenuItem value={"Remodeling"}>Remodeling</MenuItem>
                </Select>
            </FormControl>
            <hr/>

            <TextField
                required
                id="duration"
                label="Duration of the loan in years"
                value={duration}
                onChange={e => {
                    if (/^\d{0,2}$/.test(e.target.value)) setDuration(e.target.value)
                }}
                helperText={"E.g. 20"}
            />
            <hr/>

            <TextField
                required
                id="amount"
                label="Amount"
                value={amount}
                onChange={e => {
                    if (/^\d*$/.test(e.target.value)) setAmount(e.target.value)
                }}
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

            <TextField
                required
                id="monthlyIncome"
                label="Monthly income"
                value={monthlyIncome}
                onChange={e => {
                    if (/^\d*$/.test(e.target.value)) setMonthlyIncome(e.target.value)
                }}
                helperText={"E.g. 500000"}
            />
            <hr/>

            <TextField
                required
                id="employmentLongevity"
                label="Employment longevity"
                value={employmentLongevity}
                onChange={e => {
                    if (/^\d{0,2}$/.test(e.target.value)) setEmploymentLongevity(e.target.value)
                }}
                helperText={"E.g. 5"}
            />
            <hr/>

            <TextField
                required
                id="totalDebt"
                label="Total debt"
                value={totalDebt}
                onChange={e => {
                    if (/^\d*$/.test(e.target.value)) setTotalDebt(e.target.value)
                }}
                helperText={"E.g. 100000"}
            />
            <hr/>

            <TextField
                required
                id="propertyValue"
                label="Property value"
                value={propertyValue}
                onChange={e => {
                    if (/^\d*$/.test(e.target.value)) setPropertyValue(e.target.value)
                }}
                helperText={"E.g. 100000000"}
            />
            <hr/>

            <TextField
                required
                id="accumulatedSalary"
                label="Accumulated salary"
                value={accumulatedSalary}
                onChange={e => {
                    if (/^\d*$/.test(e.target.value)) setAccumulatedSalary(e.target.value)
                }}
                helperText={"E.g. 150000000"}
            />
            <hr/>

            <TextField
                required
                id="savingsAccountLongevity"
                label="Savings account longevity"
                value={savingsAccountLongevity}
                onChange={e => {
                    if (/^\d{0,2}$/.test(e.target.value)) setSavingsAccountLongevity(e.target.value)
                }}
                helperText={"E.g. 10"}
            />

            <hr/>
            <Typography variant="body1">
                Fill out the following table with the corresponding salaries, withdrawals and deposits
                from your savings account during the last 12 months.
            </Typography>
            <Typography variant="body1">
                Make sure they are in order from oldest to most recent month.
            </Typography>


            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Month</TableCell>
                            <TableCell align="center">Salary</TableCell>
                            <TableCell align="center">Withdrawal</TableCell>
                            <TableCell align="center">Deposit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">{index + 1}</TableCell>

                                <TableCell align="center">
                                    <TextField
                                        value={row.salary}
                                        onChange={(e) => handleTableChange(index, 'salary', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <TextField
                                        value={row.withdrawal}
                                        onChange={(e) => handleTableChange(index, 'withdrawal', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <TextField
                                        value={row.deposit}
                                        onChange={(e) => handleTableChange(index, 'deposit', e.target.value)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


            <Typography variant="h5">Upload the following documents.</Typography>
            <hr/>
            <Typography variant="h6">DICOM history.</Typography>
            {(type === "First home") &&
                <div>
                    <input type="file" accept="application/pdf" onChange={handleFileChange}/>
                    {pdfError && <p style={{color: 'red'}}>{pdfError}</p>}
                </div>
            }

            <hr/>
            <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{marginLeft: "0.5rem"}}
                startIcon={<SaveIcon/>}
            >
            Save
            </Button>
            <hr/>
        </Box>
    );

};

export default AddEditLoan;