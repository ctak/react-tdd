export const floor = (number, digits = 0) => {
  if (digits === 0) {
    return Math.floor(number);
  }
  return +(Math.floor(parseFloat(number + `e+${digits}`)) + `e-${digits}`);
}
