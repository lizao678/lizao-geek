// import React from 'react'
import './index.scss'
import Bar from '@/conponents/Bar';
import { Card, Col, Row } from 'antd';
import CardList from '@/conponents/CardList';
import Loop from '@/conponents/Loop';
/* 
1. 看官方文档，把echarts加入项目，
2. 不抽离定制化参数，先运行最小demo
3. 按照需求，哪些参数需要自定义，抽象出来
4. 使用useRef获取dom，在useEffect获取
*/

export default function Home() {
    const rightData = [
        { type: '重要', val: '吃饭，喝水，睡觉，刷牙' },
        { type: '重要', val: '吃饭，喝水，睡觉，刷牙' },
        { type: '重要', val: '吃饭，喝水，睡觉，刷牙' },
        { type: '重要', val: '吃饭，喝水，睡觉，刷牙' },
        { type: '一般', val: '散步' },
    ];
    const leftData = [
        { type: '新闻', val: '浙江温州，浙江温州，江南皮革厂倒闭了！' },
        { type: '新闻', val: '浙江温州，浙江温州，江南皮革厂倒闭了！' },
        { type: '新闻', val: '浙江温州，浙江温州，江南皮革厂倒闭了！' },
        { type: '新闻', val: '浙江温州，浙江温州，江南皮革厂倒闭了！' },
        { type: '新闻', val: '浙江温州，浙江温州，江南皮革厂倒闭了！' },
    ];
    return (
        <div>
            <Card title="首页" bordered={false} style={{ marginBottom: 20 }}>
                <Bar
                    title='文章数据可视化面板'
                    xData={['react', 'vue', 'angular']}
                    yData={[30, 40, 50]}
                    style={{ marginTop: 20, width: '500px', height: '400px', display: 'inline-block' }}
                />
                {/*   <Bar
                    title='主流框架使用满意度2'
                    xData={['react', 'vue', 'angular']}
                    yData={[30, 40, 60]}
                    style={{ width: '300px', height: '200px' }}
                /> */}
                <Loop style={{ marginTop: 20, width: '500px', height: '400px', display: 'inline-block' }} />
            </Card>
            <Row>
                <Col span={12}>
                    <Card title="公告栏" bordered={false} style={{ marginRight: 10 }}>
                        <CardList data={leftData} />
                    </Card>
                </Col>
                <Col span={12} >
                    <Card title='代办事项' bordered={false} style={{ marginLeft: 10 }}>
                        <CardList data={rightData} />
                    </Card>
                </Col>
            </Row>





        </div >
    )
}
