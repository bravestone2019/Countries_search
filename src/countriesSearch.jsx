import React, { useState, useEffect } from 'react';

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const jsonRes = await response.json();
        setCountries(jsonRes);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <input
        type="text"
        placeholder="Search for countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '500px',
          padding: '10px',
          fontSize: '16px',
          marginBottom: '20px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: filteredCountries.length === 1 ? 'center' : 'space-evenly',
        alignItems: 'center',
        minHeight: 'calc(100vh - 200px)',
        gap: '20px'
      }}>
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div key={country.cca3} className="countryCard" style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '20px',
              textAlign: 'center',
              width: '200px'
            }}>
              <img 
                src={country.flags?.png} 
                alt={`${country.name.common} flag`} 
                style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
              />
              <h3 style={{ marginTop: '10px' }}>{country.name.common}</h3>
            </div>
          ))
        ) : (
          <div>No countries found</div>
        )}
      </div>
    </div>
  );
}

export default CountryList;
