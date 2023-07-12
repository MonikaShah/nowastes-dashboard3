// function to format any Date object into 'YYYY-MM-DD' format
function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // month is 0-indexed
  const day = date.getDate();
  return `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
}

export default formatDate;