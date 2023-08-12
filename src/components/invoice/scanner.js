import React, { useEffect, useReducer } from 'react'
import useState from 'react-usestateref'
import { useHistory, Link } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { cilPlus, cilCheck, cilFingerprint, cilDelete } from '@coreui/icons'
import Loader from '../common/loading'
// import QrScan from 'react-qr-reader'

import BarcodeScannerComponent from "react-qr-barcode-scanner";

import moment from 'moment'
import axios from 'axios'
require('dotenv').config()

const Scanner = () => {
    const history = useHistory()
    const [items, setItems, refItems] = useState([])
    const [companyName, setCompanyName] = useState('');
    const [openScanner, setOpenScanner] = useState(false);
    const [qrScanData, setQrScanData, refScannedItem] = useState('');
    const [stopStream, setStopStream] = React.useState(false);
    const [isLoading, setIsLoading, nowIsLoading] = useState(false);

    const startScanner = () => {
        setOpenScanner(true)
        setStopStream(false)
        setIsLoading(false)
    }

    const getProductDetails = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/products/details/${refScannedItem.current}`).then((data) => {
            if (data.data.length) {
                data = data.data[0];
                let d = [{ code: data.code, name: data.name, nickname: data.nickname }]
                setItems([...refItems.current, ...d])
            }
            setQrScanData('')
            setIsLoading(false)
        });
    }

    const resetScanner = () => {
        setQrScanData('')
        setIsLoading(false)
        setOpenScanner(false)
        setCompanyName('')
    }

    const addScannedItems = () => {
        let ids = refItems.current.map((item) => item.code).join(',')
        let params = {
            ids: ids,
            company: companyName
        }
        axios.post(`${process.env.REACT_APP_API_URL}/products/addscans`, params).then(function (response) {
            console.log(response);
            history.push('/dashboard')

        })
    }

    return (
        <>
            <CCard className="mb-4">
                <CCardBody>
                    <CRow>

                    </CRow>
                    <CRow>
                        <div className="col-sm-12">
                            <input value={companyName}
                                onChange={(event) => setCompanyName(event.target.value)}
                                type="text" className="form-control" placeholder="Company Name" />
                        </div>
                        <div className="donotdisplay">
                            <BarcodeScannerComponent
                                stopStream={stopStream}
                                onUpdate={(err, result) => {

                                }}
                            />
                        </div>

                        {
                            openScanner && !stopStream ?
                                <>
                                    <BarcodeScannerComponent
                                        width={250}
                                        height={250}
                                        stopStream={stopStream}
                                        onUpdate={(err, result) => {
                                            console.log('error', err)
                                            if (result) {
                                                setQrScanData(result.text);
                                                setIsLoading(true)
                                                setStopStream(true);
                                                setTimeout(() => {
                                                    getProductDetails()
                                                }, 2000)
                                            }
                                        }}
                                    />
                                </>
                                :
                                <><p>{qrScanData}</p></>
                        }
                    </CRow>
                </CCardBody>
            </CCard>
            {
                (companyName !== '') ?
                    <>
                        <CCard>
                            <CCardHeader>
                                <CRow>
                                    <div className="col-sm-2 float-left">
                                        Items Scanned
                                    </div>
                                    <div className="col-sm-2">
                                        <CButton color="secondary" type="button">
                                            <CIcon onClick={() => startScanner()}
                                                icon={cilFingerprint} className="cricon" />


                                        </CButton>
                                    </div>
                                </CRow>

                            </CCardHeader>
                            <CCardBody>
                                {nowIsLoading.current ? <Loader /> : <></>}
                                {
                                    (refItems.current.length) ?
                                        <>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        refItems.current.map(i => (
                                                            <tr>
                                                                <td>{i.nickname}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </>
                                        :
                                        <></>
                                }

                                <hr />
                                <CRow>
                                    <div className="col-sm-12 float-right">
                                        <CButton color="primary" type="button"
                                            onClick={() => addScannedItems()}>
                                            Add
                                        </CButton>
                                        &nbsp;&nbsp;
                                        <CButton color="secondary"
                                            onClick={() => resetScanner()}
                                            type="button">
                                            Cancel
                                        </CButton>
                                    </div>
                                </CRow>
                            </CCardBody>
                        </CCard></>
                    : <></>
            }

            <div>&nbsp;</div>
        </>
    )
}

export default Scanner