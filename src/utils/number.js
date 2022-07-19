export const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

export const getIncreaseListInt = (start, n) => {
    // eslint-disable-next-line no-array-constructor
    const list = new Array();
    let preInt = start;
    list.push(start);
    for (let index = 0; index < n; index++) {
        preInt += randomInt(1, 10);
        list.push(preInt);
    }
    return list;
};

export const getInitZezoList = (n) => {
    // eslint-disable-next-line no-array-constructor
    const list = new Array();
    for (let index = 0; index < n; index++) {
        list.push(0);
    }
    return list;
};
