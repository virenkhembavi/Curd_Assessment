import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import "./adduser.css"
import { Button } from '@mui/material';
import { postUserData } from '../../service/api';
import { useNavigate } from 'react-router-dom';

export default function AddUser() {
    const [errors, setErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [formData, setFormData] = useState({
        id: "",
        city: "",
        last_name: "",
        pincode: "",
        first_name: "",
        states: "",
        email: "",
    })
    let navigate = useNavigate()
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
            console.log(errors)
        }
    }, [errors])

    const validate = (values) => {
        const error = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
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
        if (!values.email) {
            error.email = "Email is required*"
        } else if (!regex.test(values.email)) {
            error.email = "This Is Not A Valid Email Format!*"
        }
        return error;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors(validate(formData))
        setIsSubmit(true)

        if (Object.keys(errors).length === 0 && isSubmit) {
            const response = await postUserData(formData)
            if (response.status == 200 || 201) {
                navigate("/")
            }
        }
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
                        <div>
                            <TextField id="outlined-basic" label="Email" variant="outlined" type="text" name="email" value={formData.email} onChange={handleChange} />
                            <p className='warning'>{errors.email}</p>
                        </div>
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
                    <Button type="submit" variant="contained">Submit</Button>
                    {/* <Button type="submit" variant="contained">Cancel</Button> */}
                </form>
            </div>
        </div>
    )
}
