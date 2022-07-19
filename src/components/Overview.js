import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import apis from "../apis";
import app from "../configs/app";

const Overview = () => {
  const [voltage, setVoltage] = useState(0);
  const [current, setCurrent] = useState(0);
  const [power, setPower] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [frequency, setFrequency] = useState(0);
  const [powerFactor, setPowerFactor] = useState(0);
  const [powerWarning, setPowerWarning] = useState(1000);
  const [money, setMoney] = useState(0);

  const fetchTelemetryValue = async () => {
    const { value: voltageValue } = await apis.telemetry.getTelemetryValue("v");
    setVoltage(voltageValue);

    const { value: currentValue } = await apis.telemetry.getTelemetryValue("c");
    setCurrent(currentValue);

    const { value: powerValue } = await apis.telemetry.getTelemetryValue("p");
    setPower(powerValue);

    const { value: energyValue } = await apis.telemetry.getTelemetryValue("e");
    setEnergy(energyValue);

    const { value: moneyValue } = await apis.telemetry.getTelemetryValue(
      "giatien"
    );
    setMoney(moneyValue);

    const { value: frequencyValue } = await apis.telemetry.getTelemetryValue(
      "f"
    );
    setFrequency(frequencyValue);

    const { value: powerFactorValue } = await apis.telemetry.getTelemetryValue(
      "pf"
    );
    setPowerFactor(powerFactorValue);

    const { value: powerWarningValue } = await apis.telemetry.getTelemetryValue(
      "pw"
    );
    setPowerWarning(powerWarningValue);
  };

  useEffect(() => {
    fetchTelemetryValue();
    const interval = setInterval(() => {
      fetchTelemetryValue();
    }, app.TIME_INTERVAL_OVERVIEW * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={6} sm={4}>
          <Box className="item-box">
            <Typography className="item-title">Điện áp</Typography>
            <Box>
              <Typography component="span" className="item-value">
                {voltage}
              </Typography>
              <Typography component="span" className="item-unit">
                V
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box className="item-box">
            <Typography className="item-title">Dòng điện</Typography>
            <Box>
              <Typography component="span" className="item-value">
                {current}
              </Typography>
              <Typography component="span" className="item-unit">
                A
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box className="item-box">
            <Typography className="item-title">Tần số</Typography>
            <Box>
              <Typography component="span" className="item-value">
                {frequency}
              </Typography>
              <Typography component="span" className="item-unit">
                Hz
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box className="item-box">
            <Typography className="item-title">Hệ số công suất</Typography>
            <Box>
              <Typography component="span" className="item-value">
                {powerFactor}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box
            className="item-box"
            sx={power > powerWarning ? { backgroundColor: "#ffcdd2" } : {}}
          >
            <Typography className="item-title">Công suất</Typography>
            <Box>
              <Typography component="span" className="item-value">
                {power}
              </Typography>
              <Typography component="span" className="item-unit">
                W
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box className="item-box">
            <Typography className="item-title">Năng lượng</Typography>
            <Box>
              <Typography component="span" className="item-value">
                {energy}
              </Typography>
              <Typography component="span" className="item-unit">
                kWh
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}></Grid>
        <Grid item xs={6} sm={4}>
          <Box className="item-box">
            <Typography className="item-title">Tiền điện</Typography>
            <Box>
              <Typography component="span" className="item-value">
                {Math.ceil(money)}
              </Typography>
              <Typography component="span" className="item-unit">
                VNĐ
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}></Grid>
      </Grid>
    </Box>
  );
};

export default Overview;
