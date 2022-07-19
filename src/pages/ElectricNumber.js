import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import apis from "../apis";
import app from "../configs/app";
import { getListDateBefore, getListTimeUTCBefore } from "../utils/date";
import LoadingInPage from "../components/LoadingInPage";

const ElectricNumber = () => {
    const [data, setData] = useState([]);
    const [index, setIndex] = useState(0);

    const fetchData = async (start, end) => {
        const { results } = await apis.query.execute({
            query: `SELECT TOP 1 $id as id, $ts as timestamp, e FROM ${app.DEVICE_TEMPLATE_ID} WHERE WITHIN_WINDOW('${start}T17:00:00Z/${end}T16:59:59Z') ORDER BY timestamp DESC`,
        });
        if (!results.length) {
            setData((pre) => [0, ...pre]);
        } else {
            setData((pre) => [results[0].e, ...pre]);
        }
    };

    const preProcess = (data) => {
        const length = data.length;
        const result = [];
        for (let index = 0; index < length - 1; index++) {
            const use = (data[index + 1] - data[index]).toFixed(2);
            result.push(use < 0 ? data[index + 1] : use);
        }
        return result;
    };

    useEffect(() => {
        const times = getListTimeUTCBefore(20);
        const interval = setInterval(() => {
            fetchData(times[index + 1], times[index]);
            if (index < 18) {
                setIndex(index + 1);
            } else {
                clearInterval(interval);
            }
        }, 1500);
        return () => clearInterval(interval);
    }, [index]);

    const optionsBarChart = {
        chart: {
            id: "basic-bar",
        },
        xaxis: {
            categories: getListDateBefore(18),
        },
    };
    const seriesBarChart = [
        {
            name: "series-1",
            data: preProcess(data),
        },
    ];

    if (data.length < 19) {
        return <LoadingInPage />;
    }

    if (data.length > 19) {
        const tmpData = data;
        tmpData.shift();
        setData(tmpData);
    }
    return (
        <Container maxWidth="md">
            <Box className="chart-box">
                <Chart
                    options={optionsBarChart}
                    series={seriesBarChart}
                    type="bar"
                />
            </Box>
        </Container>
    );
};

export default ElectricNumber;
