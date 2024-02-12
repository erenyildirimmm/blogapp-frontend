import React from 'react'
import { ClipLoader } from 'react-spinners'

const Spinner = () => {
  return (
    <ClipLoader
      color="#00df9a"
      size={80}
      className="!absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    />
  );
}

export default Spinner