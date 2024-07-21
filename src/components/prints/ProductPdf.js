import React from 'react'
import { jsPDF } from 'jspdf'
import axios from 'axios'

export const ProductPdf = ({ data }) => {
  return (
    <table id="table-to-pdf" className="table table-striped">
      <tr>
        {data.map((p, i) => {
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
  )
}
