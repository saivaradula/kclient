import React, { useEffect, useState } from 'react'
import moment from 'moment'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CFormFeedback,
    CRow,
} from '@coreui/react'

import axios from 'axios'
require('dotenv').config()

const ItemFinder = (props) => {

    let [searchTerm, setSearchTerm] = useState(() => '')
    let [searchR, setSearchR] = useState(() => [])
    const [searched, setSearched] = useState(() => false)

    const changeTerm = (event) => {
        setSearchTerm(event.target.value)
    }

    const clearSearch = () => {
        setSearchTerm('')
        setSearched(() => false)
        setSearchR(() => [])
    }

    const getItem = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/items/find/${searchTerm}`).then((response) => {
            console.log(response.data[0])
            setSearchR(() => response.data)
            setSearched(() => true)
        })
    }

    const results = () => {
        return (

            <CCard className="mb-4">
                <CCardHeader>
                    Search Results
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        {
                            searched ?
                                searchR.length ?
                                    <>
                                        <table className="table prlist">
                                            <thead>
                                                <tr>
                                                    <th>Code</th>
                                                    <th>Name</th>
                                                    <th>Invoice Number</th>
                                                    <th>Given To</th>
                                                    <th>Company</th>
                                                    <th>Content</th>
                                                    <th>Sent On</th>
                                                    <th>Expected On</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    searchR.map(i => (
                                                        <tr>
                                                            <td>{i.code}</td>
                                                            <td>{i.name}</td>
                                                            <td>{i.invoice_id}</td>
                                                            <td>{i.prop_receiver_name}</td>
                                                            <td>{i.to_name}</td>
                                                            <td>{i.content_type}</td>
                                                            <td>
                                                                {moment.utc(i.startDate).format('ddd - MMM Do, YYYY')}
                                                            </td>
                                                            <td>
                                                                {moment.utc(i.endDate).format('ddd - MMM Do, YYYY')}
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </>
                                    :
                                    <>
                                        <h4>No Item found. Search with different Product Name, code or Nickname</h4>
                                    </>
                                :
                                <>Search with any product from pending invoices</>
                        }
                    </CRow>
                </CCardBody>
            </CCard>
        )
    }

    const searchBar = () => {
        return (
            <CCard className="mb-4">
                <CCardHeader>
                    <CRow>
                        <div className="col-sm-2">
                            <strong>Search Items</strong>
                        </div>
                        <div className="col-sm-4">
                            <CFormInput
                                value={searchTerm}
                                type="text" onChange={changeTerm}
                                placeholder={`Search Items by - code/name/nickname`} />
                        </div>
                        <div className="col-sm-3">
                            <CButton color="primary" type="button"
                                onClick={() => getItem()}
                            >
                                Search
                            </CButton>
                            &nbsp;&nbsp;&nbsp;
                            <CButton color="secondary" type="button"
                                onClick={clearSearch}
                            >
                                Reset
                            </CButton>
                        </div>
                    </CRow>
                </CCardHeader>
            </CCard>
        )
    }

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    {searchBar()}
                </CCol>
                <CCol xs={12}>
                    {results()}
                </CCol>
            </CRow>
        </>
    )
}

export default ItemFinder