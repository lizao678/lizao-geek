import React from 'react'
import { List, message, Typography } from 'antd';


export default function CardList(props) {
    const alertWarning = () => {
        message.warning('功能开发中，敬请期待！')
    }
    return (
        <>
            <List
                style={{ paddingTop: 0 }}
                footer={<a href='javascript:;' onClick={alertWarning}>更多...</a>}
                dataSource={props.data}
                renderItem={item => (
                    <List.Item>
                        <Typography.Text mark>「{item.type}」</Typography.Text> {<a href='javascript:;' className='itemA' onClick={alertWarning}>{item.val}</a>}
                    </List.Item>
                )}
            />
        </>
    )
}
