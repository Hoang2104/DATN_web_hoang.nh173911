import { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import LockResetIcon from "@mui/icons-material/LockReset";
import UpdateIcon from "@mui/icons-material/Update";
import LegendToggleIcon from "@mui/icons-material/LegendToggle";
import BarChartIcon from "@mui/icons-material/BarChart";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import WarningIcon from "@mui/icons-material/Warning";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";

import { AuthContext } from "../contexts/AuthProvider";
import { Typography } from "@mui/material";
import apis from "../apis";
import app from "../configs/app";

const item = {
  py: 1,
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1,
  px: 3,
};

const Sidebar = (props) => {
  const { ...other } = props;

  const { user } = useContext(AuthContext);
  const isAuthentication = Object.keys(user).length === 0;
  let location = useLocation();
  const [openDropdownsChart, setOpenDropdownsChart] = useState(true);
  const [openDropdownsConfig, setOpenDropdownsConfig] = useState(true);
  const [power, setPower] = useState(0);
  const [powerWarning, setPowerWarning] = useState(1000);

  const fetchTelemetryValue = async () => {
    const { value: powerValue } = await apis.telemetry.getTelemetryValue("p");
    setPower(powerValue);
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
    <>
      <Drawer variant="permanent" {...other}>
        <List disablePadding>
          <ListItem
            sx={{
              ...item,
              ...itemCategory,
              fontSize: 21.5,
              color: "#ffffff",
            }}
          >
            HUST
          </ListItem>
          <Box sx={{ bgcolor: "#101F33" }}>
            <ListItem disablePadding>
              <Link to="/" className="nav-link">
                <ListItemButton sx={item} selected={location.pathname === "/"}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText>Tổng quan</ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
            {!isAuthentication && (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={item}
                    onClick={() => setOpenDropdownsChart(!openDropdownsChart)}
                  >
                    <ListItemIcon>
                      <LegendToggleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Biểu đồ" />
                    {openDropdownsChart ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={openDropdownsChart} timeout="auto" unmountOnExit>
                  <Divider />
                  <List component="div" disablePadding>
                    <Link to={`/energy-chart`} className="nav-link">
                      <ListItemButton
                        sx={{ ...item, pl: 4.5 }}
                        selected={location.pathname === `/energy-chart`}
                      >
                        <ListItemIcon>
                          <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Số điện" />
                      </ListItemButton>
                    </Link>
                    <Link to={`/current-chart`} className="nav-link">
                      <ListItemButton
                        sx={{ ...item, pl: 4.5 }}
                        selected={location.pathname === `/current-chart`}
                      >
                        <ListItemIcon>
                          <SsidChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dòng điện" />
                      </ListItemButton>
                    </Link>
                  </List>
                  <Divider />
                </Collapse>
                <ListItem disablePadding>
                  <Link to="/history" className="nav-link">
                    <ListItemButton
                      sx={item}
                      selected={location.pathname === "/history"}
                    >
                      <ListItemIcon>
                        <HistoryIcon />
                      </ListItemIcon>
                      <ListItemText>Lịch sử</ListItemText>
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={item}
                    onClick={() => setOpenDropdownsConfig(!openDropdownsConfig)}
                  >
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Cấu hình" />
                    {openDropdownsConfig ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={openDropdownsConfig} timeout="auto" unmountOnExit>
                  <Divider />
                  <List component="div" disablePadding>
                    <Link to={`/change-password`} className="nav-link">
                      <ListItemButton
                        sx={{ ...item, pl: 4.5 }}
                        selected={location.pathname === `/change-password`}
                      >
                        <ListItemIcon>
                          <LockResetIcon />
                        </ListItemIcon>
                        <ListItemText primary="Thay đổi mật khẩu" />
                      </ListItemButton>
                    </Link>
                    <Link to={`/reset-energy`} className="nav-link">
                      <ListItemButton
                        sx={{ ...item, pl: 4.5 }}
                        selected={location.pathname === `/reset-energy`}
                      >
                        <ListItemIcon>
                          <ElectricBoltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Reset năng lượng" />
                      </ListItemButton>
                    </Link>
                    <Link to={`/update-price`} className="nav-link">
                      <ListItemButton
                        sx={{ ...item, pl: 4.5 }}
                        selected={location.pathname === `/update-price`}
                      >
                        <ListItemIcon>
                          <UpdateIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cập nhật giá điện" />
                      </ListItemButton>
                    </Link>
                    <Link to={`/power-warning`} className="nav-link">
                      <ListItemButton
                        sx={{ ...item, pl: 4.5 }}
                        selected={location.pathname === `/power-warning`}
                      >
                        <ListItemIcon>
                          <WarningAmberIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cập nhật cảnh báo" />
                      </ListItemButton>
                    </Link>
                  </List>
                  <Divider />
                </Collapse>
              </>
            )}
          </Box>

          {power > powerWarning && (
            <Box
              sx={{
                textAlign: "center",
                marginTop: 10,
                color: "red",
              }}
            >
              <WarningIcon sx={{ fontSize: 50, marginBottom: 2 }} />
              <Typography component="p" marginBottom={1}>
                Công suất vượt mức quy định!
              </Typography>
              <Typography component="p">
                Vui lòng ngắt bớt nguồn điện!
              </Typography>
            </Box>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
