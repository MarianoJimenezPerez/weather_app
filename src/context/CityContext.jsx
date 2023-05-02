import { createContext, useReducer } from "react";
export const CityContext = createContext();

export const CityContextProvider = ({ children }) => {
  const INITIAL_STATE = {
    city_name: "",
    country: "",
    latitude: "40.71427",
    longitude: "-74.00597",
    geoLocated: false,
  };

  const cityReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_CITY":
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(cityReducer, INITIAL_STATE);

  return (
    <CityContext.Provider value={{ city: state, dispatch }}>
      {children}
    </CityContext.Provider>
  );
};
