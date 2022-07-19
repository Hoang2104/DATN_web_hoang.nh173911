import {
    Container,
    Grid,
    InputAdornment,
    OutlinedInput,
    Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import { toast } from "react-toastify";
import price from "../configs/price";
import apis from "../apis";

const UpdatePrice = () => {
    const [level1, setlevel1] = useState(price(1));
    const [level2, setlevel2] = useState(price(2));
    const [level3, setlevel3] = useState(price(3));
    const [level4, setlevel4] = useState(price(4));
    const [level5, setlevel5] = useState(price(5));
    const [level6, setlevel6] = useState(price(6));
    const [loading, setLoading] = useState(false);

    const handleChange = (event, key) => {
        const value = parseInt(event.target.value) || 0;
        switch (key) {
            case "level-1":
                setlevel1(value);
                break;
            case "level-2":
                setlevel2(value);
                break;
            case "level-3":
                setlevel3(value);
                break;
            case "level-4":
                setlevel4(value);
                break;
            case "level-5":
                setlevel5(value);
                break;
            case "level-6":
                setlevel6(value);
                break;
            default:
                break;
        }
    };

    const handleClick = async () => {
        setLoading(true);
        let payload = level1 * 10 + 4;
        await apis.command.runCommand({
            request: payload,
        });
        payload = level2 * 10 + 5;
        await apis.command.runCommand({
            request: payload,
        });
        payload = level3 * 10 + 6;
        await apis.command.runCommand({
            request: payload,
        });
        payload = level4 * 10 + 7;
        await apis.command.runCommand({
            request: payload,
        });
        payload = level5 * 10 + 8;
        await apis.command.runCommand({
            request: payload,
        });
        payload = level6 * 10 + 9;
        await apis.command.runCommand({
            request: payload,
        });
        setLoading(false);
        toast.success("Cập nhật giá điện thành công!");
    };

    return (
        <Container
            maxWidth="xs"
            sx={{
                backgroundColor: "#ffffff",
                padding: "1.5rem 1.5rem 2.5rem 1.5rem",
                borderRadius: "0.25rem",
                boxShadow: "0 0.25rem 0.75rem rgb(18 38 63 / 8%)",
            }}
        >
            <Typography
                textAlign={"center"}
                marginBottom={3}
                variant="h5"
                component="h1"
                fontWeight={500}
            >
                Cập nhật giá điện
            </Typography>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={5} sx={{ alignSelf: "center" }}>
                    <Typography variant="h6" component="h3">
                        Bậc 1
                    </Typography>
                    <Typography variant="p" component="p">
                        (0 - 50 kWh)
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <OutlinedInput
                        fullWidth
                        id="outlined-adornment-weight"
                        value={level1}
                        onChange={(event) => handleChange(event, "level-1")}
                        endAdornment={
                            <InputAdornment position="end">VNĐ</InputAdornment>
                        }
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            "aria-label": "weight",
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={5} sx={{ alignSelf: "center" }}>
                    <Typography variant="h6" component="h3">
                        Bậc 2
                    </Typography>
                    <Typography variant="p" component="p">
                        (51 - 100 kWh)
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <OutlinedInput
                        fullWidth
                        id="outlined-adornment-weight"
                        value={level2}
                        onChange={(event) => handleChange(event, "level-2")}
                        endAdornment={
                            <InputAdornment position="end">VNĐ</InputAdornment>
                        }
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            "aria-label": "weight",
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={5} sx={{ alignSelf: "center" }}>
                    <Typography variant="h6" component="h3">
                        Bậc 3
                    </Typography>
                    <Typography variant="p" component="p">
                        (101 - 200 kWh)
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <OutlinedInput
                        fullWidth
                        id="outlined-adornment-weight"
                        value={level3}
                        onChange={(event) => handleChange(event, "level-3")}
                        endAdornment={
                            <InputAdornment position="end">VNĐ</InputAdornment>
                        }
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            "aria-label": "weight",
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={5} sx={{ alignSelf: "center" }}>
                    <Typography variant="h6" component="h3">
                        Bậc 4
                    </Typography>
                    <Typography variant="p" component="p">
                        (201 - 300 kWh)
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <OutlinedInput
                        fullWidth
                        id="outlined-adornment-weight"
                        value={level4}
                        onChange={(event) => handleChange(event, "level-4")}
                        endAdornment={
                            <InputAdornment position="end">VNĐ</InputAdornment>
                        }
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            "aria-label": "weight",
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={5} sx={{ alignSelf: "center" }}>
                    <Typography variant="h6" component="h3">
                        Bậc 5
                    </Typography>
                    <Typography variant="p" component="p">
                        (301 - 400 kWh)
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <OutlinedInput
                        fullWidth
                        id="outlined-adornment-weight"
                        value={level5}
                        onChange={(event) => handleChange(event, "level-5")}
                        endAdornment={
                            <InputAdornment position="end">VNĐ</InputAdornment>
                        }
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            "aria-label": "weight",
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={4}>
                <Grid item xs={5} sx={{ alignSelf: "center" }}>
                    <Typography variant="h6" component="h3">
                        Bậc 6
                    </Typography>
                    <Typography variant="p" component="p">
                        (400 kWh trở lên)
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <OutlinedInput
                        fullWidth
                        id="outlined-adornment-weight"
                        value={level6}
                        onChange={(event) => handleChange(event, "level-6")}
                        endAdornment={
                            <InputAdornment position="end">VNĐ</InputAdornment>
                        }
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            "aria-label": "weight",
                        }}
                    />
                </Grid>
            </Grid>
            <LoadingButton
                fullWidth
                onClick={handleClick}
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
            >
                Lưu thay đổi
            </LoadingButton>
        </Container>
    );
};

export default UpdatePrice;
