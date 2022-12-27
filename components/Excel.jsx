import React from 'react'
import Script from 'next/script'
import { useEffect } from 'react';
import 'table2excel';
const Table2Excel = window.Table2Excel;

export default function Excel(table) {
    if(table){
    const table2excel = new Table2Excel();
    table2excel.export(document.querySelector("#records"));
    }
  return (
 <div>
    <table id='records'>
       <thead> <th>hdhd</th></thead>
       <thead> <th>hdhd</th></thead>
       <tbody>
        <td>sd</td>
        <td>sd</td>
       </tbody>
    </table>
      
 </div>
  )
}
