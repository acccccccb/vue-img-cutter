<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <span class="navbar-brand mb-0 h1">{{name}}</span>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" :href="docs">Docs</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :href="gitee">Gitee</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :href="github">Github</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :href="npm">Npm</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :href="download">download</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :href="homepage">Author Home page</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="jumbotron">
      <div class="container">
        <h1 class="display-3" style="margin-bottom:20px;">{{name}} <span class="badge badge-light">{{version}}</span></h1>
        <p>
          <a href="https://github.com/acccccccb/vue-img-cutter/stargazers">
            <img alt="GitHub stars" src="https://img.shields.io/github/stars/acccccccb/vue-img-cutter?style=for-the-badge">
          </a>
          <a href="https://github.com/acccccccb/vue-img-cutter/network">
            <img alt="GitHub forks" src="https://img.shields.io/github/forks/acccccccb/vue-img-cutter?style=for-the-badge">
          </a>
          <a href="https://www.npmjs.com/package/vue-img-cutter">
            <img alt="npm" src="https://img.shields.io/npm/v/vue-img-cutter?style=for-the-badge">
          </a>
          <a href="https://www.npmjs.com/package/vue-img-cutter">
            <img alt="npm" src="https://img.shields.io/npm/dt/vue-img-cutter?style=for-the-badge">
          </a>
        </p>
        <p>{{description}}</p>
        <p>
          <a class="btn btn-success btn-lg"
             :href="download" target="_blank"
             role="button"><i class="fa fa-download"></i> Download</a>
          <a class="btn btn-light btn-lg" :href="github" target="_blank"
             role="button"><i class="fa fa-link"></i> Github</a>
          <a class="btn btn-link" style="color:#fff;text-decoration: underline;"
             :href="gitee" target="_blank" role="button">Gitee</a>
        </p>
      </div>
      <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
          <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
          <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
          <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
        </g>
      </svg>
    </div>
    <div class="row bg" style="padding-top:0;">
      <div class="col-md-10 offset-md-1">
        <h1 class="bd-title">
          <i class="fa fa-plane"></i> 简洁 / 高效
          <small class="text-muted">Simple and efficient</small>
        </h1>
        <p class="lead">
          只需简单几步 即可实现基础功能
        </p>
        <div class="alert alert-light" style="margin-top:40px;">
          <code class="language-html"><pre>1.安装 npm i vue-img-cutter --save-dev</pre></code>
          <code class="language-html"><pre>2.引用 import ImgCutter from 'vue-img-cutter';</pre></code>
          <code class="language-html"><pre>3.注册 components: { ImgCutter }</pre></code>
          <code class="language-html"><pre>4.使用 &lt;ImgCutter @cutDown="cutDown"&gt;&lt;/ImgCutter&gt;</pre></code>
          <code class="language-html"><pre class="mb-0">5.返回值 cutDown:function(){ ...Do something }</pre></code>
        </div>
      </div>
    </div>
    <div class="row bg grayBg" style="padding-bottom:60px;">
      <div class="col-md-10 offset-md-1">
        <h1 class="bd-title">
          <i class="fa fa-cog"></i> 在线配置
          <small class="text-muted">Online config</small>
        </h1>
        <p class="lead">
          使用此配置工具进行更多个性化设置，不仅能实时预览，还可直接生成代码复制粘贴到你的项目。
        </p>
        <div class="row" style="margin-top:40px;">
          <div class="col-md-6" ref="imgCutterBox" style="height:458px;overflow:hidden;">
            <div v-if="params.isModal" style="width:100%;height:458px;background:#dedede;box-sizing:border-box;border:1px solid #dedede;">
              <div style="width:50%;margin:180px auto auto auto;">
                <div class="btn btn-primary btn-block" @click="pluginExe('handleOpen')">{{params.label}}</div>
                <div class="btn btn-secondary btn-block" @click="forIe9">裁剪远程图片（兼容IE9）</div>
              </div>
            </div>
            <ImgCutter
              v-if="refresh"
              ref="imgCutterModal"
              :crossOrigin="params.crossOrigin"
              :label="params.label"
              :rate="params.rate"
              :isModal="params.isModal"
              :showChooseBtn="params.showChooseBtn"
              :lockScroll="params.lockScroll"
              :boxWidth="params.boxWidth"
              :boxHeight="params.boxHeight"
              :cutWidth="params.cutWidth"
              :cutHeight="params.cutHeight"
              :sizeChange="params.sizeChange"
              :moveAble="params.moveAble"
              :tool="params.tool"
              :originalGraph="params.originalGraph"
              :DoNotDisplayCopyright="true"
              toolBgc="params.toolBgc"
              v-on:error="catchError"
              v-on:cutDown="cutDown">
              <span slot="open"></span>
              <span slot="choose" v-if="params.isModal==false"></span>
              <span slot="cancel" v-if="params.isModal==false"></span>
              <span slot="confirm" v-if="params.isModal==false"></span>
            </ImgCutter>
          </div>
          <div class="col-md-3">
            <div class="imgCutDownBox" :style="'height:458px;'">

              <div class="imgCutDownBoxContainer">
                <img :src="imgSrc" v-if="!!imgSrc" alt="">
                <span v-else class="imgCutDownTips">裁剪后显示在这里</span>
              </div>

              <div class="text-center">
                <a :class="'btn btn-light'+ (imgSrc?'':' disabled')" :disabled="!imgSrc" :href="imgSrc" download="image.jpg" role="button">下载图片</a>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <form>
              <div class="form-group">
                <label for="cutImgSrc"> 远程图片地址：</label>
                <input type="text" name="cutImgSrc" class="form-control" @input="catchInput($event)"
                       :value="cutImgSrc" placeholder="需要裁剪的图片地址">
              </div>
              <div class="form-group">
                <label for="cutImgWidth"> 远程图片宽度：</label>
                <input type="number" name="cutImgWidth" class="form-control" @input="catchInput($event)"
                       :value="cutImgWidth" placeholder="需要裁剪的图片地址">

              </div>
              <div class="form-group">
                <label for="cutImgHeight"> 远程图片高度：</label>
                <input type="number" name="cutImgHeight" class="form-control" @input="catchInput($event)"
                       :value="cutImgHeight" placeholder="需要裁剪的图片地址">

              </div>
              <div class="form-group">
                <div class="btn btn-primary btn-block" v-if="params.isModal===false" @click="pluginExe('chooseImg')">{{params.label}}</div>
                <div class="btn btn-primary btn-block" v-if="params.isModal===true" @click="pluginExe('handleOpen')">{{params.label}}</div>
              </div>
              <div class="form-group">
                <div class="btn btn-secondary btn-block" @click="forIe9">裁剪远程图片（兼容IE9）</div>
              </div>
              <div class="form-group">
                <button type="button" :disabled="params.isModal===true" class="btn btn-success btn-block" @click="pluginExe('cropPicture')">确定</button>
              </div>
              <div class="form-group">
                <button type="button" class="btn btn-light btn-block" :disabled="params.isModal===true" @click="pluginExe('clearAll')">重置</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-10 offset-md-1">
        <div class="card">
          <div class="card-header">在线配置</div>
          <div class="card-body">
            <form autocomplete="off">
              <div class="row">
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="label">按钮文字（label）：</label>
                    <input @input="setData($event)" name="label" type="text" class="form-control"
                           v-model="params.label">
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="boxWidth">画布宽度（boxWidth）：</label>
                    <input @input="setData($event)" :readonly="params.isModal==false" name="boxWidth" type="text" class="form-control"
                           v-model="params.boxWidth">
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="boxHeight">画布高度（boxHeight）：</label>
                    <input @input="setData($event)" :readonly="params.isModal==false" name="boxHeight" type="text" class="form-control"
                           v-model="params.boxHeight">

                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="cutWidth">裁剪框初始宽度（cutWidth）：</label>
                    <input @input="setData($event)" name="cutWidth" type="text" class="form-control"
                           v-model="params.cutWidth">

                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="cutHeight">裁剪框初始高度（cutHeight）：</label>
                    <input @input="setData($event)" name="cutHeight" type="text" class="form-control"
                           v-model="params.cutHeight">
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="rate">按比例裁剪（rate）：</label>
                    <input @input="setData($event)" name="rate" type="text" class="form-control" placeholder="例：1:1"
                           v-model="params.rate">

                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="toolBgc">工具栏背景色（toolBgc）：</label>
                    <input @input="setData($event)" name="toolBgc" type="text" class="form-control"
                           v-model="params.toolBgc">

                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="crossOriginHeader">跨域信息（crossOriginHeader）：</label>
                    <input @input="setData($event)" name="crossOriginHeader" type="text" class="form-control"
                           v-model="params.crossOriginHeader">

                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="crossOrigin">是否跨域（crossOrigin）：</label>
                    <select @change="setData($event)" name="crossOrigin" class="custom-select">
                      <option value="true" selected>是</option>
                      <option value="false">否</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="isModal">是否为弹窗（isModal）：</label>
                    <select @change="setData($event)" name="isModal" class="custom-select">
                      <option value="true">是</option>
                      <option value="false" selected>否</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="showChooseBtn">是否显示选择图片按钮（showChooseBtn）：</label>
                    <select @change="setData($event)" name="showChooseBtn" class="custom-select">
                      <option value="true" selected>是</option>
                      <option value="false">否</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="lockScroll">弹窗时是否锁定body滚动（lockScroll）：</label>
                    <select @change="setData($event)" name="lockScroll" class="custom-select">
                      <option value="true" selected>是</option>
                      <option value="false">否</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">

                <div class="col">
                  <div class="form-group custom-control">
                    <label for="sizeChange">是否允许修改裁剪尺寸（sizeChange）：</label>
                    <select @change="setData($event)" name="sizeChange" class="custom-select">
                      <option value="true" selected>是</option>
                      <option value="false">否</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="moveAble">是否允许移动裁剪框（moveAble）：</label>
                    <select @change="setData($event)" name="moveAble" class="custom-select">
                      <option value="true" selected>是</option>
                      <option value="false">否</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="tool">是否显示工具栏（tool）：</label>
                    <select @change="setData($event)" name="tool" class="custom-select">
                      <option value="true" selected>是</option>
                      <option value="false">否</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="tool">是否启用原图裁剪（originalGraph）：</label>
                    <select @change="setData($event)" name="originalGraph" class="custom-select">
                      <option value="true">是</option>
                      <option value="false" selected>否</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="row" style="margin-top:20px;">
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                HTML
              </div>
              <div class="card-body">
              <pre>
                <code>{{code1}}</code>
              </pre>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                Javascript
              </div>
              <div class="card-body" style="height:497px;">
              <pre>
                <code>{{code2}}</code>
              </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row bg">
      <div class="col-md-10 offset-md-1">
        <h1 class="bd-title">
          <i class="fa fa-magic"></i> 捐赠
          <small class="text-muted">Show me the money</small>
        </h1>
        <p class="lead">
          请我喝一杯吧
        </p>
      </div>
      <div class="col-md-10 offset-md-1" style="margin-top:20px;">
        <div class="alipay">
          <div><img src="https://www.ihtmlcss.com/wp-content/uploads/2020/01/weixinpay.png" alt="捐赠"></div>
          <div class="text-center">微信 Wechat</div>
        </div>
        <div class="alipay">
          <div><img src="http://www.ihtmlcss.com/wp-content/uploads/2020/01/alipay.png" alt="捐赠"></div>
          <div class="text-center">支付宝 Alipay</div>
        </div>
      </div>
    </div>
    <div class="row bg grayBg" style="padding-bottom:20px;margin-top:50px;">
      <div class="col">
        <blockquote class="blockquote text-center">
          <p class="mb-0">
            {{name}} {{version}}
            <a :href="github" class="font-weight-lighter">Github</a>
            <a :href="gitee" class="font-weight-lighter">Gitee</a>
            <a :href="npm" class="font-weight-lighter">Npm</a>
          </p>
          <footer>
            <small>
              <a :href="homepage" class="font-weight-lighter">Author Home page</a>
            </small>
          </footer>
        </blockquote>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '../package.json'
  import ImgCutter from './components/ImgCutter.vue'

  export default {
    name: 'App',
    components: {
      ImgCutter
    },
    data() {
      return {
        name: '',
        version: '',
        author: '',
        description: '',
        banner: 'https://i.picsum.photos/id/743/1920/500.jpg',
        github:'https://github.com/acccccccb/vue-img-cutter',
        gitee:'https://gitee.com/GLUESTICK/vue-img-cutter',
        download:'https://github.com/acccccccb/vue-img-cutter/archive/master.zip',
        cutImgSrc: 'http://placekitten.com/300/300',
        homepage:'https://www.ihtmlcss.com',
        docs:'https://github.com/acccccccb/vue-img-cutter/blob/master/README.md',
        npm:'https://www.npmjs.com/package/vue-img-cutter',
        cutImgWidth: 300,
        cutImgHeight: 300,
        imgSrc: null,
        refresh: true,
        isForIe9: false,
        params: {
          label: '裁剪本地图片',
          crossOrigin: true,
          crossOriginHeader: '*',
          rate: '',
          toolBgc: 'none',
          isModal: false,
          showChooseBtn: true,
          lockScroll: true,
          boxWidth: 500,
          boxHeight: 458,
          cutWidth: 250,
          cutHeight: 250,
          sizeChange: true,
          moveAble: true,
          tool: true,
          originalGraph: false,
        },
        code1: "",
        code2: "\n" +
        "// 裁剪远程图片（兼容IE9）\n" +
        "forIe9:function(){\n" +
        "   this.$refs.imgCutterModal.handleOpen({\n" +
        "       name:1.png,\n" +
        "       src:http://imgurl.com/1.png,\n" +
        "       width:100,\n" +
        "       height:100,\n" +
        "   });\n" +
        "}",
      }
    },
    created() {
      this.name = config.name;
      this.version = config.version;
      this.author = config.author;
      this.description = config.description;
    },
    mounted() {
      let $imgCutterBox = this.$refs.imgCutterBox;
      this.params.boxWidth = $imgCutterBox.offsetWidth-30;
      this.createCode();
//    this.forIe9();
    },
    methods: {
      cutDown: function (res) {
        console.log(res);
        this.imgSrc = res.dataURL;
      },
      forIe9: function () {
        this.$refs.imgCutterModal.handleOpen({
          name: this.cutImgSrc,
          src: this.cutImgSrc,
          width: this.cutImgWidth,
          height: this.cutImgHeight,
        });
      },
      doRefresh: function () {
        this.refresh = false;
        this.$nextTick(() => {
          this.refresh = true;
        })
      },
      createCode: function () {
        this.code1 = '\n' +
          '<ImgCutter\n' +
          '   :ref="imgCutterModal"\n' +
          '   :label="' + this.params.label + '"\n' +
          '   :crossOrigin="' + this.params.crossOrigin + '"\n' +
          '   :crossOriginHeader="' + this.params.crossOriginHeader + '"\n' +
          '   :rate="' + this.params.rate + '"\n' +
          '   :toolBgc="' + this.params.toolBgc + '"\n' +
          '   :isModal="' + this.params.isModal + '"\n' +
          '   :showChooseBtn="' + this.params.showChooseBtn + '"\n' +
          '   :lockScroll="' + this.params.lockScroll + '"\n' +
          '   :boxWidth="' + this.params.boxWidth + '"\n' +
          '   :boxHeight="' + this.params.boxHeight + '"\n' +
          '   :cutWidth="' + this.params.cutWidth + '"\n' +
          '   :cutHeight="' + this.params.cutHeight + '"\n' +
          '   :sizeChange="' + this.params.sizeChange + '"\n' +
          '   :moveAble="' + this.params.moveAble + '"\n' +
          '   :originalGraph="' + this.params.originalGraph + '"\n' +
          '   v-on:cutDown="cutDown">\n' +
          '       <div class="btn btn-primary" slot="open">' + this.params.label + '</div>\n' +
          '</ImgCutter>'
      },
      setData: function ($event) {
        function isNumber(val) {
          let regPos = /^\d+(\.\d+)?$/; //非负浮点数
          let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
          if (regPos.test(val) || regNeg.test(val)) {
            return true;
          } else {
            return false;
          }
        }

        let value = $event.target.value;
        if (value === 'true') {
          value = true
        }
        if (value === 'false') {
          value = false
        }
        if (isNumber(value) === true) {
          value = parseInt(value);
        }
        this.params[$event.target.name] = value;
        this.doRefresh();
        this.createCode();
      },
      catchInput(e) {
        let val = e.target.value;
        let key = e.target.name;
        this[key] = val;
      },
      catchError(res) {
        console.log(res);
        window.alert(res.msg);
      },
      pluginExe:function(functionName){
        this.$refs.imgCutterModal[functionName]();
      },
    }
  }
