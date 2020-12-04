export  let navdata =  [
    {
        key: "Home",
        icon: "<HomeOutlined />",
        content: "首页"
        
    },
    {
        key: "cmdb",
        icon: "<MoneyCollectOutlined />",
        content: "资产管理",
        children: [
            {
                key: "cmdbclassify",
                link: "/dashboard/cmdbclassify",
                content: "数据分类"
            },
            {
                key: "cmdbdict",
                link: "/dashboard/cmdbdict",
                content: "数据字典"
            }

        ]  
    }
]