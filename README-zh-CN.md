# vue-img-cutter

#### [English documents](README.md)

简单易用的 vue 图片裁剪插件，支持旋转、缩放、平移，固定比例，固定尺寸，远程图片裁剪，只需要很少的代码就可以实现裁剪功能，也可以通过调整参数以适应你自己的业务需求。

[![GitHub stars](https://img.shields.io/github/stars/acccccccb/vue-img-cutter?style=for-the-badge)](https://github.com/acccccccb/vue-img-cutter/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/acccccccb/vue-img-cutter?style=for-the-badge)](https://github.com/acccccccb/vue-img-cutter/network)
[![npm](https://img.shields.io/npm/v/vue-img-cutter?style=for-the-badge)](https://www.npmjs.com/package/vue-img-cutter)
[![npm](https://img.shields.io/npm/dt/vue-img-cutter?style=for-the-badge)](https://www.npmjs.com/package/vue-img-cutter)

### 特色：

---

-   兼容 IE9+,MSEdge,Chrome,Firefox
-   两种展现形式，行内或弹窗
-   可旋转、缩放图片
-   任意比例、大小裁剪
-   固定比例、大小裁剪
-   支持远程图片裁剪、跨域设置

### 插件截图：

---

![插件截图](https://i.bmp.ovh/imgs/2019/11/28f8a9059f089e05.png)

### 演示地址：

---

[https://www.ihtmlcss.com/demo/dist/#/croptool](https://www.ihtmlcss.com/demo/dist/#/croptool)

### 项目地址：

---

Github：[https://github.com/acccccccb/vue-img-cutter](https://github.com/acccccccb/vue-img-cutter)

码云：[https://gitee.com/GLUESTICK/vue-img-cutter](https://gitee.com/GLUESTICK/vue-img-cutter)

**如果此项目对你有帮助，请给我一个 star :)**

### 使用方法：

---

1. 安装

```shell
npm install vue-img-cutter --save-dev # vue2
npm install vue-img-cutter --save-dev # vue3
```

2. 将 ImgCutter.vue 文件引入项目：

```javascript
import ImgCutter from 'vue-img-cutter'
export default {
        components:{
            ImgCutter
        },
...
}
```

3. 在页面中使用：

```html
<ImgCutter v-on:cutDown="cutDown"></ImgCutter>
```

4. 可使用 solt

```html
<ImgCutter v-on:cutDown="cutDown">
    <template #open>
        <button>选择图片</button>
    </template>
</ImgCutter>
```

5. 远程、跨域裁剪（兼容 IE9）

> ~~需要自己写一个方法来触发裁剪工具弹出~~

> ~~在方法中先将图片上传至服务器，拿到返回的 url 后创建一个 obj，然后将对象传入裁剪工具~~

> 2.1.9 版本后只需要传入图片 url 和图片名称

```javascript
// 传入的obj必须包含这四个属性
let obj = {
    name: '1.jpg', //远程图片名称
    src: 'http://url/1.jpg', //远程图片url
    //width:200,//远程图片的原始宽度 2.1.9版本后不需要
    //height:200,//远程图片的原始高度  2.1.9版本后不需要
};
```

```javascript
forIe9:function(){
	// 传入name，src name中必须包含后缀名
	this.$refs.imgCutterModal.handleOpen({
        name:"image.jpg",
        src:"http://imageServ.com/image.jpg",
    });
}
```

### 参数说明：

---

|       属性名       |                               作用                               |        类型        | 必填 |      默认值       |
| :----------------: | :--------------------------------------------------------------: | :----------------: | :--: | :---------------: |
|      isModal       |                          是否为弹窗模式                          |      Boolean       |  否  |       true        |
|   showChooseBtn    |                       是否显示选择图片按钮                       |      Boolean       |  否  |       true        |
|     lockScroll     |               是否在 Dialog 出现时将 body 滚动锁定               |      Boolean       |  否  |       true        |
|       label        |                  默认打开裁剪工具按钮的显示文字                  |       String       |  否  |     选择图片      |
|      boxWidth      |                           裁剪工具宽度                           |       Number       |  否  |        800        |
|     boxHeight      |                           裁剪工具高度                           |       Number       |  否  |        400        |
|      cutWidth      |                           默认裁剪宽度                           |       Number       |  否  |        200        |
|     cutHeight      |                           默认裁剪高度                           |       Number       |  否  |        200        |
|        tool        |                          是否显示工具栏                          |      Boolean       |  否  |       true        |
|      toolBgc       |                           工具栏背景色                           | String(例: "#fff") |  否  |       #fff        |
|     sizeChange     |                      是否能够调整裁剪框大小                      |      Boolean       |  否  |       true        |
|      moveAble      |                       能否调整裁剪区域位置                       |      Boolean       |  否  |       true        |
|      imgMove       |                           能否拖动图片                           |      Boolean       |  否  |       true        |
|   originalGraph    |                         是否直接裁剪原图                         |      Boolean       |  否  |       false       |
|    crossOrigin     |                是否设置跨域，需要服务器做相应更改                |      Boolean       |  否  |       false       |
| crossOriginHeader  |            设置跨域信息 crossOrigin 为 true 时才生效             |       String       |  否  |        ''         |
|        rate        |                             图片比例                             | String(例: "4:3")  |  否  |         -         |
|   WatermarkText    |                             水印文字                             |       String       |  否  |        ''         |
| WatermarkTextFont  |                           水印文字字体                           |       String       |  否  | '12px Sans-serif' |
| WatermarkTextColor |                           水印文字颜色                           |       String       |  否  |      '#fff'       |
|   WatermarkTextX   |                         水印文字水平位置                         |       Number       |  否  |       0.95        |
|   WatermarkTextY   |                         水印文字垂直位置                         |       Number       |  否  |       0.95        |
|   smallToUpload    |    如果裁剪尺寸固定且图片尺寸小于裁剪尺寸则不裁剪直接返回文件    |      Boolean       |  否  |       false       |
|  saveCutPosition   |                   是否保存上一次裁剪位置及大小                   |      Boolean       |  否  |       false       |
|     scaleAble      |                       是否允许滚轮缩放图片                       |      Boolean       |  否  |       true        |
|  toolBoxOverflow   |                    是否允许裁剪框超出图片范围                    |      Boolean       |  否  |       true        |
|       index        |                  自定义参数，将会同结果一起返回                  |        Any         |  否  |       null        |
|    previewMode     | 裁剪过程中是否返回裁剪结果，如果裁剪出现卡顿时将此项设置为 false |      Boolean       |  否  |       true        |
|      fileType      |               返回的文件类型 ( png / jpeg / webp)                |       String       |  否  |        png        |

> 支持 slot，在组件内部使用带有 slot="open"属性的元素即可自定义打开组件的按钮

### 钩子函数：

|   属性名    |          作用          |   类型   | 必填 |    返回值    |
| :---------: | :--------------------: | :------: | :--: | :----------: |
|   cutDown   | 完成截图后要执行的方法 | Function |  是  |    Object    |
|    error    |        错误回调        | Function |  否  | Error object |
| onChooseImg |       选择图片后       | Function |  否  |    Object    |
| onPrintImg  |    在画布上绘制图片    | Function |  否  |    Object    |
| onClearAll  |        清空画布        | Function |  否  |     null     |

### 插槽(slot)：

|       插槽名称        |       作用        |
| :-------------------: | :---------------: |
| open 或 openImgCutter |    弹出裁剪框     |
|        choose         |   选择本地图片    |
|        cancel         |     取消/清空     |
|        confirm        |     确认裁剪      |
|         ratio         |  工具栏：宽高比   |
|      scaleReset       | 工具栏： 重置缩放 |
|       turnLeft        | 工具栏： 向左旋转 |
|       turnRight       | 工具栏： 向右旋转 |
|         reset         | 工具栏： 重置旋转 |
|    flipHorizontal     | 工具栏： 水平翻转 |
|    flipVertically     | 工具栏： 垂直翻转 |

### 返回值 @cutDown：

---

|  属性名  |                      类型                      |
| :------: | :--------------------------------------------: |
| fileName |                     文件名                     |
|   file   | file 类型的文件对象（IE 部分版本可能不会返回） |
|   blob   | blob 类型的文件对象（IE 部分版本可能不会返回） |
| dataURL  |                    dataURL                     |
|  index   |                      Any                       |

### 开发中功能：

-   原图裁剪 开发中

### 捐赠:

![微信](https://ihtmlcss.oss-cn-chengdu.aliyuncs.com/2020/01/weixinpay.png)
![支付宝](https://ihtmlcss.oss-cn-chengdu.aliyuncs.com/2020/01/alipay.png)

### 更新日志：

---

#### 3.0.1

-   bugfix：[#I4SDOE](https://gitee.com/GLUESTICK/vue-img-cutter/issues/I4SDOE)

-   bugfix: dialog-footer 默认高度 40px

-   bugfix: 显示宽高及坐标移除小数点

#### 3.0.0

-   chore：构建工具改为 vue3

#### 2.2.5

-   Bugfix：移除 template 中的 this

#### 2.2.4

-   新增参数( toolBoxOverflow ): 是否允许裁剪框超出图片范围 默认值：true

#### 2.2.3

-   bug：等比例缩放时，左上角和右上角调整尺寸时的计算优化 [#I3OXMW](https://gitee.com/GLUESTICK/vue-img-cutter/issues/I3OXMW)

#### 2.2.2

-   新增参数(imgMove)：能否拖动图片 默认 true

#### 2.2.1

-   新增参数(fileType)：返回的文件类型 默认 png

#### 2.2.0

-   新增参数(index)：可添加任意参数，将会同结果一起返回，用来区分是那个组件的返回结果
-   修复 bug：避免底部选择图片按钮位置被外部 text-align 影响

#### 2.1.10

-   新增两个参数:
-   1.saveCutPosition:是否保存上一次裁剪位置及尺寸
-   2.scaleAble:是否允许缩放图片

#### 2.1.9

-   优化了远程裁剪的方法，只需要传入 name 和 src 两个参数

#### 2.1.8

-   新增参数：smallToUpload 如果裁剪尺寸固定且图片尺寸小于裁剪尺寸则不裁剪直接返回文件 #20

#### 2.1.7

-   修复 bug:#21 cropPicture 未传值导致裁剪功能失效

#### 2.1.6

-   新增三个事件钩子：onClearAll,onPrintImg,onChooseImg

#### 2.1.5

-   修复 bug：button 添加属性 type=button

#### 2.1.4

-   修复 bug：原图裁剪宽度显示错误

#### 2.1.3

-   修复 bug：如果没有选取图片直接点击确定，也能触发裁剪函数 #16，现在如果未选去图片，将会触发错误回调 error
-   修复 bug：配置 rate 截图无法达到预期宽高 #15

#### 2.1.2

-   增加水平翻转和垂直翻转
-   新增插槽:ratio,scaleReset,turnLeft,turnRight,reset,flipHorizontal,flipVertically

#### 2.1.1

-   新增英文文档

#### 2.1.0

-   新增属性：originalGraph，originalGraph 等于 true 时裁剪原图，不支持图像旋转
-   修复非弹窗模式下无法使用鼠标滚轮缩放图片的问题

#### 2.0.30

-   修复了选区超出画布的问题

#### 2.0.29

-   优化了裁剪控件的操作体验
-   当裁剪宽度/高度小于 20 时隐藏四边中间的操作杆

#### 2.0.28

-   调整了版本号显示的位置
-   新增三个插槽：choose/cancel/confirm
-   新增属性：工具栏背景色 toolBgc
-   将裁剪框限制在画布内

#### 2.0.27

-   修正了裁剪远程图片时创建的 img 对象被显示出来的问题
-   修正了在 IE 浏览器下点击取消按钮报错的问题
-   远程图片加载失败时不弹出裁剪工具

#### 2.0.26

-   修正了当没有选择图片直接选择取消会导致错误的问题

#### 2.0.25

-   更新说明文档

#### 2.0.24

-   简化了兼容 IE9 的方法，只需要在执行 this.\$refs['yourComponent'].handleOpen(imgObj)时传入对象，对象必须包含 name,src,width,height 属性
-   修正了行内模式下鼠标滚轮缩放失效的问题
-   增加了跨域参数
-   增加了 error 参数，将会返回错误信息

#### 2.0.23

-   新增参数 isModal/showChooseBtn/lockScroll
-   可选择作为行内组件或者弹窗组件，可选是否显示选择图片按钮，是否在弹窗打开时锁定 body 滚动

#### 2.0.22

-   兼容 IE9+,MSEdge,chrome,firefox
-   由于没有找到 IE11 以下的浏览器，所以只能在仿真模式下测试，所以 IE11 以下可能会出现一些我没发现的问题，目前仿真模式下 IE9+都测试通过了。IE8 及以下不再支持。
-   如果需要兼容 IE9，需要先将图片上传到服务器上，然后执行 this.\$refs['yourComponent'].handleOpen(callback);
-   添加了 importImgToCanv 方法来兼容 IE9，必须在执行 handleOpen 后才能执行
-   拖动，调整选框时会自动隐藏工具栏
-   稍微调整了下样式，增加了动态的蚂蚁线

#### 2.0.21

-   兼容 IE8+,MSEdge,chrome,firefox
-   新增了设置参数，可固定裁剪框位置，固定裁剪尺寸，具体请看参数说明
-   修复了非 IE 系浏览器不返回 file 对象的问题

#### 2.0.20

-   兼容 IE11+,MSEdge。IE11 以下版本未测试

#### 2.0.19

-   修改了返回值，现在将追加返回文件名和 file 类型的文件对象

#### 2.0.18

-   修复了点击选择图片按钮时有一定几率刷新页面的问题

#### 2.0.17

-   调整了样式
-   修正了弹窗超出屏幕后被遮挡的问题

#### 2.0.16

-   修正了旋转工具条显示错误的问题

#### 2.0.15

-   增加工具栏 可对图片进行旋转/缩放操作
-   优化了动画效果
