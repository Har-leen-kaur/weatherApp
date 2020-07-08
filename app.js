const express = require("express"),
  https = require("https"),
  bodyParser = require("body-parser"),
  app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  console.log(req.body.cityName);
  console.log("response is received.");

  const appID = "67a32cd4fbaecdb8069b48bd0eea1444";
  var query = req.body.cityName;

  const url =
    "https://api.openweathermap.org/data/2.5/weather?appid=" +
    appID +
    "&q=" +
    query +
    "&units=metric";

  https.get(url, function (response) {
    //tells the status code if response has been received or not
    console.log(response.statusCode);

    // getting the response on the data fetched
    response.on("data", function (data) {
      //give name to the data and parse it to JSON
      const weatherData = JSON.parse(data);
      console.log(weatherData);

      //How to get hold of particulars from the weatherData.
      const temp = weatherData.main.temp;
      const city = weatherData.name;
      console.log("Temperature in " + city + " is " + temp);

      //Use the JSON viewer awesome to get the path to specific elements
      //in the weatherData
      const weatherDescription = weatherData.weather[0].description;
      console.log(weatherDescription);

      //getting the icon from the weatherData
      const icon = weatherData.weather[0].icon;
      const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      //sending the data back to the html webpage

      res.write("<h1> The temperature in " + city + " is " + temp + "</h1>");
      res.write("<p>It will be " + weatherDescription + "</p>");
      res.write("  <img src = " + iconURL + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
