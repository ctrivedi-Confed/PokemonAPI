import '../App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import useCountryApi from '../hooks/useCountryApi';
import Header from "../components/Header";

function BasicInformation() {
  const API_URL = "https://countriesnow.space/api/v0.1";
  const DEFAULT_FLAG_IMAGE = "defaultImage.jpg";
  const countries = useCountryApi(API_URL+"/countries/flag/images");
  const [provinces, setProvinces] = useState([]);
  const [countryFlag, setCountryFlag] = useState(DEFAULT_FLAG_IMAGE);
  const [formData, setFormData] = useState({});

  const callProvinces = function(e) {
    axios.post(API_URL+"/countries/states", { "country": e.target.value }).then((res)=> { setProvinces(res.data.data.states); });   
    setCountryFlag(countries[parseInt(e.target.selectedIndex)-1].flag);
  }

  function saveFormData(e){
    setFormData({ ...formData, [e.target.id]: e.target.value});
  }

  function saveDataToLocalStorage() {
    localStorage.setItem("formData", JSON.stringify(formData));
    localStorage.setItem("provinces", JSON.stringify(provinces));
    localStorage.setItem("flagUrl", countryFlag);
  }


  useEffect(()=>{ 
    if(localStorage.getItem("formData") !== null) {
        setFormData(JSON.parse(localStorage.getItem("formData")));
        setProvinces(JSON.parse(localStorage.getItem("provinces")));
        setCountryFlag(localStorage.getItem('flagUrl'));
    }
  }, []);

  return (
    <div className='basicContainer'>
      <Header title="Basic Information" />
      <Form className='mainFormContainer' action="/pokemon">
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control required type="text" name="firstName" defaultValue={formData.firstName} placeholder="Enter First Name" onChange={saveFormData}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control required type="text" name="lastName" defaultValue={formData.lastName} placeholder="Enter Last Name" onChange={saveFormData}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control required as="textarea" rows={3} name="address" defaultValue={formData.address} placeholder="Enter Your Address" onChange={saveFormData}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Select aria-label="Default select example" value={formData.country} name="country" onChange={(e)=> {callProvinces(e); saveFormData(e);}}>
            <option value="" disabled>Choose Your Country</option>
            {countries && countries.map((country, index)=> <option value={country.name} key={index}>{country.unicodeFlag}{country.name}</option>)}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="province">
          <Form.Label>Province</Form.Label>
          <Form.Select aria-label="Default select example" value={formData.province} name="province" onChange={saveFormData}>
            {provinces && provinces.map((province)=> <option value={province.state_code} key={province.state_code}>{province.name}</option>)}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Group className='phoneNumber' controlId="phoneNo">
            <img src={countryFlag} alt="flag" height="20rem" width="30rem" onError={()=>setCountryFlag(DEFAULT_FLAG_IMAGE)}/>
            <Form.Control required type="text" name="phoneNo" defaultValue={formData.phoneNo} placeholder="Enter Phone Number" pattern='[0-9]{10}' title="Phone Number must be of 10 digits" onChange={saveFormData}/>
          </Form.Group>
        </Form.Group>
        
        <Form.Group className="controlButtons">
          <Button className="me-3" variant="primary" type="submit" onClick={saveDataToLocalStorage}>
            Next
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default BasicInformation;
