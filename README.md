# vue-img-cutter
> vue图片裁剪插件，支持任意尺寸裁剪和等比例裁剪

![插件截图](http://www.ihtmlcss.com/wp-content/uploads/2019/05/cut-707x550.jpg)

##### 演示地址：[http://ihtmlcss.com/demo/dist/#/croptool](http://ihtmlcss.com/demo/dist/#/croptool)
##### 项目地址：[https://github.com/acccccccb/vue-img-cutter](https://github.com/acccccccb/vue-img-cutter)

### 使用方法

> 1. 将ImgCutter.vue文件以组件的形式引入项目：

```
npm install vue-img-cutter --save-dev
```

```
import ImgCutter from 'vue-img-cutter'
export default {
        components:{
            ImgCutter
        },
...
}
```
> 2. 在项目中使用组件：

```
<ImgCutter
    v-bind:label="'选择图片'"
    v-bind:boxWidth="800"
    v-bind:boxHeight="400"
    v-bind:rate="16:9"
    v-on:cutDown="cudDown"
></ImgCutter>
```

### 参数说明：
- label:按钮的显示文字，字符串，选填
- boxWidth:裁剪工具宽度，数字，选填
- boxHeight:裁剪工具高度，数字，选填
- rate:图片比例，字符串，选填，例:16:9
- cutDown:完成截图后要执行的方法，必填，截图后返回Blob和dataUrl
