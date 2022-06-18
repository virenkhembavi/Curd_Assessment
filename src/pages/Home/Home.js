import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { deleteById, getUserData } from '../../service/api'
import { Link } from "react-router-dom"
import "./home.css"
// import Modal from '../../component/Modal/Modal'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



export default function Home() {
    const [search, setSearch] = useState("")
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true)

    const handleClose = () => setOpen(false);

    // const navigation = useNavigate()

    const getData = async () => {
        try {
            const response = await getUserData()
            setData(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteId = async (param) => {
        localStorage.setItem("id", param)
    }
    useEffect(() => {
        getData()
    }, [])

    const editUserId = (param) => {
        let docs = JSON.stringify(param)
        localStorage.setItem("email", docs)
    }

    const deleteByUserId = async () => {
        let userId = localStorage.getItem("id")
        const response = await deleteById(userId)
        if (response.status === 200 || 201) {
            window.location.reload()
        }
    }

    return (
        <div className='HeadWappaer'>
            <div className='MiddleContainer'>
                <div className='SearchBox'>
                    <Link to="/add">
                        <button>Add User</button>
                    </Link>
                    <input placeholder='Search' type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className='TableContainer'>
                    <Table striped bordered hover className='table-size'>
                        <thead >
                            <tr className='header'>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>State</th>
                                <th>Pincode</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {data.length > 0 && data.filter((val) => {
                            let name = val.first_name
                            if (search === "") {
                                return val
                            } else if (
                                name.toLowerCase().includes(search.toLowerCase())) {
                                return val
                            }
                        }).map((item) => {
                            return (
                                <tbody key={item.id}>
                                    <tr>
                                        <td className='td-containe'>{item.id}</td>
                                        <td className='td-containe'>{item.first_name}</td>
                                        <td className='td-containe'>{item.last_name}</td>
                                        <td className='td-containe'>{item.email}</td>
                                        <td className='td-containe'>{item.states}</td>
                                        <td className='td-containe'>{item.pincode}</td>
                                        <td className='td-containe'>
                                            <Link to={`/edit/${item.id}`}>
                                                <button className='SearchButton' onClick={() => editUserId({ email: item.email, firstname: item.first_name, lastname: item.last_name, states: item.states, city: item.city, pincode: item.pincode })}>edit</button>
                                            </Link>
                                            <button className='SearchButtonDelete' onClick={handleOpen} ><span onClick={() => deleteId(item.id)}>Delete</span></button>
                                        </td>
                                    </tr>
                                </tbody>

                            )
                        })
                        }
                    </Table>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Are You Sure You Want To Delete?
                        </Typography>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button color='error' onClick={() => deleteByUserId()}>Delete</Button>
                    </Box>
                </Modal>
            </div>
        </div >
    )
}
