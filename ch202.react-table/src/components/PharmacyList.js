import React from 'react';

function PharmacyList({ pharmacies }) {
  return (
    <ul>
      {pharmacies.map(pharmacy => (
        <li key={pharmacy.id}>
          {pharmacy.business_nm}
        </li>
      ))}
    </ul>
  );
}

export default PharmacyList;
