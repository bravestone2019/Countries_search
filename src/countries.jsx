import React from 'react';

function CountryCard({ country }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
      <img src={country.flags.png} alt={country.name.common} style={{ width: '100px', height: '60px' }} />
      <div>{country.name.common}</div>
    </div>
  );
}

export default CountryCard;
