// utility function definition

import configs from "../../configs/generals.json";

const pricefromUnitsAndCurrency = ({ currency, unitsAmount }) => {
  let unitsCost = null;

  if (currency?.toUpperCase() === "USD") {
    unitsCost = configs?.unitsToUsdRate * unitsAmount;
  } else if (currency?.toUpperCase() === "CDF") {
    unitsCost = configs?.unitsToUsdRate * unitsAmount * configs?.exchangeRate;
  }

  return unitsCost?.toFixed(1);
};

export default pricefromUnitsAndCurrency;
