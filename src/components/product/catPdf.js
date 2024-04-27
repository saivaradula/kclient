import React from 'react'
import { jsPDF } from 'jspdf'
import useState from 'react-usestateref'
import axios from 'axios'
import {
  CButton,
  CCard,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormFeedback,
} from '@coreui/react'
import Loader from '../common/loading'
import DisplayHtml from './Displayhtml'

require('dotenv').config()

const CategoryListPDF = (props) => {
  // const [ex2Pdf, setEx2Pdf, refEx2Pdf] = useState(false)
  const [categoryList, setCategoryList] = React.useState([])
  const [products, setProduct] = React.useState([])
  const [category, setCategory] = React.useState('')
  const [resultLoaded, setResultLoaded] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  const getCategories = () => {
    setLoading(true)
    axios.get(`${process.env.REACT_APP_API_URL}/category`).then((data) => {
      setCategoryList(data.data)
      setResultLoaded(true)
      setLoading(false)
    })
  }

  const getListByCategory = async (prtype) => {
    setLoading(true)
    await axios
      .post(`${process.env.REACT_APP_API_URL}/category/products`, { category: prtype })
      .then((data) => {
        setProduct(data.data)
        setLoading(false)
      })
  }

  React.useEffect(() => {
    if (resultLoaded === false) {
      getCategories()
    }
  })

  const listOptions = () => {
    return categoryList.map((c) => <option value={c.name}>{c.name}</option>)
  }

  const setC = async (e) => {
    await getListByCategory(e.target.value)
  }

  const exportToPdf = async () => {
    // setFullLoading(true)
    // setEx2Pdf(true)
    const doc = new jsPDF('p', 'mm', 'a4', true)
    setTimeout(() => {
      var htmlElement = document.getElementById('table-to-pdf')
      const opt = {
        callback: function (jsPdf) {
          //   jsPdf.save('products.pdf')
          //   setEx2Pdf(false)
          //   setFullLoading(false)
        },
        margin: [2, 2, 2, 2],
        html2canvas: {
          async: true,
          allowTaint: false,
          dpi: 300,
          letterRendering: false,
          logging: false,
          scale: 0.125,
          autoPaging: false,
          removeContainer: true,
        },
      }
      doc.html(htmlElement, opt).then(() => doc.save('products.pdf'))
    }, 3000)
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>PDF Printing</strong>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol xs={12}>
              <CRow>
                <div className="col-sm-2">
                  <CFormLabel htmlFor="category" className="col-form-label">
                    Select Category
                  </CFormLabel>
                </div>
                <div className="col-sm-3">
                  {categoryList.length ? (
                    <CFormSelect required id="category" onChange={(e) => setC(e)}>
                      <option value="">Choose Category</option>
                      {listOptions()}
                    </CFormSelect>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="col-sm-4"></div>
                <div className="col-sm-2">
                  <CButton color="primary" type="button" onClick={() => exportToPdf()}>
                    Export to PDF
                  </CButton>
                </div>
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>
          <strong>List of Products({products.length})</strong>
        </CCardHeader>
        <CCardBody>
          <CCol xs={12}>
            <div style={{ marginLeft: '20px;' }}>
              {loading ? <Loader /> : <></>}

              {!loading && products.length == 0 ? (
                <div>No Products found under {category} Category</div>
              ) : (
                //  displayProducts()
                <table id="table-to-pdf" className="table table-striped">
                  <tr>
                    {products.map((p, i) => {
                      return (
                        <td className="pdfclass">
                          <div>
                            <div className="center-content">
                              <img src={p.image} width={200} height={200} />
                            </div>
                            <div style={{ marginLeft: '33px', marginTop: '10px' }}>
                              <div>
                                Name:{' '}
                                <strong>
                                  {p.name}/{p.nickname}
                                </strong>
                              </div>
                              <div>
                                Code: <strong>{p.code}</strong>
                              </div>
                              <div>
                                Price: <strong>{p.price}</strong>
                              </div>
                            </div>
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                </table>
              )}
            </div>
          </CCol>
        </CCardBody>
      </CCard>
    </>
  )
}

export default CategoryListPDF
