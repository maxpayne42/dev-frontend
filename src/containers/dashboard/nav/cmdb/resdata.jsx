import React from 'react'

import { Modal, Button,
    Card,Table,
    Form, Input,message,Space,Select,Descriptions,Popconfirm 
} from 'antd';

import {  SearchOutlined,MinusCircleOutlined,PlusOutlined } from '@ant-design/icons';

import {reqgetrestype,reqgetresdata,reqpostresdata,reqputresdata,reqdelresdata} from '../../../../api/index'



const { Option } = Select


export default class Resdata  extends  React.Component  {
    formRef = React.createRef()
    name = ""

    state = {
        restype: [""], //存放资源类型
        data: [],
        detailvisible: false,
        detailvalue: [],
        visible: false,
        load: true,
        index: 0,
        total: '',   
        inputlist: [],
        currentpage: 1, //获取当前在哪个页面
    }

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
          title: '资源名称',
          dataIndex: 'resname',
          align: "center",
        },
        {
            title: '资源类型',
            dataIndex: 'restype', 
            align: "center",
        },

        {
          title: '操作',
          align: "center",
          render: (text,record,index) =>  {
              return (
                <Space>
                    <Button 
                        type="primary"
                        onClick={()=>{this.detail(text,record,index)}}
                    >
                        详情

                    </Button>
                      <Button type="primary" onClick={() => {this.updateremove(record,index,"update")}} >修改</Button>
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
            let fields = []
            let {resname,restype,...otherfield} = value
            let  arr =  Object.values(otherfield)  
            arr.forEach((item,index)=> {
                if (index % 2 !== 0) {fields.push({[arr[index-1]]:item})}
            })
           
           if (this.name === "添加资源") {
                let {status} =  await reqpostresdata(resname,restype,fields)
                if(status === "401"){this.props.history.replace("/login")}else{
                    this.setState({inputlist:[]})
                    resetFields();
                    this.getcmdb(this.state.currentpage,5)
                    message.success("添加数据成功!")
                }
           } else  {
                let {status} = await reqputresdata(this.state.index,resname,restype,fields)
                if(status === "401"){this.props.history.replace("/login")}else{
                    resetFields();
                    this.getcmdb(this.state.currentpage,5)
                    message.success("修改数据成功!")
                }

           }
           
           
        }).catch((error)=> message.warning("表单内容不能为空")
        )
       
      }
    
    handleCancel = () => {
        this.formRef.current.resetFields();
        this.setState({visible: false,inputlist:[]});
      };
       
    
    getcmdb =  async (page=1,pagesize) => { 
        let {status,data:{resdata,pageinfo:{total}}} = await  reqgetresdata(page,pagesize)
        if(status === "401"){this.props.history.replace("/login")}else{
            this.setState({
                load: false,data: resdata,
                total: total,currentpage: page,
                visible: false
            })   
        }      
    }


    //获取主机组名称
    getrestype = async (page=1,pagesize=5) => {
        let {status,data} = await reqgetrestype(page,pagesize)
        if(status === "401"){this.props.history.replace("/login")}else{
            let {all} = data
            this.setState({restype: all })
        }
    }

    componentDidMount() {
        this.getcmdb()
        this.getrestype()
 
     }
 
   
   
     // 对数据库进行增删改查的相关点击事件

    add = () => {
        this.name = "添加资源"
        this.setState({visible: true});
    }

    detail = (text,record,index) => {
        this.name = "详情"
        let fieldarray = []
        let {resname,restype,fields} = record
        fieldarray = [...fields]
        fieldarray.push({"资源名称":resname})
        fieldarray.push({"资源类型": restype})
        this.setState({detailvalue: fieldarray,detailvisible:true,inputlist:[]})
    }


    handledetailok = () => {
        this.setState({detailvalue:[''],detailvisible: false})
    }
    

    updateremove = async (record,index,action) => {
        let {id,fields} = record 
        if (action === "update") {
            this.name = "更新资源"   
            fields.forEach((item)=>{
                this.changeinput(item)
            })
            
            this.setState({visible: true,index: id})
        } else {
            let {id} =  record 
            let {status} = await reqdelresdata(id)
            if(status === "401"){this.props.history.replace("/login")}else{
                this.getcmdb(this.state.currentpage,5)  
            }      
        }
    }

    


//根据不同的button按钮增加或减少button
changeinput = (isinput) => {
    console.log("isinput",isinput)
    isinput?this.state.inputlist.push(isinput):this.state.inputlist.pop()
    this.setState({inputlist:[...this.state.inputlist]})
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
                        pageSizeOptions: [5,10]
                    }
                }               
            />

                <Modal
                    title={this.name}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}   
                    cancelText="取消"
                    okText="确认"
                    width="720px"
                >
                    

                        <Form ref={this.formRef}  name="nest-messages" 	 >
                            <Form.Item
                                name="resname" 
                                label="资源名称"
                                colon={false} 
                                wrapperCol={{span:10,offset:1}}
                                rules={[ 
                                    {
                                        required: true,
                                        message: "请输入资源名称"
                                    },                    
                                ]}
                            >
                                <Input  />
                            </Form.Item>   
                            <Form.Item
                                name="restype"
                                label="资源类型"   
                                colon={false} 
                                wrapperCol={{span:10,offset:1}}
                                rules={[ 
                                    {
                                        required: true,
                                        message: "请输入资源类型"
                                    },                    
                                ]}                            
                            >
                                <Select  value="服务器" >
                                   {
                                      this.state.restype.map((item,index)=>{
                                          return (
                                            <Option key={index} value={item.name}>{item.name}</Option>
                                           )
                                       })               
                                   }
                                </Select> 
                            </Form.Item>   
                            {
                                this.state.inputlist.map((item,index) => {
                                
                                    return (
                                        <Space align="baseline" key={index}>
                                            <Form.Item  
                                                name={`field${index}`}  
                                                label='字段' colon={false} 
                                                labelCol={{offset:2}} wrapperCol={{offset: 4}}	  
                                                rules={[ 
                                                    {
                                                        required: true,
                                                        message: "请输入字段名称"
                                                    }                  
                                                ]}             
                                            >
                                                <Input placeholder={item===""?null:Object.keys(item)[0]} />
                                            </Form.Item>
                                            <Form.Item  
                                                name={`value${index}`}
                                                wrapperCol={{offset:1}} 
                                                rules={[ 
                                                    {
                                                        required: true,
                                                        message: "请输入字段值"
                                                    }                  
                                                ]}       
                                            >
                                                <Input placeholder={item===""?null:Object.values(item)[0]} />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={()=>{this.changeinput(false)}} /> 
                                        </Space>                                      
                                    )
                                    
                                })

                            }
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    style={{ width: '100%' }}
                                    icon={<PlusOutlined />}
                                    onClick={()=>{this.changeinput(true)}}
                                >
                                    添加字段
                                </Button>
                            </Form.Item>                                                                          
                        </Form>
                    
                    </Modal>

                    <Modal
                        title=""
                        visible={this.state.detailvisible}
                        footer={null}
                       onOk={this.handledetailok}
                      onCancel={()=>{this.setState({detailvisible: false})}}
                    >
                          <Descriptions title="资源详细信息" layout="vertical">

                        {
                            this.state.detailvalue.map((item,index) =>{
                                return (
                                <Descriptions.Item 
                                    key={index}
                                    label={Object.keys(item)[0]}
                                >
                                    {Object.values(item)[0]}
                                </Descriptions.Item>
    
                                )
                            })
                                
                        }
                        </ Descriptions>
                    </Modal>

                    
            </Card>
     
        )
    }
}
