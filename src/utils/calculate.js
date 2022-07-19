import price from "../configs/price";

export const electricityBill = (energy) => {
    if (energy <= 50) {
        return energy * price(1);
    }

    if (energy <= 100) {
        return 50 * price(1) + (energy - 50) * price(2);
    }

    if (energy <= 200) {
        return 50 * price(1) + 50 * price(2) + (energy - 100) * price(3);
    }

    if (energy <= 300) {
        return (
            50 * price(1) +
            50 * price(2) +
            100 * price(3) +
            (energy - 200) * price(4)
        );
    }

    if (energy <= 400) {
        return (
            50 * price(1) +
            50 * price(2) +
            100 * price(3) +
            100 * price(4) +
            (energy - 300) * price(5)
        );
    }

    return (
        50 * price(1) +
        50 * price(2) +
        100 * price(3) +
        100 * price(4) +
        100 * price(5) +
        (energy - 400) * price(6)
    );
};
