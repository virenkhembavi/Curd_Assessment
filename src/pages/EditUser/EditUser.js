import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import "../AddUser/adduser.css"
import { Button } from '@mui/material';
import { URL } from '../../service/api';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

export default function AddUser() {

  let navigate = useNavigate()
  let params = useParams()
  const [errors, setErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)


  const { email, city, firstname, lastname, pincode, states } = JSON.parse(localStorage.getItem("email"))

  const [formData, setFormData] = useState({
    city: city,
    last_name: lastname,
    pincode: pincode,
    first_name: firstname,
    states: states,
    email: email,
  })

  const handleChange = (e) => {
    e.preventDefault()

    let name = e.target.name
    let value = e.target.value
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
    }
  }, [errors])




  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors(validate(formData))
    setIsSubmit(true)
    if (Object.keys(errors).length === 0 && isSubmit) {
      const response = await axios.put(`${URL}/${params.id}`, formData)
      if (response.status == 200 || 201) {
        navigate("/")
      }

    }
  }

  const validate = (values) => {
    const error = {};
    if (!values.first_name) {
      error.first_name = "First Name is required*"
    }
    if (!values.last_name) {
      error.last_name = "Last Name is required*"
    }
    if (!values.pincode) {
      error.pincode = "Pincode is required*"
    } else if (values.pincode.length > 6) {
      error.pincode = "Pincode must be only 6 character*"
    }
    if (!values.city) {
      error.city = "City is required*"
    }
    if (!values.states) {
      error.states = "States is required*"
    }
    return error;
  }


  return (
    <div className='Head-Wapper'>
      <div className='Middle-Wapper'>
        <h3>A<span>dd</span>U<span>ser</span></h3>
        <form onSubmit={handleSubmit}>
          <div className='First-Container'>
            <div>
              <TextField id="outlined-basic" label="First Name" variant="outlined" type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
              <p className='warning'>{errors.first_name}</p>
            </div>
            <div>
              <TextField id="outlined-basic" label="Last Name" variant="outlined" type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
              <p className='warning'>{errors.last_name}</p>
            </div>
            <TextField id="outlined-basic" label="Email" variant="outlined" disabled type="text" name="email" value={email} />
          </div>
          <div className='Second-Container'>
            <div>
              <InputLabel id="demo-simple-select-label">State</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.states}
                label="State"
                name="states"
                onChange={handleChange}
              >
                <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                <MenuItem value="Goa">Goa</MenuItem>
                <MenuItem value="Gujrat">Gujrat</MenuItem>
                <MenuItem value="Delhi">Delhi</MenuItem>
              </Select>
              <p className='warning'>{errors.states}</p>
            </div>
            <div>
              <TextField id="outlined-basic" label="City" type="text" variant="outlined" name="city" value={formData.city} onChange={handleChange} />
              <p className='warning'>{errors.city}</p>
            </div>
            <div>
              <TextField id="outlined-basic" label="Pincode" type="number" variant="outlined" name="pincode" value={formData.pincode} onChange={handleChange} />
              <p className='warning'>{errors.pincode}</p>
            </div>
          </div>
          <Button type="submit" variant="contained" >Submit</Button>
        </form>
      </div>
    </div>
  )
}
