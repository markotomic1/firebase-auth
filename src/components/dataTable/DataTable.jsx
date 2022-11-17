import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userRows, userColumns } from "../../dataTableSource";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
const DataTable = () => {
  const [data, setData] = useState([]);
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
    } catch (error) {
      console.log(error);
    }
    setData(data.filter((item) => item.id !== id));
  };
  useEffect(() => {
    // const fetchData = async () => {
    //   let list = [];
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "users"));
    //     querySnapshot.forEach((doc) => {
    //       // doc.data() is never undefined for query doc snapshots
    //       list.push({ id: doc.id, ...doc.data() });
    //       console.log(doc.id, " => ", doc.data());
    //     });
    //     setData(list);
    //     console.log(list);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetchData();
    //listen
    //real time

    const unsub = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        let list = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (err) => console.log(err)
    );

    return () => {
      unsub();
    };
  }, []);
  // console.log(data);
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className='cellAction'>
            <Link to='/users/test' className='link'>
              <div className='viewButton'>View</div>
            </Link>
            <div
              className='deleteButton'
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className='dataTable'>
      <div className='dataTableTitle'>
        Add New User
        <Link to='/users/new' className='link'>
          Add New
        </Link>
      </div>
      <DataGrid
        className='datagrid'
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={7}
        rowsPerPageOptions={[7]}
        checkboxSelection
      />
    </div>
  );
};

export default DataTable;
