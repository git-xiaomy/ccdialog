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
            bg.style.width='70%'
            bg.style.minHeight=height/1.2+'px'
            bg.style.top=(this.$bodyHeight-(height/1.2))/2+'px'
            bg.style.left='15%'
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
        ico.style.width='64px'
        ico.src='data:image/png;base64,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'
        ico.id='id_wyc_dialog_ico'
        ico.style.margin='0 auto'
        ico.style.marginTop=height/8+'px'
        if (self.mask==null) {
            bg.style.boxShadow='10px 10px 20px 10px rgba(192,192,192,0.5), -10px 10px 10px 10px rgba(192,192,192,0.5)'
        }else{
            bg.style.boxShadow='0px 0px 5px 5px rgba(128,128,128,0.5), -10px 10px 10px 10px rgba(128,128,128,0.5)'
        }
        
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
            if (self.mask != null) {
                self.mask.style.display='none'
                self.mask.parentNode.removeChild(self.mask);
            }
            
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