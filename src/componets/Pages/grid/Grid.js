import React, { useState, useEffect } from "react";
// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {
  MDBTableHead,
  MDBTable,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBBtnGroup,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";


const Grid = () => {

  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [sortFilterValue, setSortFilterValue] = useState("");
  const [operation, setOperation] = useState("");
  const [pageLimit] = useState(4);



  const sortOptions = ["name", "email", "phone", "status", "address"];
  useEffect(() => {
    loadUsersData(0, 4, 0);
  }, []);

  

  const loadUsersData = async (
    start,
    end,
    increase,
    optType = null,
    filterOrSortValue
  ) => {
    switch (optType) {
      case "search":
        setOperation(optType);
        setSortValue("");
        return await axios
          .get(
            `http://localhost:3001/users?q=${value}&_start=${start}&_end=${end}`
          )
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));

      case "sort":
        setOperation(optType);
        setSortFilterValue(filterOrSortValue);
        return await axios
          .get(
            `http://localhost:3001/users?_sort=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`
          )
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));

      case "filter":
        setOperation(optType);
        setSortFilterValue(filterOrSortValue);
        return await axios
          .get(
            `http://localhost:3001/users?status=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`
          )
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));

      default:
        return await axios
          .get(`http://localhost:3001/users?_start=${start}&_end=${end}`)
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
    }
  };
  console.log("data", data);

  const HandleReset = () => {
    setOperation("");
    setValue("");
    setSortFilterValue("");
    setSortValue("");
    loadUsersData(0, 4, 0);
  };
  const HandleSearch = async (e) => {
    e.preventDefault();

    loadUsersData(0, 4, 0, "search");
   
  };
  const HandleSort = async (e) => {
    let value = e.target.value;
    loadUsersData(0, 4, 0, "sort", value);
    setSortValue(value);
   
  };
  const HandleFilter = async (value) => {
    loadUsersData(0, 4, 0, "filter", value);
   
  };

  const renderPagination = () => {
    if (data.length < 4 && currentPage === 0) return null;
    if (currentPage === 0) {
      return (
        <MDBPagination className=" mb-0">
          <MDBPaginationItem>
            <MDBPaginationLink>1</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              onClick={() => loadUsersData(4, 8, 1, operation, sortFilterValue)}
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (currentPage < pageLimit - 1 && data.length === pageLimit) {
      return (
        <MDBPagination className=" mb-0">
          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                loadUsersData(
                  (currentPage - 1) * 4,
                  currentPage * 4,
                  -1,
                  operation,
                  sortFilterValue
                )
              }
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                loadUsersData(
                  (currentPage + 1) * 4,
                  (currentPage + 2) * 4,
                  1,
                  operation,
                  sortFilterValue
                )
              }
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else {
      return (
        <MDBPagination className=" mb-0">
          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                loadUsersData(
                  (currentPage - 1) * 4,
                  currentPage * 4,
                  -1,
                  operation,
                  sortFilterValue
                )
              }
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };
  
  return (
    <div>
    <MDBContainer>
    <form
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "400px",
        alignContent: "center",
      }}
      className="d-flex input-group w-auto"
      onSubmit={HandleSearch}
    >
      <input
        type="text"
        className="form-control"
        placeholder="Search Name ... "
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <MDBBtn type="submit" color="dark">
        Search
      </MDBBtn>
      <MDBBtn className="mx-5" color="info" onClick={() => HandleReset()}>
        Reset
      </MDBBtn>
    </form>
    <div style={{ marginTop: "100px" }}>
      <h2 className="text-center">
        Search Filter,sort and pagination using JSON using API
      </h2>
      <MDBRow size="20">
        <MDBTable>
          <MDBTableHead dark>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </MDBTableHead>
          {data.length === 0 ? (
            <MDBTableBody className="align-center mb-0">
              <tr>
                <td colSpan={8} className="text-center mb-0">
                  No data Found
                </td>
              </tr>
            </MDBTableBody>
          ) : (
            data.map((item, index) => (
              <MDBTableBody key={index}>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>{item.status}</td>
                  <td>{item.Action}</td>
                  <td><a className="btn btn-success"> Edit</a></td> 

                </tr>
              </MDBTableBody>
            ))
          )}
        </MDBTable>
      </MDBRow>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "200px",
          alignContent: "center",
        }}
      >
        {renderPagination()}
      </div>
    </div>
    {data.length > 0 && (
      <MDBRow>
        <MDBCol size="7">
          <h5>Sort By:</h5>
          <select
            name=""
            id=""
            style={{ width: "50%", borderRadius: "2px", height: "35px" }}
            onChange={HandleSort}
            value={sortValue}
          >
            <option value="">Please Select Value</option>
            {sortOptions.map((item, index) => {
              <option value={item} key={index}>
                {item}
              </option>;
            })}
          </select>
        </MDBCol>

        <MDBCol size="5">
          <h5>Filter by Status</h5>
          <MDBBtnGroup>
            <MDBBtn color="success" onClick={() => HandleFilter("Active")}>
              Active
            </MDBBtn>
            <MDBBtn
              color="danger"
              style={{ marginLeft: "2px" }}
              onClick={() => HandleFilter("Inactive")}
            >
              Inctive
            </MDBBtn>
          </MDBBtnGroup>
        </MDBCol>
      </MDBRow>
    )}
  </MDBContainer>
    </div>
  )
}

export default Grid;