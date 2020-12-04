import React from 'react'
import { Modal, Button,Card,Table,
    Form, Input,message ,Space,Popconfirm 
} from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import {reqgetrestype,reqpostrestype,reqputrestype,reqdelresname} from '../../../../api/index'




export default class Resname  extends  React.Component  {
    formRef = React.createRef()
    state = {
        data: [], //存放表中数据
        visible: false,
        load: true,
        index: 3, //表中每一行数据的id号或者叫索引号都行
        total: '',   //总共有多少条记录
        currentpage: 1//获取当前在哪个页面
    }

    name = "" //辨识model类型 

    columns = [
        {
          title: '序列号',
          dataIndex: 'id',
          align: "center",
          sorter: {
            compare: (a, b) => a.id - b.id,
            multiple: 3,
          },
        },
        {
          title: '资源类型',
          dataIndex: 'name',
          align: "center",
        },
        {
          title: '操作',
         dataIndex: 'control',
          align: "center",
          render: (text,record,index) =>  {
              return (
                 <Space>
                    <Button type="primary" onClick={() => {this.updateremove(record,index,"update")}}  >修改</Button>
                    <Popconfirm 
                        title="要跑路吗?" 
                        cancelText="回头是岸" 
                        okText="一失足成千古恨" 
                        onConfirm={()=>{this.updateremove(record,index,"delete")}}
                      >
                        <Button type="danger">删除</Button>
                      </Popconfirm>,
                 </Space>

            )
            
          }
        },
      ];
    
    
    
    handleOk = ()=> {
        let {current:{validateFields,resetFields}} = this.formRef 
        validateFields().then(async (value)=>{
            let {name} = value
            if(this.name === "添加资源类型") {
                let {status} =  await reqpostrestype(name)
                if(status === "401"){this.props.history.replace("/login")}else{
                    resetFields();
                    this.getcmdb(this.state.currentpage,5)
                    message.success("添加数据成功!")
                }
               
             } else {
                let {status} =  await reqputrestype(this.state.index,name)
                if(status === "401"){this.props.history.replace("/login")}else{
                    resetFields();
                    this.getcmdb(this.state.currentpage,5)
                    message.success("修改数据成功!")
                }
               
             }

        }).catch((error)=>{
           message.warning("表单内容不能为空")
        })
    }
    
      handleCancel = () => {
        this.formRef.current.resetFields();
        this.setState({visible: false})     
      };
       
    
    getcmdb =  async (page=this.state.currentpage,pagesize) => {
        let {status,data:{restype,pageinfo:{total}}} = await  reqgetrestype(page,pagesize)
        if ( status === "401") {this.props.history.replace("/login")}
        else {
            this.setState({
                load: false,data: restype,
                total: total,currentpage: page,
                visible: false
            })   
        }                             
     }

    componentDidMount() {
      this.getcmdb()
    }

    add = () => {
        this.name = "添加资源类型"
        this.setState({visible: true});
    }

    updateremove = async (record,index,action) => {
        let {id} = record 
        if (action === "update") {
            this.name = "更新资源类型"
            this.setState({visible: true,index: id})
        } else {
            let {status} = await reqdelresname(id)
            if(status === "401"){this.props.history.replace("/login")}else{
                this.getcmdb(this.state.currentpage,5)  
            }      
        }
    }

   
   render() {
        return (
            <Card 
                title={
                    <Space size={0}>
                        <Input
                            placeholder="按名称搜索"                               
                        />
                        <Button type="primary" icon={< SearchOutlined />} >搜索</Button>
                    </Space>

                }
                bordered={false}
                extra={
                    <Button type="primary" onClick={this.add} >添加</Button>
                }
            >
                <Table 
                    columns={this.columns} rowKey="id" 
                    dataSource={this.state.data} 
                    loading={this.state.load} 
                
                    pagination={
                        {
                            defaultPageSize: 5,
                            total: this.state.total,
                           current: this.state.currentpage,
                           onChange:this.getcmdb,
                           pageSizeOptions: [5,10],
                        }
                    }
                    
                
                />
                    <Modal
                        title={this.name}
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}   
                        cancelText="取消"
                        okText="确定"
                    >
                        <Form   ref={this.formRef}  name="nest-messages" 	 >
                            <Form.Item
                                name="name"
                                label="资源类型"
                                colon={false} 
                                wrapperCol={{span:10,offset:1}}
                                labelCol={{offset:2}}
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入你的资源类型"
                                    },
                                
                                ]}
                            >            
                                    <Input  />                              
                            </Form.Item>      
                        </Form>
                    </Modal>
            </Card>
      
        )}
    }



