import React, { useEffect, useRef, useState } from 'react'

const NavbarDropdown = ({children, isActive, setIsActive, data}) => {
  const dropdownRef = useRef(null);
  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {children}
      {isActive && (
        <div
          onBlur={() => setIsActive(false)}
          className="absolute top-9 text-sm left-0 bg-gray-900 rounded-md text-white z-10"
        >
          {data ? data.map((category, i) => (
            <div key={i}>{category.name}</div>
          )) : <div>asdasdas</div>}
        </div>
      )}
    </div>
  );
}

export default NavbarDropdown