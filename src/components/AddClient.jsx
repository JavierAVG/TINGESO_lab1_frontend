import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import clientService from "../services/client.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";

const AddClient = () => {
    const [rut, setRut] = useState("");
    const [rutError, setRutError] = useState(false);
    const [name, setName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const { id } = useParams();
    const [titleClientForm, setTitleClientForm] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setTitleClientForm("New Client");
    }, []);

    const formatDate = (date) => {
        return dayjs(date).format('YYYY-MM-DD');
    };

    const handleRutChange = e => {
        setRut(e.target.value);
        if (e.target.validity.valid) {
            setRutError(false);
        } else {
            setRutError(true);
        }
    };

    const handleSaveClient = e => {
        e.preventDefault();

        const client = { rut, name, birthdate, id };
        if (e.target.checkValidity()) {
            // make new client
            clientService
                .create(client)
                .then((response) => {
                    console.log("Client has been added.", response.data);
                    navigate("/client/list");
                })
                .catch((error) => {
                    console.log(
                        "There has been an error adding the client.",
                        error
                    );
                });
            alert("Client has been saved");
        } else {
            alert("Invalid, Please check the fields");
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSaveClient}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            noValidate
        >
            <h3> {titleClientForm} </h3>
            <hr/>
            <TextField
                required
                id="rut"
                label="Rut"
                value={rut}
                onChange={handleRutChange}
                error={rutError}
                helperText={rutError ? "Rut must follow the format: \"xx.xxx.xxx-x \"" : "Ej. 12.345.678-9"}
                slotProps={{
                    htmlInput: {
                        pattern: "[0-9]{2}\.[0-9]{3}\.[0-9]{3}\-[0-9k]",
                    },
                }}
            />

            <TextField
                required
                id="name"
                label="Name"
                value={name}
                variant="standard"
                onChange={(e) => setName(e.target.value)}
            />

            <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginLeft: "0.5rem" }}
                startIcon={<SaveIcon />}
            >
                Save
            </Button>
            <hr/>
            <Link to="/client/list">Back to List</Link>
        </Box>
    );

};

export default AddClient;
