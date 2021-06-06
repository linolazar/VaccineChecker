import React, { useEffect, useState } from 'react';
import Table from './table';
import AvailablityApi from '../api/availablityapi';
import { Center } from '../types/type';
import { getDate } from '../helpers/utils';
import DistrictDropDown from './dropdown';
import Immutable from "immutable";
import Copyright from './copyright';

const App = () => {
  const [isVisible, setVisiblity] = React.useState(false);
  const [district, setDistrict] = React.useState(0);
  const [availableVaccine, setAvailablity] = useState(Immutable.List<Center>())

  useEffect(() => {
    if (district > 0) {
      AvailablityApi.AvailablityCheck(district, getDate()).then((response: any) =>
        setAvailablity(response.data.centers))
        setVisiblity(true)
      // setInterval(() => {
      //   AvailablityApi.AvailablityCheck(district, getDate()).then((response: any) =>
      //     setAvailablity(response.data.centers))
      // }, 120000)
    }
  }, [district])

  const setSelectedDistrict = (districtId: number) => {
    setDistrict(districtId);
  };

  return (<div className="container">
    <h1>Vaccine Availablity Checker</h1>
    <DistrictDropDown district={district} setDistrict={setSelectedDistrict} />
    {
      district > 0 && isVisible ? <Table centers={availableVaccine} /> : <></>
    }
    <Copyright />
  </div>
  );
}

export default App;
