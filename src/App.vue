<template>
    <div id="app" style="width:1000px;margin-top:50px;margin-bottom:100px;margin-left:auto;margin-right:auto;">
        <div>
            <h1>vue-image-cutter <span class="font-size:12px!important;font-weight:normal!important;">{{version}}</span></h1>
            <div>
                <a href="https://github.com/acccccccb/vue-img-cutter/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/acccccccb/vue-img-cutter?style=for-the-badge"></a>
                <a href="https://github.com/acccccccb/vue-img-cutter/network"><img alt="GitHub forks" src="https://img.shields.io/github/forks/acccccccb/vue-img-cutter?style=for-the-badge"></a>
                <a href="https://www.npmjs.com/package/vue-img-cutter"><img alt="npm" src="https://img.shields.io/npm/v/vue-img-cutter?style=for-the-badge"></a>
                <a href="https://www.npmjs.com/package/vue-img-cutter"><img alt="npm" src="https://img.shields.io/npm/dt/vue-img-cutter?style=for-the-badge"></a>
                <img src="https://img.shields.io/badge/%E5%A6%82%E6%9E%9C%E6%AD%A4%E9%A1%B9%E7%9B%AE%E5%AF%B9%E4%BD%A0%E6%9C%89%E5%B8%AE%E5%8A%A9%EF%BC%8C%E8%AF%B7%E7%BB%99%E6%88%91%E4%B8%80%E4%B8%AAstar-red?style=for-the-badge" alt="">
            </div>

            <p>
                简单易用的vue图片裁剪插件，支持移动图像，裁剪图片，放大缩小图片，上下左右移动，固定比例，固定尺寸，远程图片裁剪，只需要很少的代码就可以实现裁剪功能，也可以通过调整参数以适应你自己的业务需求。
            </p>
            <p>Github: <a href="https://github.com/acccccccb/vue-img-cutter" target="_blank">https://github.com/acccccccb/vue-img-cutter</a></p>
            <p>Gitee: <a href="https://gitee.com/GLUESTICK/vue-img-cutter" target="_blank">https://gitee.com/GLUESTICK/vue-img-cutter</a></p>
            <div style="margin-top:40px;">
                <h3>这里可以调整参数生成插件代码：</h3>
                <div class="paramsOption">
                    <form autocomplete="off">
                        <div class="form-item">
                            <label for="label">按钮文字（label）：
                                <input @input="setData($event)" name="label" type="text" v-model="params.label">
                            </label>
                        </div>
                        <div class="form-item">
                            <label for="boxWidth">画布宽度（boxWidth）：
                                <input @input="setData($event)" name="boxWidth" type="text" v-model="params.boxWidth">
                            </label>
                        </div>
                        <div class="form-item">
                            <label for="boxHeight">画布高度（boxHeight）：
                                <input @input="setData($event)" name="boxHeight" type="text" v-model="params.boxHeight">
                            </label>
                        </div>
                        <div class="form-item">
                            <label for="cutWidth">裁剪框初始宽度（cutWidth）：
                                <input @input="setData($event)" name="cutWidth" type="text" v-model="params.cutWidth">
                            </label>
                        </div>
                        <div class="form-item">
                            <label for="cutHeight">裁剪框初始高度（cutHeight）：
                                <input @input="setData($event)" name="cutHeight" type="text" v-model="params.cutHeight">
                            </label>
                        </div>
                        <div class="form-item">
                            <label for="rate">按比例裁剪（rate）：
                                <input @input="setData($event)" name="rate" type="text" v-model="params.rate">
                            </label>
                        </div>
                        <div class="form-item">
                            <label for="toolBgc">工具栏背景色（toolBgc）：
                                <input @input="setData($event)" name="toolBgc" type="text" v-model="params.toolBgc">
                            </label>
                        </div>
                        <div class="form-item">
                            <label for="crossOriginHeader">跨域信息（crossOriginHeader）：
                                <input @input="setData($event)" name="crossOriginHeader" type="text" v-model="params.crossOriginHeader">
                            </label>
                        </div>
                        <div class="form-item">
                            <label for="crossOrigin">是否跨域（crossOrigin）：
                                true:<input @change="setData($event)" type="radio" checked="checked" name="crossOrigin" value="true" />
                                false:<input @change="setData($event)" type="radio" name="crossOrigin" value="false" />
                            </label>
                        </div>
                        <div class="form-item">
                            <label for="isModal">是否为弹窗（isModal）：
                                true:<input @change="setData($event)" type="radio" checked="checked" name="isModal" value="true" />
                                false:<input @change="setData($event)" type="radio" name="isModal" value="false" />
                            </label>
                        </div>
                        <div class="form-item">
                            <label for="showChooseBtn">是否显示选择图片按钮（showChooseBtn）：
                                true:<input @change="setData($event)" type="radio" checked="checked" name="showChooseBtn" value="true" />
                                false:<input @change="setData($event)" type="radio" name="showChooseBtn" value="false" />
                            </label>
                        </div>
                        <div class="form-item">
                            <label for="lockScroll">弹窗时是否锁定body滚动（lockScroll）：
                                true:<input @change="setData($event)" type="radio" checked="checked" name="lockScroll" value="true" />
                                false:<input @change="setData($event)" type="radio" name="lockScroll" value="false" />
                            </label>
                        </div>
                        <div class="form-item">
                            <label for="sizeChange">是否允许修改裁剪尺寸（sizeChange）：
                                true:<input @change="setData($event)" type="radio" checked="checked" name="sizeChange" value="true" />
                                false:<input @change="setData($event)" type="radio" name="sizeChange" value="false" />
                            </label>
                        </div>
                        <div class="form-item">
                            <label for="moveAble">是否允许移动裁剪框（moveAble）：
                                true:<input @change="setData($event)" type="radio" checked="checked" name="moveAble" value="true" />
                                false:<input @change="setData($event)" type="radio" name="moveAble" value="false" />
                            </label>
                        </div>
                        <div class="form-item">
                            <label for="tool">是否显示工具条（tool）：
                                true:<input @change="setData($event)" type="radio" checked="checked" name="tool" value="true" />
                                false:<input @change="setData($event)" type="radio" name="tool" value="false" />
                            </label>
                        </div>
                    </form>
                </div>
                <div style="float:right;width:49%;box-sizing:border-box;">
                    <textarea style="width:100%;border:1px solid #dedede;resize: none;" rows="22" readonly>{{code1}}</textarea>
                    <textarea style="width:100%;border:1px solid #dedede;margin-top:20px;resize: none;" rows="12" readonly>{{code2}}</textarea>
                </div>
                <div style="clear:both;"></div>
            </div>
            <div style="margin-bottom:20px;">
                <h4>裁剪后的图片将会显示在这里：</h4>
                <div style="background:#dedede;min-height:200px;width:100%;text-align:center;padding:20px;box-sizing:border-box;">
                    <div style="margin-top:20px;">
                        <img :src="imgSrc" v-if="!!imgSrc" alt="" style="max-width:100%;max-height:200px;">
                    </div>
                    <div style="margin-top:20px;">
                        <a v-if="!!imgSrc" :href="imgSrc" download="image">下载图片</a>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <div>
                        <div>
                            <label for="cutImgSrc"> 需要裁剪的图片地址：
                                <input type="text" name="cutImgSrc" style="width:600px;" @input="catchInput($event)" :value="cutImgSrc" placeholder="需要裁剪的图片地址">
                            </label>
                        </div>
                        <div>
                            <label for="cutImgWidth"> 需要裁剪的原始图片宽度：
                                <input type="number" name="cutImgWidth" style="width:600px;" @input="catchInput($event)" :value="cutImgWidth" placeholder="需要裁剪的图片地址">
                            </label>
                        </div>
                        <div>
                            <label for="cutImgHeight"> 需要裁剪的原始图片高度：
                                <input type="number" name="cutImgHeight" style="width:600px;" @input="catchInput($event)" :value="cutImgHeight" placeholder="需要裁剪的图片地址">
                            </label>
                        </div>
                    </div>
                    <div class="btn btn-primary" style="margin-bottom:20px;margin-top:20px;" @click="forIe9">裁剪远程图片（兼容IE9）</div>
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
                        toolBgc="params.toolBgc"
                        v-on:error="catchError"
                        v-on:cutDown="cutDown">
                    <div class="btn btn-primary" slot="open">{{params.label}}</div>
                    <div class="btn btn-primary btn-primary-plain" slot="choose">选择图片</div>
                    <div class="btn btn-default" slot="cancel">取消</div>
                    <div class="btn btn-primary" slot="confirm">确定</div>
                </ImgCutter>
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
        data(){
            return {
                version:'',
                cutImgSrc:'http://placekitten.com/400/400',
                cutImgWidth:400,
                cutImgHeight:400,
                imgSrc:null,
                refresh:true,
                isForIe9:false,
                params:{
                    label:'裁剪本地图片',
                    crossOrigin:true,
                    crossOriginHeader:'*',
                    rate:'',
                    toolBgc:'none',
                    isModal:true,
                    showChooseBtn:true,
                    lockScroll:true,
                    boxWidth:1000,
                    boxHeight:400,
                    cutWidth:250,
                    cutHeight:250,
                    sizeChange:true,
                    moveAble:true,
                    tool:true,
                },
                code1:"",
                code2:"" +
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
        created(){
            this.version = config.version;
            this.createCode();
        },
        methods:{
            cutDown:function(res){
                console.log(res);
                this.imgSrc = res.dataURL;
            },
            forIe9:function(){
                this.$refs.imgCutterModal.handleOpen({
                    name:this.cutImgSrc,
                    src:this.cutImgSrc,
                    width:this.cutImgWidth,
                    height:this.cutImgHeight,
                });
            },
            doRefresh:function(){
                this.refresh = false;
                this.$nextTick(()=>{
                    this.refresh = true;
                })
            },
            createCode:function(){
                this.code1 = '\n' +
                    '<ImgCutter\n' +
                    '   :ref="imgCutterModal"\n' +
                    '   :label="'+ this.params.label +'"\n' +
                    '   :crossOrigin="'+ this.params.crossOrigin +'"\n' +
                    '   :crossOriginHeader="'+ this.params.crossOriginHeader +'"\n' +
                    '   :rate="'+ this.params.rate +'"\n' +
                    '   :toolBgc="'+ this.params.toolBgc +'"\n' +
                    '   :isModal="'+ this.params.isModal +'"\n' +
                    '   :showChooseBtn="'+ this.params.showChooseBtn +'"\n' +
                    '   :lockScroll="'+ this.params.lockScroll +'"\n' +
                    '   :boxWidth="'+this.params.boxWidth+'"\n' +
                    '   :boxHeight="'+ this.params.boxHeight +'"\n' +
                    '   :cutWidth="'+ this.params.cutWidth +'"\n' +
                    '   :cutHeight="' + this.params.cutHeight + '"\n' +
                    '   :sizeChange="'+ this.params.sizeChange +'"\n' +
                    '   :moveAble="'+ this.params.moveAble +'"\n' +
                    '   v-on:cutDown="cutDown">\n' +
                    '       <div class="btn btn-primary" slot="open">'+ this.params.label +'</div>\n' +
                    '</ImgCutter>'
            },
            setData:function($event){
                function isNumber(val) {
                    let regPos = /^\d+(\.\d+)?$/; //非负浮点数
                    let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
                    if(regPos.test(val) || regNeg.test(val)) {
                        return true;
                    } else {
                        return false;
                    }
                }
                let value = $event.target.value;
                if(value==='true') {value = true}
                if(value==='false') {value = false}
                if(isNumber(value)===true) {
                    value = parseInt(value);
                }
                this.params[$event.target.name] = value;
                this.doRefresh();
                this.createCode();
            },
            catchInput(e){
                let val = e.target.value;
                let key = e.target.name;
                this[key] = val;
            },
            catchError(res) {
                console.log(res);
                window.alert(res.msg);
            }
        }
    }
</script>
<style scoped>
    .btn {
        display:inline-block;
        text-align: center;
        background: #dedede;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        box-sizing: border-box;
        border-radius: 4px;
        cursor: pointer;
        border: 1px solid;
        font-size:14px;
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
        font-size:12px;
    }
    .paramsOption {
        margin-bottom:20px;
        padding:15px;
        border:1px solid #dedede;
        float:left;
        box-sizing:border-box;
        width:49%;
    }
    .form-item {
        margin-bottom:20px;
    }
</style>