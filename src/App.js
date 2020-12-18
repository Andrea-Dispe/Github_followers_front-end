import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout } from "antd";

import "./App.css";
import Navbar from "./components/Navbar";
import Pagination from "./components/Pagination";
import { paginate } from "./utilities/paginate";

function App() {
  const api_url = "https://api.github.com/users/mosh-hamedani/followers";
  const [followers, setFollowers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const { Header, Footer, Content } = Layout;

  useEffect(() => {
    axios
      .get(api_url)
      .then((res) => {
        setFollowers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  const users = paginate(followers, currentPage, pageSize);

  return (
    <>
      <Layout>
        <Header>
          <Navbar />
        </Header>
        <Content>
          <table>
            <thead className="columns">
              <tr>
                <th>Avatar</th>
                <th>Username</th>
                <th>Repository</th>
              </tr>
            </thead>
            <tbody>
                {users.map((follower) => (
                  <tr key={follower.id}>
                    <td><img className='avatar' src={follower.avatar_url} alt={follower.login}/></td>
                    <td>{follower.login}</td>
                    <td><a href={follower.html_url}>Visit</a></td>
                  </tr>
                ))}
            </tbody>
          </table>

          <Pagination
            itemsCount={followers.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </Content>
        <Footer></Footer>
      </Layout>
    </>
  );
}

export default App;
