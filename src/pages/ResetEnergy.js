import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { toast } from "react-toastify";

import apis from "../apis";

const ResetEnergy = () => {
    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    const checkPassword = () => {
        if (password === "") {
            setErrorPassword("Vui lòng điền mật khẩu!");
            return false;
        }
        return true;
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
        setErrorPassword("");
    };

    const redirectConfirm = () => {
        if (checkPassword()) {
            setOpenDialog(true);
        }
    };

    const handleReset = async () => {
        setLoading(true);
        const payload = password * 10 + 2;
        const { response } = await apis.command.runCommand({
            request: payload,
        });
        setPassword("");
        setLoading(false);
        setOpenDialog(false);
        if (response === 200) {
            toast.success("Reset năng lượng thành công!");
        } else {
            toast.error(
                "Reset năng lượng thất bại! Vui lòng nhập lại mật khẩu!"
            );
        }
    };

    return (
        <>
            <Box className="login-box">
                <Typography
                    textAlign={"center"}
                    marginBottom={3}
                    variant="h5"
                    component="h1"
                    fontWeight={500}
                >
                    Reset năng lượng
                </Typography>
                <Typography variant="p" component="p" marginBottom={4}>
                    <i>
                        Hoang Ngo
                    </i>
                </Typography>
                <Box
                    sx={{
                        marginBottom: 5,
                    }}
                >
                    <TextField
                        error={errorPassword !== ""}
                        fullWidth
                        label="Mật khẩu"
                        type="password"
                        variant="standard"
                        value={password}
                        onChange={handleChangePassword}
                        onBlur={checkPassword}
                        helperText={errorPassword}
                    />
                </Box>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={redirectConfirm}
                    disabled={password.length > 0 ? false : true}
                >
                    Reset ngay
                </Button>
            </Box>
            <Dialog open={openDialog} maxWidth="xs" fullWidth={true}>
                <DialogTitle textAlign={"center"}>Xác nhận</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
                    <LoadingButton
                        onClick={handleReset}
                        loading={loading}
                        loadingIndicator="Đợi ..."
                    >
                        Tôi chắc chắn
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ResetEnergy;
