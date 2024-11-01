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
import clientService from "../services/client.service.js";

const LoanEvaluationList = () => {
    const [clientsNames, setClientsNames] = useState([]);
    const [loans, setLoans] = useState([]);

    const navigate = useNavigate();

    const init = () => {
        loanService.getAll().then(async (loansResponse) => {
            console.log("List of all loans.", loansResponse.data);
            setLoans(loansResponse.data);

            const clientNamesPromises = loansResponse.data.map(async (loan) => {
                const client = await clientService.get(loan.idClient);
                return client.data.name;
            });
            const clientNamesArray = await Promise.all(clientNamesPromises);

            setClientsNames(clientNamesArray);
        })
            .catch((error) => {
                console.log(
                    "There has been an error listing the loans or clients names.",
                    error
                );
            });
    };

    useEffect(() => {
        init();
    }, []);

    const handleEvaluate = (id) =>{
        navigate(`/loan/${id}`);
    }

    return (
        <TableContainer component={Paper}>
            <br />
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            ID
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Client
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            State
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loans.map((loan, index) => (
                        <TableRow
                            key={loan.id}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell align="left">{loan.id}</TableCell>
                            <TableCell align="left">{clientsNames[index]}</TableCell>
                            <TableCell align="left">{loan.state}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    onClick={() => handleEvaluate(loan.id)}
                                    style={{ marginLeft: "0.5rem" }}
                                    startIcon={<DeleteIcon />}
                                >
                                    Evaluate
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LoanEvaluationList;