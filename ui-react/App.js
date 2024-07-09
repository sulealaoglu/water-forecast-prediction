import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function App() {
  const [formattedDate, setFormattedDate] = useState("");
  const [precipType, setPrecipType] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [apparentTemperature, setApparentTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [windBearing, setWindBearing] = useState(0);
  const [visibility, setVisibility] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [response, SetResponse] = useState({});

  const data = {
    FormattedDate: formattedDate,
    PrecipType: precipType,
    Temperature: temperature,
    ApparentTemperature: apparentTemperature,
    Humidity: humidity,
    WindSpeed: windSpeed,
    WindBearing: windBearing,
    Visibility: visibility,
    Pressure: pressure,
  };

  const newPredict = () => {
    console.log(JSON.stringify(data));
    fetch("http://127.0.0.1:4000", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        SetResponse(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleFormattedDate = (value) => {
    setFormattedDate(value);
  };

  const handlePrecipType = (value) => {
    setPrecipType(value);
  };

  const handleTemperature = (value) => {
    setTemperature(value);
  };

  const handleApparentTemperature = (value) => {
    setApparentTemperature(value);
  };

  const handleHumidity = (value) => {
    setHumidity(value);
  };

  const handleWindSpeed = (value) => {
    setWindSpeed(value);
  };

  const handleWindBearing = (value) => {
    setWindBearing(value);
  };

  const handleVisibility = (value) => {
    setVisibility(value);
  };

  const handlePressure = (value) => {
    setPressure(value);
  };

  return (
    <div className="App">
      <div class="container-fluid ps-md-0">
        <div class="row g-0">
          <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
          <div class="col-md-4 col-lg-6">
            <div class="login d-flex align-items-center py-5">
              <div class="container">
                <div class="row">
                  <div class="col-md-2 col-lg-8 mx-auto">
                    <form>
                      <div className="form-floating mb-1">
                        <input
                          className="form-control"
                          id="formattedDate"
                          onChange={(e) => handleFormattedDate(e.target.value)}
                        />
                        <label htmlFor="formattedDate">Formatted Date</label>
                        <span className="text-danger"></span>
                      </div>

                      <div className="form-floating mb-1">
                        <input
                          className="form-control"
                          id="precipType"
                          onChange={(e) => handlePrecipType(e.target.value)}
                        />
                        <label htmlFor="precipType">Precip Type</label>
                        <span className="text-danger"></span>
                      </div>

                      <div className="form-floating mb-1">
                        <input
                          className="form-control"
                          id="temperature"
                          onChange={(e) =>
                            handleTemperature(parseFloat(e.target.value))
                          }
                        />
                        <label htmlFor="temperature">Temperature (C)</label>
                        <span className="text-danger"></span>
                      </div>
                      <div className="form-floating mb-1">
                        <input
                          className="form-control"
                          id="apparentTemperature"
                          onChange={(e) =>
                            handleApparentTemperature(
                              parseFloat(e.target.value)
                            )
                          }
                        />
                        <label htmlFor="apparentTemperature">
                          Apparent Temperature (C)
                        </label>
                        <span className="text-danger"></span>
                      </div>

                      <div className="form-floating mb-1">
                        <input
                          className="form-control"
                          id="humidity"
                          onChange={(e) =>
                            handleHumidity(parseFloat(e.target.value))
                          }
                        />
                        <label htmlFor="humidity">Humidity</label>
                        <span className="text-danger"></span>
                      </div>

                      <div className="form-floating mb-1">
                        <input
                          className="form-control"
                          id="windSpeed"
                          onChange={(e) =>
                            handleWindSpeed(parseFloat(e.target.value))
                          }
                        />
                        <label htmlFor="windSpeed">Wind Speed (km/h)</label>
                        <span className="text-danger"></span>
                      </div>

                      <div className="form-floating mb-1">
                        <input
                          className="form-control"
                          id="windBearing"
                          onChange={(e) =>
                            handleWindBearing(parseFloat(e.target.value))
                          }
                        />
                        <label htmlFor="windBearing">
                          Wind Bearing (degrees)
                        </label>
                        <span className="text-danger"></span>
                      </div>

                      <div className="form-floating mb-1">
                        <input
                          className="form-control"
                          id="visibility"
                          onChange={(e) =>
                            handleVisibility(parseFloat(e.target.value))
                          }
                        />
                        <label htmlFor="visibility">Visibility (km)</label>
                        <span className="text-danger"></span>
                      </div>

                      <div className="form-floating mb-1">
                        <input
                          className="form-control"
                          id="pressure"
                          onChange={(e) =>
                            handlePressure(parseFloat(e.target.value))
                          }
                        />
                        <label htmlFor="pressure">Pressure (millibars)</label>
                        <span className="text-danger"></span>
                      </div>

                      {/* Diğer input alanları da aynı şekilde güncellenebilir */}

                      <div className="d-grid">
                        <button
                          className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                          type="button"
                          onClick={newPredict}
                        >
                          Predict
                        </button>
                      </div>
                      <div className="d-grid">
                        <h2 className="login-heading mb-4">
                          Prediction : {response["prediction"]}
                        </h2>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
