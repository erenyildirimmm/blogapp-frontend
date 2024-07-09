import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3">
        asd
      </div>
      <div className="col-span-9">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
