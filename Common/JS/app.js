
//SW HERE
if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js')
	.then(reg => console.log('service worker registered', reg))
	.catch(err => console.error('service worker not registered', err)) 
}

// Getting current and next hour

let currentHours = new Date().getHours();
let currentHours2 = new Date().getHours() + 1;

// Fetching the data for the current date

function fetched() {
  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth() + 1;
  let currentDay = new Date()
    .toLocaleDateString(undefined, {
      day: "2-digit",
    })
    .replace(".", "");
  let URL = `https://www.elprisenligenu.dk/api/v1/prices/${currentYear}/${currentMonth}-${currentDay}_DK2.json`;

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      showToday(data);
    })
    .catch((err) => {
      console.log("Error", err.message);
    });
}

// Displaying the fetched data
function showToday(data) {
  const indexContent = document.getElementById("indexContent");
  const currentTime = document.getElementById("currentTime");
  console.log("Data", data);
  indexContent.innerHTML = `<p>${
    Math.round(data[currentHours].DKK_per_kWh * 1000) / 1000
  } kr </br> <span>pr. kwh</span></p>
  `;
  currentTime.innerHTML = currentHours + ".00" + " - " + currentHours2 + ".00";
}

fetched();

