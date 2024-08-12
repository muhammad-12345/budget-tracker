import React from 'react';
import { Button, Layout, theme, Badge } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, BellOutlined } from '@ant-design/icons';
import profile_pic from '../../../assets/profile_pic.png'

const { Header } = Layout;

const Navbar: React.FC<{ collapsed: boolean; setCollapsed: React.Dispatch<React.SetStateAction<boolean>> }> = ({ collapsed, setCollapsed }) => {
  const { token } = theme.useToken();
  const { colorBgContainer } = token;

  return (
    <Header style={{ padding: 0, background: colorBgContainer, height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 85,
        }}
      />
    <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px', gap:'20px' }}>
        <Badge count={5} offset={[-10, 10]}>
          <BellOutlined style={{ fontSize: '24px', marginRight: '20px' }} />
        </Badge>
        <img src={profile_pic} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
      </div>
    </Header>
  );
};

export default Navbar;
