function fetchHistoricalPrices() {
  // We get the selected date from the input field
  const selectedDate = document.getElementById("start").value;
  
  // Extract year, month, and day from the selected date
  const [selectedYear, selectedMonth, selectedDay] = selectedDate.split("-");
    const URL = `https://www.elprisenligenu.dk/api/v1/prices/${selectedYear}/${selectedMonth}-${selectedDay}_DK2.json`;

  // Fetching historical electricity prices
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      displayHistoricalPrices(data);
      console.log(data)
    })
    .catch((error) => {
      console.error("Error fetching historical prices:", error);
    });
}

// function displayTodaysPrices(data) {
//   const todaysElPrices = document.getElementById("todaysElPrices");
//   let priceHTML = "<h3>Latest prices for today:</h3>";

//   // Assuming that 'data' contains an array of prices for today
//   for (let hour = 0; hour < data.length; hour++) {
//     const price = Math.round(data[hour].DKK_per_kWh * 1000) / 1000;
//     const currentHour = hour < 10 ? `0${hour}` : `${hour}`;
//     priceHTML += `${currentHour}:00: ${price} kr per kWh<br>`;
//   }

//   todaysElPrices.innerHTML = priceHTML;
// }


function pickDate() {
  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth() + 1;
  let currentDay = new Date()
    .toLocaleDateString(undefined, {
      day: "2-digit",
    })
    .replace(".", "");
  let URL = `https://www.elprisenligenu.dk/api/v1/prices/${currentYear}/${currentMonth}-${currentDay}_DK2.json`;

  const dateControl = document.querySelector('input[type="date"]');
  dateControl.value = `${currentYear}-${currentMonth}-${currentDay}`;
  dateControl.max = `${currentYear}-${currentMonth}-${currentDay}`;
}


function displayHistoricalPrices(data) {
  // Using data to display historical prices
  const todaysElPrices = document.getElementById("todaysElPrices");

  let priceHTML = "<h3>Historical prices for the selected date:</h3>";

  for (let hour = 0; hour < data.length; hour++) {
    const price = Math.round(data[hour].DKK_per_kWh * 1000) / 1000;
    const currentHour = hour < 10 ? `0${hour}` : `${hour}`;
    priceHTML += `${currentHour}:00: ${price} kr per kWh<br>`;
  }

  todaysElPrices.innerHTML = priceHTML;
}

// Attach an event listener to the date input
const dateInput = document.getElementById("start");
dateInput.addEventListener("change", fetchHistoricalPrices);
// Initialize with today's date
pickDate();


