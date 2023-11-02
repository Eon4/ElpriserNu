
function fetchLowestPrice() {
    const URL = `https://www.elprisenligenu.dk/api/v1/prices/${selectedYear}_DK2.json`;

    // Fetch the lowest price data for the day
    // You can use the same fetch approach as in your other script
  }
  
  function fetchHighestPrice() {
    // Fetch the highest price data for the day
    // You can use the same fetch approach as in your other script
  }
  
  function displayLowestPrice(data) {
    // Display the lowest price
    const lowestPriceElement = document.getElementById("indexLowestPrice");
    // Modify the innerHTML or textContent of this element to display the lowest price
  }
  
  function displayHighestPrice(data) {
    // Display the highest price
    const highestPriceElement = document.getElementById("indexHighestPrice");
    // Modify the innerHTML or textContent of this element to display the highest price
  }
  
  // Attach an event listener or execute these functions when the page loads
  window.addEventListener("load", () => {
    fetchLowestPrice();
    fetchHighestPrice();
  });
  
  // You can also display today's prices in a similar way
  function displayTodaysPrices(data) {
    // Display the today's prices
    const todaysElPricesElement = document.getElementById("todaysElPrices");
    // Modify the innerHTML or textContent of this element to display the prices
  }
  