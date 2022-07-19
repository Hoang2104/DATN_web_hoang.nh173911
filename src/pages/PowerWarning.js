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
import { useState } from "react";
import { toast } from "react-toastify";

import apis from "../apis";

const PowerWarning = () => {
    const [powerLevel, setPowerLevel] = useState("");
    const [errorPowerLevel, setErrorPowerLevel] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    const checkPowerLevel = () => {
        if (powerLevel === "") {
            setErrorPowerLevel("Vui lòng điền mật khẩu!");
            return false;
        }
        return true;
    };

    const handleChangePowerLevel = (event) => {
        setPowerLevel(event.target.value);
        setErrorPowerLevel("");
    };

    const redirectConfirm = () => {
        if (checkPowerLevel()) {
            setOpenDialog(true);
        }
    };

    const handleReset = async () => {
        const payload = powerLevel * 10 + 3;
        const { response } = await apis.command.runCommand({
            request: payload,
        });
        setPowerLevel("");
        setOpenDialog(false);
        if (response === 200) {
            toast.success("Cập nhật mức cảnh báo thành công!");
        } else {
            toast.error("Cập nhật mức cảnh báo thất bại!");
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
                    Cài đặt cảnh báo
                </Typography>
                <Typography variant="p" component="p" marginBottom={4}>
                    <i> 
                        HI
                    </i>
                </Typography>
                <Box
                    sx={{
                        marginBottom: 5,
                    }}
                >
                    <TextField
                        error={errorPowerLevel !== ""}
                        fullWidth
                        label="Mức cảnh báo"
                        type="powerLevel"
                        variant="standard"
                        value={powerLevel}
                        onChange={handleChangePowerLevel}
                        onBlur={checkPowerLevel}
                        helperText={errorPowerLevel}
                    />
                </Box>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={redirectConfirm}
                    disabled={powerLevel.length > 0 ? false : true}
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
                    <Button onClick={handleReset}>Tôi chắc chắn</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default PowerWarning;
