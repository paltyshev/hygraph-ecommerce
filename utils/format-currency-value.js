export const formatCurrencyValue = ({ currency, value }) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: currency.code
  }).format(value / 100)
