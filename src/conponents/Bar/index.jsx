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

export default function Bar({ title, xData, yData, style }) {
    const domRef = useRef()

    const chartInit = () => {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(domRef.current);
        // 绘制图表
        myChart.setOption({
            title: {
                text: title
            },
            tooltip: {},
            xAxis: {
                data: xData
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: yData
                }
            ]
        });
    }

    useEffect(() => {
        chartInit()
    }, [])

    return (
        <div>
            {/* 准备一个挂载节点 */}
            <div ref={domRef} style={style}></div>
        </div>
    )
}
