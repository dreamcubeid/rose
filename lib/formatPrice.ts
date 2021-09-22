export const formatPrice = (price: number, currency: string) => {
  return Intl.NumberFormat('en-ID', {
    style: 'currency',
    currency,
  }).format(price);
};
