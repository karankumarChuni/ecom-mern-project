import React from "react";
import img1 from "../../assets/Ellipse 27.png";
import img2 from "../../assets/Ellipse 28.png";
import img3 from "../../assets/Ellipse 29.png";
import img4 from "../../assets/Western union.png";
import Breadcupdash from "../../components/Breadcupdash";
import { useCountinfoQuery } from "../../store/api/webinfoapi";

const Dashboard = () => {
  const { data, error, isLoading } = useCountinfoQuery();
  
  // Check if data is loading or error exists
  if (isLoading) {
    return <div>Loading...</div>; // Show a loading message or spinner
  }

  if (error) {
    return <div>Error loading data.</div>; // Handle errors if the data fetch fails
  }

  // Safe to access the data here
  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      <div className="dashboardcontent">
        <Breadcupdash name={"Dashboard"} />
        <div className="container-fluid py-4" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
          <div className="row">
            {/* Display Total Customer */}
            <div className="col-lg-4 mb-2 col-md-6 col-12 dbox">
              <div className="row bg-white py-3 d-flex align-items-center rounded py-2">
                <div className="col-3">
                  <img src={img1} alt="" />
                </div>
                <div className="col-9">
                  <p className="dbold">{data.totalUsers}</p>
                  <p className="pbold">Total Customer</p>
                </div>
              </div>
            </div>

            {/* Display Total Categories */}
            <div className="col-lg-4 mb-2 col-md-6 col-12 dbox">
              <div className="row bg-white py-3 d-flex align-items-center rounded py-2">
                <div className="col-3">
                  <img src={img2} width="63px" alt="" />
                </div>
                <div className="col-9">
                  <p className="dbold">{data.totalCategories}</p>
                  <p className="pbold">Total Categories</p>
                </div>
              </div>
            </div>

            {/* Display Total Orders */}
            <div className="col-lg-4 mb-2 col-md-6 col-12 dbox">
              <div className="row bg-white py-3 d-flex align-items-center rounded py-2">
                <div className="col-3">
                  <img src={img3} width="63px" alt="" />
                </div>
                <div className="col-9">
                  <p className="dbold">{data.totalOrders}</p>
                  <p className="pbold">Total Orders</p>
                </div>
              </div>
            </div>
          </div>

          {/* Display Latest Customers */}
          <div className="row mt-3 mx-1">
            <div className="col-lg-6 col-12 dbox rounded my-lg-0 my-2 bg-white specailshow">
              <div className="row">
                <div className="col-12 dtext py-2">10 Latest Customers</div>
                <div className="col-12 px-2">
                  <div className="underline"></div>
                </div>
              </div>
              <div className="headtb special">
                <div className="sno" style={{ position: "relative", left: "8px" }}>Full Name</div>
                <div className="companylogo">Mobile</div>
                <div className="amount">Email</div>
              </div>

              {/* Map over latest customers */}
              {data.latestCustomers.map((item, index) => (
                <div className="headtb" key={index}>
                  <div className="sno px-3">{`${item.first_name} ${item.last_name}`}</div>
                  <div>{item.mobile}</div>
                  <div className="amount">{item.email}</div>
                </div>
              ))}
            </div>

            {/* Display Latest Orders */}
            <div className="col-lg-6 col-12 dbox">
              <div className="row rounded bg-white">
                <div className="col-12 d-flex justify-content-between">
                  <div className="dtext py-2">10 Latest Orders</div>
                </div>
                <div className="col-12 px-2">
                  <div className="underline"></div>
                </div>
                <div className="headtb special">
                  <div className="sno" style={{ position: "relative", left: "20px" }}>Order ID</div>
                  <div className="companylogo" style={{ position: "relative", left: "50px" }}>Order Status</div>
                  <div className="amount">Amount</div>
                </div>

                {/* Map over latest orders */}
                {data.latestOrders.map((item, index) => (
                  <div className="headtb" key={index}>
                    <div className="sno px-3">{item.orderid}</div>
                    <div className="companylogo">{item.order_status}</div>
                    <div className="amount">₹{item.grand_total_amount}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
