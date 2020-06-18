/*
 * @Description: 网云穿Dialog封装
 * @Autor: Hkoos
 * @Email: 670999782@qq.com
 * @Date: 2020-06-18 14:53:47
 * @LastEditors: Hkoos
 * @LastEditTime: 2020-06-18 18:25:50
 */ 
function Dialog(type,title,content,clickCall){
    this.$type=type
    this.$title=title
    this.$content=content
    this.clickCall=clickCall
    this._init()
}
Dialog.prototype={
    _init:function(){
        
        this.$body=document.getElementsByTagName('body')[0]; //获取body 元素  
        this.$bodyWidth=document.body.offsetWidth;//可见区宽度
        this.$bodyHeight=document.documentElement.clientHeight || document.body.clientHeight;//可见区高度
        this.show()
    },
    show:function(){
        this.createMask()
        this.createDialog()
        // alert(this.$text)
    },
    createMask(){
        //创建蒙版
        var self=this;
        var div=document.createElement("id_wyc_mask"); //创建元素节点直接写元素名
        div.style.width=(this.$bodyWidth)+"px";
        div.style.height=(this.$bodyHeight)+"px";
        div.style.position='absolute'
        div.style.top=0
        div.style.left=0
        div.style.backgroundColor='#000000'
        div.style.zIndex=0
        div.style.filter='Alpha(Opacity=30)'
        div.style.opacity=0.3
        this.$body.appendChild(div);
        self.mask=div
    },
    createDialog(width,height){

        var self=this;

        if(width==null) width=300
        if(height==null) height=400
        var bg=document.createElement("id_wyc_dialog_bg")
        bg.style.position='absolute'
        bg.zIndex=99
        if(this.$bodyWidth < 640){
            //移动端
            bg.style.width='60%'
            bg.style.minHeight=height/1.2+'px'
            bg.style.top=(this.$bodyHeight-(height/1.2))/2+'px'
            bg.style.left='20%'
        }
        if(this.$bodyWidth >= 640){
            //PC端

            //宽高
            bg.style.width=width+'px'
            bg.style.minHeight=height+'px'
            //居中
            bg.style.top=(this.$bodyHeight-height)/2+'px'
            bg.style.left=(this.$bodyWidth-width)/2+'px'

            //
        }
        bg.style.textAlign='center'
        bg.style.background='linear-gradient(141deg,#2cb5e8 0%,#1fc8db 51%,#2cb5e8 75%)'
        bg.style.borderRadius='10px'
        
        var ico=new Image()
        ico.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADzUlEQVR4Xu2bS6hWVRTHf39oktCkBw2KJmFpihkG0cQs0EEoRpIYVCAaTiJ6IEIN0oEQpEhIEx+TQiOlUiEioTIHSlCBmhaiCJUPosZGkxUrzpW43e87a+9z7nlwz55+a639X7+zv7Vf54gZ3tRW/mZ2O3BX0f9lSX+0oaVxAGb2KPAq8MykhA8COySdbBJEowDMbAFwqiTBxyUdawpC0wC+AJaVJHceWCLpahMQGgNgZj7kDwST2ixpS9C2klkjAMxsBfD8FP/7UeKvAO8D3wDHJP1VKcsxztMGwMxuBV4EVgJe+HLbNeBjYLukS7lBRvlNCwAzWwO8CcyvUbDXBIewvcaY1ArAzG4B3gXW1ilyUqzjwGuSvq+jj9oAmNkc4DBwXx3CAjE2SNoVsBtrUguAYnFzoqqYDP/1kvZm+N1wqQzAzB4AzlYRUdF3tSRfRWa1SgCK5H1xc3dW7/U5rZR0JCdcVQBfAk/kdFyzz3FJj+XEzAZgZpuAt3M6nSafVyT5DJTUsgCY2ULApyOf9rrSfgUeSd1D5ALwJ+8joGsteQ+RDMDMbgLOAbO7lj3ge4iHU0ZBDoDVwEcdTH5CUtIoyAGwB1jXYQCfSVoe1ZcD4EdgXrSDFux+l3RntN8kAGbmgX172vV2vyQ/WSptqQCWAkdLo7Zv8KSkzyMyUgH4Pv/DSOCWbZ6TtC+iIRXAS8DOSOCWbV6WFNKZCuAtYHPLyUW6D0+FA4AIzgkbMxtGwPAXGGrAUASHWSClcLZkO0yD0cvVYR2QMkRn9DqguN9/D7gjBVpLtvXWgA4egUe4hm6MSmuAmS0Cvov02EGbpyT5he3INhaAmc0CvvLz9g4mF5H0LbBY0t+jjMsAvAFsjfTUYZux9aAMgJ//z+1wchFppyT5TdaUbSQAM1sCfB3poQc2CySdmUrnOADPAvt7kFxE4sgZYRyA14Ftkeg9sPF3inakjoC+nP5E+I8shONGwIwHsB7YHcHbA5usEeBvev4G3NyDBMskzpZ0IakGuHGPdn/jAHwq6enkdcCEg5n9ADxUhrijv/vbpMsljbzQLd0MFSPB68HE5y0dzfV/snwFeKhMbAhAWZA+/z4A6PPTq0N7IyPAzLwK+0cPKW2VpE9SHHJsmwIQ+Vpssv4HJZ3OSSrFpykAvpj6GbgnKO4XYI6k60H7bLNGABRTqX805R9CRdoLkj6IGFa1aQxAASGywQofaVdN3v0bBVBAuBd4xw8rgduKJP4sXr7eKOliHYlFYzQO4L/CzOzf80ZJP0UF123XKoC6k8mJ9w+8PDZQHLFgwgAAAABJRU5ErkJggg=='
        ico.id='id_wyc_dialog_ico'
        ico.style.margin='0 auto'
        ico.style.marginTop=height/8+'px'
        bg.style.boxShadow='10px 10px 20px 10px rgba(192,192,192,0.5), -10px 10px 10px 10px rgba(192,192,192,0.5)'
        bg.appendChild(ico)


        //Title
        var title = document.createElement("p");
        title.appendChild(document.createTextNode(this.$title));
        bg.appendChild(title);
        title.id='id_wyc_dialog_title'
        title.style.color='white'
        title.style.fontWeight='bold'
        title.style.width='70%'
        title.style.marginLeft='15%'
        //超出省略
        title.style.overflow='hidden'
        title.style.textOverflow='ellipsis'
        title.style.whiteSpace='nowrap'



        //Content
        var content = document.createElement("p");
        content.appendChild(document.createTextNode(this.$content));
        bg.appendChild(content);
        content.id='id_wyc_dialog_content'
        content.style.color='#F5F5F5'
        // content.style.fontWeight='bold'
        content.style.width='80%'
        content.style.marginLeft='10%'
        //超出省略
        // content.style.overflow='hidden'
        // content.style.textOverflow='ellipsis'
        // content.style.whiteSpace='nowrap'
        content.style.wordWrap='break-word'
        content.style.fontSize='14px'
        content.style.marginBottom=height/10+'px'

        //确定按钮
        var bt =document.createElement("button");           //createElement生成button对象
        bt.id='id_wyc_dialog_content'
        bt.innerHTML = '确定';
        bt.style.width='80%'
        bt.style.height=height/9+'px'
        bt.style.marginBottom=height/10+'px'
        bt.style.background='linear-gradient(141deg,#40E0D0 0%,#00FFFF 51%,#40E0D0 75%)'
        bt.style.border='none'
        bt.style.borderRadius='10px'
        bt.style.fontSize='14px'
        bt.style.fontWeight='bold'
        bt.style.color='#FFFFF0'
        bt.style.transition='all 1s;'
        self.bg=bg

        
        bt.onclick = function(){
            //销毁蒙版
            self.mask.style.display='none'
            self.mask.parentNode.removeChild(self.mask);
            self.bg.parentNode.removeChild(self.bg);
            self.clickCall()
        }


        bg.appendChild(bt);
        //鼠标进入事件
        bt.onmouseover = function () {
            // bt.style.background='linear-gradient(141deg,#F0F8FF 0%,#191970 51%,#808080 75%)'
            bt.style.background='linear-gradient(141deg,#40E0D0 30%,#00FFFF 30%,#40E0D0 30%)'
        };
        //鼠标离开事件
        bt.onmouseout = function () {
            // bt.style.background='linear-gradient(141deg,#2F4F4F 0%,#808080 51%,#191970 75%)'
            
            bt.style.background='linear-gradient(141deg,#40E0D0 0%,#00FFFF 51%,#40E0D0 75%)'
        };
        
        this.$body.appendChild(bg);
    }
}