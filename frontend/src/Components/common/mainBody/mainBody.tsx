import React from 'react';
import { Layout, theme } from 'antd';
import TableHeader from '../ExpenseHeader/expenseHeader';
import ExpenseTable from '../ExpenseTable/ExpenseTable';
import '../../../styles.css'

const { Content } = Layout;

const MainBody: React.FC = () => {
  const { token } = theme.useToken();
  const { colorBgContainer, borderRadiusLG } = token;

  return (
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
       <TableHeader />
       <ExpenseTable />
    </Content>
  );
};

export default MainBody;
