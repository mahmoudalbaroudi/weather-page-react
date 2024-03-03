import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";

import { useTranslation } from "react-i18next";

import Container from "@mui/material/Container";

import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";

import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "moment/min/locales";
moment.locale("ar");

const theme = createTheme({
  typography: {
    fontFamily: ["IBM Plex Sans Arabic"],
  },
});
let cancelAxios = null;
function App() {
  const { t, i18n } = useTranslation();
  const [local, setLocal] = useState("ar");
  const [timeAndDate, setTimeAndDate] = useState("");
  const [weatherData, setWeatherData] = useState({
    temp: null,
    description: "",
    temp_min: null,
    temp_max: null,
    icon: "",
  });

  function changeLanguageHandle() {
    if (local === "en") {
      setLocal("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setLocal("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    setTimeAndDate(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }
  useEffect(() => {
    i18n.changeLanguage("ar");
  }, []);
  useEffect(() => {
    setTimeAndDate(moment().format("MMMM Do YYYY, h:mm:ss a"));
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=36.2021&lon=37.1343&appid=fa029df262735228a6a4600e4a48c45c",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then(function (response) {
        const responseTemp = Math.round(response.data.main.temp - 271.15);
        const responseTempMin = Math.round(
          response.data.main.temp_min - 271.15
        );
        const responseTempMax = Math.round(
          response.data.main.temp_max - 271.15
        );
        const responseDescription = response.data.weather[0].description;
        const responseIcon = response.data.weather[0].icon;

        setWeatherData({
          temp: responseTemp,
          description: responseDescription,
          temp_min: responseTempMin,
          temp_max: responseTempMax,
          icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
        });
      })
      .catch(function (error) {
        // handle error
      });
    return () => {
      cancelAxios();
    };
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* content container */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              flexDirection: "column",
            }}
          >
            {/* card */}
            <div
              style={{
                width: "100%",
                background: "#0d47a1",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: " 5px 10px 18px #0d47a1",
              }}
            >
              {/* content */}
              <div>
                {/* city & time */}
                <div
                  dir={local === "ar" ? "rtl" : "ltr"}
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                  }}
                >
                  <Typography
                    variant="h2"
                    component="div"
                    style={{ marginRight: "20px", fontWeight: "500" }}
                  >
                    {t("Aleppo")}{" "}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    style={{ marginRight: "20px" }}
                  >
                    {timeAndDate}
                  </Typography>
                </div>
                <hr />
                {/* container of degree & cloud */}
                <div
                  dir={local === "ar" ? "rtl" : "ltr"}
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {/* degree & descr */}
                  <div>
                    {/* temp */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {weatherData.temp}
                      </Typography>

                      <img src={weatherData.icon} alt="weather icon" />
                    </div>
                    <div>
                      <Typography variant="h6">
                        {t(weatherData.description)}
                      </Typography>
                    </div>
                    {/* min & max */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5>
                        {t("min")}:{weatherData.temp_min}
                      </h5>
                      <h5 style={{ margin: "0px 10px" }}>|</h5>
                      <h5>
                        {t("max")}:{weatherData.temp_max}
                      </h5>
                    </div>
                  </div>
                  <CloudIcon style={{ fontSize: "200px", color: "white" }} />
                </div>
              </div>
            </div>
            <div
              dir={local === "ar" ? "rtl" : "ltr"}
              style={{
                display: "flex",
                justifyContent: "end",
                width: "100%",
                marginTop: "20px",
              }}
            >
              <Button
                style={{ color: "white" }}
                variant="text"
                onClick={changeLanguageHandle}
              >
                {local === "ar" ? "انكليزي" : "Arabic"}
              </Button>
            </div>
          </div>
          {/* card */}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
