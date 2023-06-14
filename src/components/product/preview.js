import React, { useEffect, useState } from 'react'

import QrCode from './QRCode'
import Barcode from 'react-barcode'

import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

const PrintPreview = (props) => {
  const [isPCodePicked, setIsCodePicked] = useState(false)
  const [logo, setLogo] = useState(false)
  const [po, setPO] = useState({})
  let [i, setI] = useState(1)
  const defaultOptions = {
    size: 50,
  }

  useEffect(() => {
    if (!isPCodePicked) {
      setIsCodePicked(true)
      Object.entries(JSON.parse(localStorage.getItem('printing_options'))).map(([key, value]) => {
        po[key] = value
      })
    }
  })

  const printThisPage = () => {
    window.print()
  }

  const styles = {
    border: '1px solid',
  }

  return (
    <>
      {isPCodePicked ? (
        <>
          <div className="mt-4 mb-4" style={{ textAlign: 'right', marginRight: '30px' }}>
            <button type="button" className="primary noprint" onClick={printThisPage}>
              Print
            </button>
          </div>

          <div>
            <CCol xs={12}>
              <div className="mb-1">

                {Object.entries(JSON.parse(localStorage.getItem('print'))).map(([key, value]) => {
                  let n = parseInt(value.num)
                  let d = value.doPrint ? (
                    <>
                      {po.qr ? (
                        <CRow key={key} className="mb-4">
                          {[...Array(n)].map((i) => {
                            return (
                              <div className="col-sm-1 text-center">
                                <div className="caption">{po.name ? value.name : <></>}</div>
                                <div>
                                  <QrCode size="20" style={styles} url={key} options={defaultOptions} />
                                </div>
                                <div className="caption">
                                  {po.code ? key + '-' : <></>}
                                  {po.price ? value.price : <></>}
                                </div>
                              </div>
                            )
                          })}
                        </CRow>
                      ) : (
                        <></>
                      )}

                      {po.bar ? (
                        <CRow key={key} className="mb-4">
                          {[...Array(n)].map((i) => {
                            return (
                              <div className="col-sm-2 text-center">
                                <div className="caption">{po.name ? value.name : <></>}</div>
                                <div>
                                  <Barcode
                                    value={key}
                                    width="2"
                                    height="50"
                                    textMargin="2"
                                    fontSize="10"
                                  />
                                </div>
                                {/* <div className="caption">
                                    {po.code ? key + '-' : <></>}
                                    {po.price ? value.price : <></>}
                                  </div> */}
                              </div>
                            )
                          })}
                        </CRow>
                      ) : (
                        <></>
                      )}
                      <hr />
                      {i == 4 ? <div className="pagebreak"></div> : null}
                    </>
                  ) : (
                    <></>
                  )
                  i = i + 1
                  return d
                })}
              </div>
            </CCol>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default PrintPreview
