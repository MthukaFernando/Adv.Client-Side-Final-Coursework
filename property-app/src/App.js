import React, { useState } from 'react';
import propertiesData from './properties.json';

function App() {
  const [searchQuery, setSearchQuery] = useState("");   // Search bar
  const [queryType, setQueryType] = useState("");       // Type dropdown
  const [minPrice, setMinPrice] = useState("");         // Min price
  const [maxPrice, setMaxPrice] = useState("");         // Max price
  const [minBedrooms, setMinBedrooms] = useState("");   // Min bedrooms
  const [maxBedrooms, setMaxBedrooms] = useState("");   // Max bedrooms
  const [dateAfter, setDateAfter] = useState("");       // Date filter (manual input)
  const [postcode, setPostcode] = useState("");         // Postcode filter

  // Filter logic
  const filteredProperties = propertiesData.properties.filter((property) => {
    // Search bar: type or location
    const searchMatch =
      searchQuery === "" ||
      property.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());

    // Type dropdown filter
    const typeMatch = queryType === "" || property.type === queryType;

    // Price filter
    const priceMatch =
      (minPrice === "" || property.price >= Number(minPrice)) &&
      (maxPrice === "" || property.price <= Number(maxPrice));

    // Bedrooms filter
    const bedroomsMatch =
      (minBedrooms === "" || property.bedrooms >= Number(minBedrooms)) &&
      (maxBedrooms === "" || property.bedrooms <= Number(maxBedrooms));

    // Date added filter (manual input)
    const dateMatch =
      dateAfter === "" ||
      new Date(`${property.added.year}-${property.added.month}-${property.added.day}`) >=
        new Date(dateAfter);

    // Postcode filter
    const postcodeMatch =
      postcode === "" || property.location.toLowerCase().includes(postcode.toLowerCase());

    // Must satisfy all filters
    return searchMatch && typeMatch && priceMatch && bedroomsMatch && dateMatch && postcodeMatch;
  });

  return (
    <div>
      <h1>Property App</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search type or location..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Filters container */}
      <div>
        {/* Type dropdown */}
        <select value={queryType} onChange={(e) => setQueryType(e.target.value)}>
          <option value="">All Types</option>
          <option value="House">House</option>
          <option value="Flat">Flat</option>
          <option value="Bungalow">Bungalow</option>
          <option value="Penthouse">Penthouse</option>
        </select>

        {/* Price filters */}
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        {/* Bedrooms filters */}
        <input
          type="number"
          placeholder="Min Bedrooms"
          value={minBedrooms}
          onChange={(e) => setMinBedrooms(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Bedrooms"
          value={maxBedrooms}
          onChange={(e) => setMaxBedrooms(e.target.value)}
        />

        {/* Date added filter (manual input) */}
        <input
          type="text"
          placeholder="Date after (YYYY-MM-DD)"
          value={dateAfter}
          onChange={(e) => setDateAfter(e.target.value)}
        />

        {/* Postcode filter */}
        <input
          type="text"
          placeholder="Postcode (e.g., BR1)"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
        />
      </div>

      <hr />

      {/* Render filtered properties */}
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