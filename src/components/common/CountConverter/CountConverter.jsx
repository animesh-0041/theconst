
export const CountConverter = (num) => {
    const number = parseInt(num, 10);
    if (isNaN(number)) return num;

    switch (true) {
        case (number >= 1000000):
            return (number / 1000000).toFixed(1) + 'M';
        case (number >= 1000):
            return (number / 1000).toFixed(1) + 'K';
        default:
            return number.toString();
    }
}