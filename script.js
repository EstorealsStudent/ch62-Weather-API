async function fetchWeatherData(latitude, longitude) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const response = await fetch(url);
    const data = await response.json();
    return data.current_weather;
}

async function handleFetchClick() {
    console.log("Boton fetch clickeado");

    const btn = document.getElementById("fetch-btn");
    const latitude = document.getElementById("latitude-input").value;
    const longitude = document.getElementById("longitude-input").value;
    const currentTemperature = document.getElementById("temp-display");
    const currntWindSpeed = document.getElementById("wind-display");

    // DESHABILITAR 
    btn.textContent = "Cargando...";
    btn.disabled = true;
    btn.style.opacity = "0.6";
    btn.style.cursor = "not-allowed";

    try {
        const currentWeather = await fetchWeatherData(latitude, longitude);

        currentTemperature.textContent = currentWeather.temperature;
        currntWindSpeed.textContent = currentWeather.windspeed;

    } catch (error) {
        console.error("Hubo un error:", error);
        btn.textContent = "Error al cargar";
    }

    //  SE EJECUTA SIN IMPORTAR SI HUBO ERROR
    finally {
        setTimeout(() => {
            btn.textContent = "Get Weather";
            btn.disabled = false;
            btn.style.opacity = "1";
            btn.style.cursor = "pointer";
        }, 1000);
    }
}
