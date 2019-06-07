<template>
    <div>
        <div @click="visible=true">
            <slot name="openImgCutter"></slot>
        </div>
        <button v-if="!$slots.openImgCutter" class="btn btn-primary" @click="visible=true">{{label}}</button>
        <transition name="fade">
            <div v-show="visible" @click="handleClose" class="mask"></div>
        </transition>
        <transition name="fade">
            <div class="dialogMain"
                 title="裁剪图片"
                 v-show="visible"
                 :width="boxWidth+40+'px'"
                 appendToBody
                 :before-close="handleClose">
                <div class="toolMain">
                    <div class="tool-title">
                        图片裁剪
                        <span class="closeIcon" @click="handleClose">x</span>
                    </div>
                    <div ref="toolBox"
                         :style="'height:'+boxHeight+'px;width:'+boxWidth+'px'"
                         v-on:mousemove="controlBtnMouseMove"
                         v-on:mouseup="controlBtnMouseUp"
                         v-on:mouseleave="controlBtnMouseLeave"
                         class="toolBox">
                        <div class="tips" v-show="!drawImg.img">
                            <button class="btn btn-warning btn-xs" @click="chooseImg">请选择要裁剪的图片</button>
                        </div>
                        <div
                                v-show="drawImg.img"
                                v-on:mousedown="toolBoxMouseDown"
                                v-on:mouseup="toolBoxMouseUp"
                                v-on:mousemove="toolBoxMouseMove"
                                v-on:mouseleave="toolBoxMouseLeave"
                                ref="toolBoxControl"
                                class="toolBoxControl">
                            <div class="controlBox">
                                <div class="selectArea">宽:{{toolBox.width}} 高:{{toolBox.height}}
                                    (x:{{toolBox.boxMove.moveTo.x}},y:{{toolBox.boxMove.moveTo.y}})
                                </div>
                                <div data-name="leftUp"
                                     v-on:mousedown="controlBtnMouseDown"
                                     class="leftUp controlBtn"></div>
                                <div data-name="leftDown"
                                     v-on:mousedown="controlBtnMouseDown"
                                     class="leftDown controlBtn"></div>
                                <div data-name="rightUp"
                                     v-on:mousedown="controlBtnMouseDown"
                                     class="rightUp controlBtn"></div>
                                <div data-name="rightDown"
                                     v-on:mousedown="controlBtnMouseDown"
                                     class="rightDown controlBtn"></div>

                                <div data-name="topCenter"
                                     v-on:mousedown="controlBtnMouseDown"
                                     class="topCenter controlBtn"></div>
                                <div data-name="downCenter"
                                     v-on:mousedown="controlBtnMouseDown"
                                     class="downCenter controlBtn"></div>
                                <div data-name="leftCenter"
                                     v-on:mousedown="controlBtnMouseDown"
                                     class="leftCenter controlBtn"></div>
                                <div data-name="rightCenter"
                                     v-on:mousedown="controlBtnMouseDown"
                                     class="rightCenter controlBtn"></div>

                                <div class="toolBoxControlLine toolBoxControlLineItem-1"></div>
                                <div class="toolBoxControlLine toolBoxControlLineItem-2"></div>
                                <div class="toolBoxControlLine toolBoxControlLineItem-3"></div>
                                <div class="toolBoxControlLine toolBoxControlLineItem-4"></div>
                            </div>
                        </div>
                        <canvas class="canvasSelectBox" ref="canvasSelectBox" :width="boxWidth"
                                :height="boxHeight"></canvas>
                        <canvas class="canvas" ref="canvas" :width="boxWidth" :height="boxHeight"></canvas>
                    </div>
                    <div class="toolBar">
                        <div class="toolbar-item">
                            <button v-if="!!rate" class="btn btn-primary-plain btn-xs" disabled type="primary" plain>
                                图片比例：{{rate}}
                            </button>
                        </div>
                    </div>
                </div>
                <span class="i-dialog-footer">
                    <input v-show="false" @change="putImgToCanv" ref="inputFile" type="file" accept="image/*">
                    <button class="btn btn-primary btn-primary-plain" @click="chooseImg">选择图片</button>
                    <div class="btn-group fr">
                        <button class="btn btn-default" @click="handleClose">取消</button>
                        <button class="btn btn-primary" :disabled="!drawImg.img" type="primary" @click="cropPicture">确定</button>
                    </div>
                </span>
                <div class="copyright">
                    <a v-if="!DoNotDisplayCopyright" target="_blank" href="https://github.com/acccccccb/vue-img-cutter" rel="nofollow">vue-img-cutter</a>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        name: 'ImgCutter',
        props: {
            label: {
                type: String,
                default: "选择图片",
                required: false
            },
            boxWidth: {
                type: Number,
                default: 800,
                required: false
            },
            boxHeight: {
                type: Number,
                default: 400,
                required: false
            },
            rate: {
                type: String,
                default: null,
                required: false,
            },
            DoNotDisplayCopyright:{
                type:Boolean,
                default:false,
                required:false,
            }
        },
        model: ['label', 'boxWidth', 'boxHeight', 'rate','DoNotDisplayCopyright'],
        data() {
            let toolBoxWidth, toolBoxHeight;
            toolBoxWidth = this.boxWidth / 2;
            toolBoxHeight = this.boxHeight / 2;
            return {
                visible: false,
                drawImg: {
                    img: null,//规定要使用的图像、画布或视频
                    sx: 0,//开始剪切的 x 坐标位置
                    sy: 0,//开始剪切的 y 坐标位置
                    swidth: 0,//被剪切图像的宽度
                    sheight: 0,//被剪切图像的高度
                    x: 0,//在画布上放置图像的 x 坐标位置
                    y: 0,//在画布上放置图像的 y 坐标位置
                    width: 0,//要使用的图像的宽度
                    height: 0//要使用的图像的高度
                },
                toolBox: {
                    disable: true,
                    width: toolBoxWidth,
                    height: toolBoxHeight,
                    x: 0,
                    y: 0,
                    boxMove: {
                        start: {
                            x: 0,
                            y: 0,
                        },
                        moveTo: {
                            x: 0,
                            y: 0,
                        }
                    },
                },
                controlBox: {
                    disable: true,
                    btnName: '',
                    start: {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0,
                    }
                },
                selectBox: false,
                selectBoxColor: 'rgba(0,0,0,0.6)',
            }
        },
        methods: {
            handleClose: function () {
                this.visible = false;
                this.$nextTick(() => {
                    this.clearAll();
                });
            },
            // 选择图片 e.stopPropagation();
            chooseImg: function () {
                this.$refs['inputFile'].value = "";
                this.drawImg.img = null;
                this.$refs['inputFile'].click();
                let c = this.$refs['canvas'];
                let ctx = c.getContext("2d");
                ctx.clearRect(0, 0, c.width, c.height);
            },
            // 将选择的图片绘制到画布
            putImgToCanv: function (e) {
                let _this = this;
                let file = e.target.files[0] || null;
                if (file) {
                    let reader = new FileReader();
                    new Image();
                    reader.readAsDataURL(file);
                    reader.onload = function (e) {
                        // 图片base64化
                        let newUrl = e.target.result;
                        let img = document.createElement('img');
                        img.src = newUrl;
                        let timmer = setInterval(function () {
                            if (reader.readyState == 2) {
                                clearInterval(timmer);
                                let imgHeight = img.height;
                                let imgWidth = img.width;
                                let boxWidth = _this.boxWidth;
                                let boxHeight = _this.boxHeight;
                                let c = _this.$refs['canvas'];
                                let ctx = c.getContext("2d");
                                let rate;
                                let drawImg = _this.drawImg;
                                drawImg.img = img;
                                if (imgHeight < boxHeight && imgWidth < boxWidth) {
                                    rate = 1;
                                    drawImg.x = (boxWidth - imgWidth) / 2;
                                    drawImg.y = (boxHeight - imgHeight) / 2;
                                } else {
                                    if (imgWidth / imgHeight <= boxWidth / boxHeight) { // 计算宽高比
                                        rate = boxHeight / imgHeight;
                                        drawImg.x = (boxWidth - imgWidth * rate) / 2;
                                    } else {
                                        rate = boxWidth / imgWidth;
                                        drawImg.y = (boxHeight - imgHeight * rate) / 2;
                                    }
                                }
                                ctx.clearRect(0, 0, c.width, c.height);
                                drawImg.swidth = imgWidth;
                                drawImg.sheight = imgHeight;
                                drawImg.width = imgWidth * rate;
                                drawImg.height = imgHeight * rate;
                                ctx.drawImage(drawImg.img, drawImg.sx, drawImg.sy, drawImg.swidth, drawImg.sheight, drawImg.x, drawImg.y, drawImg.width, drawImg.height);
                            }
                        }, 200);
                    };
                    this.toolBox.x = this.boxWidth / 2 - this.toolBox.width;
                    this.toolBox.y = this.boxHeight / 2 - this.toolBox.height;
                    this.drawControlBox(this.toolBox.width, this.toolBox.height, this.toolBox.x, this.toolBox.y);
                }
            },
            // clear both
            clearAll: function () {
                let _this = this;
                let c = _this.$refs['canvas'];
                let ctx = c.getContext("2d");
                ctx.clearRect(0, 0, c.width, c.height);
                let c1 = _this.$refs['canvasSelectBox'];
                let ctx1 = c1.getContext("2d");
                ctx1.clearRect(0, 0, c1.width, c1.height);
                this.drawImg = {
                    img: null,//规定要使用的图像、画布或视频
                    sx: 0,//开始剪切的 x 坐标位置
                    sy: 0,//开始剪切的 y 坐标位置
                    swidth: 0,//被剪切图像的宽度
                    sheight: 0,//被剪切图像的高度
                    x: 0,//在画布上放置图像的 x 坐标位置
                    y: 0,//在画布上放置图像的 y 坐标位置
                    width: 0,//要使用的图像的宽度
                    height: 0//要使用的图像的高度
                };
            },
            // draw control
            drawControlBox: function (width, height, x, y) {
                if (width < 50 || height < 50) {
                    return false;
                }
                let $toolBoxControl = this.$refs['toolBoxControl'];
                if (x < 0) {
                    x = 0;
                }
                if (y < 0) {
                    y = 0;
                }
                if (x + this.toolBox.width > this.boxWidth) {
                    x = this.boxWidth - this.toolBox.width;
                }
                if (y + this.toolBox.height > this.boxHeight) {
                    y = this.boxHeight - this.toolBox.height;
                }
                $toolBoxControl.style.top = y + 'px';
                $toolBoxControl.style.left = x + 'px';
                let c = this.$refs['canvasSelectBox'];
                let ctx = c.getContext("2d");
                ctx.fillStyle = this.selectBoxColor;
                ctx.clearRect(0, 0, c.width, c.height);
                ctx.fillRect(0, 0, c.width, c.height);
                if (this.rate) {
                    let p = this.rate.split(':')[0] / this.rate.split(':')[1];
                    ctx.clearRect(x, y, width, width / p);
                    $toolBoxControl.style.width = width + 'px';
                    $toolBoxControl.style.height = width / p + 'px';
                    this.toolBox.height = width / p;
                } else {
                    ctx.clearRect(x, y, width, height);
                    $toolBoxControl.style.width = width + 'px';
                    $toolBoxControl.style.height = height + 'px';
                }
                this.toolBox.boxMove.moveTo.x = x;
                this.toolBox.boxMove.moveTo.y = y;
            },
            // toolBoxMouseDown
            toolBoxMouseDown: function (e) {
                let $toolBox = this.$refs['toolBoxControl'];
                this.toolBox.x = parseInt($toolBox.style.left.split('px')[0]);
                this.toolBox.y = parseInt($toolBox.style.top.split('px')[0]);
                this.toolBox.disable = false;
                this.toolBox.boxMove.start = {
                    x: e.pageX,
                    y: e.pageY,
                };
            },
            toolBoxMouseMove: function (e) {
                if (this.toolBox.disable === false) {
                    let offsetX = e.pageX - this.toolBox.boxMove.start.x;
                    let offsetY = e.pageY - this.toolBox.boxMove.start.y;
                    let x = this.toolBox.x + offsetX;
                    let y = this.toolBox.y + offsetY;
                    this.drawControlBox(this.toolBox.width, this.toolBox.height, x, y);
                }
            },
            toolBoxMouseLeave: function () {
                this.toolBox.disable = true;
            },
            toolBoxMouseUp: function (e) {
                let $toolBox = this.$refs['toolBoxControl'];
                this.toolBox.x = parseInt($toolBox.style.left.split('px')[0]);
                this.toolBox.y = parseInt($toolBox.style.top.split('px')[0]);
                this.toolBox.disable = true;
            },
            // control box
            controlBtnMouseDown: function (e) {
                this.controlBox.disable = false;
                this.controlBox.btnName = e.target.dataset.name;
                this.controlBox.start.x = e.clientX;
                this.controlBox.start.y = e.clientY;
                this.controlBox.start.width = this.toolBox.width;
                this.controlBox.start.height = this.toolBox.height;
                e.stopPropagation();
            },
            controlBtnMouseUp: function (e) {
                this.controlBox.disable = true;
                e.stopPropagation();
            },
            controlBtnMouseLeave: function (e) {
                this.controlBox.disable = true;
                e.stopPropagation();
            },
            controlBtnMouseMove: function (e) {
                if (this.controlBox.disable === false) {
                    let offsetX = e.clientX - this.controlBox.start.x;
                    let offsetY = e.clientY - this.controlBox.start.y;
                    if (this.controlBox.btnName == 'leftUp') {
                        let x = this.toolBox.x + offsetX;
                        let y = this.toolBox.y + offsetY;
                        this.toolBox.width = (this.controlBox.start.width - offsetX) > 50 ? (this.controlBox.start.width - offsetX) : 50;
                        this.toolBox.height = (this.controlBox.start.height - offsetY) > 50 ? (this.controlBox.start.height - offsetY) : 50;
                        this.drawControlBox(this.toolBox.width, this.toolBox.height, x, y);
                    }
                    if (this.controlBox.btnName == 'rightUp') {
                        let x = this.toolBox.x;
                        let y = this.toolBox.y + offsetY;
                        this.toolBox.width = (this.controlBox.start.width + offsetX) > 50 ? (this.controlBox.start.width + offsetX) : 50;
                        this.toolBox.height = (this.controlBox.start.height - offsetY) > 50 ? (this.controlBox.start.height - offsetY) : 50;
                        this.drawControlBox(this.toolBox.width, this.toolBox.height, x, y);
                    }
                    if (this.controlBox.btnName == 'rightDown') {
                        let x = this.toolBox.x;
                        let y = this.toolBox.y;
                        this.toolBox.width = (this.controlBox.start.width + offsetX) > 50 ? (this.controlBox.start.width + offsetX) : 50;
                        this.toolBox.height = (this.controlBox.start.height + offsetY) > 50 ? (this.controlBox.start.height + offsetY) : 50;
                        this.drawControlBox(this.toolBox.width, this.toolBox.height, x, y);
                    }
                    if (this.controlBox.btnName == 'leftDown') {
                        let x = this.toolBox.x + offsetX;
                        let y = this.toolBox.y;
                        this.toolBox.width = (this.controlBox.start.width - offsetX) > 50 ? (this.controlBox.start.width - offsetX) : 50;
                        this.toolBox.height = (this.controlBox.start.height + offsetY) > 50 ? (this.controlBox.start.height + offsetY) : 50;
                        this.drawControlBox(this.toolBox.width, this.toolBox.height, x, y);
                    }
                    if (this.controlBox.btnName == 'topCenter') {
                        let x = this.toolBox.x;
                        let y = this.toolBox.y + offsetY;
                        this.toolBox.width = this.controlBox.start.width;
                        this.toolBox.height = (this.controlBox.start.height - offsetY) > 50 ? (this.controlBox.start.height - offsetY) : 50;
                        this.drawControlBox(this.toolBox.width, this.toolBox.height, x, y);
                    }
                    if (this.controlBox.btnName == 'downCenter') {
                        let x = this.toolBox.x;
                        let y = this.toolBox.y;
                        this.toolBox.width = this.controlBox.start.width;
                        this.toolBox.height = (this.controlBox.start.height + offsetY) > 50 ? (this.controlBox.start.height + offsetY) : 50;
                        this.drawControlBox(this.toolBox.width, this.toolBox.height, x, y);
                    }
                    if (this.controlBox.btnName == 'leftCenter') {
                        let x = this.toolBox.x + offsetX;
                        let y = this.toolBox.y;
                        this.toolBox.width = (this.controlBox.start.width - offsetX) > 50 ? (this.controlBox.start.width - offsetX) : 50;
                        this.toolBox.height = this.controlBox.start.height;
                        this.drawControlBox(this.toolBox.width, this.toolBox.height, x, y);
                    }
                    if (this.controlBox.btnName == 'rightCenter') {
                        let x = this.toolBox.x;
                        let y = this.toolBox.y;
                        this.toolBox.width = (this.controlBox.start.width + offsetX) > 50 ? (this.controlBox.start.width + offsetX) : 50;
                        this.toolBox.height = this.controlBox.start.height;
                        this.drawControlBox(this.toolBox.width, this.toolBox.height, x, y);
                    }
                }
                e.stopPropagation();
            },
            cropPicture: function () {
                let _this = this;
                // get img
                let c = this.$refs['canvas'];
                let tempImg = new Image();
                tempImg.src = c.toDataURL();
                c.toBlob((blob) => {
                    let reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onload = function () {
                        let timmer = setInterval(function () {
                            if (reader.readyState == 2) {
                                clearInterval(timmer);
                                let newCanv = document.createElement('canvas');
                                newCanv.width = _this.toolBox.width;
                                newCanv.height = _this.toolBox.height;
                                let ctx = newCanv.getContext("2d");
                                let params = _this.toolBox;
                                if (this.rate) {
                                    let p = this.rate.split(':')[0] / this.rate.split(':')[1];
                                    ctx.drawImage(tempImg, params.x, params.y, params.width, params.width * p, 0, 0, params.width, params.width * p);
                                } else {
                                    ctx.drawImage(tempImg, params.x, params.y, params.width, params.height, 0, 0, params.width, params.height);
                                }
                                newCanv.toBlob(function (blob) {
                                    _this.handleClose();
                                    _this.$emit('cutDown', {
                                        file: blob,
                                        dataURL: newCanv.toDataURL()
                                    })
                                }, 0.95);
                            }
                        }, 200);
                    };
                });
            },
        }
    }
