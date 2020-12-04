import React from 'react'
import {connect} from 'react-redux'
import {Redirect,Switch,Route} from 'react-router'
import  Head  from './header/header'
import { Layout } from 'antd'
import './css/dashboard.css'
import  Nav from './nav/nav'
import  Resname from './nav/cmdb/resname'
import  Resdata  from './nav/cmdb/resdata'
import Home from './nav/home/home'



const { Header, Footer, Sider, Content } = Layout




const mapStateToProps = (state) => {
    return state  

}


class Dashboard extends React.Component  {
    state =  {iscollapsed: false}  //是否折叠侧边栏

    handleClick = () =>{
        this.setState({iscollapsed: !this.state.iscollapsed})
    }

    render() {
       let  token  = this.props.userinfo.token
        if ( token ){
        return (
            <Layout className="layout">
                <Sider collapsible collapsed={this.state.iscollapsed}>
                    <Nav />
                </Sider>
                <Layout>
                    <Header  className="header" >
                        <Head f={this.handleClick} />
                    </Header>
                    <Content className="content">
                        <Switch>
                            <Route  path="/imax/home"  component={Home} />
                            <Route  path="/imax/restype"  component={Resname} />
                            <Route path="/imax/resdata"  component={Resdata} />
                        </Switch>
                    </Content>
                    <Footer></Footer>
                </Layout>
            </Layout>
        )}else  {
            return <Redirect to="/login" />
        }
        
    }
}


export default connect(mapStateToProps)(Dashboard)

