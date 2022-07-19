import moment from "moment";
import app from "../configs/app";
moment().format();

export const getListDateBefore = (n) => {
    // eslint-disable-next-line no-array-constructor
    const dates = new Array();
    for (let index = 1; index <= n; index++) {
        dates.unshift(moment().subtract(index, "days").format("DD-MM"));
    }
    return dates;
};

export const getListTimeBefore = (n) => {
    // eslint-disable-next-line no-array-constructor
    const times = new Array();
    for (let index = 0; index < n; index++) {
        times.unshift(
            moment()
                .subtract(index * app.TIME_INTERVAL, "seconds")
                .format("HH:mm:ss")
        );
    }
    return times;
};

export const getTimeNow = () => {
    return moment().format("HH:mm:ss");
};

export const getTimeUTC = () => {
    return moment().subtract(7, "hour").format().substring(19, 0);
};

export const convertTime = (time) => {
    return moment(time).subtract(7, "hour").format().substring(19, 0);
};

export const convertTimeToVN = (time) => {
    return moment(time).format("YYYY-MM-DD HH:mm:ss");
};

export const getListTimeUTCBefore = (n) => {
    // eslint-disable-next-line no-array-constructor
    const times = new Array();
    for (let index = 1; index <= n; index++) {
        times.push(moment().subtract(index, "day").format("YYYY-MM-DD"));
    }
    return times;
};
