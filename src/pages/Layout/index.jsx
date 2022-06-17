import { Layout, Menu, Popconfirm } from 'antd'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { Link, Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useStore } from '@/store'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { CloseOutlined } from '@ant-design/icons';


const { Header, Sider } = Layout
const GeekLayout = () => {

    const { userStore, loginStore, channelStore, compileStore } = useStore()
    const { pathname } = useLocation()
    // console.log('pathname', pathname);
    // const [compileShow, setCompile] = useState(false)
    const [params] = useSearchParams()
    // console.log('params', params.get('id'));
    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    // const history = createBrowserHistory()
    function getCompile() {
        // console.log('compileStore.getCompileId()', compileStore.getCompileId());
        if (params.get('id') || compileStore.getCompileId()) {
            return getItem(
                <Link to='/article/compile' className='compile'>编辑文章
                    <CloseOutlined className='closeIcon' onClick={(e) => {
                        // e.stopPropagation() // 这行代码会刷新页面
                        // navigate('/article', { replace: true })
                        window.history.back()
                        compileStore.setCompileId('')
                        // navigate('/article')
                    }} />
                </Link>,
                '/article/compile'
            )
        }
        return null
    }
    const items = [
        getItem(<Link to='/'>数据概览</Link>, '/', <HomeOutlined />),
        getItem('文章管理', '/art', <DiffOutlined />, [
            getItem(<Link to='/article'>内容管理</Link>, '/article'),
            getCompile()
        ]),
        getItem(<Link to='/publish?pubFlag=true'>发布文章</Link>, '/publish', <EditOutlined />)
    ]
    /*  const items = [
         { label: <Link to='/'>数据概览</Link>, key: '/', icon: <HomeOutlined /> },
         {
             label: <Link to='/article'>内容管理</Link>,
             key: '/article',
             icon: <DiffOutlined />,
             children: [
                 {
                     label: '子菜单项',
                     key: '/article/compile',
                     theme: 'dark'
                 }
             ]
         },
         { label: <Link to='/publish'>发布文章</Link>, key: '/publish', icon: <EditOutlined /> }
     ] */
    useEffect(() => {
        userStore.getUseInfo()
        channelStore.loadChannelList()
    }, [userStore, channelStore])

    const navigate = new useNavigate()
    const confirm = () => {
        loginStore.loginOut()
        navigate('/login', { replace: true })
    };

    const cancel = (e) => {
        // console.log(e);
        // message.error('Click on No');
    };
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <div className="user-info">
                    <span className="user-name">
                        {userStore.userInfo.name}
                    </span>
                    <span className="user-logout">
                        <Popconfirm
                            onConfirm={confirm}
                            onCancel={cancel}
                            title="是否确认退出？"
                            okText="退出"
                            cancelText="取消">
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
                        defaultSelectedKeys={[pathname]}
                        selectedKeys={[pathname]}
                        defaultOpenKeys={['/art']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={items}
                    />
                </Sider>
                <Layout className="layout-content" style={{ padding: 20 }}>
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
    )
}

export default observer(GeekLayout)