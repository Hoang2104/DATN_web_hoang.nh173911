import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import apis from "../apis";
import app from "../configs/app";
import { getListTimeBefore, getTimeNow } from "../utils/date";
import { getInitZezoList } from "../utils/number";
const speed = app.TIME_INTERVAL_LINE_CHART * 1000 * 0.5;
const LineChart = () => {
    const [categories, setCategories] = useState(getListTimeBefore(30));
    const [datas, setDatas] = useState(getInitZezoList(30));
    const [data, setData] = useState(0);

    const optionsLineChart = {
        chart: {
            id: "basic-line",
            animations: {
                enabled: true,
                easing: "linear",
                dynamicAnimation: {
                    speed: speed,
                },
            },
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
        stroke: {
            curve: "smooth",
        },
        xaxis: {
            categories: categories,
        },
        yaxis: {
            max: 10,
        },
        markers: {
            size: 0,
        },
    };

    const seriesLineChart = [
        {
            name: "Current",
            data: datas,
        },
    ];

    const fetchData = async () => {
        const { value } = await apis.telemetry.getTelemetryValue("c");
        setData(value);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchData();
            const newCategory = getTimeNow();
            const newCategories = [...categories, newCategory];
            newCategories.shift();
            setCategories(newCategories);
            const newDatas = [...datas, data];
            newDatas.shift();
            setDatas(newDatas);
        }, app.TIME_INTERVAL_LINE_CHART * 1000);

        return () => clearInterval(interval);
    }, [categories, data, datas]);

    return (
        <Chart
            options={optionsLineChart}
            series={seriesLineChart}
            type="line"
        />
    );
};

export default LineChart;
