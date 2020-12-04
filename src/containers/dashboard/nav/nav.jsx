import React from 'react'
import {Link,withRouter } from "react-router-dom"

import { Menu} from 'antd';
import {MoneyCollectOutlined,HomeOutlined} from '@ant-design/icons';
import './css/index.css'

const { SubMenu } = Menu;


class Nav extends React.Component  {
    render()  {
        return (
            <>
                <h1 className="maintitle">The Boss</h1>
             <Menu
                defaultSelectedKeys={this.props.location.pathname.split("/").pop()}
                mode="inline"
                theme="dark"
               defaultOpenKeys={this.props.location.pathname.split("/").slice(2,3)}

            >   
                <Menu.Item key="dashboard" icon={<HomeOutlined />}>
                    <Link to="/imax/home">首页</Link>
                </Menu.Item>
                <SubMenu key="cmdb" icon={<MoneyCollectOutlined />} title="资产管理">
                    <Menu.Item key="classify">
                        <Link to="/imax/restype">资源类型</Link>
                    </Menu.Item>
                    <Menu.Item key="dict">
                        <Link to="/imax/resdata">资源名称</Link>     
                    </Menu.Item>
                </SubMenu>
                </Menu>
            </>               
        )
    }
}

export default withRouter(Nav)


