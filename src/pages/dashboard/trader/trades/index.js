import React, { useState } from 'react'
import TradeList from './tradeList'

import Trade from './trade'
import Navbar from '../Navbar'

export default function Profile({ setSidebar, sidebar }) {
  const [view, setView] = useState(null)
  const [singleTrade] = useState({
    productName: 'productName',
    exchangeProduct: 'productName',
    description: 'it is a simple description',
    images: [1, 2, 3, 4, 5],
  })
  const [editAble, setEditAble] = useState(false)
  const [newRecord, setnewRecord] = useState(false)
  const [recordForEdit, setRecordForEdit] = useState(null)

  // const addOrEdit = (Brand, resetForm) => {
  //   if (!Brand.Brand_ID) {
  //     // insertBrand(Brand);
  //   } else if (Brand.Brand_ID) {
  //     // updateBrand(Brand);
  //   }
  //   // setRecordForEdit(null);
  //   // setEditable(false);
  // };
  return (
    <>
      <Navbar
        setSidebar={setSidebar}
        sidebar={sidebar}
        title={
          editAble && view === 'view' && recordForEdit
            ? 'Edit Trade Details'
            : editAble && view === 'view' && !recordForEdit
            ? 'Add New Trade'
            : !editAble && view === 'view' && !recordForEdit
            ? 'Trade Details'
            : 'My Trading Products'
        }
      />
      {view === 'view' ? (
        <Trade
          singleTrade={singleTrade}
          editAble={editAble}
          setEditAble={setEditAble}
          setView={setView}
          recordForEdit={recordForEdit}
          setRecordForEdit={setRecordForEdit}
          newRecord={newRecord}
        />
      ) : (
        <TradeList
          setView={setView}
          setRecordForEdit={setRecordForEdit}
          setEditAble={setEditAble}
          setNewRecord={setnewRecord}
        />
      )}
    </>
  )
}
