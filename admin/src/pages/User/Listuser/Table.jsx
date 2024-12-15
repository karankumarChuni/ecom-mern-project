import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AiOutlineDelete } from "react-icons/ai";
import Loadercomp from "../../../components/Loadercomp";
import { useDeleteUserMutation, useGetAllUsersQuery } from "../../../store/api/userapi";
import { BsQuestionLg } from "react-icons/bs";

const Table = () => {
  const [data, setData] = useState([]); // For processed data to display in DataGrid
  const [isdelete, setIsDelete] = useState(0); // Tracks user to delete

  // Define columns for DataGrid
  const columns = [
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
    {
      field: "formatdate",
      headerName: "Created Date & Time",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      flex: 0.5,
      renderCell: ({ row: { status } }) => (
        <button
          className={
            status === "Active"
              ? "btn btn-success custombtn12 custombtn122"
              : "btn btn-danger custombtn12 custombtn121"
          }
        >
          {status === "Active" ? "Active" : "Inactive"}
        </button>
      ),
    },
    {
      field: "_id",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      flex: 0.8,
      renderCell: ({ row: { _id } }) => (
        <div>
          <NavLink
            to="#"
            onClick={() => {
              setIsDelete(_id);
            }}
          >
            <AiOutlineDelete
              style={{ paddingRight: "5px" }}
              fontSize={23}
              color="#0C5398"
            />
          </NavLink>
          <NavLink to={`/edituser/${_id}`}>
            <BiEdit fontSize={16} color="#0C5398" />
          </NavLink>
        </div>
      ),
    },
  ];

  // Delete user record
  const [deleteRecord, deleteResponse] = useDeleteUserMutation();
  const deleteUser = async () => {
    try {
      await deleteRecord(isdelete); // Call delete API
      setIsDelete(0);
      window.location.reload(); // Refresh the page after delete
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Fetch all users API
  const { data: userData, isLoading } = useGetAllUsersQuery();

  // Process user data when API returns it
  useEffect(() => {
    if (userData) {
      try {
        const dataWithSerialNumbers = userData.data.map((row, index) => ({
          ...row,
          serialNo: index + 1, // Add serial number for DataGrid
          id: row._id, // Assign unique ID
          fullname: `${row.first_name} ${row.last_name}`, // Concatenate full name
          formatdate: new Date(row.createdAt).toLocaleString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }), // Format date
        }));
        setData(dataWithSerialNumbers);
        console.log("Processed Data for Grid:", dataWithSerialNumbers);
      } catch (error) {
        console.error("Error processing user data:", error);
      }
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
          columns={columns}
          rows={data}
          density="compact"
          pageSizeOptions={[10, 20, 30, 50, 100]}
          components={{ Toolbar: GridToolbar }}
        />
      )}

      {/* Delete Confirmation Modal */}
      <div
        className={isdelete !== 0 ? "modal fade show" : "modal fade"}
        style={{ display: isdelete !== 0 ? "block" : "none" }}
        id="exampleModal1400000"
        tabIndex="-1"
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
                <p className="ccedit-p">Do You Really Want to Delete This Record?</p>
              </div>
            </div>
            <div className="modal-footer mod-line m-auto">
              <button
                type="button"
                className="btn closebtn text-white"
                onClick={deleteUser}
              >
                Proceed
              </button>
              <button
                type="button"
                className="btn text-white"
                style={{ background: "grey" }}
                onClick={() => {
                  setIsDelete(0);
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
