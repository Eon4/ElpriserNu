function fetchData() {
    const URL = 'https://www.elprisenligenu.dk/api/v1/prices/2023/11-01_DK2.json';
    console.log('Fetch data called');
    
    // Get the current date in the format YYYY-MM-DD
    const d = new Date();
    const today = d.toISOString().split('T')[0];
    console.log('Today:', today);

    fetch(URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data); // Log the data to the console

            const todayData = data.filter((entry) => entry && entry.time && entry.time.startsWith(today));
            console.log('Filtered Data:', todayData);

            if (todayData.length > 0) {
                console.log('Today\'s data:', todayData);

                // Find the highest and lowest prices for today
                const highestPrice = Math.max(...todayData.map((entry) => entry.DKK_per_kWh));
                const lowestPrice = Math.min(...todayData.map((entry) => entry.DKK_per_kWh));
                console.log('Highest price:', highestPrice);
                console.log('Lowest price:', lowestPrice);
            
                // Display the highest and lowest prices in your HTML
                displayLowestPrice(lowestPrice);
                displayHighestPrice(highestPrice);
                displayTodaysPrice(todayData[0].DKK_per_kWh); // Display today's price
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

// Function to display today's electricity prices
function displayTodaysPrice(price) {
    const todaysPriceDiv = document.getElementById('todaysElPrices');
    todaysPriceDiv.textContent = `Today's Price: ${price} kr per kWh`;
    console.log('Displaying today\'s price:', price);
}

// Function to display the lowest price
function displayLowestPrice(price) {
    const lowestPriceDiv = document.getElementById('lowestPrice');
    lowestPriceDiv.textContent = `Lowest Price: ${price} kr per kWh`;
}

// Function to display the highest price
function displayHighestPrice(price) {
    const highestPriceDiv = document.getElementById('highestPrice');
    highestPriceDiv.textContent = `Highest Price: ${price} kr per kWh`;
}

document.addEventListener('DOMContentLoaded', function () {
    // Call the fetchData function to initiate the request
    fetchData();
});
