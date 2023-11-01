const formatNumber = (number: number, separator: string, decimals: number) => {
  return number.toFixed(decimals).replace('.', separator);
}

const createToCurrency = (decimals: number) => {
  return (value: string, separator = ".") => {
    const representation = String(value).replace(',', '.');
    const parts = representation.split('.');
    const number = Number(representation);

    if(representation == '')
      return Number(0).toFixed(decimals);

    if(parts[1]?.length == decimals)
      return representation;

    if(parts.length == 1)
      return formatNumber(number * 0.01, separator, decimals);

    if(parts[1].length == decimals + 1)
      return formatNumber(number * 10, separator, decimals)

    return formatNumber(number * 0.1, separator, decimals)
  } 
}

export const toCurrency = createToCurrency(2);

export { createToCurrency }