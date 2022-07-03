import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CRow } from '@coreui/react'
import axios from 'axios'

const getProductDetails = async (id) => {
    const results = await axios.get(`${process.env.REACT_APP_API_URL}/products/details/${id}`)
    return results.data[0]
}

const changeCode = async (i, e, formValues, setFormValues) => {
    const details = await getProductDetails(e.target.value);
    let newFormValues = [...formValues];

    if (details) {
        newFormValues[i]['code'] = e.target.value
        newFormValues[i]['name'] = details.name
    }
    newFormValues[i + 1] = {
        code: '',
        name: '',
        quantity: 0,
        isDamaged: false
    }

    setFormValues(prev => [...newFormValues])
}

export const loadDataTable = (formValues, setFormValues, returnInvoice) => {
    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Return Invoice Items for {returnInvoice.invoice}</strong>
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
                                                onChange={(e) => changeCode(index, e, formValues, setFormValues)}
                                                placeholder="Code(Ex: PR-12345)"
                                            />
                                        </div>
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
                                    </CRow>
                                ))
                            }
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

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
                                    <h4>Return Invoice form</h4>
                                </div>
                                <div className="col-sm-2 float-right">
                                    <button className="btn btn-primary">
                                        Returned List
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
                                        placeholder="Search by Company Name/Director/Hero"
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