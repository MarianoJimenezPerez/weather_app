import React, { useState, useEffect } from "react";
import { useContext } from "react";
import Search from "../components/Search";
import { CityContext } from "../context/cityContext";

const Home = () => {
  const baseURL = "http://api.openweathermap.org/data/2.5/weather";
  const { city, dispatch } = useContext(CityContext);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    geoLocated: false,
  });

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            geoLocated: true,
          });
          dispatch({
            type: "CHANGE_CITY",
            payload: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              geoLocated: location.geoLocated,
            },
          });
        },
        (error) => {
          setError("An error ocurred in getting location process");
        }
      );
    } else {
      setError("The browser does not support geo services");
    }
  };

  useEffect(() => {
    const getWeather = async () => {
      const units = "metric";

      //url contempla .env en vite
      const url = `${baseURL}?lat=${city.latitude}&lon=${
        city.longitude
      }&units=${units}&appid=${import.meta.env.VITE_API_ID}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        dispatch({
          type: "CHANGE_CITY",
          payload: {
            city_name: data.name,
            country: data.sys.country,
            latitude: data.coord.lat,
            longitude: data.coord.lon,
            temperature: data.main.temp,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max,
            icon: data.weather[0].icon,
            description: data.weather[0].description,
            geoLocated: location.geoLocated,
          },
        });
      } catch (error) {
        setError("Error obteniendo el clima");
      }
    };

    getWeather();
  }, [location]);

  return (
    <div className="flex flex-col">
      <button
        onClick={getLocation}
        className="bg-blue-700 hover:bg-blue-800 "
        style={location.geoLocated ? { backgroundColor: "green" } : {}}
      >
        {location.geoLocated ? "Location obtained ✓" : "Get my location"}
      </button>

      {city ? (
        <div className="mt-4 border border-indigo-500 rounded-lg">
          <div className="flex gap-10 justify-around p-10 items-center ">
            <div className="flex flex-col justify-between ">
              <p className="text-3xl">{city.temperature}°C</p>
              <img src={`https://openweathermap.org/img/w/${city.icon}.png`} alt={city.description} />
              <p>
                {city.temp_max}°C / {city.temp_min}°C
              </p>
              <p>{city.description}</p>
            </div>

            <h2 className="text-3xl">
              {city.city_name} - {city.country}
            </h2>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}

      {error && <div>{error}</div>}
      <Search setLocation={setLocation} />
    </div>
  );
};

export default Home;
