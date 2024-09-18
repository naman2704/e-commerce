import User from "./User";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../Redux/slices/usersSlice";
import CommonDataTable from "./Common/CommonDataTable";

const Users = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const columns = [
    {
      Header: "Name",
      accessor: "name", // key for data access
    },
    {
      Header: "Email",
      accessor: "email",
      Cell: (props) => {
        console.log(props);
        return (
          <h1 style={{ color: "red", fontWeight: "900" }}>
            {props?.row?.original?.email}
          </h1>
        );
      },
    },
    {
      Header: "Role",
      accessor: "role",
    },
    {
      Header: "Created Date",
      accessor: "createdAt",
    },
    {
      Header: "Delete",
      accessor: "delete",
      Cell: (props) => (
        <h5
          onClick={() => {
            console.log(props.row.original._id);
          }}
        >
          delete
        </h5>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllUsers())
      .unwrap()
      .then((res) => {
        console.log("res: ", res);
        // const users = useSelector((state) => state);
        // console.log(users);
        if (res?.status === 1) {
          setUsers(res?.users);
        }
      });
  }, []);
  return (
    <section>
      <header className="text-2xl font-bold text-center my-6">Users</header>
      <CommonDataTable tableData={users} columnsData={columns} />
    </section>
  );
};

export default Users;
