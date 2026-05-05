<template>
  <div>
    <div
      v-if="showChooseBtn === true && isModal === true"
      @click="handleOpen"
    >
      <slot name="openImgCutter" />
      <slot name="open" />
    </div>
    <button
      v-if="!$slots.openImgCutter && !$slots.open && isModal === true"
      type="button"
      class="btn btn-primary"
      @click="handleOpen"
    >
      {{ label }}
    </button>
    <transition name="fade">
      <div
        v-if="visible"
        ref="mask"
        :class="isModal === true ? 'mask vue-img-cutter' : ''"
      >
        <div
          v-if="visible"
          :class="isModal === true ? 'dialogBoxModal' : 'dialogBox'"
        >
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
                <div
                  v-if="isModal === true"
                  class="tool-title"
                >
                  {{ modalTitle }}
                  <span
                    class="closeIcon"
                    @click="handleClose"
                  >×</span>
                </div>
                <div
                  ref="toolBox"
                  :style="'height:' + boxHeight + 'px;width:' + boxWidth + 'px'"
                  class="toolBox"
                  @mousemove="controlBtnMouseMove"
                  @mouseup="controlBtnMouseUp"
                  @mouseleave="controlBtnMouseUp"
                >
                  <!--选取图片-->
                  <div
                    v-show="!drawImg.img && showChooseBtn === true"
                    class="tips"
                  >
                    <div
                      class="btn btn-warning btn-xs"
                      @click="chooseImg"
                    >
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
                    <div
                      v-if="rate"
                      class="dockBtn"
                    >
                      <slot name="ratio">
                        Ratio:
                      </slot>
                      {{ rate }}
                    </div>
                    <div
                      class="dockBtn"
                      @click="scaleReset"
                    >
                      <slot name="scaleReset">
                        Scale:
                      </slot>
                      {{ drawImg.swidth > 0 ? (drawImg.width / drawImg.swidth).toFixed(2) : '-' }}
                    </div>
                    <div
                      v-if="originalGraph === false"
                      class="dockBtn"
                      @click="turnImg(-90)"
                    >
                      <slot name="turnLeft">
                        ↳
                      </slot>
                    </div>
                    <div
                      v-if="originalGraph === false"
                      class="dockBtn"
                      @click="turnImg(90)"
                    >
                      <slot name="turnRight">
                        ↲
                      </slot>
                    </div>
                    <div
                      v-if="originalGraph === false"
                      class="dockBtn"
                      @click="turnReset()"
                    >
                      <slot name="reset">
                        ↻
                      </slot>
                    </div>
                    <div
                      v-if="originalGraph === false"
                      class="dockBtnScrollBar"
                    >
                      <div
                        ref="dockBtnScrollControl"
                        :style="'left:' + rotateControl.position + 'px'"
                        class="scrollBarControl"
                        @mousemove="scrollBarControlMove"
                        @mousedown="scrollBarControlOn"
                        @mouseup="scrollBarControlOff"
                      />
                      <div
                        v-if="rotateControl.active == true"
                        class="scrollBarText"
                        :style="'left:' + rotateControl.position + 'px'"
                      >
                        {{ rotateImg.angle.toFixed(0) + '°' }}
                      </div>
                    </div>
                    <div
                      v-if="originalGraph === false"
                      class="dockBtn"
                      @click="flipHorizontal"
                    >
                      <slot name="flipHorizontal">
                        ⇆
                      </slot>
                    </div>
                    <div
                      v-if="originalGraph === false"
                      class="dockBtn"
                      @click="flipVertically"
                    >
                      <slot name="flipVertically">
                        ⇅
                      </slot>
                    </div>
                  </div>
                  <!--裁剪区域-->
                  <div
                    v-show="drawImg.img != null"
                    ref="toolBoxControl"
                    class="toolBoxControl"
                    :style="{
                      pointerEvents: moveAble ? 'auto' : 'none',
                    }"
                    @mousedown="toolBoxMouseDown"
                    @mouseup="toolBoxMouseUp"
                    @mousemove="toolBoxMouseMove"
                    @mouseleave="toolBoxMouseLeave"
                  >
                    <div class="toolBoxControlBox">
                      <div class="controlBox">
                        <!--蚂蚁线-->
                        <div class="controlBoxInnerLine controlBoxInnerLineTop" />
                        <div class="controlBoxInnerLine controlBoxInnerLineBottom" />
                        <div class="controlBoxInnerLine controlBoxInnerLineLeft" />
                        <div class="controlBoxInnerLine controlBoxInnerLineRight" />
                        <!--工具栏提示-->
                        <div class="selectArea">
                          宽:{{ showToolBoxWidth }} 高:{{ showToolBoxHeight }} (x:{{
                            showToolBoxX
                          }},y:{{ showToolBoxY }})
                        </div>
                        <!--操作杆-->
                        <div
                          v-if="sizeChange === true"
                          data-name="leftUp"
                          class="leftUp controlBtn"
                          @mousedown="controlBtnMouseDown($event, 'leftUp')"
                        />
                        <div
                          v-if="sizeChange === true"
                          data-name="leftDown"
                          class="leftDown controlBtn"
                          @mousedown="controlBtnMouseDown($event, 'leftDown')"
                        />
                        <div
                          v-if="sizeChange === true"
                          data-name="rightUp"
                          class="rightUp controlBtn"
                          @mousedown="controlBtnMouseDown($event, 'rightUp')"
                        />
                        <div
                          v-if="sizeChange === true"
                          data-name="rightDown"
                          class="rightDown controlBtn"
                          @mousedown="controlBtnMouseDown($event, 'rightDown')"
                        />

                        <div
                          v-if="sizeChange === true && !rate && toolBox.width > 20"
                          data-name="topCenter"
                          class="topCenter controlBtn"
                          @mousedown="controlBtnMouseDown($event, 'topCenter')"
                        />
                        <div
                          v-if="sizeChange === true && !rate && toolBox.width > 20"
                          data-name="downCenter"
                          class="downCenter controlBtn"
                          @mousedown="controlBtnMouseDown($event, 'downCenter')"
                        />
                        <div
                          v-if="sizeChange === true && !rate && toolBox.height > 20"
                          data-name="leftCenter"
                          class="leftCenter controlBtn"
                          @mousedown="controlBtnMouseDown($event, 'leftCenter')"
                        />
                        <div
                          v-if="sizeChange === true && !rate && toolBox.height > 20"
                          data-name="rightCenter"
                          class="rightCenter controlBtn"
                          @mousedown="controlBtnMouseDown($event, 'rightCenter')"
                        />
                      </div>
                      <div class="toolBoxControlLine toolBoxControlLineItem-1" />
                      <div class="toolBoxControlLine toolBoxControlLineItem-2" />
                      <div class="toolBoxControlLine toolBoxControlLineItem-3" />
                      <div class="toolBoxControlLine toolBoxControlLineItem-4" />
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
                    ref="canvasSelectBox"
                    class="canvasSelectBox"
                    :width="boxWidth"
                    :height="boxHeight"
                    @mousedown="dropImgOn"
                    @mouseup="dropImgOff"
                    @mousemove="dropImgMove"
                  />
                  <canvas
                    ref="canvas"
                    class="canvas"
                    :width="boxWidth"
                    :height="boxHeight"
                  />
                </div>
              </div>
              <div
                class="i-dialog-footer"
                style="height: 40px"
              >
                <input
                  ref="inputFile"
                  type="file"
                  :accept="accept"
                  style="width: 1px; height: 1px; border: none; opacity: 0"
                  @change="putImgToCanv"
                >
                <span @click="chooseImg">
                  <slot name="choose">
                    <div
                      v-if="showChooseBtn === true"
                      class="btn btn-primary btn-primary-plain"
                    >
                      {{ label }}
                    </div>
                  </slot>
                </span>
                <div class="btn-group fr">
                  <span @click="handleClose">
                    <slot name="cancel">
                      <button
                        type="button"
                        class="btn btn-default"
                      >取消</button>
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
          <div style="clear: both" />
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    import config from '../../package.json';

    export interface DrawImg {
        img: HTMLImageElement | null;
        sx: number;
        sy: number;
        swidth: number;
        sheight: number;
        x: number;
        y: number;
        width: number;
        height: number;
    }

    export interface ToolBox {
        disable: boolean;
        width: number;
        height: number;
        x: number;
        y: number;
        boxMove: {
            start: { x: number; y: number };
            moveTo: { x: number; y: number };
        };
    }

    export interface DropImg {
        active: boolean;
        pageX: number;
        pageY: number;
        params: Partial<DrawImg>;
    }

    export interface RotateControl {
        active: boolean;
        start: {
            x: number;
            y: number;
            position: number;
        };
        position: number;
    }

    export default defineComponent({
        name: 'ImgCutter',
        props: {
            modalTitle: {
                type: String,
                default: '图片裁剪',
                required: false,
            },
            crossOrigin: {
                type: Boolean,
                default: false,
                required: false,
            },
            crossOriginHeader: {
                type: String,
                default: '*',
                required: false,
            },
            label: {
                type: String,
                default: '选择图片',
                required: false,
            },
            isModal: {
                type: Boolean,
                default: true,
                required: false,
            },
            lockScroll: {
                type: Boolean,
                default: true,
                required: false,
            },
            showChooseBtn: {
                type: Boolean,
                default: true,
                required: false,
            },
            boxWidth: {
                type: Number,
                default: 800,
                required: false,
            },
            boxHeight: {
                type: Number,
                default: 400,
                required: false,
            },
            cutWidth: {
                type: Number,
                default: 200,
                required: false,
            },
            cutHeight: {
                type: Number,
                default: 200,
                required: false,
            },
            rate: {
                type: String as PropType<string | null>,
                default: null,
                required: false,
            },
            tool: {
                type: Boolean,
                default: true,
                required: false,
            },
            toolBgc: {
                type: String,
                default: '#fff',
                required: false,
            },
            imgMove: {
                type: Boolean,
                default: true,
                required: false,
            },
            sizeChange: {
                type: Boolean,
                default: true,
                required: false,
            },
            originalGraph: {
                type: Boolean,
                default: false,
                required: false,
            },
            moveAble: {
                type: Boolean,
                default: true,
                required: false,
            },
            previewMode: {
                type: Boolean,
                default: true,
                required: false,
            },
            CuttingOriginal: {
                type: Boolean,
                default: false,
                required: false,
            },
            WatermarkText: {
                type: String,
                default: '',
                required: false,
            },
            WatermarkTextFont: {
                type: String,
                default: '12px Sans-serif',
                required: false,
            },
            WatermarkTextColor: {
                type: String,
                default: '#fff',
                required: false,
            },
            WatermarkTextX: {
                type: Number,
                default: 0.95,
                required: false,
            },
            WatermarkTextY: {
                type: Number,
                default: 0.95,
                required: false,
            },
            smallToUpload: {
                type: Boolean,
                default: false,
                required: false,
            },
            saveCutPosition: {
                type: Boolean,
                default: false,
                required: false,
            },
            scaleAble: {
                type: Boolean,
                default: true,
                required: false,
            },
            index: {
                default: null,
                required: false,
                type: [String, Number]
            },
            fileType: {
                default: 'png',
                required: false,
                type: String,
            },
            toolBoxOverflow: {
                type: Boolean,
                default: true,
                required: false,
            },
            DoNotDisplayCopyright: {
                type: Boolean,
                default: false,
                required: false,
            },
            quality: {
                type: Number,
                default: 1,
                required: false,
            },
            accept: {
                type: String,
                default: 'image/gif, image/jpeg ,image/png',
                required: false,
            },
            afterChooseImg: {
                type: Function as PropType<(e: Event) => Promise<boolean> | boolean>,
                default: null,
                required: false,
            },
        },
        emits: [
            'onImageLoadError',
            'error',
            'onImageLoadComplete',
            'onChooseImg',
            'onClearAll',
            'cutDown',
            'onPrintImg'
        ],
        data() {
            let toolBoxWidth, toolBoxHeight;

            toolBoxWidth = this.boxWidth / 2;
            toolBoxHeight = this.boxHeight / 2;
            return {
                version: '',
                visible: false,
                fileName: '',
                cutImageObj: null as HTMLImageElement | null,
                onPrintImgTimmer: null as any,
                toolBoxPosition: {
                    x: 0,
                    y: 0,
                },
                drawImg: {
                    img: null,
                    sx: 0,
                    sy: 0,
                    swidth: 0,
                    sheight: 0,
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                } as DrawImg,
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
                } as ToolBox,
                dropImg: {
                    active: false,
                    pageX: 0,
                    pageY: 0,
                    params: {},
                } as DropImg,
                rotateImg: {
                    angle: 0,
                },
                rotateControl: {
                    active: false,
                    start: {
                        x: 0,
                        y: 0,
                        position: 0,
                    },
                    position: 100,
                } as RotateControl,
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
                isFlipHorizontal: false,
                isFlipVertically: false,
            };
        },
        computed: {
            showToolBoxWidth() {
                let result;
                if (!this.originalGraph) {
                    result = this.toolBox.width;
                } else {
                    result = this.toolBox.width / (this.drawImg.width / this.drawImg.swidth);
                }
                return Number(result).toFixed(0);
            },
            showToolBoxHeight() {
                let result;
                if (!this.originalGraph) {
                    result = this.toolBox.height;
                } else {
                    result = this.toolBox.height / (this.drawImg.width / this.drawImg.swidth);
                }
                return Number(result).toFixed(0);
            },
            showToolBoxX() {
                let result;
                result = this.toolBoxPosition.x;
                return Number(result).toFixed(0);
            },
            showToolBoxY() {
                let result;
                result = this.toolBoxPosition.y;
                return Number(result).toFixed(0);
            },
        },
        mounted() {
            this.version = config.version;
            // 是否为弹窗模式
            if (this.isModal === false) {
                this.visible = true;
                this.$nextTick(() => {
                    if (this.$refs['toolBox']) {
                        (this.$refs['toolBox'] as any).onmousewheel = this.scaleImgWheel;
                        (this.$refs['toolBox'] as any).addEventListener('DOMMouseScroll', this.scaleImgWheel);
                    }
                });
            }
        },
        methods: {
            handleOpen(img: any) {
                let init = (callback?: () => void) => {
                    if (this.$refs['toolBox']) {
                        (this.$refs['toolBox'] as any).onmousewheel = this.scaleImgWheel;
                        (this.$refs['toolBox'] as any).addEventListener('DOMMouseScroll', this.scaleImgWheel);
                    }

                    // 判断下窗口高度
                    if (this.isModal === true) {
                        if (this.lockScroll === true) {
                            document.body.style.overflowY = 'hidden';
                        }
                        let dialogBoxHeight = (this.$refs['dialogMainModalRef'] as HTMLElement).offsetHeight + 200;

                        let windowHeight = window.innerHeight;

                        let mask = this.$refs['mask'] as HTMLElement;

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
                        $image.style.top = -5000 + 'px';
                        $image.style.opacity = '0';

                        $image.onerror = (err) => {
                            this.$emit('onImageLoadError', err);
                            this.$emit('error', {
                                type: 3,
                                index: this.index,
                                msg: '图片加载失败',
                            });
                            throw new Error('图片加载失败');
                        };
                        $image.onload = () => {
                            if ($image.complete === true) {
                                this.$emit('onImageLoadComplete', $image);
                                this.visible = true;
                                this.$nextTick(() => {
                                    init(() => {
                                        this.importImgToCanv($image);
                                    });
                                });
                            } else {
                                this.$emit('onImageLoadError', new Error('图片加载失败'));
                                this.$emit('error', {
                                    type: 3,
                                    index: this.index,
                                    msg: '图片加载失败',
                                });
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
                (this.$refs['inputFile'] as HTMLInputElement).click();
            },
            importImgToCanv(img: HTMLImageElement) {
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
                // this.$set(this, 'drawImg', drawImg);
                this.drawImg = drawImg;
                this.printImg();
                this.putToolBox();
            },
            // 将选择的图片绘制到画布
            async putImgToCanv(e: any) {
                let pass = false;

                if (typeof this.afterChooseImg === 'function') {
                    pass = await this.afterChooseImg(e);
                } else {
                    pass = true;
                }
                if (!pass) {
                    return;
                }
                let file: File | null = null;

                if (e.target.files) {
                    file = e.target.files[0] || null;
                } else {
                    // 如果是IE9及以下
                    console.error('IE9及以下需要自己传入image对象');
                    // this.$emit('importImage',e);
                    return false;
                }
                if (file) {
                    // 文件类型检查
                    if (this.accept.indexOf(file.type) === -1) {
                        this.$emit('error', {
                            type: 1,
                            index: this.index,
                            event: e,
                            msg: '文件类型错误',
                        });
                        return false;
                    }

                    this.fileName = file.name;
                    let reader = new FileReader();

                    reader.readAsDataURL(file);
                    reader.onerror = (err) => {
                        console.error(err);
                        this.$emit('error', {
                            type: 2,
                            index: this.index,
                            event: e,
                            msg: err?.toString() || '文件读取错误',
                        });
                        return;
                    };
                    reader.onload = (result: any) => {
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
                                    const fileName = this.changeFileName((file as File).name, this.fileType);
                                    this.$emit('cutDown', {
                                        filename: fileName,
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
                                // this.$set(this, 'drawImg', drawImg);
                                this.drawImg = drawImg;
                                this.printImg();
                                this.putToolBox();
                            }
                        }, 200);
                    };
                    this.$emit('onChooseImg', file, this.index);
                }
            },
            putToolBox() {
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
                this.checkToolBoxOverflow().then(() => {
                    this.printImg();
                });

                this.drawControlBox(this.toolBox.width, this.toolBox.height, this.toolBox.x, this.toolBox.y);
            },
            // 判断裁剪框是否超出图片
            checkToolBoxOverflow() {
                return new Promise<void>((resolve) => {
                    if (!this.toolBoxOverflow) {
                        // 如果裁剪框不能超出图片 则先判断图片尺寸
                        // 如果图片尺寸长宽都超过裁剪框 不做处理
                        // 如果图片尺寸小于裁剪框 将图片缩放至合适尺寸
                        if (this.drawImg.width < this.toolBox.width || this.drawImg.height < this.toolBox.height) {
                            const p = this.drawImg.width / this.drawImg.height;
                            if (this.drawImg.width < this.toolBox.width) {
                                this.drawImg.width = this.toolBox.width;
                                this.drawImg.height = this.drawImg.width / p;
                            }
                            if (this.drawImg.height < this.toolBox.height) {
                                this.drawImg.height = this.toolBox.height;
                                this.drawImg.width = this.drawImg.height * p;
                            }
                            // 根据图片缩放重新调整位置
                            this.drawImg.x = (this.boxWidth - this.drawImg.width) / 2;
                            this.drawImg.y = (this.boxHeight - this.drawImg.height) / 2;
                        }
                        // 检查图片坐标是否超出
                        // console.log(
                        //     'this.drawImg.y > this.toolBox.y',
                        //     this.drawImg.y + this.drawImg.height,
                        //     this.toolBox.y + this.toolBox.height
                        // );
                        // 判断左右边界
                        if (this.drawImg.x > this.toolBox.x) {
                            this.drawImg.x = this.toolBox.x;
                        }
                        if (this.drawImg.x + this.drawImg.width < this.toolBox.x + this.toolBox.width) {
                            this.drawImg.x = this.toolBox.x + this.toolBox.width - this.drawImg.width;
                        }
                        // 判断上下边界
                        if (this.drawImg.y > this.toolBox.y) {
                            this.drawImg.y = this.toolBox.y;
                        }
                        if (this.drawImg.y + this.drawImg.height < this.toolBox.y + this.toolBox.height) {
                            this.drawImg.y = this.toolBox.y + this.toolBox.height - this.drawImg.height;
                        }
                    }
                    resolve();
                });
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
            dataURLtoFile(dataurl: string, filename: string) {
                //将图片转换为Base64
                let arr = dataurl.split(','),
                    mime = (arr[0].match(/:(.*?);/) as any)[1],
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

                let c = _this.$refs['canvas'] as HTMLCanvasElement;

                let ctx = c.getContext('2d');
                if (ctx) {
                    ctx.clearRect(0, 0, c.width, c.height);
                }
                let c1 = _this.$refs['canvasSelectBox'] as HTMLCanvasElement;

                let ctx1 = c1.getContext('2d');
                if (ctx1) {
                    ctx1.clearRect(0, 0, c1.width, c1.height);
                }
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
                (this.$refs['inputFile'] as HTMLInputElement).value = '';
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
                    } else if ((this.cutImageObj as any).removeNode) {
                        (this.cutImageObj as any).removeNode();
                    }
                }
                this.cutImageObj = null;
            },
            // draw control
            drawControlBox(width: number, height: number, x: number, y: number) {
                // 裁剪框是否能够超出图片
                if (!this.toolBoxOverflow) {
                    // 如果不允许超出图片范围 则也不允许反选
                    if (width < 1) {
                        width = 1;
                    }
                    if (height < 1) {
                        height = 1;
                    }
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
                // 阻止超出裁剪控件边界
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
                let $toolBoxControl = this.$refs['toolBoxControl'] as HTMLElement;

                let c = this.$refs['canvasSelectBox'] as HTMLCanvasElement;

                let ctx = c.getContext('2d');
                if (!ctx) return;

                ctx.fillStyle = this.selectBoxColor;
                ctx.clearRect(0, 0, c.width, c.height);
                ctx.fillRect(0, 0, c.width, c.height);

                let toolBoxControlWidth, toolBoxControlHeight;

                if (this.rate && this.rate !== '') {
                    let p = Number(this.rate.split(':')[0]) / Number(this.rate.split(':')[1]);

                    if (p >= 1) {
                        toolBoxControlWidth = width;
                        toolBoxControlHeight = width / p;
                        if (toolBoxControlHeight + y > this.drawImg.y + this.drawImg.height) {
                            toolBoxControlHeight = this.drawImg.y + this.drawImg.height - y;
                            toolBoxControlWidth = toolBoxControlHeight * p;
                        }
                    } else {
                        toolBoxControlWidth = height * p;
                        toolBoxControlHeight = height;
                    }
                } else {
                    toolBoxControlWidth = width;
                    toolBoxControlHeight = height;
                }
                this.toolBox.width = Math.abs(toolBoxControlWidth);
                this.toolBox.height = Math.abs(toolBoxControlHeight);

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
            toolBoxMouseDown(e: MouseEvent) {
                let $toolBox = this.$refs['toolBoxControl'] as HTMLElement;

                this.toolBox.x = parseInt($toolBox.style.left.split('px')[0]);

                this.toolBox.y = parseInt($toolBox.style.top.split('px')[0]);

                this.toolBox.disable = false;
                this.dropImg.active = false;
                this.toolBox.boxMove.start = {
                    x: e.pageX,
                    y: e.pageY,
                };
            },
            toolBoxMouseMove(e: MouseEvent) {
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
                this.toolBox.x = parseInt(String(this.toolBoxPosition.x));
                this.toolBox.y = parseInt(String(this.toolBoxPosition.y));
                this.toolBox.disable = true;
                this.dropImg.active = false;
                this.resetToolBox();
            },
            // 绘制图片
            printImg() {
                if (this.drawImg.img) {
                    let canv = this.$refs['canvas'] as HTMLCanvasElement;

                    let ctx = canv.getContext('2d');
                    if (!ctx) return;

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
                    try {
                        ctx.drawImage(
                            this.drawImg.img as CanvasImageSource,
                            this.drawImg.sx,
                            this.drawImg.sy,
                            this.drawImg.swidth,
                            this.drawImg.sheight,
                            this.isFlipHorizontal ? -this.drawImg.width : 0,
                            this.isFlipVertically ? -this.drawImg.height : 0,
                            this.drawImg.width,
                            this.drawImg.height
                        );
                    } catch (err: any) {
                        console.error(err);
                        if (this.onPrintImgTimmer) {
                            clearTimeout(this.onPrintImgTimmer);
                        }
                        this.$emit('error', {
                            type: 3,
                            index: this.index,
                            msg: err.toString() || '图片加载失败',
                        });
                        return;
                    }
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
            dropImgOn(e: MouseEvent) {
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
            dropImgMove(e: MouseEvent) {
                if (this.dropImg.active && this.drawImg.img) {
                    let drawImg = { ...this.drawImg };
                    drawImg.x = (this.dropImg.params.x || 0) - (this.dropImg.pageX - e.pageX);
                    drawImg.y = (this.dropImg.params.y || 0) - (this.dropImg.pageY - e.pageY);
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
                    // this.$set(this, 'drawImg', drawImg);
                    this.drawImg = drawImg;
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
            scaleImgWheel(e: any) {
                if (this.drawImg.img && this.scaleAble === true) {
                    let scale;

                    // e是FF的事件。window.event是chrome/ie/opera的事件
                    let ee = e || (window as any).event;

                    if (ee.wheelDelta) {
                        //IE/Opera/Chrome
                        scale = -(ee.wheelDelta / 40);
                    } else if (ee.detail) {
                        //Firefox
                        scale = ee.detail;
                    } else {
                        scale = 0;
                    }

                    let widthLimit = 50;
                    this.drawImg.x =
                        this.drawImg.width - scale * 9 > widthLimit ? this.drawImg.x + scale * 3 : this.drawImg.x;
                    this.drawImg.y =
                        this.drawImg.width - scale * 9 > widthLimit ? this.drawImg.y + scale * 3 : this.drawImg.y;
                    this.drawImg.width =
                        this.drawImg.width - scale * 9 > widthLimit ? this.drawImg.width - scale * 9 : widthLimit;
                    this.drawImg.height = this.drawImg.width / this.scaleImg.rate;

                    this.checkToolBoxOverflow().then(() => {
                        this.printImg();
                        if (this.onPrintImgTimmer) {
                            clearTimeout(this.onPrintImgTimmer);
                        }
                        this.onPrintImgTimmer = setTimeout(() => {
                            this.cropPicture(true);
                        }, 100);
                    });
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
            turnImg(angle: number) {
                let startAngle = this.rotateImg.angle;

                let turnAngle = startAngle + angle;

                if (turnAngle >= -180 && turnAngle <= 180) {
                    this.rotateImg.angle = turnAngle;
                    this.rotateControl.position = (turnAngle / 180) * 100 + 100;
                    this.printImg();
                }
            },
            turnReset() {
                this.rotateImg.angle = 0;
                this.rotateControl.position = 100;
                this.printImg();
            },
            // control box
            controlBtnMouseDown(e: MouseEvent, btnName: string) {
                this.controlBox.disable = false;
                this.controlBox.btnName = btnName;
                this.controlBox.start.x = e.clientX;
                this.controlBox.start.y = e.clientY;
                this.controlBox.start.width = this.toolBox.width;
                this.controlBox.start.height = this.toolBox.height;
                e.stopPropagation();
            },
            controlBtnMouseUp(e: MouseEvent) {
                this.controlBox.disable = true;
                this.dropImgOff();
                this.resetToolBox();
                this.toolBoxMouseUp();
                this.scrollBarControlOff();
                e.stopPropagation();
            },

            controlBtnMouseMove(e: MouseEvent) {
                if (this.controlBox.disable === false) {
                    let offsetX = e.clientX - this.controlBox.start.x;

                    let offsetY = e.clientY - this.controlBox.start.y;

                    let x, y;

                    if (this.controlBox.btnName == 'leftUp') {
                        if (!this.rate) {
                            x = this.toolBox.x + offsetX;
                            y = this.toolBox.y + offsetY;
                        } else {
                            let p = Number(this.rate.split(':')[0]) / Number(this.rate.split(':')[1]);

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
                            let p = Number(this.rate.split(':')[0]) / Number(this.rate.split(':')[1]);

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
                            let p = Number(this.rate.split(':')[0]) / Number(this.rate.split(':')[1]);

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
                    if (x !== undefined && y !== undefined) {
                        this.drawControlBox(this.toolBox.width, this.toolBox.height, x, y);
                    }
                }
                // 旋转
                if (this.rotateControl.active) {
                    this.scrollBarControlMove(e);
                }
                e.stopPropagation();
            },
            changeFileName(fileName: string, type: string) {
                let index = fileName.lastIndexOf('.');

                return fileName.substr(0, index + 1) + (type === 'jpeg' ? 'jpg' : type);
            },
            cropPicture(doNotReset: boolean) {
                let _this = this;

                if (this.drawImg.img) {
                    // get img
                    let canvas = this.$refs['canvas'] as HTMLCanvasElement;

                    // 文字水印
                    if (this.WatermarkText && !doNotReset) {
                        let ctx2 = canvas.getContext('2d');
                        if (ctx2) {
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
                    }

                    let tempImg = new Image();

                    if (this.crossOrigin === true) {
                        tempImg.crossOrigin = this.crossOriginHeader;
                    }
                    tempImg.src = canvas.toDataURL(`image/${this.fileType}`, _this.quality);

                    if (!HTMLCanvasElement.prototype.toBlob) {
                        Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
                            value: (callback: (blob: Blob | null) => void, type: string, quality: number) => {
                                if ((window as any).atob) {
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
                                        } catch (e: any) {
                                            (window as any).BlobBuilder =
                                                (window as any).BlobBuilder ||
                                                (window as any).WebKitBlobBuilder ||
                                                (window as any).MozBlobBuilder ||
                                                (window as any).MSBlobBuilder;
                                            if (e.name == 'TypeError' && (window as any).BlobBuilder) {
                                                const BlobBuilder = (window as any).BlobBuilder;

                                                let bb = new BlobBuilder();

                                                bb.append(arr.buffer);
                                                NewBlob = bb.getBlob(`image/${_this.fileType}`);
                                            }
                                            if (e.name == 'InvalidStateError') {
                                                NewBlob = new Blob([arr.buffer], { type: `image/${_this.fileType}` });
                                            }
                                        }
                                        // TypeError old chrome and FF
                                        callback(NewBlob as Blob);
                                    }, 200);
                                } else {
                                    callback(null);
                                }
                            },
                        });
                    }
                    canvas.toBlob(
                        (blob) => {
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
                                            if (_this.originalGraph == true && _this.drawImg.img) {
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
                                                if (ctx) {
                                                    ctx.translate(-sx, -sy);
                                                    ctx.drawImage(_this.drawImg.img, 0, 0, swidth, sheight);
                                                }
                                            } else {
                                                newCanv.width = _this.toolBox.width;
                                                newCanv.height = _this.toolBox.height;
                                                let params = _this.toolBox;

                                                if (_this.rate && ctx) {
                                                    let p = Number(_this.rate.split(':')[0]) / Number(_this.rate.split(':')[1]);

                                                    let m = Number(_this.rate.split(':')[0]);

                                                    let n = Number(_this.rate.split(':')[1]);

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
                                                } else if (ctx) {
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
                                                                newCanv.toDataURL(
                                                                    `image/${_this.fileType}`,
                                                                    _this.quality
                                                                ),
                                                                fileName
                                                            ),
                                                            dataURL: newCanv.toDataURL(
                                                                `image/${_this.fileType}`,
                                                                _this.quality
                                                            ),
                                                        });
                                                    } else {
                                                        if (_this.previewMode) {
                                                            _this.$emit('onPrintImg', {
                                                                index: _this.index,
                                                                fileName,
                                                                blob: newBlob,
                                                                file: _this.dataURLtoFile(
                                                                    newCanv.toDataURL(
                                                                        `image/${_this.fileType}`,
                                                                        _this.quality
                                                                    ),
                                                                    fileName
                                                                ),
                                                                dataURL: newCanv.toDataURL(
                                                                    `image/${_this.fileType}`,
                                                                    _this.quality
                                                                ),
                                                            });
                                                        }
                                                    }
                                                },
                                                `image/${_this.fileType}`,
                                                _this.quality
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

                                if (_this.rate && ctx) {
                                    let p = Number(_this.rate.split(':')[0]) / Number(_this.rate.split(':')[1]);

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
                                } else if (ctx) {
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
                                        dataURL: newCanv.toDataURL(`image/${_this.fileType}`, _this.quality),
                                    });
                                } else {
                                    _this.$emit('onPrintImg', {
                                        fileName,
                                        dataURL: newCanv.toDataURL(`image/${_this.fileType}`, _this.quality),
                                    });
                                }
                            }
                        },
                        `image/${_this.fileType}`,
                        _this.quality
                    );
                } else {
                    if (!doNotReset) {
                        console.warn('No picture selected');
                        _this.$emit('error', {
                            type: 4,
                            err: 1,
                            msg: 'No picture selected',
                        });
                    }
                }
            },
            scrollBarControlMove(e: MouseEvent) {
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
            scrollBarControlOn(e: MouseEvent) {
                this.rotateControl.active = true;
                this.rotateControl.start.x = e.pageX;
                this.rotateControl.start.y = e.pageY;
                this.rotateControl.start.position = this.rotateControl.position;
            },
            scrollBarControlOff() {
                this.rotateControl.active = false;
            },
        },
    });
</script>
<style scoped>
    @import '../css/style.css';
</style>
