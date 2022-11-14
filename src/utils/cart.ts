import {CartEntry} from '../features/cart/models/CartEntry'
import {Cart} from '../features/cart/models/CartCache'

export const formatPrice = (priceValue: number, currency: string) => {
  const NUMBER_OF_DECIMALS = 2;
  const stringifiedPrice = priceValue.toString();
  let numberOfCurrencyUnits = "0";
  let decimalPart = "0";
  //this handles 0.123...;0.0000...123
  if (stringifiedPrice.length <= NUMBER_OF_DECIMALS) {
    decimalPart = "0".repeat(NUMBER_OF_DECIMALS - stringifiedPrice.length) + stringifiedPrice;
  }
  //this handles at least one currency unit
  if (stringifiedPrice.length > NUMBER_OF_DECIMALS) {
    numberOfCurrencyUnits = stringifiedPrice.substring(0, stringifiedPrice.length - NUMBER_OF_DECIMALS);
    decimalPart = stringifiedPrice.substring(stringifiedPrice.length - NUMBER_OF_DECIMALS);
  }
  return currency + numberOfCurrencyUnits + ',' + decimalPart;
}

//These would look better in a class, but RTK does not support serializing
//class methods
export const getFormattedPriceOfCartEntry = (cartEntry?: CartEntry) => {
  if(!cartEntry)
    return formatPrice(0,"$")
  return formatPrice(cartEntry.product.priceValue * cartEntry.quantity, "$");
}

export const getFormattedPriceOfCart = (cart?: Cart) => {
  if(!cart)
    return formatPrice(0,"$")
  return formatPrice(
    cart.cartEntries
      .map((cartEntry) => cartEntry.product.priceValue * cartEntry.quantity)
        .reduce((accumulator,currentValue) => accumulator + currentValue,0),
    "$");
}