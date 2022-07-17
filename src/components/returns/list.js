import React, { useEffect, useState, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
require('dotenv').config()
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CRow } from '@coreui/react'
import 'react-datepicker/dist/react-datepicker.css'

const RetList = ({ type }) => {

    const [state, setState] = useState(() => ({
        isLoaded: false,
        inventory: []
    }))

    const getList = async () => {
        let listOfInvoices = await axios.post(`${process.env.REACT_APP_API_URL}/invoice/return/list`, {
            type: type ? type : 'returned'
        })
        setState((p) => ({
            ...p,
            isLoaded: true, inventory: listOfInvoices.data
        }))
    }

    useEffect(() => {
        getList()
    }, [state.isLoaded])

    const display = inventory => {
        console.log(inventory)
        return (
            <>
                <table className="table table-stripped">
                    <thead>
                        <th>S.No</th>
                        <th>Invoice Number</th>
                        <th>Quoted To</th>
                        <th>Address</th>
                        <th>Content</th>
                        <th>Contact Name</th>
                        <th>Quantity</th>
                        <th>Returned On</th>
                    </thead>
                    <tbody>
                        {
                            inventory.map((inv, index) => {
                                return (<tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{inv.invoice}</td>
                                    <td>{inv.to_name}</td>
                                    <td>{inv.to_address}</td>
                                    <td>{inv.content_type}</td>
                                    <td>{inv.contactname}</td>
                                    <td>{inv.totalProducts}</td>
                                    <td>{moment.utc(inv.returned_date).format('DD/MM/yyyy')}</td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            </>
        )
    }

    return (
        <div>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <CRow className="align-middle p-2">
                                <div className="col-sm-10">
                                    <h4>
                                        {
                                            type.charAt(0).toUpperCase() + type.slice(1)
                                        }
                                        &nbsp;List
                                    </h4>
                                </div>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            {
                                state.inventory.length ?
                                    <div>
                                        {display(state.inventory)}
                                    </div>
                                    :
                                    <></>
                            }
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div >
    )
}

export default RetList