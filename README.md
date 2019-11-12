
# vue-img-cutter
> vue图片裁剪插件，支持任意尺寸裁剪，限制比例裁剪，拖动，缩放
> 兼容IE9+,MSEdge,Chrome,Firefox

![插件截图](http://www.ihtmlcss.com/wp-content/uploads/2019/06/img-cutter.png)

##### 演示地址：[http://ihtmlcss.com/demo/dist/#/croptool](http://ihtmlcss.com/demo/dist/#/croptool)
##### 项目地址：[https://github.com/acccccccb/vue-img-cutter](https://github.com/acccccccb/vue-img-cutter)

### 使用方法

```
npm install vue-img-cutter --save-dev
```
> 将ImgCutter.vue文件引入项目：
```
import ImgCutter from 'vue-img-cutter'
export default {
        components:{
            ImgCutter
        },
...
}
```
> 在template中使用：

```
<ImgCutter
	ref="imgCutter"
    :label="'选择图片'"
    :boxWidth="700"
    :boxHeight="400"
    :cutWidth="250"
    :cutHeight="250"
    :rate="'1:1'"
    :sizeChange="true"
    :moveAble="true"
    v-on:cutDown="cutDown">
    <button slot="open">选择图片</button>
</ImgCutter>
```
> 如果要兼容IE9浏览器，原来的按钮就不能用了，需要自己写一个方法来触发裁剪工具弹出
> 在方法中先将图片上传至服务器，拿到返回的url后创建一个obj，然后将对象传入裁剪工具
> <button type="button" @click="forIe9">选择图片</button>
```javascript
forIe9:function(){
	// 此处需要先提交待裁剪的图片到服务器上，然后拿到图片name,src,width,height,这些参数必须传
	uploadMethod(file).then((res)=>{
		this.$refs.imgCutterModal.handleOpen({
            name:res.name,
            src:res.src,
            width:res.width,
            height:res.height,
        });
	});
}
```


### 参数说明：

| 属性名 | 作用 | 类型  | 必填 | 默认值 |
|:----:|----|:----:|:----:|:----:|
|isModal|是否为弹窗模式|Boolean|否|true|
|showChooseBtn|是否显示选择图片按钮|Boolean|否|true|
|lockScroll|是否在Dialog出现时将body滚动锁定|Boolean|否|true|
|label|默认打开裁剪工具按钮的显示文字|String|否|选择图片|
|boxWidth|裁剪工具宽度|Number|否|800|
|boxHeight|裁剪工具高度|Number|否|400|
|cutWidth|默认裁剪宽度|Number|否|200|
|cutHeight|默认裁剪高度|Number|否|200|
|tool|是否显示工具栏|Boolean|否|true|
|sizeChange|是否能够调整裁剪框大小|Boolean|否|true|
|moveAble|能否调整裁剪区域位置|Boolean|否|true|
|crossOrigin|是否设置跨域，需要服务器做相应更改|Boolean|否|false|
|crossOriginHeader|设置跨域信息crossOrigin为true时才生效|String|否|''|
|rate|图片比例|String(例: "4:3")|否|-|
|cutDown|完成截图后要执行的方法|Function|是|-|
|error|错误回调|Function|否|-|
> 支持slot，在组件内部使用带有slot="open"属性的元素即可自定义打开组件的按钮

### 返回值：
| 属性名 | 类型  |
|:----:|:----:|
|fileName|文件名|
|file|file类型的文件对象（IE部分版本可能不会返回）|
|blob|blob类型的文件对象（IE部分版本可能不会返回）|
|dataURL|dataURL|

### 更新日志 
#### 2.0.24
- 简化了兼容IE9的方法，只需要在执行this.$refs['yourComponent'].handleOpen(imgObj)时传入对象，对象必须包含name,src,width,height属性
- 修正了行内模式下鼠标滚轮缩放失效的问题
- 增加了跨域参数
- 增加了 error 参数，将会返回错误信息
#### 2.0.23
- 新增参数isModal/showChooseBtn/lockScroll
- 可选择作为行内组件或者弹窗组件，可选是否显示选择图片按钮，是否在弹窗打开时锁定body滚动
#### 2.0.22
- 兼容IE9+,MSEdge,chrome,firefox
- 由于没有找到IE11以下的浏览器，所以只能在仿真模式下测试，所以IE11以下可能会出现一些我没发现的问题，目前仿真模式下IE9+都测试通过了。IE8及以下不再支持。
- 如果需要兼容IE9，需要先将图片上传到服务器上，然后执行this.$refs['yourComponent'].handleOpen(callback);
- 添加了importImgToCanv方法来兼容IE9，必须在执行handleOpen后才能执行
- 拖动，调整选框时会自动隐藏工具栏
- 稍微调整了下样式，增加了动态的蚂蚁线
#### 2.0.21
- 兼容IE8+,MSEdge,chrome,firefox
- 新增了设置参数，可固定裁剪框位置，固定裁剪尺寸，具体请看参数说明
- 修复了非IE系浏览器不返回file对象的问题
#### 2.0.20
- 兼容IE11+,MSEdge。IE11以下版本未测试

#### 2.0.19
- 修改了返回值，现在将追加返回文件名和file类型的文件对象

#### 2.0.18

- 修复了点击选择图片按钮时有一定几率刷新页面的问题

#### 2.0.17

- 调整了样式
- 修正了弹窗超出屏幕后被遮挡的问题

#### 2.0.16

- 修正了旋转工具条显示错误的问题

#### 2.0.15

- 增加工具栏 可对图片进行旋转/缩放操作
- 优化了动画效果
