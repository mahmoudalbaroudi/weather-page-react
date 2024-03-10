import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";

import { useTranslation } from "react-i18next";

import Container from "@mui/material/Container";

import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";

import { useSelector, useDispatch } from "react-redux";
import { changeResult } from "./weatherApiSlice";
import { fetchWeatherApi } from "./weatherApiSlice";
import CircularProgress from "@mui/material/CircularProgress";

import { useEffect, useState } from "react";
// import axios from "axios";
import moment from "moment";
import "moment/min/locales";
moment.locale("ar");

const theme = createTheme({
  typography: {
    fontFamily: ["IBM Plex Sans Arabic"],
  },
});
// let cancelAxios = null;
function App() {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => {
    return state.weather.isLoading;
  });
  const weatherData = useSelector((state) => {
    return state.weather.weather;
  });
  const { t, i18n } = useTranslation();
  const [local, setLocal] = useState("ar");
  const [timeAndDate, setTimeAndDate] = useState("");
  // const [weatherData, setWeatherData] = useState({
  //   temp: null,
  //   description: "",
  //   temp_min: null,
  //   temp_max: null,
  //   icon: "",
  // });

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
    dispatch(changeResult());
    i18n.changeLanguage("ar");
  }, []);
  useEffect(() => {
    setTimeAndDate(moment().format("MMMM Do YYYY, h:mm:ss a"));
    dispatch(fetchWeatherApi());
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
                      {isLoading ? (
                        <CircularProgress style={{ color: "white" }} />
                      ) : (
                        ""
                      )}

                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {weatherData.responseTemp}
                      </Typography>

                      <img src={weatherData.iconUrl} alt="weather icon" />
                    </div>
                    <div>
                      <Typography variant="h6">
                        {t(weatherData.responseDescription)}
                      </Typography>
                    </div>
                    {/* min & max */}
                    <div
                      style={{
                        display: "flex",
                        // justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5>
                        {t("min")}:{weatherData.responseTempMin}
                      </h5>
                      <h5 style={{ margin: "0px 10px " }}>|</h5>
                      <h5>
                        {t("max")}:{weatherData.responseTempMax}
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
