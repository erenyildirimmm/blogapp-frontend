import React from "react";

const Section = ({ children, brand }) => {
  return (
    <section className="mb-16">
      {brand && <h1 className="text-3xl mb-12">{brand}</h1>}
      {children}
    </section>
  );
};

export default Section;
