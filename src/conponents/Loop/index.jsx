// 封装图表bar组件

import React, { useEffect, useRef } from 'react'
// import './index.scss'
import * as echarts from 'echarts';
/* 
1. 看官方文档，把echarts加入项目，
2. 不抽离定制化参数，先运行最小demo
3. 按照需求，哪些参数需要自定义，抽象出来
4. 使用useRef获取dom，在useEffect获取
*/

// export default function Bar({ title, xData, yData, style }) {
export default function Loop({ title, xData, yData, style }) {
    const domRef = useRef()

    const chartInit = () => {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(domRef.current);
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '40',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
                    ]
                }
            ]
        });
    }

    useEffect(() => {
        chartInit()
    }, [])

    return (
        <>
            {/* 准备一个挂载节点 */}
            <div ref={domRef} style={style}></div>
        </>
    )
}