</script>
<style scoped>
  .bg {
    padding-top: 50px;
  }

  .grayBg {
    background: #f1f5f7;
  }
  .imgCutDownBox {
    width:100%;
    background:#dedede;
    box-sizing:border-box;
    border:1px solid #dedede;
  }
  .imgCutDownBoxContainer {
    width:90%;
    height:360px;
    overflow:hidden;
    margin:20px auto;
    border:1px solid #ccc;
    background:#fff;
    text-align:center;
  }
  .imgCutDownBoxContainer img {
    max-width:100%;
    max-height:100%;
    margin-top:50%;
    transform: translateY(-50%);
  }
  .imgCutDownTips {
    font-size:0.8em;
    line-height:360px;
    color:#c0c4cc;
  }
  .alipay {
    width:200px;
    padding:10px;
    border-radius: 3px;
    border:1px solid #333;
    display:inline-block;
    margin-right:30px;
  }
  .alipay img {
    width:100%;
  }
  .jumbotron {
    background: linear-gradient(60deg, rgba(84,58,183,1) 0%, rgba(0,172,193,1) 100%)!important;
    padding:4rem 0 0 0 ;
    color:#fff;
    text-align:center;
  }
  svg {
    shape-rendering: auto;
    width: 100%;
    height: 100px;
  }
  svg:not(:root) {
    overflow: hidden;
  }
  /* Animation */

  .parallax > use {
    animation: move-forever 25s cubic-bezier(.55,.5,.45,.5)     infinite;
  }
  .parallax > use:nth-child(1) {
    animation-delay: -2s;
    animation-duration: 7s;
  }
  .parallax > use:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 10s;
  }
  .parallax > use:nth-child(3) {
    animation-delay: -4s;
    animation-duration: 13s;
  }
  .parallax > use:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 20s;
  }
  @keyframes move-forever {
    0% {
      transform: translate3d(-90px,0,0);
    }
    100% {
      transform: translate3d(85px,0,0);
    }
  }
</style>
