import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPharmacies } from '../modules/pharmacies';
import PharmacyList from "../components/PharmacyList";
import PharmacyTable from "../components/PharmacyTable";

function PharmacyListContainer() {
  const { data, loading, error } = useSelector(state => state.pharmacies.pharmacies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPharmacies());
  }, [dispatch]);

  if (loading && !data) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return <>
    <PharmacyTable />
    <hr />
    <PharmacyList pharmacies={data} />
  </>
}

export default PharmacyListContainer;
