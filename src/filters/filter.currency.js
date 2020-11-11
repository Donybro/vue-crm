export default function filterCurrency(value, currency) {
  const options = {
    style: "currency",
    currency
  };
  return new Intl.NumberFormat("ru-RU", options).format(value);
}
