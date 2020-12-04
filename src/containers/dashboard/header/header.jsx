import React from 'react' 
import { withRouter } from "react-router-dom"

import {connect} from 'react-redux'
import  {deluserinfoaction} from '../../../redux/actions/login_action'


import { Menu, Dropdown,Space,Avatar,Modal } from 'antd'
import { ExclamationCircleOutlined,MenuFoldOutlined,MenuUnfoldOutlined} from '@ant-design/icons'

import './css/header.css'



const { confirm } = Modal;

//设置redux 
const mapStateToProps = state =>  state  

const mapDispatchToProps = (dispatch) => {
  return  { dispatch:  ()  => dispatch(deluserinfoaction()) }
}
  


class Head  extends React.Component {

  //基于redux获取用户名
  username = this.props.userinfo.username   
  state = {isfull: true,isheadercollapsed: false}

  showConfirm = () => {
    confirm({
      title: '轻轻的我走了,不带走一片云彩',
      icon: <ExclamationCircleOutlined />,
      okText: "走",
      cancelText: "留下",
      onOk: () => {
        this.props.dispatch()
      }
    });
  }
      
  menu = (
    <Menu >
      <Menu.Item>设置</Menu.Item>
      <Menu.Item onClick={this.showConfirm} >注销</Menu.Item>
    </Menu>
  )


  render() {
    let {isheadercollapsed } = this.state
    return (
      <Space size={isheadercollapsed?1157:1050} className="space">
        {
          isheadercollapsed && < MenuUnfoldOutlined onClick={()=> { this.props.f() ;this.setState({isheadercollapsed: !isheadercollapsed})} } /> || <MenuFoldOutlined  onClick={()=> { this.props.f() ;this.setState({isheadercollapsed: !isheadercollapsed})} }/>
        }
        <Dropdown overlay={this.menu} className="header-right " >
          <Space>
            <Avatar src="http://pic.616pic.com/ys_img/00/09/03/WezSfH2dCJ.jpg"  className="ant-dropdown-link"/>
            {localStorage.getItem("username")}
          </Space> 
        </Dropdown>
      </Space>

        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Head))
