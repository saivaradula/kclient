import React, { useEffect, useState } from 'react'
import {
  Navbar,
  Nav,
  NavDropdown,
} from 'react-bootstrap';
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import { useHistory, Link } from 'react-router-dom'
import ImageComponent from './ImageComponent'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import CIcon from '@coreui/icons-react'
import { cilPen, cilFingerprint, cilDelete } from '@coreui/icons'

import axios from 'axios'
require('dotenv').config()
import DisplayHtml from './Displayhtml'
import SearchOperation from './../common/SearchOperation'

const parser = new DOMParser();

ReactHTMLTableToExcel.format = (s, c) => {
  if (c && c['table']) {
    const html = c.table;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const rows = doc.querySelectorAll('tr.selected');

    for (const row of rows) row.removeChild(row.firstChild);
    for (const row of rows) row.removeChild(row.firstChild);

    c.table = doc.querySelector('table').outerHTML;
  }

  return s.replace(/{(\w+)}/g, (m, p) => c[p]);
};

const Products = (props) => {
  const history = useHistory()
  // const arrChecked = []
  let [products, setProducts] = useState([])
  const [resultLoaded, setResultLoaded] = useState(false)
  const [loading, setLoading] = useState(false)

  const [page, setPage] = useState(() =>
    props.match.params.p ? props.match.params.p : 1
  )
  const [totalProd, setTotalProd] = useState(0)
  const [pages, setPages] = useState(1)
  const [inputPage, setInputPage] = useState(() =>
    props.match.params.p ? props.match.params.p : 1
  )
  let [selectedProductLength, updateSelectedProductLength] = useState(0)
  let [arrChecked, setArrChecked] = useState([])
  let [printingOptions, setPrintingOptions] = useState([])
  const [showPreview, setShowPreview] = useState(() => '')
  let [searchTerm, setSearchTerm] = useState(() => '')
  const [checkbox, setCheckbox] = useState(() => [])

  let i = 0

  const fetchData = (p) => {

    try {
      let searchString = searchTerm;
      console.log(p, searchString.length)
      // p = searchString == '' ? p : 1
      console.log(p)
      setPage(p)
      setInputPage(p)
      axios.get(`${process.env.REACT_APP_API_URL}/rchoice/${p}/${searchString}`).then((data) => {
        let numOfProducts = data.data.products.total
        let p = data.data.products.data;
        setTotalProd(numOfProducts)
        setProducts(p)
        setResultLoaded(true)
        setPages(Math.ceil(numOfProducts / 25))
      })
    } catch (error) {
      console.log(error.message)
    }

  }

  const changePage = (e) => {
    setInputPage(e.target.value)
    if (e.target.value !== '') {
      setTimeout(() => {
        gotoPage(e.target.value)
      }, 500);
    }
  }

  const setPrinting = (event) => {
    printingOptions[event.target.value] = event.target.checked ? true : false
    let newArr = { ...printingOptions }
    localStorage.setItem('printing_options', JSON.stringify(newArr))
  }

  const gotoPage = (p) => {
    p = p <= 1 ? 1 : p
    p = p > pages ? pages : p
    setProducts([])
    setInputPage(p)
    fetchData(p)
  }

  useEffect(() => {
    if (resultLoaded === false) {
      resetActions()
      fetchData(page)
    }
  })

  useEffect(() => {
    fetchData(page)
  }, [searchTerm])

  const gotoPrintPage = () => {
    let newArr = { ...arrChecked }
    localStorage.setItem('print', '')
    localStorage.setItem('print', JSON.stringify(newArr))
    history.push('/products/print')
  }

  const ExportToExcel = () => {

  }

  const resetActions = () => {
    arrChecked = []
    localStorage.setItem('print', '')
    localStorage.setItem('printing_options', '')
  }

  const writePagination = () => {
    return (
      <div style={{ marginRight: 5 }}>
        Goto Page &nbsp;&nbsp;
        <input
          style={{ width: '100px', padding: '5px' }}
          type="number"
          onChange={changePage}
          value={inputPage}
          width="3"
        />
        /{pages} &nbsp; &nbsp;
        <button onClick={() => gotoPage(inputPage)}>Go</button>
      </div>
    )
  }

  const gotoPrint = (code, name, price) => {
    localStorage.setItem('print_name', name)
    localStorage.setItem('print_price', price)
    history.push(`/products/${code}`)
  }

  const enableOperations = (name, price) => (event) => {
    if (event.target.checked) {
      arrChecked[event.target.value] = {
        code: event.target.value,
        doPrint: true,
        name: name,
        price: price,
      }
    } else {
      arrChecked[event.target.value] = {
        code: '',
        doPrint: false,
        name: '',
        price: '',
      }
    }
    updateSelectedProductLength(document.querySelectorAll('input[class="products"]:checked').length)
  }

  const operationsTab = () => {
    return (
      <>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Actions</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <div>
                <h6>Printing Options</h6>
              </div>

              <div className="col-sm-1">
                <label>
                  <input type="checkbox" onChange={setPrinting} value="logo" />
                  &nbsp; Logo
                </label>
              </div>
              <div className="col-sm-1">
                <label>
                  <input type="checkbox" onChange={setPrinting} value="name" />
                  &nbsp; Name
                </label>
              </div>
              <div className="col-sm-1">
                <label>
                  <input type="checkbox" onChange={setPrinting} value="code" />
                  &nbsp; Code
                </label>
              </div>
              <div className="col-sm-1">
                <label>
                  <input type="checkbox" onChange={setPrinting} value="price" />
                  &nbsp; Price
                </label>
              </div>
              <div className="col-sm-1">
                <label>
                  <input type="checkbox" onChange={setPrinting} value="bar" />
                  &nbsp; Bar Code
                </label>
              </div>
              <div className="col-sm-1">
                <label>
                  <input type="checkbox" onChange={setPrinting} value="qr" />
                  &nbsp; QR Code
                </label>
              </div>
              <div className="col-sm-1">
                <CButton color="primary" type="button" onClick={gotoPrintPage}>
                  Print Codes
                </CButton>
              </div>
              <div className="col-sm-2">
                {/* <CButton color="primary" type="button" onClick={ExportToExcel}>
                  Export to Excel
                </CButton> */}
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="btn btn-primary"
                  table="table-to-xls"
                  filename="products"
                  sheet="tablexls"
                  buttonText="Export to Excel"
                />
              </div>
            </CRow>
            <hr />
            <CRow>
              <div className="col-sm-1">
                <CButton color="secondary" type="button">
                  Delete
                </CButton>
              </div>
            </CRow>
          </CCardBody>
        </CCard>
      </>
    )
  }

  const updateProduct = (id, p) => {
    history.push(`/products/${id}/edit/${p}`)
  }

  const stopPreviewImage = () => {
    setShowPreview('')
  }

  const previewImage = (image, name) => {
    setShowPreview(() => name + '&&&' + image)
  }

  const displayProducts = () => {
    return (
      <>
        <div>

          <table className="table prlist" id="table-to-xls">
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th width="1%">Image</th>
                <th width="5%">Code</th>
                <th width="25%">Name</th>
                <th width="10%">NickName</th>
                <th>Size</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Sub-Category</th>
                <th>Type</th>
                <th>Unit</th>
                {/* <th>Cost</th> */}
                <th>Price</th>
                <th>Qty</th>
                <th>Alert</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                // <tr key={p.code} className={"" + (checked ? "selectedTr" : "")}>
                <tr key={p.code}>
                  <td>
                    <input
                      type="checkbox"
                      className="products"
                      value={p.code}
                      onChange={enableOperations(p.nickname, p.price)}
                    />
                  </td>
                  <td>
                    <img onClick={() => previewImage(p.image, p.name)} src={p.image} width="35" height="35" />
                  </td>
                  <td>{p.code}</td>
                  <td>{p.name}</td>
                  <td>{p.nickname}</td>
                  {/* <td>{p.brand}</td> */}
                  <td><DisplayHtml text={p.brand} /></td>
                  <td>{p.model}</td>
                  <td>{p.category}</td>
                  <td>{p.subcategory}</td>
                  <td>{p.prtype.charAt(0).toUpperCase() + p.prtype.slice(1)}</td>
                  <td>{p.unit}</td>
                  {/* <td>{p.cost}</td> */}
                  <td>{p.price}</td>
                  <td>{p.quantity}</td>
                  <td>{p.alert}</td>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="button-tooltip-2">
                          Update Product
                        </Tooltip>
                      }
                    >
                      <Link to="#" path="#" onClick={() => updateProduct(p.code, page)}>
                        <CIcon icon={cilPen} className="cricon" />
                      </Link>
                    </OverlayTrigger>
                    &nbsp;&nbsp;| &nbsp;&nbsp;
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="button-tooltip-2">
                          Print QR Codes
                        </Tooltip>
                      }
                    >
                      <Link to="#" path="#" onClick={() => gotoPrint(p.code, p.nickname, p.price)}>
                        <CIcon icon={cilFingerprint} className="cricon" />
                      </Link>
                    </OverlayTrigger>
                    &nbsp;&nbsp;| &nbsp;&nbsp;
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="button-tooltip-2">
                          Delete <b>{p.name}</b>
                        </Tooltip>
                      }
                    >
                      <Link to="#" path="#" onClick={() => deleteProd(p.code, p.name)}>
                        <CIcon icon={cilDelete} className="cricon" />
                      </Link>
                    </OverlayTrigger>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </>
    )
  }

  const deleteProd = (c, n) => {
    if (window.confirm(`Deleting product ${n}`)) {
      axios.post(`${process.env.REACT_APP_API_URL}/products/delete/${c}`).then((data) => {
        fetchData(page)
      })
    }
  }

  const nextPrevBtns = () => {
    return (
      <div>
        {page > 1 ? (
          <a href="javascript:void(0)" onClick={() => gotoPage(Number(page) - 1)}>
            Previous
          </a>
        ) : (
          <></>
        )}
        &nbsp; &nbsp;
        {page < pages ? (
          <a href="javascript:void(0)" onClick={() => gotoPage(Number(page) + 1)}>
            Next
          </a>
        ) : (
          <></>
        )}
      </div>
    )
  }

  const addFilters = (filters) => {
    console.log(filters)
    setSearchTerm(filters)
    setPage(1)
    setInputPage(1)
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <SearchOperation searchName={"Name / NickName / Code / Category / SubCateory"} name="Products" actBy={addFilters} />
        </CCol>
        <CCol xs={12}>
          {selectedProductLength ? operationsTab() : <></>}

          <CCard className="mb-4">
            <CCardHeader>
              <strong>Products</strong>
            </CCardHeader>
            <CCardBody>
              {displayProducts()}
              <table className="table table">
                <tbody>
                  <tr>
                    <td>
                      Showing &nbsp;
                      {(page - 1) * 25 + 1} to {totalProd < page * 25 ? totalProd : page * 25}
                      &nbsp; of {totalProd} Products
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {totalProd > 10 ? nextPrevBtns() : <div></div>}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      {totalProd > 10 ? writePagination() : <div></div>}
                    </td>
                  </tr>
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <div className="row">
          {
            showPreview &&
            <ImageComponent
              src={showPreview}
              handleClose={stopPreviewImage}
            />
          }
        </div>
      </CRow>
    </>
  )
}

export default Products
