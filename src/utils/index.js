/**
 * Returns a number as a string with thousand separators.
 *
 * @param {number|string} number
 * @param {string} separator
 * @return a number as a string with thousand separators
 */
export const numberWithSeparator = (number, separator = ' ') => {
  if (typeof number !== 'number' && typeof number !== 'string') {
    return number
  }

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}

/**
 * Returns a function specified with a currency symbol to format a price string.
 * This function uses currying to specify other behaviors.
 *
 * Example: formatCurrency('$')('0.99 USD') → '$0.99'
 *
 * @param {string} currencySymbol the currency symbol
 * @return {function} the function to specify the price amount
 */
const formatCurrency = currencySymbol => priceAsString => {
  try {
    return `${currencySymbol}${parseFloat(priceAsString)}`
  } catch (err) {
    console.warn(`Cannot format "${priceAsString}" to a currency value.`)
    return priceAsString
  }
}

/**
 * Returns a USD price formatted with a dollar symbol.
 * @return a USD price formatted with a dollar symbol
 */
export const formatUSD = formatCurrency('$')
