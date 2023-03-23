import {
  addLocation,
  updateLocation,
  getWeatherData,
  deleteLocation,
  getAllCities,
} from "./modules/LocationOperations.mjs";
import http from "http";
import url from "url";

function getDataFromRoutes(req, res) {
  const parsedUrl = url.parse(req.url, true);

  const path = parsedUrl.pathname;

  if (path === "/get-weather") {
    let q = parsedUrl.query;

    let data = getWeatherData(q.city);

    res.end(JSON.stringify(data));
  }
  if (path === "/all-cities") {
    res.end(JSON.stringify(getAllCities()));
  }
}

const server = http.createServer(function (req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200, { "Content-Type": "application/json" });
    getDataFromRoutes(req, res);
  } catch (err) {
    console.log(err);
  }
});

server.listen(5000);
