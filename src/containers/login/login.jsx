import React from 'react'

import { Form, Input, Button,message, Row, Col} from 'antd';
import {KeyOutlined,UserOutlined } from '@ant-design/icons';


import 'antd/dist/antd.css'
import './css/login.css'

//redux
import { connect } from 'react-redux'
import {getloginAction} from '../../redux/actions/login_action'
import {reqLogin} from '../../api/index'




const mapStateToProps = (state) => {
	return state  
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        getloginstate: (value) => { dispatch(getloginAction(value))  },
    }
}


class Login extends React.Component {

	formRef = React.createRef()

	handelSubmit =  ()  => {
		let {current: {getFieldsValue,validateFields}} = this.formRef
		validateFields().then( async(values) =>{
			let {username,password } = getFieldsValue()
			let {status,data:{msg,token,name}} = await reqLogin(username,password)
			if (status === "200") {
				message.success(msg)
				this.props.getloginstate({"token": token,"isLogin": true,"username": name})
				this.props.history.replace("/imax")
			} else if (status === "401") {
				message.warning(msg)
			} else {
				message.error(msg)
			}							
		}).catch(errorinfo => {
			message.error("请输入用户名或密码")
		})	
	 }
	
    render() {
        return (
			<>
			<Row justify="center" className="login-header" >
				<h1>The Boss </h1>
			</Row>
			<Row justify="center" className=""  >
				<Col span={6}>
					<Form
						  name="basic"
						  ref={this.formRef}
    				>
      					<Form.Item name="username"
        					rules={[{ required: true, message: '请输入用户名!' }]}
      					>
        					<Input  size="large"   prefix={<UserOutlined />} placeholder="Maxpayne"  />
      					</Form.Item>
      					<Form.Item name="password"
        					rules={[{ required: true, message: '请输入密码!' }]}
      					>
        					<Input.Password  size="large" prefix={<KeyOutlined />} placeholder="Maxpayne"  />
      					</Form.Item>
      					<Form.Item >
        					<Button type="primary"   block size="large" onClick={this.handelSubmit}>
          						登录
        					</Button>
      					</Form.Item>
    				</Form>
				</Col>				
			</Row>
			</>

        )
    }
}


export default  connect(mapStateToProps,mapDispatchToProps)(Login)
