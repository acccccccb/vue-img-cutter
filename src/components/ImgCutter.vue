<template>
  <div>
    <div v-if="showChooseBtn===true && isModal===true" @click="handleOpen">
      <slot name="openImgCutter"></slot>
      <slot name="open"></slot>
    </div>
    <button
      v-if="!hideView && !$slots.openImgCutter && !$slots.open && isModal===true"
      class="btn btn-primary"
      type="button"
      @click="handleOpen">{{ label }}
    </button>
    <transition name="fade">
      <div v-if="visible" ref="mask" :class="isModal===true?'mask vue-img-cutter':''">
        <div v-if="visible" :class="isModal===true?'dialogBoxModal':'dialogBox'">
          <transition
            enter-active-class="fade-in-active"
            enter-class="fade-in-enter"
            leave-active-class="fade-out-active"
            leave-class="fade-out-enter"
            name="fade">
            <div
              ref="dialogMainModalRef"
              :class="isModal===true?'dialogMainModal':'dialogMain'"
              :style="'width:'+(isModal===true?boxWidth+32:boxWidth) + 'px'">
              <div class="toolMain">
                <div v-if="isModal===true" class="tool-title">
                  图片裁剪
                  <span class="closeIcon" @click="handleClose">×</span>
                </div>
                <div
                  ref="toolBox"
                  :style="'height:'+boxHeight+'px;width:'+boxWidth+'px'"
                  class="toolBox"
                  @mouseleave="controlBtnMouseUp"
                  @mousemove="controlBtnMouseMove"
                  @mouseup="controlBtnMouseUp">
                  <!--选取图片-->
                  <div v-show="!drawImg.img && showChooseBtn===true" class="tips">
                    <div class="btn btn-warning btn-xs" @click="chooseImg">{{ label }}</div>
                  </div>
                  <!--工具栏-->
                  <div
                    v-if="tool === true"
                    v-show="this.drawImg.img && dropImg.active!==true && controlBox.disable==true && toolBox.disable==true"
                    :style="'background:'+ this.toolBgc"
                    class="dockMain"
                    @mouseenter="dropImgOff">
                    <div v-if="rate" class="dockBtn">
                      <slot name="ratio">
                        Ratio:
                      </slot>
                      {{ rate }}
                    </div>
                    <div class="dockBtn" @click="scaleReset">
                      <slot name="scaleReset">
                        Scale:
                      </slot>
                      {{ drawImg.swidth > 0 ? (drawImg.width / drawImg.swidth).toFixed(2) : '-' }}
                    </div>
                    <div v-if="originalGraph===false" class="dockBtn" @click="turnImg(-90)">
                      <slot name="turnLeft">
                        ↳
                      </slot>
                    </div>
                    <div v-if="originalGraph===false" class="dockBtn" @click="turnImg(90)">
                      <slot name="turnRight">
                        ↲
                      </slot>
                    </div>
                    <div v-if="originalGraph===false" class="dockBtn" @click="turnReset()">
                      <slot name="reset">
                        ↻
                      </slot>
                    </div>
                    <div v-if="originalGraph===false" class="dockBtnScrollBar">
                      <div
                        ref="dockBtnScrollControl"
                        :style="'left:'+ rotateControl.position + 'px'"
                        class="scrollBarControl"
                        @mousedown="scrollBarControlOn"
                        @mouseleave="scrollBarControlOff"
                        @mousemove="scrollBarControlMove"
                        @mouseup="scrollBarControlOff"></div>
                      <div
                        v-if="rotateControl.active == true"
                        :style="'left:'+ rotateControl.position + 'px'"
                        class="scrollBarText">
                        {{ rotateImg.angle.toFixed(0) + '°' }}
                      </div>
                    </div>
                    <div v-if="originalGraph===false" class="dockBtn" @click="flipHorizontal">
                      <slot name="flipHorizontal">
                        ⇆
                      </slot>
                    </div>
                    <div v-if="originalGraph===false" class="dockBtn" @click="flipVertically">
                      <slot name="turnRight">
                        ⇅
                      </slot>
                    </div>
                  </div>
                  <!--裁剪区域-->
                  <div
                    v-show="drawImg.img!=null"
                    ref="toolBoxControl"
                    class="toolBoxControl"
                    @mousedown="toolBoxMouseDown"
                    @mouseleave="toolBoxMouseLeave"
                    @mousemove="toolBoxMouseMove"
                    @mouseup="toolBoxMouseUp">
                    <div class="toolBoxControlBox">
                      <div class="controlBox">
                        <!--蚂蚁线-->
                        <div class="controlBoxInnerLine controlBoxInnerLineTop"></div>
                        <div class="controlBoxInnerLine controlBoxInnerLineBottom"></div>
                        <div class="controlBoxInnerLine controlBoxInnerLineLeft"></div>
                        <div class="controlBoxInnerLine controlBoxInnerLineRight"></div>
                        <!--工具栏提示-->
                        <div v-if="originalGraph===false" class="selectArea">
                          宽:{{ toolBox.width }} 高:{{ toolBox.height }}
                          (x:{{ toolBoxPosition.x }},y:{{ toolBoxPosition.y }})
                        </div>

                        <!--这里拿到的就是相对于原图的X和Y了-->
                        <!--如果是裁剪原图则显示实际大小-->
                        <div v-if="originalGraph===true" class="selectArea">
                          宽:{{ (toolBox.width / (drawImg.width / drawImg.swidth)).toFixed(0) }}
                          高:{{ (toolBox.height / (drawImg.width / drawImg.swidth)).toFixed(0) }}
                          <!--这里计算出相对于图片的X和Y-->
                          (x:{{
                            ((toolBoxPosition.x - drawImg.x) / (drawImg.width / drawImg.swidth)).toFixed(0)
                          }},y:{{ ((toolBoxPosition.y - drawImg.y) / (drawImg.width / drawImg.swidth)).toFixed(0) }})
                        </div>
                        <!--操作杆-->

                        <div
                          v-if="sizeChange===true"
                          class="leftUp controlBtn"
                          data-name="leftUp"
                          @mousedown="controlBtnMouseDown($event,'leftUp')"></div>
                        <div
                          v-if="sizeChange===true"
                          class="leftDown controlBtn"
                          data-name="leftDown"
                          @mousedown="controlBtnMouseDown($event,'leftDown')"></div>
                        <div
                          v-if="sizeChange===true"
                          class="rightUp controlBtn"
                          data-name="rightUp"
                          @mousedown="controlBtnMouseDown($event,'rightUp')"></div>
                        <div
                          v-if="sizeChange===true"
                          class="rightDown controlBtn"
                          data-name="rightDown"
                          @mousedown="controlBtnMouseDown($event,'rightDown')"></div>

                        <div
                          v-if="sizeChange===true && !rate && this.toolBox.width>20"
                          class="topCenter controlBtn"
                          data-name="topCenter"
                          @mousedown="controlBtnMouseDown($event,'topCenter')"></div>
                        <div
                          v-if="sizeChange===true && !rate && this.toolBox.width>20"
                          class="downCenter controlBtn"
                          data-name="downCenter"
                          @mousedown="controlBtnMouseDown($event,'downCenter')"></div>
                        <div
                          v-if="sizeChange===true && !rate && this.toolBox.height>20"
                          class="leftCenter controlBtn"
                          data-name="leftCenter"
                          @mousedown="controlBtnMouseDown($event,'leftCenter')"></div>
                        <div
                          v-if="sizeChange===true && !rate && this.toolBox.height>20"
                          class="rightCenter controlBtn"
                          data-name="rightCenter"
                          @mousedown="controlBtnMouseDown($event,'rightCenter')"></div>
                      </div>
                      <div class="toolBoxControlLine toolBoxControlLineItem-1"></div>
                      <div class="toolBoxControlLine toolBoxControlLineItem-2"></div>
                      <div class="toolBoxControlLine toolBoxControlLineItem-3"></div>
                      <div class="toolBoxControlLine toolBoxControlLineItem-4"></div>
                    </div>
                  </div>
                  <div class="copyright">
                    <a
                      v-if="!doNotDisplayCopyright"
                      href="https://github.com/acccccccb/vue-img-cutter"
                      rel="nofollow"
                      target="_blank">vue-img-cutter {{ version }}</a>
                  </div>
                  <!--画布-->
                  <canvas
                    ref="canvasSelectBox"
                    :height="boxHeight"
                    :width="boxWidth"
                    class="canvasSelectBox"
                    @mousedown="dropImgOn"
                    @mousemove="dropImgMove"
                    @mouseup="dropImgOff"></canvas>
                  <canvas ref="canvas" :height="boxHeight" :width="boxWidth" class="canvas"></canvas>
                </div>
              </div>
              <div class="i-dialog-footer">
                <input
                  ref="inputFile"
                  accept="image/gif, image/jpeg ,image/png"
                  style="width:1px;height:1px;border:none;opacity: 0;"
                  type="file"
                  @change="putImgToCanv">
                <span @click="chooseImg">
                  <slot name="choose">
                    <div v-if="showChooseBtn===true" class="btn btn-primary btn-primary-plain">{{ label }}</div>
                  </slot>
                </span>
                <div class="btn-group fr">
                  <span @click="handleClose">
                    <slot name="cancel">
                      <button class="btn btn-default" type="button">取消</button>
                    </slot>
                  </span>
                  <span @click="cropPicture(false)">
                    <slot name="confirm">
                      <button
                        :disabled="!drawImg.img"
                        class="btn btn-primary"
                        style="margin-left:15px;"
                        type="button">确定</button>
                    </slot>
                  </span>
                </div>
              </div>
            </div>
          </transition>
          <div style="clear:both;"></div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>

