import React from 'react'

const CardBox = ({children, className}) => {
  return <div className={`bg-white rounded-lg shadow-sm ${className}`}>{children}</div>;
}

export default CardBox