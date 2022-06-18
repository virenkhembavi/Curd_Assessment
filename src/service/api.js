import axios from "axios"

export const URL = "http://localhost:8080/data"

export const getUserData = () => {
    return axios(`${URL}`)
}

export const postUserData = (param) => {
    // console.log(param)
    return axios.post(`${URL}`, param)
}

export const updateUserData = (param, data) => {
    console.log(data, param)
    return axios.post(`${URL}/${data}`, param)
}


export const deleteById = (param) => {
    return axios.delete(`${URL}/${param}`)
}