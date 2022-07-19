const price = (level) => {
    switch (level) {
        case 1:
            return 1678;
        case 2:
            return 1734;
        case 3:
            return 2014;
        case 4:
            return 2530;
        case 5:
            return 2834;
        default:
            return 2927;
    }
};

export default price;
