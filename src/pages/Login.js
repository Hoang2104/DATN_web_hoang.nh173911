import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { AuthContext } from "../contexts/AuthProvider";
import app from "../configs/app";

const Login = () => {
    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorPass, setErrorPass] = useState("");

    const history = useHistory();
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        if (Object.keys(user).length !== 0) {
            history.goBack();
        }
    }, [history, user]);

    const checkEmail = () => {
        if (email === "") {
            setErrorEmail("Vui lòng điền email!");
            return false;
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            setErrorEmail("Email không đúng định dạng!");
            return false;
        }
        setErrorEmail("");
        return true;
    };

    const checkPassword = () => {
        if (password === "") {
            setErrorPass("Vui lòng điền mật khẩu!");
            return false;
        }
        setErrorPass("");
        return true;
    };

    const handleLogin = async () => {
        if (checkEmail() && checkPassword()) {
            if (email === app.EMAIL_LOGIN && password === app.PASSWORD_LOGIN) {
                setUser({ email });
                localStorage.setItem("app-auth", JSON.stringify({ email }));
                history.push("/");
                toast.success("Đăng nhập thành công!");
            } else {
                toast.error("Email hoặc mật khẩu không đúng!");
            }
        }
    };

    return (
        <Box className="login-box">
            <Typography
                textAlign={"center"}
                marginBottom={3}
                variant="h5"
                component="h1"
            >
                Đăng nhập
            </Typography>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-end",
                    marginBottom: 2,
                }}
            >
                <MailOutlineIcon
                    sx={{ color: "action.active", mr: 1.5, my: 0.5 }}
                />
                <TextField
                    error={errorEmail !== ""}
                    fullWidth
                    label="Email"
                    variant="standard"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                        setErrorEmail("");
                    }}
                    onBlur={checkEmail}
                    helperText={errorEmail}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    marginBottom: 4,
                }}
            >
                <LockOutlinedIcon
                    sx={{ color: "action.active", mr: 1.5, my: 0.5 }}
                />
                <TextField
                    error={errorPass !== ""}
                    fullWidth
                    label="Mật khẩu"
                    type="password"
                    variant="standard"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                        setErrorPass("");
                    }}
                    onBlur={checkPassword}
                    helperText={errorPass}
                />
            </Box>

            <Button variant="outlined" fullWidth onClick={handleLogin}>
                Đăng nhập
            </Button>
        </Box>
    );
};

export default Login;
