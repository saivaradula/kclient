import React from 'react'
import { jsPDF } from 'jspdf'
import useState from 'react-usestateref'
import axios from 'axios'
import { CSVLink } from 'react-csv'
import {
  CButton,
  CCard,
  CFormLabel,
  CFormSelect,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSpreadsheet, cilColumns } from '@coreui/icons'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

import { ProductPdf, ProductExcel } from '../prints'
import Loader from '../common/loading'
require('dotenv').config()

const CategoryListPDF = (props) => {
  // const [ex2Pdf, setEx2Pdf, refEx2Pdf] = useState(false)
  const [value, setValue] = React.useState(0)
  const [categoryList, setCategoryList] = React.useState([])
  const [products, setProduct] = React.useState([])
  const [category, setCategory] = React.useState('')
  const [resultLoaded, setResultLoaded] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [excelIds, setExcelIds, excelsRef] = useState(() => [])

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

  React.useEffect(async () => {
    if (products?.length) {
      excelIds.length = 0
      let gTotal = 0
      const json = JSON.stringify(products)
      let prs = JSON.parse(json)
      // let prs = [...products]
      prs.map((p) => {
        delete p.image
        const total = p.price * p.quantity
        p.total = total
        gTotal += total
        excelIds.push(p)
      })
      excelIds.push({ total: gTotal })
      let excelRows = new Set(excelIds)
      setExcelIds(Array.from(excelRows))
    }
  }, [products])

  const listOptions = () => {
    return categoryList.map((c) => <option value={c.name}> {c.name} </option>)
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

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    )
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
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
                {products.length ? (
                  <>
                    <div className="col-sm-1">
                      <CButton color="primary" type="button" onClick={() => exportToPdf()}>
                        Export to PDF
                      </CButton>
                    </div>
                    <div className="col-sm-1">
                      <CSVLink data={excelsRef.current} filename={'products'}>
                        <CButton color="primary" type="button">
                          Export to Excel
                        </CButton>
                      </CSVLink>
                    </div>
                  </>
                ) : (
                  <></>
                )}
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
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                      <Tab label="Excel/SpreadSheet" {...a11yProps(0)} />
                      <Tab label="PDF" {...a11yProps(1)} />
                    </Tabs>
                  </Box>
                  <CustomTabPanel value={value} index={0}>
                    <ProductExcel data={products} />
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={1}>
                    <ProductPdf data={products} />
                  </CustomTabPanel>
                </Box>
              )}
            </div>
          </CCol>
        </CCardBody>
      </CCard>
    </>
  )
}

export default CategoryListPDF
