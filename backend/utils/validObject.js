const isValidObject = (obj) => {
  return obj && typeof obj === "object" && !Array.isArray(obj) && obj !== null;
};

module.exports = {
  isValidObject,
};