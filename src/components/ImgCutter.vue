<template>
    <div>
        <div @click="handleOpen" v-if="showChooseBtn === true && isModal === true">
            <slot name="openImgCutter"></slot>
            <slot name="open"></slot>
        </div>
        <button
            type="button"
            v-if="!$slots.openImgCutter && !$slots.open && isModal === true"
            class="btn btn-primary"
            @click="handleOpen"
        >
            {{ label }}
        </button>
        <transition name="fade">
            <div v-if="visible" :class="isModal === true ? 'mask vue-img-cutter' : ''" ref="mask">
                <div :class="isModal === true ? 'dialogBoxModal' : 'dialogBox'" v-if="visible">
                    <transition
                        name="fade"
                        enter-class="fade-in-enter"
                        enter-active-class="fade-in-active"
                        leave-class="fade-out-enter"
                        leave-active-class="fade-out-active"
                    >
                        <div
                            ref="dialogMainModalRef"
                            :class="isModal === true ? 'dialogMainModal' : 'dialogMain'"
                            :style="'width:' + (isModal === true ? boxWidth + 32 : boxWidth) + 'px'"
                        >
                            <div class="toolMain">
                                <div class="tool-title" v-if="isModal === true">
                                    图片裁剪
                                    <span class="closeIcon" @click="handleClose">×</span>
                                </div>
                                <div
                                    ref="toolBox"
                                    :style="'height:' + boxHeight + 'px;width:' + boxWidth + 'px'"
                                    @mousemove="controlBtnMouseMove"
                                    @mouseup="controlBtnMouseUp"
                                    @mouseleave="controlBtnMouseUp"
                                    class="toolBox"
                                >
                                    <!--选取图片-->
                                    <div class="tips" v-show="!drawImg.img && showChooseBtn === true">
                                        <div class="btn btn-warning btn-xs" @click="chooseImg">
                                            {{ label }}
                                        </div>
                                    </div>
                                    <!--工具栏-->
                                    <div
                                        v-if="tool == true"
                                        v-show="
                                            drawImg.img &&
                                            dropImg.active !== true &&
                                            controlBox.disable == true &&
                                            toolBox.disable == true
                                        "
                                        class="dockMain"
                                        :style="'background:' + toolBgc"
                                        @mouseenter="dropImgOff"
                                    >
                                        <div class="dockBtn" v-if="rate">
                                            <slot name="ratio"> Ratio: </slot>
                                            {{ rate }}
                                        </div>
                                        <div class="dockBtn" @click="scaleReset">
                                            <slot name="scaleReset"> Scale: </slot>
                                            {{ drawImg.swidth > 0 ? (drawImg.width / drawImg.swidth).toFixed(2) : '-' }}
                                        </div>
                                        <div v-if="originalGraph === false" @click="turnImg(-90)" class="dockBtn">
                                            <slot name="turnLeft"> ↳ </slot>
                                        </div>
                                        <div v-if="originalGraph === false" @click="turnImg(90)" class="dockBtn">
                                            <slot name="turnRight"> ↲ </slot>
                                        </div>
                                        <div v-if="originalGraph === false" @click="turnReset()" class="dockBtn">
                                            <slot name="reset"> ↻ </slot>
                                        </div>
                                        <div v-if="originalGraph === false" class="dockBtnScrollBar">
                                            <div
                                                ref="dockBtnScrollControl"
                                                @mousemove="scrollBarControlMove"
                                                @mousedown="scrollBarControlOn"
                                                @mouseleave="scrollBarControlOff"
                                                @mouseup="scrollBarControlOff"
                                                :style="'left:' + rotateControl.position + 'px'"
                                                class="scrollBarControl"
                                            ></div>
                                            <div
                                                v-if="rotateControl.active == true"
                                                class="scrollBarText"
                                                :style="'left:' + rotateControl.position + 'px'"
                                            >
                                                {{ rotateImg.angle.toFixed(0) + '°' }}
                                            </div>
                                        </div>
                                        <div v-if="originalGraph === false" @click="flipHorizontal" class="dockBtn">
                                            <slot name="flipHorizontal"> ⇆ </slot>
                                        </div>
                                        <div v-if="originalGraph === false" @click="flipVertically" class="dockBtn">
                                            <slot name="turnRight"> ⇅ </slot>
                                        </div>
                                    </div>
                                    <!--裁剪区域-->
                                    <div
                                        v-show="drawImg.img != null"
                                        ref="toolBoxControl"
                                        @mousedown="toolBoxMouseDown"
                                        @mouseup="toolBoxMouseUp"
                                        @mousemove="toolBoxMouseMove"
                                        @mouseleave="toolBoxMouseLeave"
                                        class="toolBoxControl"
                                    >
                                        <div class="toolBoxControlBox">
                                            <div class="controlBox">
                                                <!--蚂蚁线-->
                                                <div class="controlBoxInnerLine controlBoxInnerLineTop"></div>
                                                <div class="controlBoxInnerLine controlBoxInnerLineBottom"></div>
                                                <div class="controlBoxInnerLine controlBoxInnerLineLeft"></div>
                                                <div class="controlBoxInnerLine controlBoxInnerLineRight"></div>
                                                <!--工具栏提示-->
                                                <div class="selectArea" v-if="originalGraph === false">
                                                    宽:{{ toolBox.width }} 高:{{ toolBox.height }} (x:{{
                                                        toolBoxPosition.x
                                                    }},y:{{ toolBoxPosition.y }})
                                                </div>
                                                <!--如果是裁剪原图则显示实际大小-->
                                                <div class="selectArea" v-if="originalGraph === true">
                                                    宽:{{
                                                        (toolBox.width / (drawImg.width / drawImg.swidth)).toFixed(0)
                                                    }}
                                                    高:{{
                                                        (toolBox.height / (drawImg.width / drawImg.swidth)).toFixed(0)
                                                    }}
                                                    (x:{{ toolBoxPosition.x }},y:{{ toolBoxPosition.y }})
                                                </div>
                                                <!--操作杆-->
                                                <div
                                                    data-name="leftUp"
                                                    v-if="sizeChange === true"
                                                    @mousedown="controlBtnMouseDown($event, 'leftUp')"
                                                    class="leftUp controlBtn"
                                                ></div>
                                                <div
                                                    data-name="leftDown"
                                                    v-if="sizeChange === true"
                                                    @mousedown="controlBtnMouseDown($event, 'leftDown')"
                                                    class="leftDown controlBtn"
                                                ></div>
                                                <div
                                                    data-name="rightUp"
                                                    v-if="sizeChange === true"
                                                    @mousedown="controlBtnMouseDown($event, 'rightUp')"
                                                    class="rightUp controlBtn"
                                                ></div>
                                                <div
                                                    data-name="rightDown"
                                                    v-if="sizeChange === true"
                                                    @mousedown="controlBtnMouseDown($event, 'rightDown')"
                                                    class="rightDown controlBtn"
                                                ></div>

                                                <div
                                                    data-name="topCenter"
                                                    v-if="sizeChange === true && !rate && toolBox.width > 20"
                                                    @mousedown="controlBtnMouseDown($event, 'topCenter')"
                                                    class="topCenter controlBtn"
                                                ></div>
                                                <div
                                                    data-name="downCenter"
                                                    v-if="sizeChange === true && !rate && toolBox.width > 20"
                                                    @mousedown="controlBtnMouseDown($event, 'downCenter')"
                                                    class="downCenter controlBtn"
                                                ></div>
                                                <div
                                                    data-name="leftCenter"
                                                    v-if="sizeChange === true && !rate && toolBox.height > 20"
                                                    @mousedown="controlBtnMouseDown($event, 'leftCenter')"
                                                    class="leftCenter controlBtn"
                                                ></div>
                                                <div
                                                    data-name="rightCenter"
                                                    v-if="sizeChange === true && !rate && toolBox.height > 20"
                                                    @mousedown="controlBtnMouseDown($event, 'rightCenter')"
                                                    class="rightCenter controlBtn"
                                                ></div>
                                            </div>
                                            <div class="toolBoxControlLine toolBoxControlLineItem-1"></div>
                                            <div class="toolBoxControlLine toolBoxControlLineItem-2"></div>
                                            <div class="toolBoxControlLine toolBoxControlLineItem-3"></div>
                                            <div class="toolBoxControlLine toolBoxControlLineItem-4"></div>
                                        </div>
                                    </div>
                                    <div class="copyright">
                                        <a
                                            v-if="!DoNotDisplayCopyright"
                                            target="_blank"
                                            href="https://github.com/acccccccb/vue-img-cutter"
                                            rel="nofollow"
                                        >
                                            vue-img-cutter {{ version }}
                                        </a>
                                    </div>
                                    <!--画布-->
                                    <canvas
                                        class="canvasSelectBox"
                                        ref="canvasSelectBox"
                                        :width="boxWidth"
                                        @mousedown="dropImgOn"
                                        @mouseup="dropImgOff"
                                        @mousemove="dropImgMove"
                                        :height="boxHeight"
                                    ></canvas>
                                    <canvas class="canvas" ref="canvas" :width="boxWidth" :height="boxHeight"></canvas>
                                </div>
                            </div>
                            <div class="i-dialog-footer">
                                <input
                                    @change="putImgToCanv"
                                    ref="inputFile"
                                    type="file"
                                    accept="image/gif, image/jpeg ,image/png"
                                    style="width: 1px; height: 1px; border: none; opacity: 0"
                                />
                                <span @click="chooseImg">
                                    <slot name="choose">
                                        <div class="btn btn-primary btn-primary-plain" v-if="showChooseBtn === true">
                                            {{ label }}
                                        </div>
                                    </slot>
                                </span>
                                <div class="btn-group fr">
                                    <span @click="handleClose">
                                        <slot name="cancel">
                                            <button type="button" class="btn btn-default">取消</button>
                                        </slot>
                                    </span>
                                    <span @click="cropPicture(false)">
                                        <slot name="confirm">
                                            <button
                                                type="button"
                                                class="btn btn-primary"
                                                style="margin-left: 15px"
                                                :disabled="!drawImg.img"
                                            >
                                                确定
                                            </button>
                                        </slot>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <div style="clear: both"></div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import config from '../../package.json';

    export default {
        name: 'ImgCutter',
        props: {
            crossOrigin: {
                // 是否设置图片跨域
                type: Boolean,
                default: false,
                required: false,
            },
            crossOriginHeader: {
                // 是否设置图片跨域
                type: String,
                default: '*',
                required: false,
            },
            label: {
                // 按钮文字
                type: String,
                default: '选择图片',
                required: false,
            },
            isModal: {
                // 是否已弹窗形式展示
                type: Boolean,
                default: true,
                required: false,
            },
            lockScroll: {
                // 是否在弹窗出现时锁定body
                type: Boolean,
                default: true,
                required: false,
            },
            showChooseBtn: {
                // 是否显示选择图片按钮 如果需要兼容IE9 则将此参数改为false
                type: Boolean,
                default: true,
                required: false,
            },
            boxWidth: {
                // 裁剪窗口高度
                type: Number,
                default: 800,
                required: false,
            },
            boxHeight: {
                // 裁剪窗口高度
                type: Number,
                default: 400,
                required: false,
            },
            cutWidth: {
                // 默认裁剪宽度
                type: Number,
                default: 200,
                required: false,
            },
            cutHeight: {
                // 默认裁剪高度
                type: Number,
                default: 200,
                required: false,
            },
            rate: {
                // 按比例裁剪
                type: String,
                default: null,
                required: false,
            },
            tool: {
                // 是否显示工具栏
                type: Boolean,
                default: true,
                required: false,
            },
            toolBgc: {
                // 工具栏背景色
                type: String,
                default: '#fff',
                required: false,
            },
            imgMove: {
                // 能否拖动图片
                type: Boolean,
                default: true,
                required: false,
            },
            sizeChange: {
                // 能否调整裁剪尺寸
                type: Boolean,
                default: true,
                required: false,
            },
            originalGraph: {
                // 是否为原图裁剪
                type: Boolean,
                default: false,
                required: false,
            },
            moveAble: {
                // 能否调整裁剪区域位置
                type: Boolean,
                default: true,
                required: false,
            },
            previewMode: {
                // 裁剪过程中是否返回裁剪结果 裁剪原图卡顿时将此项设置为false
                type: Boolean,
                default: true,
                required: false,
            },
            CuttingOriginal: {
                // 是否裁剪原图
                type: Boolean,
                default: false,
                required: false,
            },
            WatermarkText: {
                // 水印文字
                type: String,
                default: '',
                required: false,
            },
            WatermarkTextFont: {
                // 水印文字样式
                type: String,
                default: '12px Sans-serif',
                required: false,
            },
            WatermarkTextColor: {
                // 水印文字颜色
                type: String,
                default: '#fff',
                required: false,
            },
            WatermarkTextX: {
                // 水印横向位置
                type: Number,
                default: 0.95,
                required: false,
            },
            WatermarkTextY: {
                // 水印纵向位置
                type: Number,
                default: 0.95,
                required: false,
            },
            smallToUpload: {
                // 选择的图片宽高均小于裁剪宽高度时候直接上传原图
                type: Boolean,
                default: false,
                required: false,
            },
            saveCutPosition: {
                // 是否保存上一次裁剪位置
                type: Boolean,
                default: false,
                required: false,
            },
            scaleAble: {
                // 是否允许缩放图片
                type: Boolean,
                default: true,
                required: false,
            },
            index: {
                // 自定义参数 返回结果时会带入此值
                default: null,
                required: false,
            },
            fileType: {
                // 文件类型
                default: 'png',
                required: false,
                type: String,
            },
            toolBoxOverflow: {
                // 是否允许裁剪框超出图片
                type: Boolean,
                default: true,
                required: false,
            },
            DoNotDisplayCopyright: {
                type: Boolean,
                default: false,
                required: false,
            },
        },
        model: ['label', 'boxWidth', 'boxHeight', 'rate', 'tool', 'DoNotDisplayCopyright'],
        data() {
            let toolBoxWidth, toolBoxHeight;

            toolBoxWidth = this.boxWidth / 2;
            toolBoxHeight = this.boxHeight / 2;
            return {
                version: '',
                visible: false,
                fileName: '',
                cutImageObj: null,
                onPrintImgTimmer: null,
                toolBoxPosition: {
                    x: 0,
                    y: 0,
                },
                drawImg: {
                    img: null, //规定要使用的图像、画布或视频
                    sx: 0, //开始剪切的 x 坐标位置
                    sy: 0, //开始剪切的 y 坐标位置
                    swidth: 0, //被剪切图像的宽度
                    sheight: 0, //被剪切图像的高度
                    x: 0, //在画布上放置图像的 x 坐标位置
                    y: 0, //在画布上放置图像的 y 坐标位置
                    width: 0, //要使用的图像的宽度
                    height: 0, //要使用的图像的高度
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
                        },
                    },
                },
                dropImg: {
                    active: false,
                    pageX: 0,
                    pageY: 0,
                    params: {},
                },
                // 旋转
                rotateImg: {
                    angle: 0,
                },
                rotateControl: {
                    active: false,
                    start: {
                        x: 0,
                        y: 0,
                    },
                    position: 100,
                },
                // 缩放
                scaleImg: {
                    rate: 0,
                    params: {},
                },
                controlBox: {
                    disable: true,
                    btnName: '',
                    start: {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0,
                    },
                },
                selectBox: false,
                selectBoxColor: 'rgba(0,0,0,0.6)',
                isFlipHorizontal: false, //是否水平翻转
                isFlipVertically: false, // 是否垂直翻转
            };
        },
        mounted() {
            this.version = config.version;
            // 是否为弹窗模式
            if (this.isModal === false) {
                this.visible = true;
                this.$nextTick(() => {
                    if (this.$refs['toolBox']) {
                        this.$refs['toolBox'].onmousewheel = this.scaleImgWheel;
                        this.$refs['toolBox'].addEventListener('DOMMouseScroll', this.scaleImgWheel);
                    }
                });
            }
        },
        methods: {
            handleOpen(img) {
                let init = (callback) => {
                    if (this.$refs['toolBox']) {
                        this.$refs['toolBox'].onmousewheel = this.scaleImgWheel;
                        this.$refs['toolBox'].addEventListener('DOMMouseScroll', this.scaleImgWheel);
                    }

                    // 判断下窗口高度
                    if (this.isModal === true) {
                        if (this.lockScroll === true) {
                            document.body.style.overflowY = 'hidden';
                        }
                        let dialogBoxHeight = this.$refs['dialogMainModalRef'].offsetHeight + 200;

                        let windowHeight = window.innerHeight;

                        let mask = this.$refs['mask'];

                        if (dialogBoxHeight > windowHeight) {
                            mask.style.overflowY = 'scroll';
                        } else {
                            mask.style.overflowY = 'hidden';
                        }
                    }
                    if (callback && typeof callback === 'function') {
                        callback();
                    }
                };

                // 如果传入了图片
                if (img && typeof img == 'object' && img.src) {
                    if (img.name) {
                        let $image = new Image();

                        if (this.crossOrigin === true) {
                            $image.crossOrigin = this.crossOriginHeader;
                        }
                        $image.name = img.name;
                        // $image.width = img.width;
                        // $image.height = img.height;
                        // $image.style.width = '1px';
                        // $image.style.height = '1px';
                        $image.style.position = 'fixed';
                        $image.style.top = -5000;
                        $image.style.opacity = 0;
                        $image.onerror = (e) => {
                            console.error('图片加载失败');
                            this.$emit('error', {
                                index: this.index,
                                event: e,
                                msg: '图片加载失败',
                            });
                            this.clearCutImageObj();
                        };
                        $image.onload = () => {
                            if ($image.complete === true) {
                                this.visible = true;
                                this.$nextTick(() => {
                                    init(() => {
                                        this.importImgToCanv($image);
                                    });
                                });
                            } else {
                                throw new Error('图片加载失败');
                                // this.handleClose();
                            }
                        };
                        $image.src = img.src;
                        this.cutImageObj = $image;
                        document.body.appendChild($image);
                        this.$emit('onChooseImg', img, this.index);
                    } else {
                        throw new Error('传入参数必须包含：src,name');
                    }
                } else {
                    this.visible = true;
                    this.$nextTick(() => {
                        init();
                    });
                }
            },
            handleClose() {
                this.clearAll();
                if (this.isModal === true) {
                    if (this.lockScroll === true) {
                        document.body.style.overflowY = 'scroll';
                    }
                    this.$nextTick(() => {
                        this.visible = false;
                    });
                }
            },
            // 选择图片 e.stopPropagation();
            chooseImg() {
                this.$refs['inputFile'].click();
            },
            importImgToCanv(img) {
                let imgHeight = img.height;

                let imgWidth = img.width;

                let boxWidth = this.boxWidth;

                let boxHeight = this.boxHeight;

                let rate;

                let drawImg = { ...this.drawImg };

                this.fileName = img.name;
                drawImg.img = img;
                this.scaleImg.rate = imgWidth / imgHeight; // 缩放时用到此参数
                if (imgHeight < boxHeight && imgWidth < boxWidth) {
                    rate = 1;
                    drawImg.x = (boxWidth - imgWidth) / 2;
                    drawImg.y = (boxHeight - imgHeight) / 2;
                } else {
                    if (imgWidth / imgHeight <= boxWidth / boxHeight) {
                        // 计算宽高比
                        rate = boxHeight / imgHeight;
                        drawImg.x = (boxWidth - imgWidth * rate) / 2;
                    } else {
                        rate = boxWidth / imgWidth;
                        drawImg.y = (boxHeight - imgHeight * rate) / 2;
                    }
                }
                drawImg.swidth = imgWidth;
                drawImg.sheight = imgHeight;
                drawImg.width = imgWidth * rate;
                drawImg.height = imgHeight * rate;
                drawImg.x = (boxWidth - drawImg.width) / 2;
                drawImg.y = (boxHeight - drawImg.height) / 2;
                this.$set(this, 'drawImg', drawImg);
                this.printImg();
                this.putToolBox();
            },
            // 将选择的图片绘制到画布
            putImgToCanv(e) {
                let file;

                if (e.target.files) {
                    file = e.target.files[0] || null;
                } else {
                    // 如果是IE9及以下
                    console.error('IE9及以下需要自己传入image对象');
                    // this.$emit('importImage',e);
                    return false;
                }
                if (file) {
                    this.fileName = file.name;
                    let reader = new FileReader();

                    reader.readAsDataURL(file);
                    reader.onload = (result) => {
                        // 图片base64化
                        let newUrl = result.target.result;

                        let img = document.createElement('img');

                        img.src = newUrl;
                        let timmer = setInterval(() => {
                            if (reader.readyState === 2) {
                                clearInterval(timmer);
                                if (
                                    !this.sizeChange &&
                                    this.smallToUpload &&
                                    img.width <= this.cutWidth &&
                                    img.height <= this.cutHeight
                                ) {
                                    this.handleClose();
                                    file.name = this.changeFileName(file.name, this.fileType);
                                    this.$emit('cutDown', {
                                        filename: this.changeFileName(file.name, this.fileType),
                                        file: file,
                                        index: this.index,
                                    });
                                    return;
                                }
                                let imgHeight = img.height;

                                let imgWidth = img.width;

                                let boxWidth = this.boxWidth;

                                let boxHeight = this.boxHeight;

                                let rate;

                                let drawImg = { ...this.drawImg };

                                drawImg.img = img;
                                this.scaleImg.rate = imgWidth / imgHeight; // 缩放时用到此参数
                                if (imgHeight < boxHeight && imgWidth < boxWidth) {
                                    rate = 1;
                                    drawImg.x = (boxWidth - imgWidth) / 2;
                                    drawImg.y = (boxHeight - imgHeight) / 2;
                                } else {
                                    if (imgWidth / imgHeight <= boxWidth / boxHeight) {
                                        // 计算宽高比
                                        rate = boxHeight / imgHeight;
                                        drawImg.x = (boxWidth - imgWidth * rate) / 2;
                                    } else {
                                        rate = boxWidth / imgWidth;
                                        drawImg.y = (boxHeight - imgHeight * rate) / 2;
                                    }
                                }
                                drawImg.swidth = imgWidth;
                                drawImg.sheight = imgHeight;
                                drawImg.width = imgWidth * rate;
                                drawImg.height = imgHeight * rate;
                                drawImg.x = (boxWidth - drawImg.width) / 2;
                                drawImg.y = (boxHeight - drawImg.height) / 2;
                                this.$set(this, 'drawImg', drawImg);
                                this.printImg();
                                this.putToolBox();
                            }
                        }, 200);
                    };
                    this.$emit('onChooseImg', file, this.index);
                }
            },
            putToolBox() {
                // 裁剪框是否能够超出图片
                if (this.toolBoxOverflow) {
                    if (
                        this.toolBox.width === this.boxWidth / 2 ||
                        this.toolBox.height === this.boxHeight / 2 ||
                        this.saveCutPosition === false
                    ) {
                        this.toolBox.width = this.cutWidth > this.boxWidth ? this.boxWidth : this.cutWidth;
                        this.toolBox.height = this.cutHeight > this.boxHeight ? this.boxHeight : this.cutHeight;
                    }
                    if ((this.toolBox.x === 0 && this.toolBox.y === 0) || this.saveCutPosition === false) {
                        this.toolBox.x = this.boxWidth / 2 - this.toolBox.width / 2;
                        this.toolBox.y = this.boxHeight / 2 - this.toolBox.height / 2;
                    }
                } else {
                    // 如果裁剪框不能超出图片 则默认裁剪框位置等于图片位置
                    this.toolBox.x = this.drawImg.x;
                    this.toolBox.y = this.drawImg.y;
                    this.toolBox.width = this.drawImg.width;
                    this.toolBox.height = this.drawImg.height;
                }
                this.drawControlBox(this.toolBox.width, this.toolBox.height, this.toolBox.x, this.toolBox.y);
            },
            isSupportFileApi() {
                if (
                    window.File &&
                    window.FileList &&
                    window.FileReader &&
                    window.Blob &&
                    navigator.userAgent.indexOf('Edge') === -1 &&
                    navigator.userAgent.indexOf('MSIE') === -1 &&
                    navigator.userAgent.indexOf('Trident') === -1
                ) {
                    return true;
                }
                return false;
            },
            dataURLtoFile(dataurl, filename) {
                //将图片转换为Base64
                let arr = dataurl.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);

                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                if (this.isSupportFileApi()) {
                    let file = new File([u8arr], filename, { type: mime });

                    return file;
                }
                return '不支持File对象';
            },
            // clear both
            clearAll() {
                let _this = this;

                let c = _this.$refs['canvas'];

                let ctx = c.getContext('2d');

                ctx.clearRect(0, 0, c.width, c.height);
                let c1 = _this.$refs['canvasSelectBox'];

                let ctx1 = c1.getContext('2d');

                ctx1.clearRect(0, 0, c1.width, c1.height);
                let sx = _this.drawImg.sx;

                let sy = _this.drawImg.sy;

                this.drawImg = {
                    img: null, //规定要使用的图像、画布或视频
                    sx: sx, //开始剪切的 x 坐标位置
                    sy: sy, //开始剪切的 y 坐标位置
                    swidth: 0, //被剪切图像的宽度
                    sheight: 0, //被剪切图像的高度
                    x: 0, //在画布上放置图像的 x 坐标位置
                    y: 0, //在画布上放置图像的 y 坐标位置
                    width: 0, //要使用的图像的宽度
                    height: 0, //要使用的图像的高度
                };
                this.isFlipHorizontal = false;
                this.isFlipVertically = false;
                this.$refs['inputFile'].value = '';
                this.rotateImg.angle = 0;
                this.drawImg.img = null;
                this.turnReset();
                this.clearCutImageObj();
                this.$emit('onClearAll', this.index);
            },
            clearCutImageObj() {
                if (this.cutImageObj !== null && this.cutImageObj !== undefined) {
                    if (typeof this.cutImageObj.remove === 'function') {
                        this.cutImageObj.remove();
                    } else {
                        this.cutImageObj.removeNode();
                    }
                }
                this.cutImageObj = null;
            },
            // draw control
            drawControlBox(width, height, x, y) {
                // 裁剪框是否能够超出图片
                if (this.toolBoxOverflow) {
                    if (width > this.boxWidth) {
                        width = this.boxWidth;
                    }
                    if (height > this.boxHeight) {
                        height = this.boxHeight;
                    }
                    if (x < 0) {
                        x = 0;
                    }
                    if (y < 0) {
                        y = 0;
                    }
                } else {
                    if (width > this.drawImg.width) {
                        width = this.drawImg.width;
                    }
                    if (height > this.drawImg.height) {
                        height = this.drawImg.height;
                    }
                    if (x < this.drawImg.x) {
                        x = this.drawImg.x;
                    }
                    if (y < this.drawImg.y) {
                        y = this.drawImg.y;
                    }

                    if (x > this.drawImg.x + this.drawImg.width - width) {
                        x = this.drawImg.x + this.drawImg.width - width;
                    }
                    if (y > this.drawImg.y + this.drawImg.height - height) {
                        y = this.drawImg.y + this.drawImg.height - height;
                    }
                }

                let $toolBoxControl = this.$refs['toolBoxControl'];

                let c = this.$refs['canvasSelectBox'];

                let ctx = c.getContext('2d');

                ctx.fillStyle = this.selectBoxColor;
                ctx.clearRect(0, 0, c.width, c.height);
                ctx.fillRect(0, 0, c.width, c.height);

                let toolBoxControlWidth, toolBoxControlHeight;

                if (this.rate && this.rate !== '') {
                    let p = this.rate.split(':')[0] / this.rate.split(':')[1];

                    if (p >= 1) {
                        toolBoxControlWidth = width;
                        toolBoxControlHeight = width / p;
                    } else {
                        toolBoxControlWidth = height * p;
                        toolBoxControlHeight = height;
                    }
                } else {
                    toolBoxControlWidth = width;
                    toolBoxControlHeight = height;
                }
                this.toolBox.width = toolBoxControlWidth;
                this.toolBox.height = toolBoxControlHeight;

                $toolBoxControl.style.width = Math.abs(toolBoxControlWidth) + 'px';
                $toolBoxControl.style.height = Math.abs(toolBoxControlHeight) + 'px';

                this.toolBox.boxMove.moveTo.x = x;
                this.toolBox.boxMove.moveTo.y = y;

                if (toolBoxControlWidth < 0) {
                    x = x + toolBoxControlWidth;
                }
                if (toolBoxControlHeight < 0) {
                    y = y + toolBoxControlHeight;
                }
                if (x + this.toolBox.width > this.boxWidth) {
                    x = this.boxWidth - this.toolBox.width;
                }
                if (x < 0) {
                    x = 0;
                }
                if (y + this.toolBox.height > this.boxHeight) {
                    y = this.boxHeight - this.toolBox.height;
                }
                if (y < 0) {
                    y = 0;
                }

                this.toolBoxPosition.x = x;
                this.toolBoxPosition.y = y;

                $toolBoxControl.style.left = x + 'px';
                $toolBoxControl.style.top = y + 'px';

                ctx.clearRect(x, y, Math.abs(toolBoxControlWidth), Math.abs(toolBoxControlHeight));
                if (this.onPrintImgTimmer) {
                    clearTimeout(this.onPrintImgTimmer);
                }
                this.onPrintImgTimmer = setTimeout(() => {
                    this.cropPicture(true);
                }, 100);
            },

            resetToolBox() {
                if (this.toolBox.width < 0) {
                    this.toolBox.boxMove.moveTo.x = this.toolBox.x - this.toolBox.width;
                }
                if (this.toolBox.height < 0) {
                    this.toolBox.boxMove.moveTo.y = this.toolBox.y - this.toolBox.height;
                }
                this.toolBox.width = Math.abs(this.toolBox.width);
                this.toolBox.height = Math.abs(this.toolBox.height);
            },
            // toolBoxMouseDown
            toolBoxMouseDown(e) {
                let $toolBox = this.$refs['toolBoxControl'];

                this.toolBox.x = parseInt($toolBox.style.left.split('px')[0]);

                this.toolBox.y = parseInt($toolBox.style.top.split('px')[0]);

                this.toolBox.disable = false;
                this.dropImg.active = false;
                this.toolBox.boxMove.start = {
                    x: e.pageX,
                    y: e.pageY,
                };
            },
            toolBoxMouseMove(e) {
                if (this.dropImg.active) {
                    this.dropImgMove(e);
                }
                if (this.toolBox.disable === false && this.moveAble === true) {
                    let offsetX = e.pageX - this.toolBox.boxMove.start.x;

                    let offsetY = e.pageY - this.toolBox.boxMove.start.y;

                    let x = this.toolBox.x + offsetX;

                    let y = this.toolBox.y + offsetY;

                    this.drawControlBox(this.toolBox.width, this.toolBox.height, x, y);
                }
            },
            toolBoxMouseLeave() {
                this.toolBox.disable = true;
                if (this.onPrintImgTimmer) {
                    clearTimeout(this.onPrintImgTimmer);
                }
                this.onPrintImgTimmer = setTimeout(() => {
                    this.cropPicture(true);
                }, 100);
                this.resetToolBox();
            },
            toolBoxMouseUp() {
                this.toolBox.x = parseInt(this.toolBoxPosition.x);
                this.toolBox.y = parseInt(this.toolBoxPosition.y);
                this.toolBox.disable = true;
                this.dropImg.active = false;
                this.resetToolBox();
            },
            // 绘制图片
            printImg() {
                if (this.drawImg.img) {
                    let canv = this.$refs['canvas'];

                    let ctx = canv.getContext('2d');

                    // 文字水印
                    ctx.font = '18px bold 黑体';
                    ctx.fillStyle = '#ff0';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';

                    ctx.save();
                    ctx.clearRect(0, 0, canv.width, canv.height);
                    ctx.translate(this.drawImg.x + this.drawImg.width / 2, this.drawImg.y + this.drawImg.height / 2);
                    ctx.rotate((this.rotateImg.angle * Math.PI) / 180);
                    ctx.translate(
                        -(this.drawImg.x + this.drawImg.width / 2),
                        -(this.drawImg.y + this.drawImg.height / 2)
                    );
                    ctx.translate(this.drawImg.x, this.drawImg.y);
                    ctx.scale(this.isFlipHorizontal ? -1 : 1, this.isFlipVertically ? -1 : 1);
                    ctx.drawImage(
                        this.drawImg.img,
                        this.drawImg.sx,
                        this.drawImg.sy,
                        this.drawImg.swidth,
                        this.drawImg.sheight,
                        this.isFlipHorizontal ? -this.drawImg.width : 0,
                        this.isFlipVertically ? -this.drawImg.height : 0,
                        this.drawImg.width,
                        this.drawImg.height
                    );
                    ctx.translate(-this.drawImg.x, this.drawImg.y);

                    ctx.restore();
                    if (this.onPrintImgTimmer) {
                        clearTimeout(this.onPrintImgTimmer);
                    }
                    this.onPrintImgTimmer = setTimeout(() => {
                        this.cropPicture(true);
                    }, 100);
                }
            },
            // 拖动图片
            dropImgOn(e) {
                if (this.imgMove === true) {
                    this.dropImg.active = true;
                    this.dropImg.params = { ...this.drawImg };
                    this.dropImg.pageX = e.pageX;
                    this.dropImg.pageY = e.pageY;
                }
            },
            dropImgOff() {
                this.dropImg.active = false;
                if (this.onPrintImgTimmer) {
                    clearTimeout(this.onPrintImgTimmer);
                }
                this.onPrintImgTimmer = setTimeout(() => {
                    this.cropPicture(true);
                }, 100);
            },
            dropImgMove(e) {
                if (this.dropImg.active && this.drawImg.img) {
                    let drawImg = { ...this.drawImg };
                    drawImg.x = this.dropImg.params.x - (this.dropImg.pageX - e.pageX);
                    drawImg.y = this.dropImg.params.y - (this.dropImg.pageY - e.pageY);
                    // 裁剪框是否能够超出图片
                    if (!this.toolBoxOverflow) {
                        if (drawImg.x > this.toolBox.x) {
                            drawImg.x = this.toolBox.x;
                        }
                        if (drawImg.x < this.toolBox.x + this.toolBox.width - drawImg.width) {
                            drawImg.x = this.toolBox.x + this.toolBox.width - drawImg.width;
                        }

                        if (drawImg.y > this.toolBox.y) {
                            drawImg.y = this.toolBox.y;
                        }
                        if (drawImg.y < this.toolBox.y + this.toolBox.height - drawImg.height) {
                            drawImg.y = this.toolBox.y + this.toolBox.height - drawImg.height;
                        }
                    }
                    this.$set(this, 'drawImg', drawImg);
                    this.printImg();
                    e.stopPropagation();
                }
            },
            // 缩放
            scaleReset() {
                this.drawImg.width = this.drawImg.swidth;
                this.drawImg.height = this.drawImg.sheight;
                this.printImg();
            },
            scaleImgWheel(e) {
                if (this.drawImg.img && this.scaleAble === true) {
                    let scale;

                    // e是FF的事件。window.event是chrome/ie/opera的事件
                    let ee = e || window.event;

                    if (ee.wheelDelta) {
                        //IE/Opera/Chrome
                        scale = -(ee.wheelDelta / 40);
                    } else if (ee.detail) {
                        //Firefox
                        scale = ee.detail;
                    }

                    // 裁剪框是否能够超出图片
                    if (this.toolBoxOverflow) {
                        let widthLimit = 50;
                        this.drawImg.x =
                            this.drawImg.width - scale * 9 > widthLimit ? this.drawImg.x + scale * 3 : this.drawImg.x;
                        this.drawImg.y =
                            this.drawImg.width - scale * 9 > widthLimit ? this.drawImg.y + scale * 3 : this.drawImg.y;
                        this.drawImg.width =
                            this.drawImg.width - scale * 9 > widthLimit ? this.drawImg.width - scale * 9 : widthLimit;
                        this.drawImg.height = this.drawImg.width / this.scaleImg.rate;
                    } else {
                        let widthLimit = this.toolBox.width;
                        this.drawImg.x =
                            this.drawImg.width - scale * 9 > widthLimit ? this.drawImg.x + scale * 3 : this.drawImg.x;

                        this.drawImg.y =
                            this.drawImg.width - scale * 9 > widthLimit ? this.drawImg.y + scale * 3 : this.drawImg.y;

                        if (
                            this.drawImg.x > this.toolBox.x ||
                            this.drawImg.x + this.drawImg.width < this.toolBox.x + this.toolBox.width ||
                            this.drawImg.width <= this.toolBox.width
                        ) {
                            this.drawImg.x = this.toolBox.x;
                        }
                        if (
                            this.drawImg.y > this.toolBox.y ||
                            this.drawImg.y + this.drawImg.height < this.toolBox.y + this.toolBox.height
                        ) {
                            this.drawImg.y = this.toolBox.y;
                        }
                        this.drawImg.width =
                            this.drawImg.width - scale * 9 > widthLimit ? this.drawImg.width - scale * 9 : widthLimit;
                        this.drawImg.height = this.drawImg.width / this.scaleImg.rate;
                    }

                    this.printImg();
                    if (this.onPrintImgTimmer) {
                        clearTimeout(this.onPrintImgTimmer);
                    }
                    this.onPrintImgTimmer = setTimeout(() => {
                        this.cropPicture(true);
                    }, 100);
                }
                // let scrollTop = this.$refs['mask'].scrollTop;
                // window.scrollTo(this.$refs['mask'].scrollLeft,scrollTop);
                e.preventDefault();
                e.returnValue = false;
                return false;
            },
            // 水平翻转
            flipHorizontal() {
                if (this.drawImg.img) {
                    if (this.isFlipHorizontal == false) {
                        this.isFlipHorizontal = true;
                    } else {
                        this.isFlipHorizontal = false;
                    }
                    this.printImg();
                }
            },
            // 垂直翻转
            flipVertically() {
                if (this.drawImg.img) {
                    if (this.isFlipVertically == false) {
                        this.isFlipVertically = true;
                    } else {
                        this.isFlipVertically = false;
                    }
                    this.printImg();
                }
            },
            // 旋转
            turnImg(angle) {
                let startAngle = this.rotateImg.angle;

                let turnAngle = startAngle + angle;

                if (turnAngle >= -180 && turnAngle <= 180) {
                    this.rotateImg.angle = turnAngle;
                    this.rotateControl.position = (turnAngle / 180) * 100 + 100;
                    this.printImg('rotate');
                }
            },
            turnReset() {
                this.rotateImg.angle = 0;
                this.rotateControl.position = 100;
                this.printImg('rotate');
            },
            // control box
            controlBtnMouseDown(e, btnName) {
                this.controlBox.disable = false;
                this.controlBox.btnName = btnName;
                this.controlBox.start.x = e.clientX;
                this.controlBox.start.y = e.clientY;
                this.controlBox.start.width = this.toolBox.width;
                this.controlBox.start.height = this.toolBox.height;
                e.stopPropagation();
            },
            controlBtnMouseUp(e) {
                this.controlBox.disable = true;
                this.dropImgOff();
                this.resetToolBox();
                this.toolBoxMouseUp();
                e.stopPropagation();
            },

            controlBtnMouseMove(e) {
                if (this.controlBox.disable === false) {
                    let offsetX = e.clientX - this.controlBox.start.x;

                    let offsetY = e.clientY - this.controlBox.start.y;

                    let x, y;

                    if (this.controlBox.btnName == 'leftUp') {
                        if (!this.rate) {
                            x = this.toolBox.x + offsetX;
                            y = this.toolBox.y + offsetY;
                        } else {
                            let p = this.rate.split(':')[0] / this.rate.split(':')[1];

                            if (p >= 1) {
                                x = this.toolBox.x + offsetX;
                                y = this.toolBox.y + offsetX / p;
                            } else {
                                x = this.toolBox.x + offsetY * p;
                                y = this.toolBox.y + offsetY;
                            }
                        }
                        this.toolBox.width = this.controlBox.start.width - offsetX;
                        this.toolBox.height = this.controlBox.start.height - offsetY;
                    }
                    if (this.controlBox.btnName == 'rightUp') {
                        if (!this.rate) {
                            x = this.toolBox.x;
                            y = this.toolBox.y + offsetY;
                        } else {
                            let p = this.rate.split(':')[0] / this.rate.split(':')[1];

                            if (p >= 1) {
                                x = this.toolBox.x;
                                y = this.toolBox.y - offsetX / p;
                            } else {
                                x = this.toolBox.x;
                                y = this.toolBox.y + offsetY;
                            }
                        }
                        this.toolBox.width = this.controlBox.start.width + offsetX;
                        this.toolBox.height = this.controlBox.start.height - offsetY;
                    }
                    if (this.controlBox.btnName == 'rightDown') {
                        x = this.toolBox.x;
                        y = this.toolBox.y;
                        this.toolBox.width = this.controlBox.start.width + offsetX;
                        this.toolBox.height = this.controlBox.start.height + offsetY;
                    }
                    if (this.controlBox.btnName == 'leftDown') {
                        if (!this.rate) {
                            x = this.toolBox.x + offsetX;
                            y = this.toolBox.y;
                        } else {
                            let p = this.rate.split(':')[0] / this.rate.split(':')[1];

                            if (p >= 1) {
                                x = this.toolBox.x + offsetX;
                                y = this.toolBox.y;
                            } else {
                                x = this.toolBox.x + -offsetY * p;
                                y = this.toolBox.y;
                            }
                        }
                        this.toolBox.width = this.controlBox.start.width - offsetX;
                        this.toolBox.height = this.controlBox.start.height + offsetY;
                    }
                    if (this.controlBox.btnName == 'topCenter') {
                        x = this.toolBox.x;
                        y = this.toolBox.y + offsetY;
                        this.toolBox.width = this.controlBox.start.width;
                        this.toolBox.height = this.controlBox.start.height - offsetY;
                    }
                    if (this.controlBox.btnName == 'downCenter') {
                        x = this.toolBox.x;
                        y = this.toolBox.y;
                        this.toolBox.width = this.controlBox.start.width;
                        this.toolBox.height = this.controlBox.start.height + offsetY;
                    }
                    if (this.controlBox.btnName == 'leftCenter') {
                        x = this.toolBox.x + offsetX;
                        y = this.toolBox.y;
                        this.toolBox.width = this.controlBox.start.width - offsetX;
                        this.toolBox.height = this.controlBox.start.height;
                    }
                    if (this.controlBox.btnName == 'rightCenter') {
                        x = this.toolBox.x;
                        y = this.toolBox.y;
                        this.toolBox.width = this.controlBox.start.width + offsetX;
                        this.toolBox.height = this.controlBox.start.height;
                    }
                    this.drawControlBox(this.toolBox.width, this.toolBox.height, x, y);
                }
                e.stopPropagation();
            },
            changeFileName(fileName, type) {
                let index = fileName.lastIndexOf('.');

                return fileName.substr(0, index + 1) + (type === 'jpeg' ? 'jpg' : type);
            },
            cropPicture(doNotReset) {
                let _this = this;

                if (this.drawImg.img) {
                    // get img
                    let canvas = this.$refs['canvas'];

                    // 文字水印
                    if (this.WatermarkText && !doNotReset) {
                        let ctx2 = canvas.getContext('2d');

                        ctx2.font = this.WatermarkTextFont;
                        ctx2.fillStyle = this.WatermarkTextColor;
                        ctx2.textAlign = 'right';
                        ctx2.textBaseline = 'bottom';
                        ctx2.fillText(
                            this.WatermarkText,
                            this.toolBox.x + this.toolBox.width * this.WatermarkTextX,
                            this.toolBox.y + this.toolBox.height * this.WatermarkTextY
                        );
                    }

                    let tempImg = new Image();

                    if (this.crossOrigin === true) {
                        tempImg.crossOrigin = this.crossOriginHeader;
                    }
                    tempImg.src = canvas.toDataURL(`image/${this.fileType}`);

                    if (!HTMLCanvasElement.prototype.toBlob) {
                        Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
                            value: (callback, type, quality) => {
                                if (window.atob) {
                                    setTimeout(() => {
                                        let binStr = atob(canvas.toDataURL(type, quality).split(',')[1]);

                                        let len = binStr.length,
                                            arr = new Uint8Array(len);

                                        let NewBlob;

                                        for (let i = 0; i < len; i++) {
                                            arr[i] = binStr.charCodeAt(i);
                                        }
                                        try {
                                            NewBlob = new Blob([arr], {
                                                type: `image/${_this.fileType}`,
                                            });
                                        } catch (e) {
                                            window.BlobBuilder =
                                                window.BlobBuilder ||
                                                window.WebKitBlobBuilder ||
                                                window.MozBlobBuilder ||
                                                window.MSBlobBuilder;
                                            if (e.name == 'TypeError' && window.BlobBuilder) {
                                                const BlobBuilder = window.BlobBuilder;

                                                let bb = new BlobBuilder();

                                                bb.append(arr.buffer);
                                                NewBlob = bb.getBlob(`image/${_this.fileType}`);
                                            }
                                            if (e.name == 'InvalidStateError') {
                                                NewBlob = new Blob([arr.buffer], { type: `image/${_this.fileType}` });
                                            }
                                        }
                                        // TypeError old chrome and FF
                                        callback(NewBlob);
                                    }, 200);
                                } else {
                                    callback(false, {
                                        type: `image/${_this.fileType}`,
                                    });
                                }
                            },
                        });
                    }
                    canvas.toBlob((blob) => {
                        if (blob) {
                            let reader = new FileReader();

                            reader.readAsDataURL(blob);
                            reader.onload = () => {
                                let timmer = setInterval(() => {
                                    if (reader.readyState == 2) {
                                        clearInterval(timmer);
                                        let newCanv = document.createElement('canvas');

                                        let ctx = newCanv.getContext('2d');

                                        // 原图裁剪 originalGraph
                                        if (_this.originalGraph == true) {
                                            let scale = _this.drawImg.width / _this.drawImg.swidth;

                                            // 计算实际图像大小
                                            let transWidth = _this.toolBox.width / scale;

                                            let transHeight = _this.toolBox.height / scale;

                                            newCanv.width = transWidth;
                                            newCanv.height = transHeight;
                                            // 重新计算裁剪坐标
                                            let sx = (_this.toolBox.x - _this.drawImg.x) / scale;

                                            let sy = (_this.toolBox.y - _this.drawImg.y) / scale;

                                            let swidth = _this.drawImg.swidth;

                                            let sheight = _this.drawImg.sheight;

                                            // TODO 使原图裁剪支持旋转后的图像
                                            // ctx.translate(sx + transWidth/2, sy + transHeight/2);
                                            // ctx.rotate((_this.rotateImg.angle) * Math.PI / 180);
                                            // ctx.translate(-(sx + transWidth/2), -(sy + transHeight/2));
                                            ctx.translate(-sx, -sy);
                                            ctx.drawImage(_this.drawImg.img, 0, 0, swidth, sheight);
                                        } else {
                                            newCanv.width = _this.toolBox.width;
                                            newCanv.height = _this.toolBox.height;
                                            let params = _this.toolBox;

                                            if (_this.rate) {
                                                let p = _this.rate.split(':')[0] / _this.rate.split(':')[1];

                                                let m = _this.rate.split(':')[0];

                                                let n = _this.rate.split(':')[1];

                                                if (m >= n) {
                                                    ctx.drawImage(
                                                        tempImg,
                                                        params.x,
                                                        params.y,
                                                        params.width,
                                                        params.width * p,
                                                        0,
                                                        0,
                                                        params.width,
                                                        params.width * p
                                                    );
                                                } else {
                                                    ctx.drawImage(
                                                        tempImg,
                                                        params.x,
                                                        params.y,
                                                        params.width,
                                                        params.width / p,
                                                        0,
                                                        0,
                                                        params.width,
                                                        params.width / p
                                                    );
                                                }
                                            } else {
                                                ctx.drawImage(
                                                    tempImg,
                                                    params.x,
                                                    params.y,
                                                    params.width,
                                                    params.height,
                                                    0,
                                                    0,
                                                    params.width,
                                                    params.height
                                                );
                                            }
                                        }
                                        newCanv.toBlob(
                                            (newBlob) => {
                                                let fileName = _this.changeFileName(_this.fileName, _this.fileType);

                                                if (!doNotReset) {
                                                    _this.handleClose();
                                                    _this.$emit('cutDown', {
                                                        index: _this.index,
                                                        fileName,
                                                        blob: newBlob,
                                                        file: _this.dataURLtoFile(
                                                            newCanv.toDataURL(`image/${_this.fileType}`),
                                                            fileName
                                                        ),
                                                        dataURL: newCanv.toDataURL(`image/${_this.fileType}`),
                                                    });
                                                } else {
                                                    if (_this.previewMode) {
                                                        _this.$emit('onPrintImg', {
                                                            index: _this.index,
                                                            fileName,
                                                            blob: newBlob,
                                                            file: _this.dataURLtoFile(
                                                                newCanv.toDataURL(`image/${_this.fileType}`),
                                                                fileName
                                                            ),
                                                            dataURL: newCanv.toDataURL(`image/${_this.fileType}`),
                                                        });
                                                    }
                                                }
                                            },
                                            `image/${_this.fileType}`,
                                            0.95
                                        );
                                    }
                                }, 200);
                            };
                        } else {
                            // IE9及以下
                            let newCanv = document.createElement('canvas');

                            newCanv.width = _this.toolBox.width;
                            newCanv.height = _this.toolBox.height;
                            let ctx = newCanv.getContext('2d');

                            let params = _this.toolBox;

                            if (_this.rate) {
                                let p = _this.rate.split(':')[0] / _this.rate.split(':')[1];

                                ctx.drawImage(
                                    tempImg,
                                    params.x,
                                    params.y,
                                    params.width,
                                    params.width * p,
                                    0,
                                    0,
                                    params.width,
                                    params.width * p
                                );
                            } else {
                                ctx.drawImage(
                                    tempImg,
                                    params.x,
                                    params.y,
                                    params.width,
                                    params.height,
                                    0,
                                    0,
                                    params.width,
                                    params.height
                                );
                            }
                            let fileName = _this.changeFileName(_this.fileName, _this.fileType);

                            if (!doNotReset) {
                                _this.handleClose();
                                _this.$emit('cutDown', {
                                    fileName,
                                    dataURL: newCanv.toDataURL(`image/${_this.fileType}`),
                                });
                            } else {
                                _this.$emit('onPrintImg', {
                                    fileName,
                                    dataURL: newCanv.toDataURL(`image/${_this.fileType}`),
                                });
                            }
                        }
                    }),
                        `image/${_this.fileType}`;
                } else {
                    if (!doNotReset) {
                        console.warn('No picture selected');
                        _this.$emit('error', {
                            err: 1,
                            msg: 'No picture selected',
                        });
                    }
                }
            },
            scrollBarControlMove(e) {
                if (this.rotateControl.active) {
                    let offsetX = e.pageX - this.rotateControl.start.x;

                    //                let rotate = this.rotateImg.angle/360*100 + offsetX/100*100;
                    let position = this.rotateControl.start.position + offsetX;

                    if (position <= 0) {
                        position = 0;
                    }
                    if (position >= 200) {
                        position = 200;
                    }
                    this.rotateControl.position = position;
                    this.rotateImg.angle = ((position - 100) / 100) * 180;
                    this.printImg();
                }
            },
            scrollBarControlOn(e) {
                this.rotateControl.active = true;
                this.rotateControl.start.x = e.pageX;
                this.rotateControl.start.y = e.pageY;
                this.rotateControl.start.position = this.rotateControl.position;
            },
            scrollBarControlOff() {
                this.rotateControl.active = false;
            },
        },
    };
