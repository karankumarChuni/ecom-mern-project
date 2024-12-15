import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AiOutlineDelete } from "react-icons/ai";
import Loadercomp from "../../../components/Loadercomp";
import { BsQuestionLg } from "react-icons/bs";
import { useContactlistQuery, useDeleteContactMutation } from "../../../store/api/webinfoapi";

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
      field: "fullname",
      headerName: "Full Name",
      headerAlign: "center",
      align: "center",
      flex: 0.6,
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "mobile",
      headerName: "Mobile No",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    { field: "Message", headerName: "Message", flex: 1 },
    {
      field: "_id",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      flex: 0.8,
      renderCell: ({ row: { _id } }) => {
        return (
          <div>
            <NavLink
              to="#"
              onClick={() => {
                setisdelete(_id);
              }}
            >
              <AiOutlineDelete
                style={{ paddingRight: "5px" }}
                fontSize={23}
                color="#0C5398"
              />
            </NavLink>
            {/* <NavLink to={`/viewcontactform/${_id}`}> */}
            <NavLink to={"#"}>
              <BiEdit fontSize={16} color="#0C5398" />
            </NavLink>
          </div>
        );
      },
    },
  ];

  // delete user record start here
  const [deletereord] = useDeleteContactMutation();
  const deleteuser = async () => {
    await deletereord(isdelete);
    setisdelete(0);
    window.location.reload();
  };
  // delete user record end here

  // fetch all users API start here
  const { data: userData, isLoading } = useContactlistQuery();
  console.log("Contact us data:", userData); // Debugging the API response

  useEffect(() => {
    if (userData?.data) {
      const dataWithSerialNumbers = userData.data.map((row, index) => ({
        ...row,
        serialNo: index + 1, // Adding serial number
        id: row._id, // Using _id from the API response as a unique identifier
        fullname: `${row.firstname} ${row.lastname}`, // Combining firstname and lastname
        formatdate: new Date(row.createdAt).toLocaleString("en-GB", {
          dateStyle: "short",
          timeStyle: "short",
        }), // Formatting createdAt properly
      }));
      setData(dataWithSerialNumbers);
    }
  }, [userData]);

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
      {/* Modal for delete confirmation */}
      <div
        className={isdelete !== 0 ? "modal fade show" : "modal fade"}
        style={{ display: isdelete !== 0 ? "block" : "none" }}
        id="exampleModal1400000"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <BsQuestionLg className="question-logo" />
            <div className="modal-header mod-line"></div>
            <div className="modal-body">
              <div className="row gy-3 mt-2">
                <h1 className="ccedit-h">Warning</h1>
                <p className="ccedit-p">Do You Really Want to Delete This Record?</p>
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
