function encodeData(data) {
  Object.values(data)
  return Object.keys(data)
    .map(function (key) {
        return [key, data[key]].map(encodeURIComponent).join("=");
    })
    .join("&");
}
export default encodeData;