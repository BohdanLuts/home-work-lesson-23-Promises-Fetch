"use strict";

fetch(
  "https://api.open-meteo.com/v1/forecast?latitude=47.85&longitude=35.12&daily=windspeed_10m_max,windgusts_10m_max&current_weather=true&timezone=Europe%2FMoscow&start_date=2022-12-18&end_date=2022-12-20"
)
  .then((response) => response.json())
  .then((data) => renderWeather(data))
  .catch((err) => console.log(err));

function renderWeather(weather) {
  // Check API
  console.log(weather.daily.time);
  console.log(weather.daily.windspeed_10m_max);
  console.log(weather.daily.windgusts_10m_max);

  // Input time in table
  const weatherDay = document.querySelectorAll(".day");
  weatherDay.forEach((wd, day) => {
    const weatherDayEl = document.createElement("p");
    wd.append(weatherDayEl);
    weatherDayEl.textContent = weather.daily.time[day];
  });

  // Input wind speed in table
  const windSpeed = document.querySelectorAll(".windSpeed");
  windSpeed.forEach((ws, speed) => {
    const windSpeedEl = document.createElement("p");
    ws.append(windSpeedEl);
    windSpeedEl.textContent = `${weather.daily.windspeed_10m_max[speed]} км/год`;
  });

  // Input wind gusts in table
  const windGusts = document.querySelectorAll(".windGusts");
  windGusts.forEach((wg, speed) => {
    const windGustsEl = document.createElement("p");
    wg.append(windGustsEl);
    windGustsEl.textContent = `${weather.daily.windgusts_10m_max[speed]} км/год`;
  });

  // Input Beaufor Scale in table
  function calcBeauforScale(windspeed) {
    let calc = null;
    if (windspeed < 2) {
      calc = 0;
    } else if (windspeed > 1 && windspeed < 6) {
      calc = 1;
    } else if (windspeed > 5 && windspeed < 12) {
      calc = 2;
    } else if (windspeed > 11 && windspeed < 20) {
      calc = 3;
    } else if (windspeed > 19 && windspeed < 29) {
      calc = 4;
    } else if (windspeed > 28 && windspeed < 39) {
      calc = 5;
    } else if (windspeed > 38 && windspeed < 50) {
      calc = 6;
    } else if (windspeed > 49 && windspeed < 62) {
      calc = 7;
    } else if (windspeed > 61 && windspeed < 75) {
      calc = 8;
    } else if (windspeed > 74 && windspeed < 89) {
      calc = 9;
    } else if (windspeed > 88 && windspeed < 103) {
      calc = 10;
    } else if (windspeed > 102 && windspeed < 118) {
      calc = 11;
    } else if (windspeed > 117) {
      calc = 12;
    }
    return calc;
  }

  const beauforScaleColor = {
    0: "#fff",
    1: "#aef1f9",
    2: "#96f7dc",
    3: "#96f7b4",
    4: "#6ff46f",
    5: "#73ed12",
    6: "#a4ed12",
    7: "#daed12",
    8: "#edc212",
    9: "#ed8f12",
    10: "#ed6312",
    11: "#ed2912",
    12: "#d5102d",
  };

  const beauforScaleDays = document.querySelectorAll(".beauforScale");

  beauforScaleDays.forEach((bsd, i) => {
    const beauforScaleDayEl = document.createElement("p");
    bsd.append(beauforScaleDayEl);
    beauforScaleDayEl.textContent = calcBeauforScale(
      weather.daily.windspeed_10m_max[i]
    );
    bsd.setAttribute(
      "style",
      `background: ${
        beauforScaleColor[calcBeauforScale(weather.daily.windspeed_10m_max[i])]
      }`
    );
  });
}
