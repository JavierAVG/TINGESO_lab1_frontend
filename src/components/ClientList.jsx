import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clientService from "../services/client.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ClientList = () => {
    const [client, setClients] = useState([]);

    const navigate = useNavigate();

    const init = () => {
        clientService
            .getAll()
            .then((response) => {
                console.log("List of all clients.", response.data);
                setClients(response.data);
            })
            .catch((error) => {
                console.log(
                    "There has been an error listing the clients.",
                    error
                );
            });
    };

    useEffect(() => {
        init();
    }, []);

    const handleDelete = (id) => {
        console.log("Printing id", id);
        const confirmDelete = window.confirm(
            "Delete client?"
        );
        if (confirmDelete) {
            clientService
                .remove(id)
                .then((response) => {
                    console.log("Client deleted.", response.data);
                    init();
                })
                .catch((error) => {
                    console.log(
                        "There has been an error deleting the clients.",
                        error
                    );
                });
        }
    };

    return (
        <TableContainer component={Paper}>
            <br />
            <Link
                to="/client/add"
                style={{ textDecoration: "none", marginBottom: "1rem" }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PersonAddIcon />}
                >
                    Add Client
                </Button>
            </Link>
            <br /> <br />
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Rut
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Name
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {client.map((client) => (
                        <TableRow
                            key={client.id}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell align="left">{client.rut}</TableCell>
                            <TableCell align="left">{client.name}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="info"
                                    size="small"
                                    onClick={() => navigate(`/client/${client.id}`)}
                                    style={{ marginLeft: "0.5rem" }}
                                    startIcon={<EditIcon />}
                                >
                                    Enter
                                </Button>

                                <Button
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    onClick={() => handleDelete(client.id)}
                                    style={{ marginLeft: "0.5rem" }}
                                    startIcon={<DeleteIcon />}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ClientList;