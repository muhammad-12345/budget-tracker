import React, { useState } from 'react';
import { Layout } from 'antd';
import Navbar from '../../Components/common/NavBar/navBar';
import Sidebar from '../../Components/common/SideBar/SideBar';
import AnalysisMain from '../../Components/feature/Analysis/AnalysisMain'

const Expenses = () => {
  const [collapsed, setCollapsed] = useState(false); // State to manage sidebar collapse

  return (
    <Layout>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <AnalysisMain />
      </Layout>
    </Layout>
  );
};

export default Expenses;
