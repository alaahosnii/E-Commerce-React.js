import React from 'react'
import "./SizeCard.css"
function SizeCard({ size, onSelect }) {

  return (
    <div onClick={() => onSelect(size)} style={{ width: "32px", height: "32px" }} className={`${size.selected ? "bg-danger text-white border-danger" : "bg-white text-black border-black"} sizeCard border border-1  rounded p-3 d-flex align-items-center justify-content-center`}>{size.sizeNumber}</div>
  )
}

export default SizeCard;