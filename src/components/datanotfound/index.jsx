import React from 'react';
import {RiDeleteBin5Fill} from "react-icons/ri";

function dataNotFound() {
  return (
    <div style={{display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: "center", margin: 50}}> 
    <RiDeleteBin5Fill size={50} className='mb-4' color='#fff' />
    <h2 style={{textAlign: "center", color:'#757575'}}>Data not Found</h2>
    </div>
  )
}

export default dataNotFound;