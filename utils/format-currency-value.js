export const formatCurrencyValue = ({ currency, value }) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: 0
  }).format(value)
