// Function to fetch historical prices
  function fetchHistoricalPrices() {
  // Get the selected date from the input field
  const dateInput = document.getElementById("start");
  if (!dateInput) {
    console.error("Date input element not found.");
    return;
  }
  
  const selectedDate = dateInput.value;

  // Extract year, month, and day from the selected date
  const [selectedYear, selectedMonth, selectedDay] = selectedDate.split("-");
  const URL = `https://www.elprisenligenu.dk/api/v1/prices/${selectedYear}/${selectedMonth}-${selectedDay}_DK2.json`;

  // Fetching historical electricity prices
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      displayHistoricalPrices(data);
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching historical prices:", error);
    });
}

// Function to update the date input and fetch today's data
function pickDate() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();
  const currentFormattedDate = `${currentYear}-${currentMonth < 10 ? "0" : ""}${currentMonth}-${currentDay < 10 ? "0" : ""}${currentDay}`;

  const dateInput = document.querySelector('input[type="date"]');
  if (dateInput) {
    dateInput.value = currentFormattedDate;
    dateInput.max = currentFormattedDate;
  } else {
    console.error("Date input element not found.");
  }

  // Automatically fetch and display today's data
  fetchHistoricalPrices(currentFormattedDate);
}

// Function to display historical prices
function displayHistoricalPrices(data) {
  // Using data to display historical prices
  const todaysElPrices = document.getElementById("todaysElPrices");
  if (!todaysElPrices) {
    console.error("todaysElPrices element not found.");
    return;
  }

  let priceHTML = "";

  for (let hour = 0; hour < data.length; hour++) {
    const price = Math.round(data[hour].DKK_per_kWh * 1000) / 1000;
    const currentHour = hour < 10 ? `0${hour}` : `${hour}`;
    priceHTML += `<h5>Kl. ${currentHour}.00 ${price} kr per kWh</h5>`;
  }

  todaysElPrices.innerHTML = priceHTML;
}


// Attaching an event listener to the date input
document.addEventListener("DOMContentLoaded", function () {
  pickDate();

  const dateInput = document.getElementById("start");
  const selectedDateDiv = document.getElementById("SelectedDate");

  if (dateInput) {
    dateInput.addEventListener("change", function() {
      const selectedDate = dateInput.value;
      const [year, month, day] = selectedDate.split("-");
      const danishDate = `${day}-${month}-${year}`;
      selectedDateDiv.textContent = `ELPRISERNE D. ${danishDate}`;
      fetchHistoricalPrices();
    });
  } else {
    console.error("Date input element not found.");
  }
});
