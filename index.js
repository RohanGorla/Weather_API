const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

let baseUrl = "api.weatherapi.com/v1";
let apiKey = "bec7ab9c0f424020ad3233059240605";

async function getWeatherData(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

app.use("/styles", express.static("styles"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  let today = new Date();
  let date = today.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  let updateTime = `${
    today.getHours() > 12 ? today.getHours() - 12 : today.getHours()
  }:${today.getMinutes()}`;
  let data = await getWeatherData(
    `https://${baseUrl}/current.json?key=${apiKey}&q=India`
  );
  res.render("index", {
    location: data.location.name,
    icon: data.current.condition.icon,
    date: date,
    time: updateTime,
    temperature: data.current.temp_c,
    feelsLike: data.current.feelslike_c,
    humidity: data.current.humidity,
    condition: data.current.condition.text,
    countryName: data.location.country,
    coordinates: { latitude: data.location.lat, longitude: data.location.lon },
    windSpeed: data.current.wind_kph,
    windDirection: data.current.wind_dir,
    windDegree: data.current.wind_degree,
  });
});

app.listen(port, () => {
  console.log("app running at port: ", port);
});
