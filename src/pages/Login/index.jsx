import React, { useState } from 'react'
import { Spin, Card, Form, Input, Button, Checkbox, message, Popconfirm } from 'antd';
import logo from '@/assets/logo.png'
import './index.scss'
import { useStore } from '@/store';
import { useNavigate } from 'react-router-dom';

// 246810
export default function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const { loginStore } = useStore()
    const onFinish = (values) => {
        setLoading(true)
        // value是一个对象，里面包含用户在表单输入的所有内容
        loginStore.SignIn({ mobile: values.username, code: values.password }).then((res) => {
            // console.log('res', res);
            if (res.message !== 'OK') {
                setLoading(false)
                return message.error(`登录失败${res.message}`, 2);
            }
            setLoading(false)
            message.success('登录成功！', 2)
            navigate('/')
        }).catch(e => {
            setLoading(false)
            message.error(`登录失败,测试密码为246810，${e}`, 2);
        })

    };

    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };
    return (
        <div className="login">

            <Card
                className='login-container'
            >
                <Spin spinning={loading}>
                    <img className='login-logo'
                        src={logo}
                        alt="" />
                    {/* 登录表单 */}
                    <Form
                        validateTrigger={['onBlur', 'onChange']} // 指定要用到的事件
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone number!',
                                },
                                {
                                    pattern: /^1[3-9]\d{9}$/,
                                    message: '请输入正确的手机号',
                                    validateTrigger: 'onBlur' // 触发这个正则的事件
                                }
                            ]}
                        >
                            <Input size='large' placeholder='请输入手机号' />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your identifying code!',
                                },
                                {
                                    len: 6,
                                    message: '请输入6位验证码',
                                    validateTrigger: 'onBlur'
                                }
                            ]}
                        >
                            <Input size='large' placeholder='请输入验证码' />
                        </Form.Item>

                        <Form.Item name='remember' valuePropName="checked">
                            <Checkbox className='login-checkbox-label'>
                                我已阅读并同意「用户协议」和「隐私条款」
                            </Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" size='large' block>
                                Sign in
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Card>
        </div>
    )
}
