import { Button } from '@material-ui/core';
import Immutable from "immutable";
import React, { useEffect, useState } from 'react';
import AvailablityApi from '../api/availablityapi';
import { getDate } from '../helpers/utils';
import { Center } from '../types/type';
import Copyright from './copyright';
import DistrictDropDown from './dropdown';
import Table from './table';

const App = () => {
  const [isVisible, setVisiblity] = React.useState(false);
  const [district, setDistrict] = React.useState(0);
  const [render, rerender] = React.useState(false);
  const [availableVaccine, setAvailablity] = useState(Immutable.List<Center>())

  useEffect(() => {
    if (district > 0) {
      availablityChecker()
    }
  }, [district])

  const setSelectedDistrict = (districtId: number) => {
    setDistrict(districtId);
  };

  function availablityChecker() {
    if (district) {
      AvailablityApi.AvailablityCheck(district, getDate()).then((response: any) =>
        setAvailablity(response.data.centers),
        rerender(!render)
      )
      setVisiblity(true)
    }
  }

  function getButtonColor(): any {
    return district ? "primary" : "disabled"
  }

  return (<div className="container">
    <h1>Vaccine Availablity Checker</h1>
    <DistrictDropDown district={district} setDistrict={setSelectedDistrict} />
    <div style={{ marginLeft: '.5rem', marginBottom:'.3rem' }}>
      <Button variant="contained" color={getButtonColor()} onClick={() => availablityChecker()}>
        {"Refresh"}
      </Button>
    </div>
    {
      district > 0 && isVisible ? <Table centers={availableVaccine} /> : <></>
    }
    <Copyright />
  </div>
  );
}

export default App;
