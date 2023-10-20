import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import AdmincenterCompoment from "../components/admincenter";
import AdminPaymentTrack from "../components/AdminPaymentTrack"
import AdminUser from "../components/AdminUser";

function Admincenter() {
  return (
    <div>
      <Header />
        <div className="text-center p-6">
        <h1 className="text-3xl font-semibold">Admin Center</h1>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-100 rounded shadow">
            <AdminPaymentTrack/>
          </div>
          <div className="p-4 bg-gray-100 rounded shadow">
            <AdminUser />
          </div>
          <div className="p-4 bg-gray-100 rounded shadow">
            Artwork Manage
          </div>
          <div className="p-4 bg-gray-100 rounded shadow">
            Tag Manage
          </div>
        </div>
        </div>
      <Footer  fixBottom={true} />
    </div>
  );
}

export default Admincenter;
