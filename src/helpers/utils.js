export const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${date.getDate()} ${months[date.getMonth()]?.slice(0, 3)} ${date.getFullYear()}`;
};

export function currency(val) {
  const newVal = parseFloat(val ?? 0).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const result = `Rp ${newVal}`
  return result
}