const colors = [
    "\x1b[33m", // Yellow
    "\x1b[32m", // Green
    "\x1b[34m", // Blue
    "\x1b[35m", // Magenta
    "\x1b[31m", // Red
    "\x1b[36m"  // Cyan
];

const reset = "\x1b[0m";

const getRequestColor = (requestNumber) => {
    return colors[(requestNumber - 1) % colors.length];
};

const colorRequestId = (requestId, requestNumber) => {
    const color = getRequestColor(requestNumber);

    return `${color}[${requestId}]${reset}`;
};

module.exports = {
    colorRequestId
};