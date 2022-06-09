import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './index.scss'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useStore } from '@/store';
import { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { http } from '@/utils';

const { Option } = Select

const Publish = () => {

    const { channelStore: { channelList } } = useStore()
    // 存放上传图片的列表
    const [fileList, setFileList] = useState([])
    // useRef在组件重新渲染的时候不会被清除，可以当做存储仓库
    const cacheImgList = useRef([])
    const onUploadChange = ({ fileList }) => {
        // 采取受控的写法，在最后一次log里response
        // 最终react state fileList中存放的数据有response.data.url
        // 这里需要格式化一下（我觉得需要格式化都是后端有毛病）
        const formatList = fileList.map(file => {
            if (file.response) {
                return {
                    url: file.response.data.url
                }
            }
            return file
        })
        setFileList(formatList)
        // 同时将图片列表存入仓库
        cacheImgList.current = formatList
    }

    // 图片上传限制
    const [imgCount, setImageCount] = useState(1)
    const radioChange = (e) => {
        const { current } = cacheImgList
        const { target: { value } } = e
        setImageCount(value)
        // 单图和三图切换时，存储图片
        if (current.length === 0) { return }
        if (value === 1) {
            setFileList([current[0]])
        } else if (value === 3) {
            setFileList(current)
        }
    }
    const navigate = useNavigate()

    const [params] = useSearchParams()
    const articleId = params.get('id')
    // 提交表单
    const onFinish = async (values) => {
        // 数据处理，重点是cover
        const { type } = values
        const cover = {
            type,
            images: fileList.map(item => item.url)
        }
        const data = { ...values, cover }
        if (articleId) {
            await http.put(`/mp/articles/${articleId}?draft=false`, data)
        } else {
            await http.post('/mp/articles?draft=false', data)
        }

        // 跳转列表 提示用户
        navigate('/article')
        message.success(`${articleId ? '更新' : '发布'}成功!`)
    }

    // 编辑功能，获取传过来的文章id
    // console.log('route', articleId);
    // 数据回填 id调用接口 1.表单回填 2.暂存列表 3.Upload组件fileList
    const formRef = useRef(null)
    useEffect(() => {
        const loadDetail = async () => {
            const res = await http.get(`/mp/articles/${articleId}`)
            const { data, data: { cover } } = res
            formRef.current.setFieldsValue({ ...data, type: cover.type })
            // 调用setFileList方法回显图片
            const imgUrls = cover.images.map(url => ({ url }))
            setFileList(imgUrls)
            // 暂存列表也存一份
            cacheImgList.current = imgUrls
        }
        // 必须编辑状态才可以调用回显接口
        if (articleId) {
            loadDetail()
        }
    }, [articleId])

    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/home">首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>{articleId ? '编辑' : '发布'}文章</Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 1, content: '' }}
                    onFinish={onFinish}
                    ref={formRef}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                            {/* <Option value={0}>推荐</Option> */}
                            {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={radioChange}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {imgCount > 0 && (<Upload
                            name="image"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList
                            action="http://geek.itheima.net/v1_0/upload"
                            fileList={fileList}
                            onChange={onUploadChange}
                            maxCount={imgCount}
                            multiple={imgCount > 1}
                        >
                            {fileList.length !== imgCount && (<div style={{ marginTop: 8 }}>
                                <PlusOutlined />
                            </div>)}
                        </Upload>)}
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容' }]}
                    >
                        <ReactQuill theme="snow" />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                {articleId ? '更新' : '发布'}文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default observer(Publish) 