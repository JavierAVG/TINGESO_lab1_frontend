import * as React from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import clientService from "../services/client.service.js";

const drawerWidth = 240;

const ClientPage = () => {
    const { id } = useParams();
    const [rut, setRut] = useState("");
    const [name, setName] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            clientService
                .get(id)
                .then((client) => {
                    setRut(client.data.rut);
                    setName(client.data.name);
                })
                .catch((error) => {
                    console.log("There has been an error.", error);
                });
        } else {
            alert("Client could not be found or does not exist.");
        }
    }, []);

    const handleClientOption = (option) => {
        if (option === 'Simulate credit') {
            navigate('/client/simulate');
        } else if (option === 'Apply for credit') {
            navigate(`/client/${id}/addloan`);
        } else if (option === 'See credit') {
            navigate(`/client/${id}/loanlist`);
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Client {name}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                <List>
                    {['Simulate credit', 'Apply for credit', 'See credit'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton
                                onClick={() => handleClientOption(text)}
                            >
                                <ListItemIcon>
                                    {<InboxIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
                <Typography variant="h5" gutterBottom> NAME: {name} </Typography>
                <Typography variant="h5" gutterBottom> RUT: {rut} </Typography>
            </Box>
        </Box>
    );
}

export default ClientPage;