import React, { useState } from 'react';
import propertiesData from './properties.json';

function App() {
  // Input states (what user types/selects)
  const [inputType, setInputType] = useState("");
  const [inputMinPrice, setInputMinPrice] = useState("");
  const [inputMaxPrice, setInputMaxPrice] = useState("");
  const [inputMinBedrooms, setInputMinBedrooms] = useState("");
  const [inputMaxBedrooms, setInputMaxBedrooms] = useState("");
  const [inputDateAfter, setInputDateAfter] = useState("");
  const [inputPostcode, setInputPostcode] = useState("");

  // Applied states (used for filtering)
  const [queryType, setQueryType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBedrooms, setMinBedrooms] = useState("");
  const [maxBedrooms, setMaxBedrooms] = useState("");
  const [dateAfter, setDateAfter] = useState("");
  const [postcode, setPostcode] = useState("");

  // Filter logic
  const filteredProperties = propertiesData.properties.filter((property) => {
    const typeMatch = queryType === "" || property.type === queryType;
    const priceMatch =
      (minPrice === "" || property.price >= Number(minPrice)) &&
      (maxPrice === "" || property.price <= Number(maxPrice));
    const bedroomsMatch =
      (minBedrooms === "" || property.bedrooms >= Number(minBedrooms)) &&
      (maxBedrooms === "" || property.bedrooms <= Number(maxBedrooms));
    const dateMatch =
      dateAfter === "" ||
      new Date(`${property.added.year}-${property.added.month}-${property.added.day}`) >=
        new Date(dateAfter);
    const postcodeMatch =
      postcode === "" || property.location.toLowerCase().includes(postcode.toLowerCase());

    return typeMatch && priceMatch && bedroomsMatch && dateMatch && postcodeMatch;
  });

  // Apply filters on button click
  const applyFilters = () => {
    setQueryType(inputType);
    setMinPrice(inputMinPrice);
    setMaxPrice(inputMaxPrice);
    setMinBedrooms(inputMinBedrooms);
    setMaxBedrooms(inputMaxBedrooms);
    setDateAfter(inputDateAfter);
    setPostcode(inputPostcode);
  };

  return (
    <div>
      <h1>Property App</h1>

      {/* Filters container */}
      <div>
        <select value={inputType} onChange={(e) => setInputType(e.target.value)}>
          <option value="">All Types</option>
          <option value="House">House</option>
          <option value="Flat">Flat</option>
          <option value="Bungalow">Bungalow</option>
          <option value="Penthouse">Penthouse</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={inputMinPrice}
          onChange={(e) => setInputMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={inputMaxPrice}
          onChange={(e) => setInputMaxPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Min Bedrooms"
          value={inputMinBedrooms}
          onChange={(e) => setInputMinBedrooms(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Bedrooms"
          value={inputMaxBedrooms}
          onChange={(e) => setInputMaxBedrooms(e.target.value)}
        />

        <input
          type="text"
          placeholder="Date after (YYYY-MM-DD)"
          value={inputDateAfter}
          onChange={(e) => setInputDateAfter(e.target.value)}
        />

        <input
          type="text"
          placeholder="Postcode (e.g., BR1)"
          value={inputPostcode}
          onChange={(e) => setInputPostcode(e.target.value)}
        />

        <button onClick={applyFilters}>Search</button>
      </div>

      <hr />

      {filteredProperties.length > 0 ? (
        filteredProperties.map((property) => (
          <div key={property.id}>
            <h2>{property.type}</h2>
            <p>Price: {property.price}</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Location: {property.location}</p>
            <p>Date Added: {property.added.day} {property.added.month}, {property.added.year}</p>
          </div>
        ))
      ) : (
        <p>No properties match your filters.</p>
      )}
    </div>
  );
}

export default App;