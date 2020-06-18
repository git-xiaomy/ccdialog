# dialog
只需引入一个js，即可实现漂亮的html弹窗，一键蒙版

![dialog](http://public.xiaomy.net/js/demo.png)

效果展示
http://public.xiaomy.net/js/

# 使用方法

*head中引用*
```javascript
<script src="http://public.xiaomy.net/js/dialog.js"></script>
```

*使用*
```javascript
new Dialog("1","系统通知","您目前已获得特价购买资格，名额已为您锁定，15分钟内有效",function(){
    alert('被点击')
});
```