export default {
  name: 'ImgCutter',
  props: {
    hideView: {// 是否隐藏选择图片的button
      type: Boolean,
      default: true,
      required: false
    },
    crossOrigin: {// 是否设置图片跨域
      type: Boolean,
      default: false,
      required: false
    },
    crossOriginHeader: {// 是否设置图片跨域
      type: String,
      default: '*',
      required: false
    },
    label: { // 按钮文字
      type: String,
      default: '选择图片',
      required: false
    },
    isModal: { // 是否已弹窗形式展示
      type: Boolean,
      default: true,
      required: false
    },
    lockScroll: { // 是否在弹窗出现时锁定body
      type: Boolean,
      default: true,
      required: false
    },
    showChooseBtn: { // 是否显示选择图片按钮 如果需要兼容IE9 则将此参数改为false
      type: Boolean,
      default: true,
      required: false
    },
    boxWidth: { // 裁剪窗口高度
      type: Number,
      default: 800,
      required: false
    },
    boxHeight: { // 裁剪窗口高度
      type: Number,
      default: 400,
      required: false
    },
    cutWidth: { // 默认裁剪宽度
      type: Number,
      default: 200,
      required: false
    },
    cutHeight: { // 默认裁剪高度
      type: Number,
      default: 200,
      required: false
    },
    cutX: { // 默认裁剪位置X坐标
      type: Number,
      default: 200,
      required: false
    },
    cutY: { // 默认裁剪位置Y坐标
      type: Number,
      default: 200,
      required: false
    },
    rate: { // 按比例裁剪
      type: String,
      default: null,
      required: false
    },
    tool: { // 是否显示工具栏
      type: Boolean,
      default: true,
      required: false
    },
    toolBgc: {// 工具栏背景色
      type: String,
      default: '#fff',
      required: false
    },
    sizeChange: { // 能否调整裁剪尺寸
      type: Boolean,
      default: true,
      required: false
    },
    originalGraph: { // 是否为原图裁剪
      type: Boolean,
      default: false,
      required: false
    },
    moveAble: { // 能否调整裁剪区域位置
      type: Boolean,
      default: true,
      required: false
    },
    // 水印文字
    watermarkText: {
      type: String,
      default: '',
      required: false
    },
    watermarkTextFont: {
      type: String,
      default: '12px Sans-serif',
      required: false
    },
    watermarkTextColor: {
      type: String,
      default: '#fff',
      required: false
    },
    watermarkTextX: {
      type: Number,
      default: 0.95,
      required: false
    },
    watermarkTextY: {
      type: Number,
      default: 0.95,
      required: false
    },
    smallToUpload: { // 选择的图片宽高均小于裁剪宽高度时候直接上传原图
      type: Boolean,
      default: false,
      required: false
    },
    saveCutPosition: { // 是否保存上一次裁剪位置
      type: Boolean,
      default: false,
      required: false
    },
    scaleAble: { // 是否允许缩放图片
      type: Boolean,
      default: true,
      required: false
    },
    doNotDisplayCopyright: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  model: ['label', 'boxWidth', 'boxHeight', 'rate', 'tool', 'doNotDisplayCopyright'],
  data () {
    const toolBoxWidth = this.boxWidth / 2
    const toolBoxHeight = this.boxHeight / 2
    return {
      version: '',
      visible: false,
      fileName: '',
      cutImageObj: null,
      onPrintImgTimmer: null,
      toolBoxPosition: {
        x: 0,
        y: 0
      },
      drawImg: {
        img: null, // 规定要使用的图像、画布或视频
        sx: 0, // 开始剪切的 x 坐标位置
        sy: 0, // 开始剪切的 y 坐标位置
        swidth: 0, // 被剪切图像的宽度
        sheight: 0, // 被剪切图像的高度
        x: 0, // 在画布上放置图像的 x 坐标位置
        y: 0, // 在画布上放置图像的 y 坐标位置
        width: 0, // 要使用的图像的宽度
        height: 0// 要使用的图像的高度
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
            y: 0
          },
          moveTo: {
            x: 0,
            y: 0
          }
        }
      },
      dropImg: {
        active: false,
        pageX: 0,
        pageY: 0,
        params: {}
      },
      // 旋转
      rotateImg: {
        angle: 0
      },
      rotateControl: {
        active: false,
        start: {
          x: 0,
          y: 0
        },
        position: 100
      },
      // 缩放
      scaleImg: {
        rate: 0,
        params: {}
      },
      controlBox: {
        disable: true,
        btnName: '',
        start: {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        }
      },
      selectBox: false,
      selectBoxColor: 'rgba(0,0,0,0.6)',
      isFlipHorizontal: false, // 是否水平翻转
      isFlipVertically: false// 是否垂直翻转
    }
  },
  mounted () {
    this.version = '1.0'
    // 是否为弹窗模式
    if (this.isModal === false) {
      this.visible = true
      this.$nextTick(() => {
        this.$refs['toolBox'].onmousewheel = this.scaleImgWheel
        this.$refs['toolBox'].addEventListener('DOMMouseScroll', this.scaleImgWheel)
      })
    }
  },
  methods: {
    handleOpen: function (img) {
      const init = (callback) => {
        this.$refs['toolBox'].onmousewheel = this.scaleImgWheel
        this.$refs['toolBox'].addEventListener('DOMMouseScroll', this.scaleImgWheel)
        // 判断下窗口高度
        if (this.isModal === true) {
          if (this.lockScroll === true) {
            document.body.style.overflowY = 'hidden'
          }
          const dialogBoxHeight = this.$refs['dialogMainModalRef'].offsetHeight + 200
          const windowHeight = window.innerHeight
          const mask = this.$refs['mask']
          if (dialogBoxHeight > windowHeight) {
            mask.style.overflowY = 'scroll'
          } else {
            mask.style.overflowY = 'hidden'
          }
        }
        if (callback && typeof callback === 'function') {
          callback()
        }
      }

      // 如果传入了图片
      if (img && typeof img === 'object' && img.src) {
        if (img.name) {
          const $image = new Image()
          if (this.crossOrigin === true) {
            $image.crossOrigin = this.crossOriginHeader
          }
          $image.name = img.name
          // $image.width = img.width;
          // $image.height = img.height;
          // $image.style.width = '1px';
          // $image.style.height = '1px';
          $image.style.position = 'fixed'
          $image.style.top = -5000
          $image.style.opacity = 0
          $image.onerror = (e) => {
            console.error('图片加载失败')
            this.$emit('error', {
              event: e,
              msg: '图片加载失败'
            })
            this.clearCutImageObj()
          }
          $image.onload = () => {
            if ($image.complete === true) {
              this.visible = true
              this.$nextTick(() => {
                init(() => {
                  this.importImgToCanv($image)
                })
              })
            } else {
              this.handleClose()``
              throw new Error('图片加载失败')
            }
          }
          $image.src = img.src
          this.cutImageObj = $image
          document.body.appendChild($image)
          this.$emit('onChooseImg', img)
        } else {
          throw new Error('传入参数必须包含：src,name')
        }
      } else {
        this.visible = true
        this.$nextTick(() => {
          init()
        })
      }
    },
    handleClose: function () {
      this.clearAll()
      if (this.isModal === true) {
        if (this.lockScroll === true) {
          document.body.style.overflowY = 'scroll'
        }
        this.$nextTick(() => {
          this.visible = false
        })
      }
    },
    // 选择图片 e.stopPropagation();
    chooseImg: function () {
      this.$refs['inputFile'].click()
    },
    // handleOpen时导入图片
    importImgToCanv: function (img) {
      this.fileName = img.name
      const imgHeight = img.height
      const imgWidth = img.width
      const boxWidth = this.boxWidth
      const boxHeight = this.boxHeight
      let rate
      const drawImg = { ...this.drawImg }
      drawImg.img = img
      this.scaleImg.rate = imgWidth / imgHeight // 缩放时用到此参数
      if (imgHeight < boxHeight && imgWidth < boxWidth) {
        rate = 1
        drawImg.x = (boxWidth - imgWidth) / 2
        drawImg.y = (boxHeight - imgHeight) / 2
      } else {
        if (imgWidth / imgHeight <= boxWidth / boxHeight) { // 计算宽高比
          rate = boxHeight / imgHeight
          drawImg.x = (boxWidth - imgWidth * rate) / 2
        } else {
          rate = boxWidth / imgWidth
          drawImg.y = (boxHeight - imgHeight * rate) / 2
        }
      }
      drawImg.swidth = imgWidth
      drawImg.sheight = imgHeight
      drawImg.width = imgWidth * rate
      drawImg.height = imgHeight * rate
      drawImg.x = (boxWidth - drawImg.width) / 2
      drawImg.y = (boxHeight - drawImg.height) / 2
      // drawImg.sx = config.x
      // drawImg.sy = config.y
      this.$set(this, 'drawImg', drawImg)
      this.printImg()
      this.putToolBox()
    },
    // 将选择的图片绘制到画布
    putImgToCanv: function (e) {
      let file
      if (e.target.files) {
        file = e.target.files[0] || null
      } else {
        // 如果是IE9及以下
        console.error('IE9及以下需要自己传入image对象')
        // this.$emit('importImage',e);
        return false
      }
      if (file) {
        this.fileName = file.name
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
          // 图片base64化
          const newUrl = e.target.result
          const img = document.createElement('img')
          img.src = newUrl
          const timmer = setInterval(() => {
            if (reader.readyState === 2) {
              clearInterval(timmer)
              if (!this.sizeChange && this.smallToUpload && img.width <= this.cutWidth && img.height <=
                this.cutHeight) {
                this.handleClose()
                this.$emit('cutDown', {
                  filename: file.name,
                  file: file
                })
                return
              }
              const imgHeight = img.height
              const imgWidth = img.width

              const boxWidth = this.boxWidth
              const boxHeight = this.boxHeight
              let rate
              const drawImg = { ...this.drawImg }
              drawImg.img = img
              this.scaleImg.rate = imgWidth / imgHeight // 缩放时用到此参数
              if (imgHeight < boxHeight && imgWidth < boxWidth) {
                rate = 1
                drawImg.x = (boxWidth - imgWidth) / 2
                drawImg.y = (boxHeight - imgHeight) / 2
              } else {
                if (imgWidth / imgHeight <= boxWidth / boxHeight) { // 计算宽高比
                  rate = boxHeight / imgHeight
                  drawImg.x = (boxWidth - imgWidth * rate) / 2
                } else {
                  rate = boxWidth / imgWidth
                  drawImg.y = (boxHeight - imgHeight * rate) / 2
                }
              }
              drawImg.swidth = imgWidth
              drawImg.sheight = imgHeight
              drawImg.width = imgWidth * rate
              drawImg.height = imgHeight * rate
              drawImg.x = (boxWidth - drawImg.width) / 2
              drawImg.y = (boxHeight - drawImg.height) / 2
              this.$set(this, 'drawImg', drawImg)
              this.printImg()
              this.putToolBox()
            }
          }, 200)
        }
        this.$emit('onChooseImg', file)
      }
    },
    putToolBox: function () {
      const scale = this.drawImg.width / this.drawImg.swidth
      const cutWidth = this.cutWidth * scale
      const cutHeight = this.cutHeight * scale
      if ((this.toolBox.width === this.boxWidth / 2 || this.toolBox.height === this.boxHeight / 2) ||
        this.saveCutPosition === false) {
        this.toolBox.width = cutWidth > this.boxWidth ? this.boxWidth : cutWidth
        this.toolBox.height = cutHeight > this.boxHeight ? this.boxHeight : cutHeight
      }
      if ((this.toolBox.x === 0 && this.toolBox.y === 0) || this.saveCutPosition === false) {
        // this.toolBox.x = this.boxWidth / 2 - this.toolBox.width / 2
        // this.toolBox.y = this.boxHeight / 2 - this.toolBox.height / 2

        this.toolBox.x = this.cutX * scale + this.drawImg.x
        this.toolBox.y = this.cutY * scale + this.drawImg.y
      }
      this.toolBoxPosition.x = this.cutX * scale + this.drawImg.x
      this.toolBoxPosition.y = this.cutY * scale + this.drawImg.y
      this.drawControlBox(this.toolBox.width, this.toolBox.height, this.toolBox.x, this.toolBox.y)
    },
    isSupportFileApi: function () {
      if (window.File && window.FileList && window.FileReader && window.Blob && navigator.userAgent.indexOf('Edge') ===
        -1 && navigator.userAgent.indexOf('MSIE') === -1 && navigator.userAgent.indexOf('Trident') === -1) {
        return true
      } else {
        return false
      }
    },
    dataURLtoFile: function (dataurl, filename) { // 将图片转换为Base64
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      if (this.isSupportFileApi()) {
        const file = new File([u8arr], filename, { type: mime })
        return file
      } else {
        return '不支持File对象'
      }
    },
    // clear both
    clearAll: function () {
      const c = this.$refs['canvas']
      const ctx = c.getContext('2d')
      ctx.clearRect(0, 0, c.width, c.height)
      const c1 = this.$refs['canvasSelectBox']
      const ctx1 = c1.getContext('2d')
      ctx1.clearRect(0, 0, c1.width, c1.height)
      const sx = this.drawImg.sx
      const sy = this.drawImg.sy
      this.drawImg = {
        img: null, // 规定要使用的图像、画布或视频
        sx: sx, // 开始剪切的 x 坐标位置
        sy: sy, // 开始剪切的 y 坐标位置
        swidth: 0, // 被剪切图像的宽度
        sheight: 0, // 被剪切图像的高度
        x: 0, // 在画布上放置图像的 x 坐标位置
        y: 0, // 在画布上放置图像的 y 坐标位置
        width: 0, // 要使用的图像的宽度
        height: 0// 要使用的图像的高度
      }
      this.isFlipHorizontal = false
      this.isFlipVertically = false
      this.$refs['inputFile'].value = ''
      this.rotateImg.angle = 0
      this.drawImg.img = null
      this.turnReset()
      this.clearCutImageObj()
      this.$emit('onClearAll')
    },
    clearCutImageObj: function () {
      if (this.cutImageObj !== null && this.cutImageObj !== undefined) {
        if (typeof this.cutImageObj.remove === 'function') {
          this.cutImageObj.remove()
        } else {
          this.cutImageObj.removeNode()
        }
      }
      this.cutImageObj = null
    },
    // draw control
    drawControlBox: function (width, height, x, y) {
      if (width > this.boxWidth) {
        width = this.boxWidth
      }
      if (height > this.boxHeight) {
        height = this.boxHeight
      }
      if (x < 0) {
        x = 0
      }
      if (y < 0) {
        y = 0
      }

      const $toolBoxControl = this.$refs['toolBoxControl']

      const c = this.$refs['canvasSelectBox']
      const ctx = c.getContext('2d')
      ctx.fillStyle = this.selectBoxColor
      ctx.clearRect(0, 0, c.width, c.height)
      ctx.fillRect(0, 0, c.width, c.height)

      let toolBoxControlWidth, toolBoxControlHeight
      if (this.rate && this.rate !== '') {
        const p = this.rate.split(':')[0] / this.rate.split(':')[1]
        if (p >= 1) {
          toolBoxControlWidth = width
          toolBoxControlHeight = width / p
        } else {
          toolBoxControlWidth = height * p
          toolBoxControlHeight = height
        }
      } else {
        toolBoxControlWidth = width
        toolBoxControlHeight = height
      }
      this.toolBox.width = toolBoxControlWidth
      this.toolBox.height = toolBoxControlHeight

      $toolBoxControl.style.width = Math.abs(toolBoxControlWidth) + 'px'
      $toolBoxControl.style.height = Math.abs(toolBoxControlHeight) + 'px'

      this.toolBox.boxMove.moveTo.x = x
      this.toolBox.boxMove.moveTo.y = y

      if (toolBoxControlWidth < 0) {
        x = x + toolBoxControlWidth
      }
      if (toolBoxControlHeight < 0) {
        y = y + toolBoxControlHeight
      }
      if (x + this.toolBox.width > this.boxWidth) {
        x = this.boxWidth - this.toolBox.width
      }
      if (x < 0) {
        x = 0
      }
      if (y + this.toolBox.height > this.boxHeight) {
        y = this.boxHeight - this.toolBox.height
      }
      if (y < 0) {
        y = 0
      }
      this.toolBoxPosition.x = x
      this.toolBoxPosition.y = y

      $toolBoxControl.style.left = x + 'px'
      $toolBoxControl.style.top = y + 'px'

      ctx.clearRect(x, y, Math.abs(toolBoxControlWidth), Math.abs(toolBoxControlHeight))
      if (this.onPrintImgTimmer) {
        clearTimeout(this.onPrintImgTimmer)
      }
      this.onPrintImgTimmer = setTimeout(() => {
        this.cropPicture(true)
      }, 100)
    },

    resetToolBox: function () {
      if (this.toolBox.width < 0) {
        this.toolBox.boxMove.moveTo.x = this.toolBox.x - this.toolBox.width
      }
      if (this.toolBox.height < 0) {
        this.toolBox.boxMove.moveTo.y = this.toolBox.y - this.toolBox.height
      }
      this.toolBox.width = Math.abs(this.toolBox.width)
      this.toolBox.height = Math.abs(this.toolBox.height)
    },
    // toolBoxMouseDown
    toolBoxMouseDown: function (e) {
      const $toolBox = this.$refs['toolBoxControl']
      this.toolBox.x = parseInt($toolBox.style.left.split('px')[0])
      this.toolBox.y = parseInt($toolBox.style.top.split('px')[0])
      this.toolBox.disable = false
      this.dropImg.active = false
      this.toolBox.boxMove.start = {
        x: e.pageX,
        y: e.pageY
      }
    },
    toolBoxMouseMove: function (e) {
      // console.log('drawImg', this.drawImg)
      if (this.dropImg.active) {
        this.dropImgMove(e)
      }
      if (this.toolBox.disable === false && this.moveAble === true) {
        const offsetX = e.pageX - this.toolBox.boxMove.start.x
        const offsetY = e.pageY - this.toolBox.boxMove.start.y
        const x = this.toolBox.x + offsetX
        const y = this.toolBox.y + offsetY
        this.drawControlBox(this.toolBox.width, this.toolBox.height, x, y)
      }
    },
    toolBoxMouseLeave: function () {
      this.toolBox.disable = true
      if (this.onPrintImgTimmer) {
        clearTimeout(this.onPrintImgTimmer)
      }
      this.onPrintImgTimmer = setTimeout(() => {
        this.cropPicture(true)
      }, 100)
      this.resetToolBox()
    },
    toolBoxMouseUp: function (e) {
      this.toolBox.x = parseInt(this.toolBoxPosition.x)
      this.toolBox.y = parseInt(this.toolBoxPosition.y)
      this.toolBox.disable = true
      this.dropImg.active = false
      this.resetToolBox()
    },
    // 绘制图片
    printImg: function () {
      if (this.drawImg.img) {
        const canv = this.$refs['canvas']
        const ctx = canv.getContext('2d')
        // 文字水印
        ctx.font = '18px bold 黑体'
        ctx.fillStyle = '#ff0'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        ctx.save()
        ctx.clearRect(0, 0, canv.width, canv.height)
        ctx.translate(this.drawImg.x + this.drawImg.width / 2, this.drawImg.y + this.drawImg.height / 2)
        ctx.rotate((this.rotateImg.angle) * Math.PI / 180)
        ctx.translate(-(this.drawImg.x + this.drawImg.width / 2), -(this.drawImg.y + this.drawImg.height / 2))
        ctx.translate(this.drawImg.x, this.drawImg.y)
        ctx.scale(this.isFlipHorizontal ? -1 : 1, this.isFlipVertically ? -1 : 1)
        ctx.drawImage(this.drawImg.img, this.drawImg.sx, this.drawImg.sy, this.drawImg.swidth, this.drawImg.sheight,
          this.isFlipHorizontal ? -this.drawImg.width : 0, this.isFlipVertically ? -this.drawImg.height : 0,
          this.drawImg.width, this.drawImg.height)
        ctx.translate(-this.drawImg.x, this.drawImg.y)

        ctx.restore()
        if (this.onPrintImgTimmer) {
          clearTimeout(this.onPrintImgTimmer)
        }
        this.onPrintImgTimmer = setTimeout(() => {
          this.cropPicture(true)
        }, 100)
      }
    },
    // 拖动图片
    dropImgOn: function (e) {
      this.dropImg.active = true
      this.dropImg.params = { ...this.drawImg }
      this.dropImg.pageX = e.pageX
      this.dropImg.pageY = e.pageY
    },
    dropImgOff: function () {
      this.dropImg.active = false
      if (this.onPrintImgTimmer) {
        clearTimeout(this.onPrintImgTimmer)
      }
      this.onPrintImgTimmer = setTimeout(() => {
        this.cropPicture(true)
      }, 100)
    },
    dropImgMove: function (e) {
      if (this.dropImg.active && this.drawImg.img) {
        const drawImg = { ...this.drawImg }
        drawImg.x = this.dropImg.params.x - (this.dropImg.pageX - e.pageX)
        drawImg.y = this.dropImg.params.y - (this.dropImg.pageY - e.pageY)
        this.$set(this, 'drawImg', drawImg)
        this.printImg()
        e.stopPropagation()
      }
    },
    // 缩放
    scaleReset: function () {
      this.drawImg.width = this.drawImg.swidth
      this.drawImg.height = this.drawImg.sheight
      this.printImg()
    },
    scaleImgWheel: function (e) {
      if (this.drawImg.img && this.scaleAble === true) {
        let scale
        // e是FF的事件。window.event是chrome/ie/opera的事件
        const ee = e || window.event
        if (ee.wheelDelta) { // IE/Opera/Chrome
          scale = -(ee.wheelDelta / 40)
        } else if (ee.detail) { // Firefox
          scale = ee.detail
        }
        const widthLimit = 50
        this.drawImg.x = (this.drawImg.width - scale * 9) > widthLimit
          ? this.drawImg.x + scale * 3
          : this.drawImg.x
        this.drawImg.y = (this.drawImg.width - scale * 9) > widthLimit
          ? this.drawImg.y + scale * 3
          : this.drawImg.y
        this.drawImg.width = (this.drawImg.width - scale * 9) > widthLimit
          ? this.drawImg.width - scale * 9
          : widthLimit
        this.drawImg.height = this.drawImg.width / this.scaleImg.rate
        this.printImg()
        if (this.onPrintImgTimmer) {
          clearTimeout(this.onPrintImgTimmer)
        }
        this.onPrintImgTimmer = setTimeout(() => {
          this.cropPicture(true)
        }, 100)
      }
      // let scrollTop = this.$refs['mask'].scrollTop;
      // window.scrollTo(this.$refs['mask'].scrollLeft,scrollTop);
      e.preventDefault()
      e.returnValue = false
      return false
    },
    // 水平翻转
    flipHorizontal: function () {
      if (this.drawImg.img) {
        if (this.isFlipHorizontal === false) {
          this.isFlipHorizontal = true
        } else {
          this.isFlipHorizontal = false
        }
        this.printImg()
      }
    },
    // 垂直翻转
    flipVertically: function () {
      if (this.drawImg.img) {
        if (this.isFlipVertically === false) {
          this.isFlipVertically = true
        } else {
          this.isFlipVertically = false
        }
        this.printImg()
      }
    },
    // 旋转
    turnImg: function (angle) {
      const startAngle = this.rotateImg.angle
      const turnAngle = startAngle + angle
      if (turnAngle >= -180 && turnAngle <= 180) {
        this.rotateImg.angle = turnAngle
        this.rotateControl.position = turnAngle / 180 * 100 + 100
        this.printImg('rotate')
      }
    },
    turnReset: function () {
      this.rotateImg.angle = 0
      this.rotateControl.position = 100
      this.printImg('rotate')
    },
    // control box
    controlBtnMouseDown: function (e, btnName) {
      this.controlBox.disable = false
      this.controlBox.btnName = btnName
      this.controlBox.start.x = e.clientX
      this.controlBox.start.y = e.clientY
      this.controlBox.start.width = this.toolBox.width
      this.controlBox.start.height = this.toolBox.height
      e.stopPropagation()
    },
    controlBtnMouseUp: function (e) {
      this.controlBox.disable = true
      this.dropImgOff()
      this.resetToolBox()
      this.toolBoxMouseUp()
      e.stopPropagation()
    },

    controlBtnMouseMove: function (e) {
      if (this.controlBox.disable === false) {
        const offsetX = e.clientX - this.controlBox.start.x
        const offsetY = e.clientY - this.controlBox.start.y
        let x, y
        if (this.controlBox.btnName === 'leftUp') {
          x = this.toolBox.x + offsetX
          y = this.toolBox.y + offsetY
          this.toolBox.width = this.controlBox.start.width - offsetX
          this.toolBox.height = this.controlBox.start.height - offsetY
        }
        if (this.controlBox.btnName === 'rightUp') {
          x = this.toolBox.x
          y = this.toolBox.y + offsetY
          this.toolBox.width = this.controlBox.start.width + offsetX
          this.toolBox.height = this.controlBox.start.height - offsetY
        }
        if (this.controlBox.btnName === 'rightDown') {
          x = this.toolBox.x
          y = this.toolBox.y
          this.toolBox.width = this.controlBox.start.width + offsetX
          this.toolBox.height = this.controlBox.start.height + offsetY
        }
        if (this.controlBox.btnName === 'leftDown') {
          x = this.toolBox.x + offsetX
          y = this.toolBox.y
          this.toolBox.width = this.controlBox.start.width - offsetX
          this.toolBox.height = this.controlBox.start.height + offsetY
        }
        if (this.controlBox.btnName === 'topCenter') {
          x = this.toolBox.x
          y = this.toolBox.y + offsetY
          this.toolBox.width = this.controlBox.start.width
          this.toolBox.height = this.controlBox.start.height - offsetY
        }
        if (this.controlBox.btnName === 'downCenter') {
          x = this.toolBox.x
          y = this.toolBox.y
          this.toolBox.width = this.controlBox.start.width
          this.toolBox.height = this.controlBox.start.height + offsetY
        }
        if (this.controlBox.btnName === 'leftCenter') {
          x = this.toolBox.x + offsetX
          y = this.toolBox.y
          this.toolBox.width = this.controlBox.start.width - offsetX
          this.toolBox.height = this.controlBox.start.height
        }
        if (this.controlBox.btnName === 'rightCenter') {
          x = this.toolBox.x
          y = this.toolBox.y
          this.toolBox.width = this.controlBox.start.width + offsetX
          this.toolBox.height = this.controlBox.start.height
        }
        this.drawControlBox(this.toolBox.width, this.toolBox.height, x, y)
      }
      e.stopPropagation()
    },
    cropPicture: function (doNotReset) {
      const scale = this.drawImg.width / this.drawImg.swidth
      // 剪裁出来的图片相对于原图左上角的offset和大小
      const cropInfo = {
        offsetX: ((this.toolBoxPosition.x - this.drawImg.x) / scale).toFixed(0),
        offsetY: ((this.toolBoxPosition.y - this.drawImg.y) / scale).toFixed(0),
        width: (this.toolBox.width / scale).toFixed(0),
        height: (this.toolBox.height / scale).toFixed(0)
      }
      if (this.drawImg.img) {
        // get img
        const canvas = this.$refs['canvas']

        // 文字水印
        if (this.WatermarkText && !doNotReset) {
          const ctx2 = canvas.getContext('2d')
          ctx2.font = this.WatermarkTextFont
          ctx2.fillStyle = this.WatermarkTextColor
          ctx2.textAlign = 'right'
          ctx2.textBaseline = 'bottom'
          ctx2.fillText(this.WatermarkText, this.toolBox.x + (this.toolBox.width * this.WatermarkTextX),
            this.toolBox.y + (this.toolBox.height * this.WatermarkTextY))
        }

        const tempImg = new Image()
        if (this.crossOrigin === true) {
          tempImg.crossOrigin = this.crossOriginHeader
        }
        tempImg.src = canvas.toDataURL()

        if (!HTMLCanvasElement.prototype.toBlob) {
          Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
            value: (callback, type, quality) => {
              // callback(1,2,3);
              if (window.atob) {
                setTimeout(() => {
                  const binStr = atob(canvas.toDataURL(type, quality).split(',')[1])
                  const len = binStr.length
                  const arr = new Uint8Array(len)
                  for (var i = 0; i < len; i++) {
                    arr[i] = binStr.charCodeAt(i)
                  }
                  callback(new Blob([arr], { type: type || 'image/png' }))
                }, 200)
              } else {
                // eslint-disable-next-line standard/no-callback-literal
                callback(false, { type: 'image/png' })
              }
            }
          })
        }
        canvas.toBlob((blob) => {
          if (blob) {
            const reader = new FileReader()
            reader.readAsDataURL(blob)
            reader.onload = () => {
              const timmer = setInterval(() => {
                if (reader.readyState === 2) {
                  clearInterval(timmer)
                  const newCanv = document.createElement('canvas')
                  const ctx = newCanv.getContext('2d')

                  // 原图裁剪 originalGraph
                  if (this.originalGraph === true) {
                    // 计算实际图像大小
                    const transWidth = this.toolBox.width / scale
                    const transHeight = this.toolBox.height / scale
                    newCanv.width = transWidth
                    newCanv.height = transHeight
                    // 重新计算裁剪坐标
                    const sx = (this.toolBox.x - this.drawImg.x) / scale
                    const sy = (this.toolBox.y - this.drawImg.y) / scale

                    const swidth = this.drawImg.swidth
                    const sheight = this.drawImg.sheight
                    // TODO 使原图裁剪支持旋转后的图像
                    // ctx.translate(sx + transWidth/2, sy + transHeight/2);
                    // ctx.rotate((this.rotateImg.angle) * Math.PI / 180);
                    // ctx.translate(-(sx + transWidth/2), -(sy + transHeight/2));
                    ctx.translate(-sx, -sy)
                    ctx.drawImage(this.drawImg.img, 0, 0, swidth, sheight)
                  } else {
                    newCanv.width = this.toolBox.width
                    newCanv.height = this.toolBox.height
                    const params = this.toolBox
                    if (this.rate) {
                      const p = this.rate.split(':')[0] / this.rate.split(':')[1]
                      const m = this.rate.split(':')[0]
                      const n = this.rate.split(':')[1]
                      if (m >= n) {
                        ctx.drawImage(tempImg, params.x, params.y, params.width, params.width * p, 0, 0, params.width,
                          params.width * p)
                      } else {
                        ctx.drawImage(tempImg, params.x, params.y, params.width, params.width / p, 0, 0, params.width,
                          params.width / p)
                      }
                    } else {
                      ctx.drawImage(tempImg, params.x, params.y, params.width, params.height, 0, 0, params.width,
                        params.height)
                    }
                  }
                  newCanv.toBlob((blob) => {
                    if (!doNotReset) {
                      this.handleClose()
                      this.$emit('cutDown', {
                        fileName: this.fileName,
                        blob: blob,
                        file: this.dataURLtoFile(newCanv.toDataURL(), this.fileName),
                        dataURL: newCanv.toDataURL(),
                        cropInfo: cropInfo
                      })
                    } else {
                      this.$emit('onPrintImg', {
                        fileName: this.fileName,
                        blob: blob,
                        file: this.dataURLtoFile(newCanv.toDataURL(), this.fileName),
                        dataURL: newCanv.toDataURL()
                      })
                    }
                  }, 'image/jpeg', 0.95)
                }
              }, 200)
            }
          } else {
            // IE9及以下
            const newCanv = document.createElement('canvas')
            newCanv.width = this.toolBox.width
            newCanv.height = this.toolBox.height
            const ctx = newCanv.getContext('2d')
            const params = this.toolBox
            if (this.rate) {
              const p = this.rate.split(':')[0] / this.rate.split(':')[1]
              ctx.drawImage(tempImg, params.x, params.y, params.width, params.width * p, 0, 0, params.width,
                params.width * p)
            } else {
              ctx.drawImage(tempImg, params.x, params.y, params.width, params.height, 0, 0, params.width,
                params.height)
            }
            if (!doNotReset) {
              this.handleClose()
              this.$emit('cutDown', {
                fileName: this.fileName,
                dataURL: newCanv.toDataURL(),
                cropInfo: cropInfo
              })
            } else {
              this.$emit('onPrintImg', {
                fileName: this.fileName,
                dataURL: newCanv.toDataURL()
              })
            }
          }
        })
      } else {
        if (!doNotReset) {
          console.warn('No picture selected')
          this.$emit('error', {
            err: 1,
            msg: 'No picture selected'
          })
        }
      }
    },
    scrollBarControlMove: function (e) {
      if (this.rotateControl.active) {
        const offsetX = e.pageX - this.rotateControl.start.x
        //                let rotate = this.rotateImg.angle/360*100 + offsetX/100*100;
        let position = this.rotateControl.start.position + offsetX
        if (position <= 0) {
          position = 0
        }
        if (position >= 200) {
          position = 200
        }
        this.rotateControl.position = position
        this.rotateImg.angle = (position - 100) / 100 * 180
        this.printImg()
      }
    },
    scrollBarControlOn: function (e) {
      this.rotateControl.active = true
      this.rotateControl.start.x = e.pageX
      this.rotateControl.start.y = e.pageY
      this.rotateControl.start.position = this.rotateControl.position
    },
    scrollBarControlOff: function () {
      this.rotateControl.active = false
    }
  }
}
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
  animation: dialogShow .3s;
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
  background-image: linear-gradient(45deg, rgba(0, 0, 0, .25) 25%, transparent 0, transparent 75%, rgba(0, 0, 0, .25) 0),
  linear-gradient(45deg, rgba(0, 0, 0, .25) 25%, transparent 0, transparent 75%, rgba(0, 0, 0, .25) 0);
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
  background-image: linear-gradient(-45deg, rgba(64, 158, 255, 1) 25%, rgba(64, 158, 255, 0) 25%, rgba(64, 158, 255, 0) 50%, rgba(64, 158, 255, 1) 50%, rgba(64, 158, 255, 1) 75%, rgba(64, 158, 255, 0) 75%, rgba(64, 158, 255, 0));
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
  border-bottom: 1px dashed #409EFF;
}

