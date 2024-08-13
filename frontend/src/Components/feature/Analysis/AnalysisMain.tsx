import React from 'react';
import { Layout, theme } from 'antd';
import AnalysisHeader from './AnalysisHeader'
import '../../../styles.css'
import AnalysisChart from './AnalysisChart'

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
        <AnalysisHeader />
        <AnalysisChart />
       {/* <TableHeader />
       <ExpenseTable /> */}
    </Content>
  );
};

export default MainBody;
