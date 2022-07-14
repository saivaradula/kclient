import { CCard, CCardBody, CCardHeader, CCardFooter, CCol, CFormInput, CRow } from '@coreui/react'
import axios from 'axios'

const getProductDetails = async (id, pid) => {
    const results = await axios.get(`${process.env.REACT_APP_API_URL}/invoice/return/${id}/items/${pid}`)
    return results.data[0] ? results.data[0] : 0;
}

const changeCode = async (invoice, i, e, formValues, setFormValues) => {
    const details = await getProductDetails(invoice, e.target.value);
    let newFormValues = [...formValues];

    if (details) {
        newFormValues[i]['code'] = e.target.value
        newFormValues[i]['error'] = ''
        newFormValues[i]['rquantity'] = 0
        newFormValues[i]['name'] = details.name
        newFormValues[i]['quantity'] = details.quantity
        newFormValues[i + 1] = {
            code: '',
            name: '',
            error: '',
            quantity: 0,
            rquantity: 0,
            isDamaged: false
        }
    } else {
        newFormValues[i]['code'] = e.target.value
        newFormValues[i]['error'] = "Invalid Code."
    }
    setFormValues(prev => [...newFormValues])
}

const receiveProducts = async (formValues) => {
    console.log(formValues)
    let f = formValues.filter(f => f.rquantity)
    await axios.post(`${process.env.REACT_APP_API_URL}/invoice/return/`, {
        formValues: f
    })
}

const updateRvalue = (i, event, formValues, setFormValues) => {
    let newFormValues = [...formValues];
    newFormValues[i].rquantity = event.target.value;
    setFormValues(prev => [...newFormValues])
}

const isDamagedFun = (i, event, formValues, setFormValues) => {
    let newFormValues = [...formValues];
    newFormValues[i].isDamaged = event.target.checked;
    setFormValues(prev => [...newFormValues])
    console.log(formValues)
}

export const loadDataTable = (formValues, setFormValues, returnInvoice) => {
    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Receive Invoice Items for {returnInvoice.invoice}</strong>
                        </CCardHeader>
                        <CCardBody>
                            {
                                formValues.map((element, index) => (
                                    <CRow className="mb-4" key={index}>
                                        <div className="col-sm-2">
                                            <CFormInput
                                                name="code"
                                                autoComplete="off"
                                                type="text"
                                                id="productCode"
                                                onChange={(e) => changeCode(returnInvoice.invoice, index, e, formValues, setFormValues)}
                                                placeholder="Code(Ex: PR-12345)"
                                            />
                                        </div>
                                        {
                                            element.error != '' ?
                                                <>
                                                    <div className="col-sm-6 error-message">
                                                        Product code is invalid OR does not exist in this Invoice
                                                    </div>
                                                </> :
                                                <>
                                                    <div className="col-sm-3">
                                                        <CFormInput
                                                            name="name"
                                                            autoComplete="off"
                                                            type="text"
                                                            id="name"
                                                            readOnly={true}
                                                            value={element.name || ''}
                                                            placeholder="Product Name"
                                                        />
                                                    </div>
                                                    <div className="col-sm-2">
                                                        <CFormInput
                                                            name="quantity"
                                                            onChange={e => updateRvalue(index, e, formValues, setFormValues)}
                                                            autoComplete="off"
                                                            type="text"
                                                            placeholder={`Max ${element.quantity || ''} Products`}
                                                        />
                                                    </div>
                                                    <div className="col-sm-4 m-10imp">
                                                        <label>
                                                            <input type="checkbox"
                                                                onChange={e => isDamagedFun(index, e, formValues, setFormValues)}
                                                                name="isDamaged" /> Is Damaged
                                                        </label>
                                                    </div>
                                                </>
                                        }
                                    </CRow>
                                ))
                            }
                        </CCardBody>
                        <CCardFooter>
                            <CRow>
                                <div className="col-sm-6"></div>
                                <div className="col-sm-6 float-right">
                                    <button className="btn btn-primary" onClick={() => receiveProducts(formValues)}>Recieve Products</button>
                                    &nbsp;&nbsp;
                                    <button className="btn btn-secondary">Cancel</button>
                                </div>
                            </CRow>
                        </CCardFooter>
                    </CCard>

                </CCol>
            </CRow >

        </>
    )
}

export const loadOptions = (invoices, displaySelectedInvoice) => {
    return (
        <div>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-2">
                        <CCardHeader>
                            <CRow className="p-2">
                                <div className="col-sm-2">
                                    <h6>Invoices found {invoices.length}</h6>
                                </div>
                                <div className="col-sm-6">
                                    <select className="form-control"
                                        onChange={displaySelectedInvoice}
                                    >
                                        <option value="0">Select Return Invoice Number</option>
                                        {invoices.map((i) => (
                                            <option
                                                key={i.invoice}
                                                value={i.invoice}>
                                                {i.to_name} - {i.invoice}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </CRow>
                        </CCardHeader>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export const searchInvoices = (setSearchString, getInvoices) => {
    return (
        <div>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-2">
                        <CCardHeader>
                            <CRow className="p-2">
                                <div className="col-sm-10">
                                    <h4>Receive Invoice form</h4>
                                </div>
                                <div className="col-sm-2 float-right">
                                    <button className="btn btn-primary">
                                        Received List
                                    </button>
                                </div>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        onChange={(e) => {
                                            setSearchString(e.target.value)
                                        }}
                                        className="form-control"
                                        placeholder="Search by Company Name/Invoice Number/Director/Hero"
                                    />
                                </div>
                                <div className="col-sm-5">
                                    <button className="btn btn-primary"
                                        onClick={getInvoices}
                                    >
                                        Get Invoices
                                    </button>
                                </div>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}