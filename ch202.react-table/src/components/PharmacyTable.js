import React, { useMemo } from 'react';
import BasicTable from './BasicTable';

function PharmacyTable({ pharmacies }) {
  const columns = useMemo(
    () => [
      {
        Header: '사업장명',
        accessor: 'business_nm',
      },
      {
        Header: '주소',
        accessor: 'address',
      },
    ],
    []
  );


  return (
    <BasicTable
      columns={columns}
      data={pharmacies}
    />
  );
}

export default PharmacyTable;
