import React from 'react'
import { useState } from 'react'

export default function DataTable() {
    const [columsHide, setcolumsHide] = useState([])
    const [columsRender, setcolumsRender] = useState(true)
    const Columns = [
        {
            id:"d1",
            name:"fullname"
        },
        {
            id:"d2",
            name:"age"
        },
        {
            id:"d3",
            name:"school"
        },
        {
            id:"d4",
            name:"class"
        }
    ]
    const handleSelectedhide = (e)=>{
        const val = JSON.parse(e.target.value)
        // document.getElementsByClassName(`${val.id}`).remove()
        const boxes = document.querySelectorAll(`.${val.id}`);
        boxes.forEach(box => {
          box.classList.remove();
        });
        new Promise((resolve, reject) => {
            setcolumsRender(false)
            columsHide.push(val)
            resolve()
          }).then(()=>{
            setcolumsRender(true)
          })
    }

    const handleCloseHide = (doc)=>{
       new Promise((resolve, reject) => {
        setcolumsRender(false)
        resolve()
        setcolumsHide(
            columsHide.filter(filt=> filt.id != doc.id)
        )
       }).then(()=>{
        setcolumsRender(true)
       })
    }
  return (
    <div>
        <div className="tableFilter">
            <button className="filterBtn">
                Filter
            </button>
        </div>
        <div className="filterModal">
            <div className="h2 padding hr">Filter Data</div>
            <div className="padding section">
                <div>
                    <div className='section h4'>Hide Column</div>
                    <div className="section">
                        <select name="" className='input' id="" onChange={handleSelectedhide}>
                            <option value="">Select columns to hide</option>
                            {
                            Columns ?
                            Columns.map(doc=>(
                                <option key={doc.id} value={JSON.stringify(doc)}>
                                    {doc.name}
                                </option>
                            )):""
                        }
                        </select>
                    </div>
                    <div className="row-flex">
                        {
                            columsHide && columsRender ?
                            columsHide.map(doc=>(
                                <div key={doc.id} className="filterTab" onClick={()=>handleCloseHide(doc)}>
                                    {doc.name} <i className="icon-close"></i>
                                </div>
                            )):""
                        }
                    </div>
                </div>
            </div>
        </div>
        <table className='dTable' id='dataTable'>
            <thead>
                <th className='d1'>Fullname</th>
                <th className='d2'>Age</th>
                <th className='d3'>School</th>
                <th className='d4'>Class</th>
            </thead>
            <tbody>
                <tr>
                    <td  className='d1'>Iddris Abdul Wahab</td>
                    <td className='d2'>31</td>
                    <td className='d3'>Tamale Technical</td>
                    <td className='d4'>Class A</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}
