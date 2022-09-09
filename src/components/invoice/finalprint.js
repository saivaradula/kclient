import React, { useEffect, useState, useReducer } from 'react'
import axios from 'axios'
require('dotenv').config()
import logo from '../../../src/assets/images/logop.png'
var converter = require('number-to-words');

const FinalPrint = (props) => {
    const [id, setId] = useState(props.match.params.id)

    const reducer = (state, action) => {
        switch (action.type) {
            case 'new': {
                let toaddress = action.payload.data[0].to_name
                    ? action.payload.data[0].to_name + ' - ' + action.payload.data[0].to_city
                    : ''

                return {
                    ...state,
                    inv: action.payload.inv,
                    to_details: toaddress,
                    toName: action.payload.data[0].to_name,
                    city: action.payload.data[0].to_city,
                    address: action.payload.data[0].to_address,
                    gst: action.payload.data[0].gst,
                    dated: action.payload.data[0].rents_start_on,
                    data: action.payload.data,
                    status: action.payload.data[0].is_value,
                    payment: action.payload.data[0].ip_value,
                    discount: action.payload.data[0].discount,
                    gstpercentage: action.payload.data[0].gstpercentage,
                    payableamount: action.payload.data[0].payableamount,
                    vendoraddress: action.payload.data[0].vendoraddress,
                    finalamount: action.payload.data[0].finalamount,
                    payableamount: action.payload.data[0].payableamount
                }
            }
        }
    }

    const [invoiceDetails, dispatch] = useReducer(reducer, {
        inv: '',
        to_details: '',
        toName: '',
        city: '',
        address: '',
        status: '',
        payment: '',
        gst: '',
        dated: '',
        data: [],
    })

    const thisPage = {
        width: '1000px',
        margin: 'auto',
        // marginTop: '200px'
    }
    const logoSize = {
        height: 120,
        width: 350,
    }

    const styles = {
        margin: 'auto'
    }

    const inWords = (num) => {
        let n = num.split('.');
        let r = converter.toWords(n[0])
        let p = converter.toWords(n[1])
        return `${r} and ${p} paise`;
    }

    const getDetails = async id => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}/invoice/${id}/details`)
            .then(response => {
                dispatch({ type: 'new', payload: { data: response.data, inv: id } })
            })

    }

    useEffect(async () => {
        await getDetails(id)
        setTimeout(() => {
            window.print()
        }, 3000);
    }, [id])

    const replaceCommaLine = (data) => {
        return data.split(',').map(item => item.trim());
    }

    return (
        <>
            {invoiceDetails.data[0] != undefined ?
                (<>
                    <div className="row printdiv mragin-auto" style={thisPage}>
                        <div className="row">
                            {/* <div className="col-3 logo-color"></div> */}
                            <div className="col-6 logo-color" style={styles}>
                                <img src={logo} style={logoSize} />
                            </div>
                            <div className="col-6 logo-color"></div>
                        </div>
                        <div className="row">&nbsp;</div>
                        <div>
                            <div className="addressclass">
                                H.No: 3-517/1, ADITYA NAGAR, NEW HAFEEZPET, MEDCHAL MALKAJGIRI, HYDERABAD - 500049
                                <br />
                                Mobile: +91 8886112321, Mail ID: rightchoiceprops@gmail.com
                            </div>
                            <hr />
                            <div className="addressclass">
                                <h3>INVOICE DETAILS</h3>
                            </div>
                        </div>
                        <div>
                            <table className="addressTable">
                                <tr>
                                    <td width="500">
                                        <div className="fbold">Right Choice</div>
                                        <div>H.No: 3-517/1,</div>
                                        <div>ADITYA NAGAR, NEW HAFEEZPET,</div>
                                        <div>MEDCHAL MALKAJGIRI, </div>
                                        <div>HYDERABAD - 500049.</div>
                                        <div>GTIN: 36ATUPK0654P2ZV</div>
                                    </td>
                                    <td>
                                        <div>Invoice Serial Number: 178</div>
                                        <div>Invoice date: 02, May, 2022,</div>
                                        <div>Place of Supply: Hyderabad.</div>
                                        <div>Description: Set Property Rent</div>
                                        <div>Terms of Payment: Immediate</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Details of receiver(billed to)</td>
                                    <td>Details of receiver(shipped to)</td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="fbold">{invoiceDetails.toName}</div>
                                        <div className="">
                                            {replaceCommaLine(invoiceDetails.vendoraddress).map((v) => <div>{v}</div>)}</div>
                                    </td>
                                    <td>
                                        <div className="fbold">{invoiceDetails.toName}</div>
                                        <div>
                                            {replaceCommaLine(invoiceDetails.vendoraddress).map((v) => <div>{v}</div>)}
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table className="addressTable">
                                <tr>
                                    <th>S.No</th>
                                    <th>Description</th>
                                    <th>HSN CODE</th>
                                    <th>TAXABLE VALUE</th>
                                    {
                                        localStorage.getItem('gst_check') === 'igst' ?
                                            <>
                                                <th>IGST @ 18%</th>
                                            </>
                                            :
                                            <>
                                                <th>CGST @ 9%</th>
                                                <th>SGST @ 9%</th>
                                            </>
                                    }

                                    <th>TOTAL</th>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Set Property Rent</td>
                                    <td>00440076</td>
                                    <td>{((invoiceDetails.finalamount) / 1).toFixed(2)}</td>
                                    {
                                        localStorage.getItem('gst_check') === 'igst' ?
                                            <>
                                                <td>{((invoiceDetails.payableamount - invoiceDetails.finalamount)).toFixed(2)}</td>
                                            </>
                                            :
                                            <>
                                                <td>{((invoiceDetails.payableamount - invoiceDetails.finalamount) / 2).toFixed(2)}</td>
                                                <td>{((invoiceDetails.payableamount - invoiceDetails.finalamount) / 2).toFixed(2)}</td>
                                            </>
                                    }

                                    <td>{(invoiceDetails.payableamount / 1).toFixed(2)}</td>
                                </tr>
                            </table>
                            <table className="addressTable">
                                <tr>
                                    <td>
                                        <span className="fbold">Rupees:</span>
                                        &nbsp;&nbsp; {inWords((invoiceDetails.payableamount / 1).toFixed(2))}
                                    </td>
                                    <td>
                                        <table className="addressTable">
                                            <tr>
                                                <td className="fbold">Taxable Value</td>
                                                <td className="fbold">{((invoiceDetails.finalamount) / 1).toFixed(2)}</td>
                                            </tr>

                                            {
                                                localStorage.getItem('gst_check') === 'igst' ?
                                                    <>
                                                        <tr>
                                                            <td className="fbold">IGST @ 18%</td>
                                                            <td className="fbold">{((invoiceDetails.payableamount - invoiceDetails.finalamount)).toFixed(2)}</td>
                                                        </tr>
                                                    </> :
                                                    <>
                                                        <tr>
                                                            <td className="fbold">CGST @ 9%</td>
                                                            <td className="fbold">{((invoiceDetails.payableamount - invoiceDetails.finalamount) / 2).toFixed(2)}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="fbold">SGST @ 9%</td>
                                                            <td className="fbold">{((invoiceDetails.payableamount - invoiceDetails.finalamount) / 2).toFixed(2)}</td>
                                                        </tr>
                                                    </>
                                            }
                                            <tr>
                                                <td className="fbold">Total</td>
                                                <td className="fbold">{(invoiceDetails.payableamount / 1).toFixed(2)}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <table className="addressTable">
                                <tr>
                                    <td width="500">
                                        <div>Remarks: Set Property Rent From</div>
                                        <div className="fbold">M/s. {invoiceDetails.toName}</div>
                                        <br />
                                        <div className="fitalic">All trasactions are subjected to Telangana Jurisdiction under GST ACT</div>
                                    </td>
                                    <td>

                                        <div className="fbold">Right Choice</div>
                                        <br /><br />
                                        <div className="fbold">Authority Signature</div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </>)
                :
                (<>Printing in process... </>)
            }
        </>
    )
}




export default FinalPrint;