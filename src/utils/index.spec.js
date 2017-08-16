/* eslint-env jest */
import { numberWithSeparator, formatUSD } from './'

it('separate thousand numbers', () => {
  expect(numberWithSeparator(1000)).toEqual('1 000')
  expect(numberWithSeparator(1000000)).toEqual('1 000 000')
  expect(numberWithSeparator(1000000, ',')).toEqual('1,000,000')
})

it('format USD currency', () => {
  expect(formatUSD('0.99 USD')).toEqual('$0.99')
  expect(formatUSD('3.99 USD')).toEqual('$3.99')
})