</script>
<style scoped>
    .vue-img-cutter {
        font-size: 12px;
        line-height: 130%;
    }

    .fl {
        float: left;
    }

    .fr {
        float: right;
    }

    .i-dialog-footer {
        display: block;
        width: 100%;
        margin-top: 15px;
        margin-bottom: 15px;
        text-align: left;
    }

    .mask {
        background: rgba(0, 0, 0, 0.6);
        position: fixed;
        overflow-y: scroll;
        overflow-x: hidden;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
    }

    .dialogBox {
        clear: both;
    }

    .dialogBoxModal {
        position: relative;
        padding-top: 100px;
        padding-bottom: 100px;
        clear: both;
    }

    .dialogMainModal {
        line-height: 125%;
        font-size: 16px;
        position: absolute;
        top: 100px;
        left: 50%;
        margin-bottom: 100px;
        transform: translateX(-50%);
        border: 1px solid rgba(0, 0, 0, 0.8);
        border-radius: 3px;
        box-sizing: border-box;
        padding: 15px 15px 0 15px;
        background: #fff;
        z-index: 1000;
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Chrome/Safari/Opera */
        -khtml-user-select: none; /* Konqueror */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently*/
        animation: dialogShow 0.3s;
    }

    .dialogMain {
        line-height: 125%;
        font-size: 16px;
        box-sizing: border-box;
        background: #fff;
        z-index: 1000;
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Chrome/Safari/Opera */
        -khtml-user-select: none; /* Konqueror */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently*/
    }

    @keyframes dialogShow {
        from {
            margin-top: -50px;
            opacity: 0;
        }
        to {
            margin-top: 0;
            opacity: 1;
        }
    }

    .toolMain {
        box-sizing: border-box;
    }

    .toolBox {
        border: 1px solid #dedede;
        background-image: linear-gradient(
                45deg,
                rgba(0, 0, 0, 0.25) 25%,
                transparent 0,
                transparent 75%,
                rgba(0, 0, 0, 0.25) 0
            ),
            linear-gradient(45deg, rgba(0, 0, 0, 0.25) 25%, transparent 0, transparent 75%, rgba(0, 0, 0, 0.25) 0);
        background-color: #eee;
        background-size: 30px 30px;
        background-position: 0 0, 15px 15px;
        position: relative;
    }

    .tool-title {
        margin-bottom: 10px;
    }

    .canvas {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 98;
    }

    .canvasSelectBox {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99;
    }

    @keyframes zi-antBorder {
        0% {
            background-position: 0px 0px;
        }
        50% {
            background-position: 0px 5px;
        }
        100% {
            background-position: 0px 10px;
        }
    }

    .toolBoxControl {
        background: rgba(255, 255, 255, 0);
        /*background:#fff;*/
        position: absolute;
        z-index: 101;
        box-sizing: border-box;
        /*border: 1px dotted #409EFF;*/
    }

    .toolBoxControlBox {
        width: 100%;
        height: 100%;
        position: relative;
        background: transparent;
        z-index: 103;
        pointer-events: none;
    }

    .controlBoxInnerLine {
        position: absolute;
        z-index: 1;
        background-size: 10px 10px;
        background-image: linear-gradient(
            -45deg,
            rgba(64, 158, 255, 1) 25%,
            rgba(64, 158, 255, 0) 25%,
            rgba(64, 158, 255, 0) 50%,
            rgba(64, 158, 255, 1) 50%,
            rgba(64, 158, 255, 1) 75%,
            rgba(64, 158, 255, 0) 75%,
            rgba(64, 158, 255, 0)
        );
        -ms-animation: zi-antBorder 0.8s linear 0s infinite normal;
        -moz-animation: zi-antBorder 0.8s linear 0s infinite normal;
        -webkit-animation: zi-antBorder 0.8s linear 0s infinite normal;
        animation: zi-antBorder 0.8s linear 0s infinite normal;
        pointer-events: none;
    }

    .controlBoxInnerLineTop {
        height: 1px;
        width: 100%;
        top: -1px;
    }

    .controlBoxInnerLineBottom {
        height: 1px;
        width: 100%;
        bottom: -1px;
    }

    .controlBoxInnerLineLeft {
        height: 100%;
        width: 1px;
        left: -1px;
        top: 0;
    }

    .controlBoxInnerLineRight {
        height: 100%;
        width: 1px;
        right: -1px;
        top: 0;
    }

    .toolBoxControlLine {
        position: absolute;
        z-index: 1;
        background: transparent;
    }

    .toolBoxControlLineItem-1 {
        top: 33%;
        width: 100%;
        height: 1px;
        box-sizing: border-box;
        border-bottom: 1px dashed #409eff;
    }

    .toolBoxControlLineItem-2 {
        top: 66%;
        width: 100%;
        height: 1px;
        box-sizing: border-box;
        border-bottom: 1px dashed #409eff;
    }

    .toolBoxControlLineItem-3 {
        left: 33%;
        border-right: 1px dashed #409eff;
        height: 100%;
        width: 1px;
        box-sizing: border-box;
    }

    .toolBoxControlLineItem-4 {
        left: 66%;
        border-right: 1px dashed #409eff;
        height: 100%;
        width: 1px;
        box-sizing: border-box;
    }

    .controlBox {
        width: 100%;
        height: 100%;
        position: absolute;
        cursor: move;
        z-index: 1;
        pointer-events: none;
    }

    .controlBtn {
        border: 1px solid rgba(255, 255, 255, 0.5);
        box-sizing: border-box;
        width: 6px;
        height: 6px;
        background: #409eff;
        position: absolute;
        border-radius: 50%;
        z-index: 999;
        pointer-events: auto !important;
    }

    .leftUp {
        top: 0;
        left: 0;
        margin-left: -3px;
        margin-top: -3px;
        cursor: se-resize;
    }

    .leftDown {
        bottom: 0;
        left: 0;
        margin-left: -3px;
        margin-bottom: -3px;
        cursor: sw-resize;
    }

    .rightUp {
        top: 0;
        right: 0;
        margin-right: -3px;
        margin-top: -3px;
        cursor: sw-resize;
    }

    .rightDown {
        bottom: 0;
        right: 0;
        margin-right: -3px;
        margin-bottom: -3px;
        cursor: se-resize;
    }

    .topCenter {
        top: 0;
        right: 50%;
        margin-right: -3px;
        margin-top: -3px;
        cursor: s-resize;
    }

    .downCenter {
        bottom: 0;
        right: 50%;
        margin-right: -3px;
        margin-bottom: -3px;
        cursor: s-resize;
    }

    .leftCenter {
        top: 50%;
        left: 0;
        margin-left: -3px;
        margin-top: -3px;
        cursor: e-resize;
    }

    .rightCenter {
        top: 50%;
        right: 0;
        margin-right: -3px;
        margin-top: -3px;
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
        display: inline-block;
        text-align: center;
        background: #dedede;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        box-sizing: border-box;
        border-radius: 4px;
        cursor: pointer;
        border: 1px solid;
        font-size: 14px;
        transition: background 0.3s, color 0.3s;
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Chrome/Safari/Opera */
        -khtml-user-select: none; /* Konqueror */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently*/
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
        border-color: #dcdfe6;
        background-color: #fff;
        transition: background 0.3s, color 0.3s;
    }

    .btn-default:hover {
        color: #409eff;
        border-color: #c6e2ff;
        background-color: #ecf5ff;
    }

    .btn-primary {
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
        transition: background 0.3s, color 0.3s;
    }

    .btn-primary:hover {
        background: #66b1ff;
        border-color: #66b1ff;
        color: #fff;
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
        transition: background 0.3s, color 0.3s;
    }

    .btn-primary-plain {
        color: #409eff;
        border-color: #c6e2ff;
        background-color: #ecf5ff;
        transition: background 0.3s, color 0.3s;
    }

    .btn-primary-plain:hover {
        background: #66b1ff;
        border-color: #66b1ff;
        color: #fff;
    }

    .btn-xs {
        height: 26px;
        line-height: 26px;
        padding: 0 10px;
        font-size: 12px;
    }

    .dialog-footer {
        float: right;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

    .fade-in-enter {
        margin-top: -50px;
        opacity: 0;
        transition: margin-top 0.2s, opacity 0.2s;
    }

    .fade-out-enter {
        transition: margin-top 0.2s, opacity 0.2s;
    }

    .fade-in-active {
        transition: margin-top 0.2s, opacity 0.2s;
    }

    .fade-out-active {
        margin-top: -50px;
        opacity: 0;
        transition: margin-top 0.2s, opacity 0.2s;
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
        color: #c0c4cc;
    }

    .toolbar-item {
        display: inline-block;
    }

    .closeIcon {
        float: right;
        cursor: pointer;
        display: block;
        background: #c6e2ff;
        color: #fff;
        width: 18px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        border-radius: 50%;
        margin: 0;
        padding: 0;
        transition: transform 0.3s, background 0.3s;
        /*transform: rotate(90deg);*/
    }

    .closeIcon:hover {
        background: #409eff;
        transform: rotate(180deg);
    }

    .copyright {
        font-size: 10px !important;
        clear: both !important;
        width: 100% !important;
        text-align: right !important;
        display: block !important;
        opacity: 0.5 !important;
        position: absolute !important;
        bottom: 0 !important;
        right: 0 !important;
        line-height: 100% !important;
        z-index: 100 !important;
    }

    .copyright a {
        color: #fff !important;
        text-decoration: none !important;
        position: relative !important;
        opacity: 1 !important;
        display: inline-block !important;
        padding: 2px !important;
        background: rgba(0, 0, 0, 0.4);
    }

    /*工具栏*/
    .dockMain {
        position: absolute;
        z-index: 1002;
        bottom: 5px;
        left: 5px;
        /*transform: translateX(-50%);*/
        opacity: 0.5;
        transition: opacity 0.5s;
        /*width: 98%;*/
        box-sizing: border-box;
        padding: 5px 5px;
        border-radius: 5px;
    }

    .dockMain:hover {
        opacity: 1;
    }

    .dockBtn {
        font-size: 10px;
        cursor: pointer;
        display: inline-block;
        margin-right: 4px;
        color: #409eff;
        border: 1px solid #c6e2ff;
        background-color: #ecf5ff;
        padding: 1px 4px;
        border-radius: 3px;
        height: 20px;
        line-height: 16px;
        transition: background 0.2s, color 0.2s;
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Chrome/Safari/Opera */
        -khtml-user-select: none; /* Konqueror */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently*/
    }

    .dockBtn:hover {
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
    }

    /* 旋转进度条 */
    .dockBtnScrollBar {
        display: inline-block;
        margin-right: 4px;
        margin-left: 10px;
        background: #409eff;
        width: 200px;
        height: 10px;
        border-radius: 5px;
        position: relative;
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Chrome/Safari/Opera */
        -khtml-user-select: none; /* Konqueror */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently*/
    }

    .scrollBarControl {
        position: absolute;
        cursor: pointer;
        background: #fff;
        border: 2px solid #409eff;
        box-sizing: border-box;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        top: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 3px #1f5184;
    }

    .scrollBarText {
        position: absolute;
        cursor: pointer;
        background: rgba(0, 0, 0, 0.7);
        padding: 2px;
        color: #fff;
        top: -16px;
        height: 14px;
        line-height: 14px;
        text-align: center;
        font-size: 10px;
        border-radius: 3px;
        transform: translate(-50%, -50%);
    }
</style>
