# vue-img-cutter
> vue图片裁剪插件，支持任意尺寸裁剪，限制比例裁剪，拖动，缩放

![插件截图](http://www.ihtmlcss.com/wp-content/uploads/2019/06/img-cutter.png)

##### 演示地址：[http://ihtmlcss.com/demo/dist/#/croptool](http://ihtmlcss.com/demo/dist/#/croptool)
##### 项目地址：[https://github.com/acccccccb/vue-img-cutter](https://github.com/acccccccb/vue-img-cutter)

### 使用方法

```
npm install vue-img-cutter --save-dev
```
> 1. 将ImgCutter.vue文件引入项目：
```
import ImgCutter from 'vue-img-cutter'
export default {
        components:{
            ImgCutter
        },
...
}
```
> 2. 在template中使用：

```
<ImgCutter
    :label="'选择图片'"
    :boxWidth="800"
    :boxHeight="400"
    :rate="16:9"
    v-on:cutDown="cutDown">
    <button slot="openImgCutter">选择图片</button>
</ImgCutter>
```

### 参数说明：

| 属性名 | 作用 | 类型  | 必填 | 默认值 |
|:----:|----|:----:|:----:|:----:|
|label|默认打开裁剪工具按钮的显示文字|String|否|选择图片|
|boxWidth|裁剪工具宽度|Number|否|800|
|boxHeight|裁剪工具高度|Number|否|400|
|rate|图片比例|String(例: "4:3")|否|-|
|cutDown|完成截图后要执行的方法|Function|是|-|
> 支持slot，在组件内部使用带有slot="open"属性的元素即可自定义打开组件的按钮

### 更新日志 

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
