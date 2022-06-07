import React from 'react'
import './index.scss'
import Bar from '@/conponents/Bar';
/* 
1. 看官方文档，把echarts加入项目，
2. 不抽离定制化参数，先运行最小demo
3. 按照需求，哪些参数需要自定义，抽象出来
4. 使用useRef获取dom，在useEffect获取
*/

export default function Home() {

    return (
        <div>
            <Bar
                title='主流框架使用满意度'
                xData={['react', 'vue', 'angular']}
                yData={[30, 40, 50]}
                style={{ width: '500px', height: '400px' }}
            />
            <Bar
                title='主流框架使用满意度2'
                xData={['react', 'vue', 'angular']}
                yData={[30, 40, 60]}
                style={{ width: '300px', height: '200px' }}
            />
        </div>
    )
}
