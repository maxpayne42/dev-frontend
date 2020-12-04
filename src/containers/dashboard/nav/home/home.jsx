import React from 'react'
import { Collapse } from 'antd';
import { Button } from 'antd';


const { Panel } = Collapse;



export default  class Home extends React.Component  {
    
    render() {
        return (
            <Collapse  >
                <Panel header="关于" key="1">
                    <Button type="link" href="https://www.iyunmax.com/">博客</Button>
                    <Button type="link" href="https://space.bilibili.com/71406022">B站</Button>
                    <Button type="link" href="https://www.bilibili.com/video/BV18J411g7vP?from=search&seid=11277069132756880560">BF3</Button>
                </Panel>
          </Collapse>
        
        
        )
    }
}