.toolBoxControlLineItem-2 {
  top: 66%;
  width: 100%;
  height: 1px;
  box-sizing: border-box;
  border-bottom: 1px dashed #409EFF;
}

.toolBoxControlLineItem-3 {
  left: 33%;
  border-right: 1px dashed #409EFF;
  height: 100%;
  width: 1px;
  box-sizing: border-box;
}

.toolBoxControlLineItem-4 {
  left: 66%;
  border-right: 1px dashed #409EFF;
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
  background: #409EFF;
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
  transition: background .3s, color .3s;
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
  border-color: #DCDFE6;
  background-color: #fff;
  transition: background .3s, color .3s;
}

.btn-default:hover {
  color: #409EFF;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

.btn-primary {
  color: #fff;
  background-color: #409EFF;
  border-color: #409EFF;
  transition: background .3s, color .3s;
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
  transition: background .3s, color .3s;
}

.btn-primary-plain {
  color: #409EFF;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
  transition: background .3s, color .3s;
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
  font-size: 12px;
}

.dialog-footer {
  float: right;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
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
  color: #C0C4CC;
}

.toolbar-item {
  display: inline-block;
}

.closeIcon {
  float: right;
  cursor: pointer;
  display: inline-block;
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
  color: #409EFF;
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
  background-color: #409EFF;
  border-color: #409EFF;
}

/* 旋转进度条 */
.dockBtnScrollBar {
  display: inline-block;
  margin-right: 4px;
  margin-left: 10px;
  background: #409EFF;
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
  border: 2px solid #409EFF;
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
