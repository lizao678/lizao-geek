import { Layout, Menu, Popconfirm } from 'antd'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined
} from '@ant-design/icons'
import './index.scss'

const { Header, Sider } = Layout

const GeekLayout = () => {
    const items = [
        { label: '数据概览', key: 'item-1', icon: <HomeOutlined /> },
        { label: '内容管理', key: 'item-2', icon: <DiffOutlined /> },
        { label: '发布文章', key: 'item-3', icon: <EditOutlined /> }
    ]
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <div className="user-info">
                    <span className="user-name">user.name</span>
                    <span className="user-logout">
                        <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
                            <LogoutOutlined /> 退出
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        defaultSelectedKeys={['1']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={items}
                    />
                </Sider>
                <Layout className="layout-content" style={{ padding: 20 }}>内容</Layout>
            </Layout>
        </Layout>
    )
}

export default GeekLayout