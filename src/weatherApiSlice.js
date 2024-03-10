import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeatherApi = createAsyncThunk(
  "weather/fetchWeatherApi",
  async () => {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=36.2021&lon=37.1343&appid=fa029df262735228a6a4600e4a48c45c"
      // {
      //   cancelToken: new axios.CancelToken((c) => {
      //     cancelAxios = c;
      //   }),
      // }
    );

    const responseTemp = Math.round(response.data.main.temp - 271.15);
    const responseTempMin = Math.round(response.data.main.temp_min - 271.15);
    const responseTempMax = Math.round(response.data.main.temp_max - 271.15);
    const responseDescription = response.data.weather[0].description;
    const responseIcon = response.data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${responseIcon}@2x.png`;

    // setWeatherData({
    //   temp: responseTemp,
    //   description: responseDescription,
    //   temp_min: responseTempMin,
    //   temp_max: responseTempMax,
    //   icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
    // });
    return {
      responseTemp,
      responseTempMin,
      responseTempMax,
      responseDescription,
      iconUrl,
    };
  }
);

export const weatherApiSlice = createSlice({
  name: "weatherApi",
  initialState: {
    result: "empty",
    weather: {},
    isLoading: false,
  },
  reducers: {
    changeResult: (state, action) => {
      state.result = "changed";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeatherApi.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchWeatherApi.fulfilled, (state, action) => {
        state.isLoading = false;

        state.weather = action.payload;
      })
      .addCase(fetchWeatherApi.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { changeResult } = weatherApiSlice.actions;
export default weatherApiSlice.reducer;
