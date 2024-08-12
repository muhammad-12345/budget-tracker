import React, { useState } from 'react';
import { Layout } from 'antd';
import Navbar from '../../Components/common/NavBar/navBar';
import Sidebar from '../../Components/common/SideBar/SideBar';
import MainBody from '../../Components/common/mainBody/mainBody';


const Expenses = () => {
  const [collapsed, setCollapsed] = useState(false); // State to manage sidebar collapse

  return (
    <Layout>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <MainBody />
      </Layout>
    </Layout>
  );
};

export default Expenses;
