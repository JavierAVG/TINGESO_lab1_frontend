import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import loanService from "../services/loan.service.js";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import TableCell from "@mui/material/TableCell";

const LoanList = () => {
    const { idClient } = useParams();
    const [loans, setLoan] = useState([]);

    const navigate = useNavigate();

    const init = () => {
        loanService
            .getAllByClientId(idClient)
            .then((response) => {
                console.log("List of all loans.", response.data);
                setLoan(response.data);
            })
            .catch((error) => {
                console.log(
                    "There has been an error listing the loans.",
                    error
                );
            });
    };

    useEffect(() => {
        init();
    }, []);

    const handleCancel = (id) => {
        console.log("Printing id", id);
        const confirmCancel = window.confirm(
            "Cancel loan?"
        );
        if (confirmCancel) {
            // cancel the loan
            loanService
                .updateState(id,"Canceled")
                .then((response) => {
                    console.log("Loan canceled.", response.data);
                    init();
                })
                .catch((error) => {
                    console.log(
                        "There has been an error canceling the loan.",
                        error
                    );
                });
        }
    };

    const handleCosts = (id) =>{
        navigate(`/client/loancosts/${id}`);
    }

    const handleEdit = (id,state) =>{
        if (state === "Documentation pending"){
            navigate(`/client/${idClient}/editloan/${id}`);
        }
        else {
            alert("Not allowed once send unless requested by an Executive");
        }
    }

    const handleApprove = (id,state) =>{
        if (state === "Pre-approved"){
            const confirmApprove = window.confirm(
                "Approve loan?"
            );
            if (confirmApprove) {
                // cancel the loan
                loanService
                    .updateState(id,"Approved")
                    .then((response) => {
                        init();
                    })
                    .catch((error) => {
                        console.log(
                            "There has been an error approving the loan.",
                            error
                        );
                    });
            }
        }
        else if (state === "Approved"){
            alert("Loan is already Approved");
        }
        else {
            alert("Loan must be Pre-approved by executives first");
        }
    }

    return (
        <TableContainer component={Paper}>
            <br />
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(`/client/${idClient}/addloan`)}
                startIcon={<PersonAddIcon />}
            >
                Add Loan
            </Button>
            <br /> <br />
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Type
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Monthly Fee
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            State
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loans.map((loan) => (
                        <TableRow
                            key={loan.id}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell align="left">{loan.type}</TableCell>
                            <TableCell align="left">{loan.monthlyFee}</TableCell>
                            <TableCell align="left">{loan.state}</TableCell>
                            <TableCell>

                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => handleCosts(loan.id)}
                                    style={{ marginLeft: "0.5rem" }}
                                >
                                    Costs
                                </Button>

                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => handleCancel(loan.id)}
                                    style={{ marginLeft: "0.5rem" }}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => handleEdit(loan.id, loan.state)}
                                    style={{ marginLeft: "0.5rem" }}
                                >
                                    Edit
                                </Button>

                                <Button
                                    variant="contained"
                                    color="success"
                                    size="small"
                                    onClick={() => handleApprove(loan.id, loan.state)}
                                    style={{ marginLeft: "0.5rem" }}
                                >
                                    Approve
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LoanList;