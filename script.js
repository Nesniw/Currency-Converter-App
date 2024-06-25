const fromOption = document.getElementById("from-currency");
const toOption = document.getElementById("to-currency");

let api = 'https://v6.exchangerate-api.com/v6/20a932bcf0d7ed2d871c9153/latest/USD';

// Create dropdown currency left from array
currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    fromOption.add(option);
});

// Create dropdown currency left from array
currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    toOption.add(option);
});

// Set default values for dropdown
fromOption.value = "IDR";
toOption.value = "USD";


let convertCurrency = () => {
  const amount = document.querySelector("#amount").value;
  const fromCurrency = fromOption.value;
  const toCurrency = toOption.value;
  const errorMessage = document.getElementById("error-message");

  // Condition if amount input has value / is filled
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
  } 
  // Condition if amount input has no value / basically empty / value 0
  else {
    errorMessage.style.display = "block";
  }
};

const convertButton = document.getElementById('convert-button');
convertButton.addEventListener("click", convertCurrency);