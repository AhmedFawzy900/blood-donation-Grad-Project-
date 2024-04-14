import React, { useState } from 'react';

const DistanceCalculator = () => {
  const [link1, setLink1] = useState('');
  const [link2, setLink2] = useState('');
  const [distance, setDistance] = useState(0);

  const extractCoordinates = (link) => {
    const match = link.match(/\/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (match) {
      const lat = parseFloat(match[1]);
      const lon = parseFloat(match[2]);
      return { lat, lon };
    } else {
      return null;
    }
  };

  const calculateDistance = () => {
    const location1 = extractCoordinates(link1);
    const location2 = extractCoordinates(link2);

    if (!location1 || !location2) {
      alert('Invalid links. Please provide valid Google Maps links.');
      return;
    }

    const R = 6371; // Radius of the Earth in kilometers

    const dLat = (location2.lat - location1.lat) * (Math.PI / 180); // Difference in latitude in radians
    const dLon = (location2.lon - location1.lon) * (Math.PI / 180); // Difference in longitude in radians

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(location1.lat * (Math.PI / 180)) *
        Math.cos(location2.lat * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers

    setDistance(distance.toFixed(2)); // Set distance to state
  };

  return (
    <div>
      <h2>Distance Calculator</h2>
      <div>
        <label>Google Maps Link 1:</label>
        <input
          type="text"
          value={link1}
          onChange={(e) => setLink1(e.target.value)}
        />
      </div>
      <div>
        <label>Google Maps Link 2:</label>
        <input
          type="text"
          value={link2}
          onChange={(e) => setLink2(e.target.value)}
        />
      </div>
      <button onClick={calculateDistance}>Calculate Distance</button>
      <div>Distance between the two locations: {distance} kilometers</div>
    </div>
  );
};

export default DistanceCalculator;
