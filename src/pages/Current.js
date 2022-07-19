import { Box, Container } from "@mui/material";

import LineChart from "../components/LineChart";

const ElectricNumber = () => {
    return (
        <Container maxWidth="md">
            <Box className="chart-box">
                <LineChart />
            </Box>
        </Container>
    );
};

export default ElectricNumber;
