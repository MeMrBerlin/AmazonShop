export function formatCurrency(priceCents) {
  return ((Math.round(priceCents) / 100) * 84.0).toFixed(2);
}

export default formatCurrency;
