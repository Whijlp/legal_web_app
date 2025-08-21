
function cleanRef(value) {
  if (value && typeof value === "object" && "_id" in value) {
    return value._id;
  }
  if (typeof value === "string") {
    return value.trim();
  }
  return null;
}

module.exports = cleanRef;
