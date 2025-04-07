document.getElementById('fetchWeather').addEventListener('click', getWeather);

async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = '4b09804e25bf913195c36403e023b44b'; // Replace with a secure method in production
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    if (!city) {
        document.getElementById('weatherResult').innerHTML = "<p style='color: red;'>Please enter a city name.</p>";
        return;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');

        const data = await response.json();
        document.getElementById('weatherResult').innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } catch (error) {
        document.getElementById('weatherResult').innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}