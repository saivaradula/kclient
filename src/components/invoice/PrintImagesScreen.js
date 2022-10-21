import React from 'react';
import moment from 'moment'

const PrintImagesScreen = ({ records }) => {
    let j = 0;
    const loadData = (p) => {
        return (
            <>
                <div className="row">
                    <div className="text-center">
                        <img src={p.image} height="120px" width="120px" />
                    </div>
                    <div className="text-center fw800">{p.nickname} ({p.quantity})</div>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="row">
                <table className="table printtable alignright">
                    <tr><td>Date: {moment.utc(records[0].pStartDate).format('dddd - MMM Do, YYYY')}</td></tr>
                </table>
                <table className="table printtable">
                    {
                        records.map((p, i) => {
                            j = i + 1;
                            return (j % 4 == 0) ?
                                <><td>{loadData(p)}</td><tr></tr></>
                                : <><td>{loadData(p)}</td></>

                        })
                    }
                </table>
            </div>
        </>
    )
}

export default PrintImagesScreen