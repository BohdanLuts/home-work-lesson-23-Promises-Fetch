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
  const dayFirst = document.querySelector(".day1");
  const dayFirstEl = document.createElement("p");
  dayFirst.append(dayFirstEl);
  dayFirstEl.textContent = weather.daily.time[0];

  const daySecond = document.querySelector(".day2");
  const daySecondEl = document.createElement("p");
  daySecond.append(daySecondEl);
  daySecondEl.textContent = weather.daily.time[1];

  const dayThird = document.querySelector(".day3");
  const dayThirdEl = document.createElement("p");
  dayThird.append(dayThirdEl);
  dayThirdEl.textContent = weather.daily.time[2];

  // Input wind speed in table
  const windSpeedFirstDay = document.querySelector(".windSpeed1");
  const windSpeedFirstDayEl = document.createElement("p");
  windSpeedFirstDay.append(windSpeedFirstDayEl);
  windSpeedFirstDayEl.textContent = `${weather.daily.windspeed_10m_max[0]} км/год`;

  const windSpeedSecondDay = document.querySelector(".windSpeed2");
  const windSpeedSecondDayEl = document.createElement("p");
  windSpeedSecondDay.append(windSpeedSecondDayEl);
  windSpeedSecondDayEl.textContent = `${weather.daily.windspeed_10m_max[1]} км/год`;

  const windSpeedThirdDay = document.querySelector(".windSpeed3");
  const windSpeedThirdDayEl = document.createElement("p");
  windSpeedThirdDay.append(windSpeedThirdDayEl);
  windSpeedThirdDayEl.textContent = `${weather.daily.windspeed_10m_max[2]} км/год`;

  // Input wind gusts in table
  const windGustsFirstDay = document.querySelector(".windGusts1");
  const windGustsFirstDayEl = document.createElement("p");
  windGustsFirstDay.append(windGustsFirstDayEl);
  windGustsFirstDayEl.textContent = `${weather.daily.windgusts_10m_max[0]} км/год`;

  const windGustsSecondDay = document.querySelector(".windGusts2");
  const windGustsSecondDayEl = document.createElement("p");
  windGustsSecondDay.append(windGustsSecondDayEl);
  windGustsSecondDayEl.textContent = `${weather.daily.windgusts_10m_max[1]} км/год`;

  const windGustsThirdDay = document.querySelector(".windGusts3");
  const windGustsThirdDayEl = document.createElement("p");
  windGustsThirdDay.append(windGustsThirdDayEl);
  windGustsThirdDayEl.textContent = `${weather.daily.windgusts_10m_max[2]} км/год`;

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

  function colorBeauforScale(calcBeauforScale) {
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

    let color = beauforScaleColor[calcBeauforScale];
    return color;
  }

  const beauforScaleFirstDay = document.querySelector(".beauforScale1");
  const beauforScaleFirstDayEl = document.createElement("p");
  beauforScaleFirstDay.append(beauforScaleFirstDayEl);
  beauforScaleFirstDayEl.textContent = calcBeauforScale(
    weather.daily.windspeed_10m_max[0]
  );
  beauforScaleFirstDay.setAttribute(
    "style",
    `background: ${colorBeauforScale(
      calcBeauforScale(weather.daily.windspeed_10m_max[0])
    )}`
  );

  const beauforScaleSecondDay = document.querySelector(".beauforScale2");
  const beauforScaleSecondDayEl = document.createElement("p");
  beauforScaleSecondDay.append(beauforScaleSecondDayEl);
  beauforScaleSecondDayEl.textContent = calcBeauforScale(
    weather.daily.windspeed_10m_max[1]
  );
  beauforScaleSecondDay.setAttribute(
    "style",
    `background: ${colorBeauforScale(
      calcBeauforScale(weather.daily.windspeed_10m_max[1])
    )}`
  );

  const beauforScaleThirdDay = document.querySelector(".beauforScale3");
  const beauforScaleThirdDayEl = document.createElement("p");
  beauforScaleThirdDay.append(beauforScaleThirdDayEl);
  beauforScaleThirdDayEl.textContent = calcBeauforScale(
    weather.daily.windspeed_10m_max[2]
  );
  beauforScaleThirdDay.setAttribute(
    "style",
    `background: ${colorBeauforScale(
      calcBeauforScale(weather.daily.windspeed_10m_max[2])
    )}`
  );
}
