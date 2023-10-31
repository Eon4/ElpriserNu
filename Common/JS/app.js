let myDate = new Date();
let currentYear = myDate.getFullYear();
let currentMonth = myDate.getMonth() + 1;
let currentDay = myDate.getDate();
const currentHours = myDate.getHours() + 1;

const indexContent = document.getElementById("indexContent");
// const currentTime = document.getElementById("time");
const currentTime = document.getElementById("currentTime");


fetchTodaysData();

function fetchTodaysData() {
  let URL = `https://www.elprisenligenu.dk/api/v1/prices/${currentYear}/${currentMonth}-${currentDay}_DK1.json`;

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      showToday(data);
    })
    .catch((err) => {
      console.log("Error", err.message);
    });
}

function showToday(data) {
    console.log("Data", data);
  
    // We get the current hour in the 24-hour format
    const currentHour = myDate.getHours();

      // Calculating the next hour
  const nextHour = (currentHour + 1) % 24;
  
    // Format the current time as HH:mm (in this case as 0)
    const formattedTime = `${currentHour < 10 ? "0" : ""}${currentHour}:00 - ${nextHour < 10 ? "0" : ""}${nextHour}:00`;
  
    // Displaying the current electricity price and time
    indexContent.innerHTML = `<p>${Math.round(data[currentHour].DKK_per_kWh * 1000) / 1000} kr</p>
    <p>pr. kwh</p>`;
    
    // Displaying the current time
    currentTime.textContent = `Current Time: ${formattedTime}`;
  }