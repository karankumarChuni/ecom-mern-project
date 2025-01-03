import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AiOutlineDelete } from "react-icons/ai";
import Loadercomp from "../../../components/Loadercomp";
import { BsQuestionLg } from "react-icons/bs";
import { useDeleteCartMutation, useGetAllCartItemQuery } from "../../../store/api/cartapi";

const Table = () => {
  const [data, setData] = useState([]);
  const [isdelete, setisdelete] = useState(0);

  const colums = [
    {
      field: "serialNo",
      headerName: "S.No",
      headerAlign: "center",
      align: "center",
      flex: 0.3,
    },
    {
      field: "product_name",
      headerName: "Product Name",
      headerAlign: "center",
      align: "center",
      flex: 0.6,
    },
    {
      field: "product_qty",
      headerName: "Quantity",
      headerAlign: "center",
      align: "center",
      flex: 0.7,
    },
    {
      field: "s_price",
      headerName: "Price",
      headerAlign: "center",
      align: "center",
      flex: 0.7,
    },
    // {
    //   field: "weightwithtype",
    //   headerName: "Weight",
    //   headerAlign: "center",
    //   align: "center",
    //   flex: 0.7,
    // },
    {
      field: "orderstatus",
      headerName: "order Status",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    { field: "formatdate", headerName: "Created Date & Time", flex: 1 },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   headerAlign: "center",
    //   align: "center",
    //   flex: 0.5,
    //   renderCell: ({ row: { status } }) => {
    //     return (
    //       <button
    //         className={
    //           status === "Active"
    //             ? "btn btn-success custombtn12 custombtn122"
    //             : "btn btn-danger custombtn12 custombtn121"
    //         }
    //       >
    //         {status === "Active" ? "Active" : "Inactive"}
    //       </button>
    //     );
    //   },
    // },
    {
      field: "_id",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      flex: 0.8,
      renderCell: ({ row: { _id } }) => {
        return (
          <div>
            <NavLink to="#"  onClick={() => {
                setisdelete(_id);
              }}>
              <AiOutlineDelete
                style={{ paddingRight: "5px" }}
                fontSize={23}
                color="#0C5398"
              />
            </NavLink>
            {/* <NavLink to={`/edituser/${_id}`}>
              <BiEdit fontSize={16} color="#0C5398" />
            </NavLink> */}
          </div>
        );
      },
    },
  ];




    // delete user record start here
    const [deletereord, deleteresponse] = useDeleteCartMutation();
    const deleteuser = () => {
      const response = deletereord(isdelete);
      setisdelete(0);
      window.location.reload();
    };
    // delete user record end here




  // fetch all usere api start here
  const { data: cartData, isLoading } = useGetAllCartItemQuery();

  useEffect(() => {
    if (cartData) {
      async function fetchData() {
        try {
          const dataWithSerialNumbers = cartData.data.map((row, index) => ({
            ...row,
            serialNo: index + 1,
            id: row._id || index + 1,
            weightwithtype: row.weight && row.weight_type 
              ? `${row.weight} ${row.weight_type}` 
              : "N/A",
            s_price: row.product_id 
              ? row.product_id.selling_price 
              : row.product_variant_id 
              ? row.product_variant_id.selling_price 
              : "N/A",
            formatdate: row.createdAt 
              ? new Date(row.createdAt).toLocaleDateString('en-GB', {
                  hour: 'numeric',
                  minute: 'numeric',
                }) 
              : "N/A",
          }));
          console.log("Mapped Data for Table:", dataWithSerialNumbers);
          setData(dataWithSerialNumbers);
        } catch (error) {
          console.error("Error mapping cart data:", error);
        }
      }
      fetchData();
    }
  }, [cartData]);
  

  
  return (
    <div
      className="row bg-white pb-4 rounded-bottom table-responsive"
      style={{ paddingBottom: "7rem" }}
    >
      {isLoading ? (
        <div style={{ textAlign: "center", fontWeight: "700" }}>
          <Loadercomp size={100} />
        </div>
      ) : (
        <DataGrid
          columns={colums}
          rows={data}
          density="compact"
          pageSizeOptions={[10, 20, 30, 50, 100]}
          components={{ Toolbar: GridToolbar }}
        />
      )}
      <div
        className={isdelete !== 0 ? "modal fade show" : "modal fade"}
        style={{ display: isdelete !== 0 ? "block" : "none" }}
        id="exampleModal1400000"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <BsQuestionLg className="question-logo" />
            <div className="modal-header mod-line"></div>
            <div className="modal-body">
              <div className="row gy-3 mt-2">
                <h1 className="ccedit-h">Warning</h1>
                <p className="ccedit-p">
                  Do You Really Want to Delete This Reord
                </p>
              </div>
            </div>
            <div className="modal-footer mod-line m-auto">
              <button
                type="button"
                className="btn closebtn text-white"
                onClick={deleteuser}
              >
                Proceed
              </button>
              <button
                type="button"
                className="btn text-white"
                style={{ background: "grey" }}
                onClick={() => {
                  setisdelete(0);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
