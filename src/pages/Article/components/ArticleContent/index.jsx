import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Table, Tag, Space, Popconfirm, message } from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import img404 from '@/assets/error.png'
import { useEffect, useState } from 'react'
import { http } from '@/utils'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'

const { Option } = Select
const { RangePicker } = DatePicker

const ArticleContent = () => {
    const { channelStore: { channelList } } = useStore()
    // 频道列表管理
    // const [channelList, setChannelList] = useState([])


    /* useEffect(() => {
      const loadChannelList = async () => {
        const res = await http.get('/channels')
        setChannelList(res.data.channels)
      }
      loadChannelList()
    }, []) */

    // 文章列表管理
    const [artList, setArtList] = useState({
        list: [],// 文章列表
        count: 0 // 文章数量
    })
    // 文章参数管理
    const [params, setParams] = useState({
        page: 1,
        per_page: 10,
        update: true
    })

    // 如果异步请求函数需要依赖一些数据的变化而重新执行
    // 推荐把它写到内部
    useEffect(() => {
        const loadList = async () => {
            const res = await http.get('/mp/articles', { params })
            const { results: list, total_count: count } = res.data
            setArtList({
                list,
                count
            })
        }
        loadList()
    }, [params])


    const onFinish = (values) => {
        const { channel_id, date, status } = values
        // 弹窗校验
        /* if (!(channel_id && date)) {
          return notification['warning']({
            message: '提 示',
            description:
              `请选择${channel_id ? '' : ' 频道'} ${date ? '' : ' 日期'}`,
          });
        } */
        // 数据处理
        const newParams = {}
        if (status !== -1) {
            newParams.status = status
        }
        if (channel_id) {
            newParams.channel_id = channel_id
        } else {
            newParams.channel_id = ''
        }
        // console.log('date', date);
        if (date) {
            const prev = date[0].format('YYYY-MM-DD')
            const end = date[1].format('YYYY-MM-DD')
            if (prev >= end) {
                return message.error('结束日期必须大于开始日期！');
            }
            newParams.begin_pubdate = prev
            newParams.end_pubdate = end
        }
        // 修改params数据，触发接口调用
        // console.log('筛选');
        setParams({ ...params, ...newParams })
        // setParams(params => { return Object.assign(params, newParams) })
    }

    const navigate = useNavigate()
    const goPublish = (data) => {
        navigate(`/article/compile?id=${data.id}`)
    }

    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: data => <Tag color="green">审核通过</Tag>
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => goPublish(data)}
                        />
                        <Popconfirm
                            onConfirm={() => delArticle(data)}
                            title="是否确认删除？"
                            okText="删除"
                            cancelText="取消">
                            <Button
                                type="primary"
                                danger
                                shape="circle"
                                icon={<DeleteOutlined />}
                            />
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]
    const delArticle = async (data) => {
        // console.log('data', data);
        await http.delete(`/mp/articles/${data.id}`)
        setParams(params => ({
            ...params,
            update: !params.update
        }))
    }
    /* const data = [
      {
        id: '8218',
        comment_count: 0,
        cover: {
          images: ['http://geek.itheima.net/resources/images/15.jpg'],
        },
        like_count: 0,
        pubdate: '2019-03-11 09:00:00',
        read_count: 2,
        status: 2,
        title: 'wkwebview离线化加载h5资源解决方案'
      }
    ] */

    const pageChange = (page) => {
        setParams({
            ...params,
            page
        })
    }
    return (
        <div>
            {/* 筛选区域 */}
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/">首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>内容管理</Breadcrumb.Item>
                    </Breadcrumb>
                }
                style={{ marginBottom: 20 }}
            >
                <Form
                    onFinish={onFinish}
                    initialValues={{ status: null }}
                >
                    <Form.Item
                        label="状态"
                        name="status"
                    >
                        <Radio.Group>
                            <Radio value={null}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={1}>待审核</Radio>
                            <Radio value={2}>审核通过</Radio>
                            <Radio value={3}>审核失败</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id">
                        <Select
                            placeholder="请选择文章频道"
                            style={{ width: 120 }}
                        >
                            <Option value={null}>所有</Option>
                            {/* <Option value="lucy">Lucy</Option> */}
                            {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            {/* 文章展示区域 */}
            <Card title={`根据筛选条件共查询到 ${artList.count} 条结果：`}>
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={artList.list}
                    pagination={{
                        pageSize: params.per_page,
                        total: artList.count,
                        onChange: pageChange
                    }}
                />
            </Card>
        </div>
    )
}

export default observer(ArticleContent)