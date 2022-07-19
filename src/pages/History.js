import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import {
    LocalizationProvider,
    StaticDateRangePicker,
} from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useEffect, useState } from "react";
import apis from "../apis";
import app from "../configs/app";
import { convertTime, convertTimeToVN } from "../utils/date";
import { CSVLink } from "react-csv";

const History = () => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState([null, null]);
    const [dataCsv, setDataCsv] = useState([]);
    const [loading, setLoading] = useState(false);

    const header = [
        "STT",
        "Thời gian",
        "Điện áp(V)",
        "Dòng điện(A)",
        "Tần số(Hz)",
        "Hiệu số công suất",
        "Công suất(W)",
        "Năng lượng(kWh)",
    ];

    const fetchData = async () => {
        const res = await apis.query.execute({
            query: `SELECT $id as id, $ts as timestamp, e, v, c, p, f, pf FROM ${app.DEVICE_TEMPLATE_ID} WHERE WITHIN_WINDOW(PT10M) ORDER BY timestamp DESC`,
        });
        setData(res.results);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleExport = async () => {
        setLoading(true);
        const [start, end] = value;
        const { results: datas } = await apis.query.execute({
            query: `SELECT $id as id, $ts as timestamp, e, v, c, p, f, pf FROM ${
                app.DEVICE_TEMPLATE_ID
            } WHERE WITHIN_WINDOW('${convertTime(start)}Z/${convertTime(
                end
            )}Z') ORDER BY timestamp DESC`,
        });
        const dataExport = [];

        dataExport.push(header);
        datas.forEach((data, index) => {
            dataExport.push([
                index,
                data.timestamp,
                data.v,
                data.c,
                data.f,
                data.pf,
                data.p,
                data.e,
            ]);
        });
        setDataCsv(dataExport);
        const downloadMe = document.getElementById("download-me");
        setLoading(false);
        setOpen(false);
        setValue([null, null]);
        downloadMe.click();
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, app.TIME_INTERVAL_HISTORY * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box>
            <Box display="flex" justifyContent="end" marginBottom={2}>
                <Button
                    variant="outlined"
                    startIcon={<SimCardDownloadIcon />}
                    color="success"
                    onClick={handleClickOpen}
                >
                    Xuất Excels
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 750 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Thời gian</TableCell>
                            <TableCell align="center">Điện áp(V)</TableCell>
                            <TableCell align="center">Dòng điện(A)</TableCell>
                            <TableCell align="center">Tần số(Hz)</TableCell>
                            <TableCell align="center">H/s công suất</TableCell>
                            <TableCell align="center">Công suất(W)</TableCell>
                            <TableCell align="center">
                                Năng lượng(kWh)
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row.timestamp}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell align="left">
                                    {convertTimeToVN(row.timestamp)}
                                </TableCell>
                                <TableCell align="center">{row.v}</TableCell>
                                <TableCell align="center">{row.c}</TableCell>
                                <TableCell align="center">{row.f}</TableCell>
                                <TableCell align="center">{row.pf}</TableCell>
                                <TableCell align="center">{row.p}</TableCell>
                                <TableCell align="center">{row.e}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="md"
            >
                <DialogTitle id="alert-dialog-title">
                    Chọn khoảng thời gian xuất báo cáo
                </DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <StaticDateRangePicker
                            displayStaticWrapperAs="desktop"
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                    <TextField {...startProps} />
                                    <Box sx={{ mx: 2 }}> to </Box>
                                    <TextField {...endProps} />
                                </React.Fragment>
                            )}
                        />
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions sx={{ margin: 2 }}>
                    <Button onClick={handleClose}>Hủy</Button>
                    <LoadingButton
                        onClick={handleExport}
                        loading={loading}
                        variant="contained"
                    >
                        Xuất file
                    </LoadingButton>
                </DialogActions>
            </Dialog>
            <CSVLink
                id="download-me"
                style={{ display: "none" }}
                data={dataCsv}
                filename="data.csv"
            >
                Tải xuống
            </CSVLink>
        </Box>
    );
};

export default History;
