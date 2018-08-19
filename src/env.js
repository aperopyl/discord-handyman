const PREFIX = "+polls";

const __DEV__ = process.env.NODE_ENV !== "production";
const { TOKEN } = process.env;

module.exports = {
    PREFIX,
    __DEV__,
    TOKEN
};
