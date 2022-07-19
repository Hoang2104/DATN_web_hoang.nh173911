import { Box, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import { toast } from "react-toastify";
import apis from "../apis";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [errorOldPassword, setErrorOldPassword] = useState("");
    const [errorNewPassword, setErrorNewPassword] = useState("");
    const [errorConfirmNewPassword, setErrorConfirmNewPassword] = useState("");

    const checkOldPassword = () => {
        if (oldPassword === "") {
            setErrorOldPassword("Vui lòng điền mật khẩu cũ");
            return false;
        }
        return true;
    };

    const checkNewPassword = () => {
        if (newPassword === "") {
            setErrorNewPassword("Vui lòng điền mật khẩu mới!");
            return false;
        }
        return true;
    };

    const checkConfirmNewPassword = () => {
        if (confirmNewPassword !== newPassword) {
            setErrorConfirmNewPassword("Xác nhận mật khẩu mới không khớp!");
            return false;
        }
        return true;
    };

    const saveChangePassword = async () => {
        if (
            checkOldPassword() &&
            checkNewPassword() &&
            checkConfirmNewPassword()
        ) {
            setLoading(true);
            const payload = newPassword * 10000 + oldPassword * 10 + 1;
            const { response } = await apis.command.runCommand({
                request: payload,
            });

            setNewPassword("");
            setOldPassword("");
            setConfirmNewPassword("");
            setLoading(false);
            if (response === 200) {
                toast.success("Đổi mật khẩu thành công!");
            } else {
                toast.error("Mật khẩu cũ không đúng!");
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
                fontWeight={500}
            >
                Thay đổi mật khẩu
            </Typography>
            <Box
                sx={{
                    marginBottom: 2,
                }}
            >
                <TextField
                    error={errorOldPassword !== ""}
                    fullWidth
                    label="Mật khẩu cũ"
                    type="password"
                    variant="standard"
                    value={oldPassword}
                    onChange={(event) => {
                        setOldPassword(event.target.value);
                        setErrorOldPassword("");
                    }}
                    onBlur={checkOldPassword}
                    helperText={errorOldPassword}
                />
            </Box>
            <Box
                sx={{
                    marginBottom: 2,
                }}
            >
                <TextField
                    error={errorNewPassword !== ""}
                    fullWidth
                    label="Mật khẩu mới"
                    type="password"
                    variant="standard"
                    value={newPassword}
                    onChange={(event) => {
                        setNewPassword(event.target.value);
                        setErrorNewPassword("");
                    }}
                    onBlur={checkNewPassword}
                    helperText={errorNewPassword}
                />
            </Box>
            <Box
                sx={{
                    marginBottom: 4,
                }}
            >
                <TextField
                    error={errorConfirmNewPassword !== ""}
                    fullWidth
                    label="Xác nhận mật khẩu mới"
                    type="password"
                    variant="standard"
                    value={confirmNewPassword}
                    onChange={(event) => {
                        setConfirmNewPassword(event.target.value);
                        setErrorConfirmNewPassword("");
                    }}
                    onBlur={checkConfirmNewPassword}
                    helperText={errorConfirmNewPassword}
                />
            </Box>

            <LoadingButton
                fullWidth
                onClick={saveChangePassword}
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                disabled={
                    oldPassword.length > 0 && newPassword.length > 0
                        ? false
                        : true
                }
            >
                Lưu thay đổi
            </LoadingButton>
        </Box>
    );
};

export default ChangePassword;
