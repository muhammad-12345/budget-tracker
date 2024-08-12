import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined, UploadOutlined, LineChartOutlined, DollarOutlined, LogoutOutlined } from '@ant-design/icons';
import logo from '../../../assets/logo.png'

const { Sider } = Layout;

const Sidebar: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  return (
    <Sider theme="light" trigger={null} collapsible collapsed={collapsed} style={{
      height:'100vh'
    }}>
      <div className="demo-logo-vertical" />
      <div style={{display:'flex'}}>
      <img src={logo} alt="" style={{marginLeft:'9px', marginTop:'28px'}}/>
      {!collapsed && (
          <div style={{ marginLeft: '16px', fontSize: '16px', fontWeight: 'bold' }}>
            <p style={{marginTop:'28px', fontFamily:'Poppins'}}>Budget Tracker</p>
          </div>
        )}
      </div>
      <Menu style={{
        marginTop:'67px'
      }}
        theme="light"
        mode="inline"
        defaultSelectedKeys={['2']}
        items={[
          {
            key: '1',
            icon: <LineChartOutlined />,
            label: <span style={{ fontFamily: 'Poppins' }}>Analysis</span>,
          },
          {
            key: '2',
            icon: <DollarOutlined />,
            label: <span style={{ fontFamily: 'Poppins' }}>Expenses</span>,
          },
          {
            key: '3',
            icon: <LogoutOutlined />,
            label: <span style={{ fontFamily: 'Poppins' }}>Logout</span>,
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
