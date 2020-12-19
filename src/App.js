import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout } from "antd";

import "./App.css";
import Navbar from "./components/Navbar";
import Pagination from "./components/Pagination";
import { paginate } from "./utilities/paginate";

import { Input } from 'antd';
import { Table } from "antd";

function App() {
  const api_url = "https://api.github.com/users/mosh-hamedani/followers";
  const { Header, Footer, Content } = Layout;
  const [followers, setFollowers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { Search } = Input;

  const pageSize = 6;
  const users = paginate(followers, currentPage, pageSize);
  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar_url",
      key: "avatar_url",
      render: (dataIndex) => <img src={dataIndex} alt="s" />,
    },
    {
      title: "Username",
      dataIndex: "login",
      key: "login",
    },
    {
      title: "Repository",
      dataIndex: "html_url",
      key: "html_url",
      render: (dataIndex) => <a href={dataIndex}>Visit</a>,
    },
  ];

  useEffect(() => {
    axios
      .get(api_url)
      .then((res) => {
        console.log("sorted", res.data);
        setFollowers(
          res.data.sort((a, b) =>
            a.login.toUpperCase() > b.login.toUpperCase() ? 1 : -1
          )
        );
      })
      .catch((err) => console.log(err));
  }, []);

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  function onSearch() {
    console.log('onsearch clicked')
  }

  return (
    <>
      <Layout>
        <Header>
          <Navbar />
          <Search
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            style={{ width: 200, margin: "0 10px" }}
          />
        </Header>
        <Content>
          <Table
            dataSource={followers}
            pagination={{ pageSize }}
            columns={columns}
          />
          ;
          {/* <Pagination
            itemsCount={followers.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          /> */}
        </Content>
        <Footer></Footer>
      </Layout>
    </>
  );
}

export default App;

// backup table

// <Layout>
// <Header>
//   <Navbar />
// </Header>
// <Content>
//   <table>
//     <thead className="columns">
//       <tr>
//         <th>Avatar</th>
//         <th>Username</th>
//         <th>Repository</th>
//       </tr>
//     </thead>
//     <tbody>
//       {users.map((follower) => (
//         <tr key={follower.id}>
//           <td>
//             <img
//               className="avatar"
//               src={follower.avatar_url}
//               alt={follower.login}
//             />
//           </td>
//           <td>{follower.login}</td>
//           <td>
//             <a href={follower.html_url}>Visit</a>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>

//   <Pagination
//     itemsCount={followers.length}
//     pageSize={pageSize}
//     currentPage={currentPage}
//     onPageChange={handlePageChange}
//   />
// </Content>
// <Footer></Footer>
// </Layout>
