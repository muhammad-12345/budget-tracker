import React from 'react';
import { Layout, Menu, Modal } from 'antd';
import { LineChartOutlined, DollarOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; 
import logo from '../../../assets/logo.png';


const { Sider } = Layout;

const Sidebar: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const navigate = useNavigate();

  // Function to handle menu item clicks
  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === '1') {
      navigate('/analysis'); // Navigate to the Analysis page
    } else if (key === '2') {
      navigate('/expenses'); // Navigate to the Expenses page
    } else if (key === '3') {
      showLogoutConfirmation(); 
    }
  };

  const showLogoutConfirmation = () => {
    Modal.confirm({
      title: 'Confirm Logout',
      content: 'Are you sure you want to logout?',
      okText: 'Logout',
      cancelText: 'Cancel',
      onOk: () => {
        // Handle the logout process 
        console.log('Logged out');
        navigate('/login-signup'); 
      },
    });
  };

  return (
    <Sider
      theme="light"
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        height: '100vh',
      }}
    >
      <div className="demo-logo-vertical" />
      <div style={{ display: 'flex' }}>
        <img src={logo} alt="" style={{ marginLeft: '9px', marginTop: '28px' }} />
        {!collapsed && (
          <div style={{ marginLeft: '16px', fontSize: '16px', fontWeight: 'bold' }}>
            <p style={{ marginTop: '28px', fontFamily: 'Poppins' }}>Budget Tracker</p>
          </div>
        )}
      </div>
      <Menu
        style={{
          marginTop: '67px',
        }}
        theme="light"
        mode="inline"
        defaultSelectedKeys={['2']}
        onClick={handleMenuClick} // Handle menu clicks
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