import propertiesData from './properties.json';

function App() {
  return (
    <div>
      <h1>Property app</h1>

      <input type="text" placeholder="Search..." className="search"></input>
      
      {/* Access the array inside the imported object */}
      {propertiesData.properties.map((property) => (
        <div key={property.id}>
          <h2>{property.type}</h2>
          <p>Price: {property.price}</p>
          <p>Bedrooms: {property.bedrooms}</p>
          <p>{property.location}</p>
        </div>
      ))}
      
    </div>
  );
}

export default App;