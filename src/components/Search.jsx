import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import Suggestion from "./Suggestion";
import { CityContext } from "../context/cityContext";

const Search = ({ setLocation }) => {
  const [suggestions, setSuggestions] = useState([]);
  const { dispatch } = useContext(CityContext);

  const input = useRef();

  const getSuggestions = async () => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${input.current.value}&key=dadf1f5cc8e24b58a17e25ff33463a1f&pretty=1"`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setSuggestions(data.results);
    } catch (error) {
      setError("Error obteniendo las sugerencias");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getSuggestions();
  };

  const handleSelect = (city) => {
    input.current.value = city.formatted;
    setSuggestions([]);
    dispatch({
      type: "CHANGE_CITY",
      payload: {
        latitude: city.geometry.lat,
        longitude: city.geometry.lng,
      },
    });
    setLocation({
      latitude: city.geometry.lat,
      longitude: city.geometry.lng,
      geoLocated: false,
    });
  };

  return (
    <div className="search_wrapper mt-4">
      <form className="w-full">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="New York, United States..."
            required
            ref={input}
            //uncomment to get cities onChange.
            onChange={(e) => handleSubmit(e)}
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={(e) => handleSubmit(e)}
          >
            Search
          </button>
        </div>
      </form>

      <ul
        className={`suggestions_container mt-1 rounded bg-gray-700 h-72 overflow-y-scroll	${
          suggestions.length > 0 ? "active" : ""
        }`}
      >
        {suggestions &&
          suggestions.map((sug, index) => (
            <Suggestion key={index} sug={sug} handleSelect={handleSelect} />
          ))}
      </ul>
    </div>
  );
};

export default Search;
