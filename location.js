import React, { useState } from 'react';

function WeatherApp() {
  const [location, setLocation] = useState(null);

  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Make API call to Geoapify
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=d5ea715497d242889c4d796eeed2628f`)
      .then(response => response.json())
      .then(data => {
        console.log("Geoapify API response:", data);

        // Extract city name from Geoapify response
        const city = data.features[0]?.properties?.city || 'Unknown City';

        // Set latitude, longitude, and city in state
        setLocation({ latitude, longitude, city });
      })
      .catch(error => {
        console.error("Error fetching location data:", error);
      });
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  return (
    <div>
      {!location ? <button onClick={handleLocationClick}>Get Location</button> : null}
      {location ? <h2>Latitude: {location.latitude}</h2> : null}
      {location ? <h2>Longitude: {location.longitude}</h2> : null}
      {location ? <h2>City: {location.city}</h2> : null}
    </div>
  );
}

export default WeatherApp;
