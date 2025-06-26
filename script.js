const apiKey = "3f5e8c24ddd84873bc9135705252606";

async function getWeather() {
    const city = document.getElementById("city-input").value.trim();
    const weatherBox = document.getElementById("weather-result");

    if (city === "") {
        weatherBox.innerHTML = `<p class="hint">Please enter a city name.</p>`;
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        const { name, country } = data.location;
        const { temp_c, condition } = data.current;

        weatherBox.innerHTML = `
      <h2>${name}, ${country}</h2>
      <h3>${temp_c}°C</h3>
      <p>${condition.text}</p>
      <img src="${condition.icon}" alt="${condition.text}" />
    `;
    } catch (error) {
        weatherBox.innerHTML = `<p class="hint">Error: ${error.message}</p>`;
    }
}