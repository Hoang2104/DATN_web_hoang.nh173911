import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";

import { AuthContext } from "../contexts/AuthProvider";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Navbar = (props) => {
    const { onDrawerToggle } = props;
    const { user, setUser } = React.useContext(AuthContext);
    const isAuthentication = Object.keys(user).length === 0;
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        setUser({});
        localStorage.removeItem("app-auth");
        toast.success("Đăng xuất thành công!");
        setAnchorElUser(null);
    };

    return (
        <React.Fragment>
            <AppBar
                component="div"
                color="primary"
                position="static"
                elevation={0}
                sx={{ zIndex: 0 }}
            >
                <Toolbar>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid
                            sx={{ display: { sm: "none", xs: "block" } }}
                            item
                        >
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={onDrawerToggle}
                                edge="start"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs></Grid>
                        <Grid item>
                            {!isAuthentication ? (
                                <Box sx={{ flexGrow: 0 }}>
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                    <Menu
                                        sx={{ mt: "45px" }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <MenuItem disabled>
                                            <Typography textAlign="center">
                                                {user.email}
                                            </Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleLogout}>
                                            <Typography textAlign="center">
                                                Logout
                                            </Typography>
                                        </MenuItem>
                                    </Menu>
                                </Box>
                            ) : (
                                <Link to="/login" className="link">
                                    <Button color="inherit">Đăng nhập</Button>
                                </Link>
                            )}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
};

export default Navbar;

Navbar.propTypes = {
    onDrawerToggle: PropTypes.func.isRequired,
};
