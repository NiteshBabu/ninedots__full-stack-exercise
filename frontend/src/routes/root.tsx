import { ConfigProvider, Layout, Typography, theme } from "antd";
import { Outlet } from "react-router-dom";

const { Content, Header } = Layout

export default function Root() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: "#1890ff",
          },
        },
      }}
    >
      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <div className="demo-logo">
            <Typography.Title level={1} style={{ margin: 0, color: 'white' }}>Commute Simulator</Typography.Title>
          </div>
        </Header>
        <Content>

          <div
            id="content"
            style={{
              background: colorBgContainer,
              border: "2px solid #ebedf0",
              minHeight: "80vh",
              width: '90%',
              padding: 24,
              borderRadius: borderRadiusLG,
              margin: '0 auto',
              marginTop: '40px',

            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </ConfigProvider>

  );
}
