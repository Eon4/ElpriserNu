
import { fetchHistoricalPrices, pickDate } from './history_script.js';

document.addEventListener("DOMContentLoaded", function () {
  console.log("Event listener executed");
  pickDate();

  const dateInput = document.getElementById("start");
  const selectedDateDiv = document.getElementById("SelectedDate");

  if (dateInput) {
    dateInput.addEventListener("change", async function () {
      const selectedDate = dateInput.value;
      const [year, month, day] = selectedDate.split("-");
      const danishDate = `${day}-${month}-${year}`;
      selectedDateDiv.textContent = `ELPRISERNE D. ${danishDate}`;

      // Fetch historical data
      const data = await fetchHistoricalPrices(selectedDate);

      // Display the historical prices
      displayHistoricalPrices(data);
    });
  }
});

const displayHistoricalPrices = (data) => {
  const lowestPriceDiv = document.getElementById("lowestPrice");
  const highestPriceDiv = document.getElementById("highestPrice");

  console.log("Todays Data", data);

  let minPrice = Number.MAX_VALUE;
  let maxPrice = -1;

  console.log(minPrice, maxPrice);

  data.forEach((hour) => {
    const price = hour.DKK_per_kWh;

    if (price < minPrice) {
      minPrice = price;
    }

    if (price > maxPrice) {
      maxPrice = price;
    }
  });

  // Display the lowest and highest prices in HTML elements
  lowestPriceDiv.innerHTML = `<h4 id="h4">${minPrice.toFixed(3)}<p>KR</p></h4><h5>PR. KWH</h5>`;
  highestPriceDiv.innerHTML = `<h4 id="h4">${maxPrice.toFixed(3)}<p>KR</p></h4><h5>PR. KWH</h5>`;
  console.log(highestPriceDiv.innerHTML);
};