</script>
<style scoped>
    .fl {
        float:left;
    }
    .fr {
        float:right;
    }
    .i-dialog-footer {
        display:block;
        width:100%;
        margin-top:20px;
    }
    .mask {
        background: rgba(0, 0, 0, 0.6);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
    }

    .dialogMain {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid rgba(0, 0, 0, 0.8);
        border-radius: 3px;
        box-sizing: border-box;
        padding: 20px 20px 0 20px;
        background: #fff;
        z-index: 1000;
    }

    .toolMain {
        box-sizing: border-box;
    }

    .toolBox {
        border: 1px solid #dedede;
        background-image: linear-gradient(45deg, rgba(0, 0, 0, .25) 25%, transparent 0, transparent 75%, rgba(0, 0, 0, .25) 0),
        linear-gradient(45deg, rgba(0, 0, 0, .25) 25%, transparent 0, transparent 75%, rgba(0, 0, 0, .25) 0);
        background-color: #eee;
        background-size: 30px 30px;
        background-position: 0 0, 15px 15px;
        position: relative;
    }

    .tool-title {
        margin-bottom: 20px;
    }
    .canvas {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99;
    }

    .canvasSelectBox {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
    }

    .toolBoxControl {
        background: transparent;
        position: absolute;
        z-index: 101;
        box-sizing: border-box;
        border: 1px dashed #409EFF;
    }
    .toolBoxControlLine {
        position: absolute;
    }
    .toolBoxControlLineItem-1 {
        top:33%;
        width:100%;
        height:1px;
        box-sizing:border-box;
        border-bottom:1px dashed #409EFF;
    }
    .toolBoxControlLineItem-2 {
        top:66%;
        width:100%;
        height:1px;
        box-sizing:border-box;
        border-bottom:1px dashed #409EFF;
    }
    .toolBoxControlLineItem-3 {
        left:33%;
        border-right:1px dashed #409EFF;
        height:100%;
        width:1px;
        box-sizing:border-box;
    }
    .toolBoxControlLineItem-4 {
        left:66%;
        border-right:1px dashed #409EFF;
        height:100%;
        width:1px;
        box-sizing:border-box;
    }
    .controlBox {
        width: 100%;
        height: 100%;
        position: absolute;
        cursor: move;
    }

    .controlBtn {
        width: 10px;
        height: 10px;
        box-sizing: border-box;
        border: 1px solid #409EFF;
        background: #409EFF;
        position: absolute;
    }

    .leftUp {
        top: 0;
        left: 0;
        margin-left: -5px;
        margin-top: -5px;
        cursor: se-resize;
    }

    .leftDown {
        bottom: 0;
        left: 0;
        margin-left: -5px;
        margin-bottom: -5px;
        cursor: sw-resize;
    }

    .rightUp {
        top: 0;
        right: 0;
        margin-right: -5px;
        margin-top: -5px;
        cursor: sw-resize;
    }

    .rightDown {
        bottom: 0;
        right: 0;
        margin-right: -5px;
        margin-bottom: -5px;
        cursor: se-resize;
    }
    .topCenter {
        top: 0;
        right: 50%;
        margin-right: -5px;
        margin-top: -5px;
        cursor: s-resize;
    }
    .downCenter {
        bottom: 0;
        right: 50%;
        margin-right: -5px;
        margin-bottom: -5px;
        cursor: s-resize;
    }
    .leftCenter {
        top: 50%;
        left: 0;
        margin-left: -5px;
        margin-top: -5px;
        cursor: e-resize;
    }
    .rightCenter {
        top: 50%;
        right: 0;
        margin-right: -5px;
        margin-top: -5px;
        cursor: e-resize;
    }

    .toolBar {
        margin-top: 10px;
    }

    .selectArea {
        display: block;
        width: 260px;
        text-align: right;
        color: #fff;
        position: absolute;
        top: -20px;
        right: 0;
        font-size: 10px;
        user-select: none;
    }

    .tips {
        position: absolute;
        top: 50%;
        left: 50%;
        color: red;
        z-index: 101;
        transform: translate(-50%, -50%);
    }

    .btn {
        text-align: center;
        background: #dedede;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        box-sizing: border-box;
        border-radius: 4px;
        cursor: pointer;
        border: 1px solid;
    }

    .btn[disabled] {
        opacity: 0.6;
        color: #333;
        border-color: #dedede !important;
        background-color: #fff !important;
        cursor: default;
    }

    .btn[disabled]:hover {
        opacity: 0.6;
        color: #333 !important;
        border-color: #dedede !important;
        background-color: #fff !important;
    }

    .btn-default {
        color: #333;
        border-color: #DCDFE6;
        background-color: #fff
    }

    .btn-default:hover {
        color: #409EFF;
        border-color: #c6e2ff;
        background-color: #ecf5ff
    }

    .btn-primary {
        color: #fff;
        background-color: #409EFF;
        border-color: #409EFF;
    }

    .btn-primary:hover {
        background: #66b1ff;
        border-color: #66b1ff;
        color: #FFF;
    }

    .btn-warning {
        color: #fff;
        background-color: #e6a23c;
        border-color: #e6a23c;
    }

    .btn-warning:hover {
        color: #fff;
        background-color: #eeba6c;
        border-color: #e6a23c;
    }

    .btn-primary-plain {
        color: #409EFF;
        border-color: #c6e2ff;
        background-color: #ecf5ff
    }

    .btn-primary-plain:hover {
        background: #66b1ff;
        border-color: #66b1ff;
        color: #FFF;
    }
    .btn-xs {
        height: 26px;
        line-height: 26px;
        padding: 0 10px;
    }

    .dialog-footer {
        float: right;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }

    .file-input {
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        box-sizing: border-box;
        border-radius: 4px;
        border: 1px solid #dedede;
    }

    .file-input::placeholder {
        color: #C0C4CC;
    }

    .toolbar-item {
        display: inline-block;
    }

    .closeIcon {
        float: right;
        cursor: pointer;
        color: #dedede;
    }
    .copyright{
        font-size:10px!important;
        clear:both!important;
        width:100%!important;
        text-align:right!important;
        padding-top:10px!important;
        padding-bottom:10px!important;
        display:block!important;
        opacity: 1!important;
        position: relative!important;
    }
    .copyright a {
        color:#EBEBEB!important;
        text-decoration: none!important;
        position: relative!important;
        opacity: 1!important;
    }
</style>
