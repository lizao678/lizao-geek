import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Table, Tag, Space, notification } from 'antd'
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

const Article = () => {
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
    per_page: 10
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
    }
    if (date) {
      newParams.begin_pubdate = date[0].format('YYYY-MM-DD')
      newParams.end_pubdate = date[1].format('YYYY-MM-DD')
    }
    // 修改params数据，触发接口调用
    setParams({ ...params, ...newParams })
    // setParams(params => { return Object.assign(params, newParams) })

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
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        )
      }
    }
  ]
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
  return (
    <div>
      {/* 筛选区域 */}
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form
          onFinish={onFinish}
          initialValues={{ status: -1 }}
        >
          <Form.Item
            label="状态"
            name="status"
          >
            <Radio.Group>
              <Radio value={-1}>全部</Radio>
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
              {/* <Option value="jack">Jack</Option> */}
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
        <Table rowKey="id" columns={columns} dataSource={artList.list} />
      </Card>
    </div>
  )
}

export default observer(Article)