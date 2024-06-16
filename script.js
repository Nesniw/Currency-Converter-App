const fromOption = document.getElementById("from-currency");
const toOption = document.getElementById("to-currency");

let api = 'https://v6.exchangerate-api.com/v6/20a932bcf0d7ed2d871c9153/latest/USD';

//Create dropdown from the currencies array
currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    fromOption.add(option);
});

//Create dropdown from the currencies array
currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    toOption.add(option);
});

//Setting default values
fromOption.value = "IDR";
toOption.value = "USD";

let convertCurrency = () => {
  //Create References
  const amount = document.querySelector("#amount").value;
  const fromCurrency = fromOption.value;
  const toCurrency = toOption.value;
  const errorMessage = document.getElementById("error-message");

  //If amount input field is not empty
  if (amount.length != 0) {
    errorMessage.style.display = "none";
    fetch(api)
      .then((resp) => resp.json())
      .then((data) => {
        let fromExchangeRate = data.conversion_rates[fromCurrency];
        let toExchangeRate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
        
        if (convertedAmount < 1) {
          result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(5)} ${toCurrency}`;
        }
        else {
          result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        }
      });
      //10 IDR = 0.000608 USD
  } else {
    errorMessage.style.display = "block";
  }
};

document.querySelector("#convert-button").addEventListener("click", convertCurrency);