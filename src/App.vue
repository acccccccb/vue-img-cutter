<template>
    <div id="app" style="width:1000px;margin-top:50px;margin-bottom:100px;margin-left:auto;margin-right:auto;">
        <img v-show="false" id="image" width="737" height="552" src="./../static/image/eg.png" alt="">
        <div>
            <h1>vue-image-cutter <span class="font-size:12px!important;font-weight:normal!important;">{{version}}</span></h1>
            <p>
                vue图片裁剪插件，支持任意尺寸裁剪，限制比例裁剪，拖动，缩放 兼容IE8+,MSEdge,Chrome,Firefox;
            </p>
            <p>
                要兼容IE9,需要先将图片上传，拿到服务器返回的图片URL创建image对象，然后传入裁剪插件中。
            </p>
            <div>
                <div class="paramsOption">
                    <form autocomplete="off">
                        <div class="form-item">
                            <label for="label">label：
                                <input @input="setData($event)" name="label" type="text" v-model="params.label">
                            </label>
                        </div>
                        <div class="form-item">
                            <label for="boxWidth">boxWidth：
                                <input @input="setData($event)" name="boxWidth" type="text" v-model="params.boxWidth">
                            </label>
                        </div>
                        <div class="form-item">
                            <label for="boxHeight">boxHeight：
                                <input @input="setData($event)" name="boxHeight" type="text" v-model="params.boxHeight">
                            </label>
                        </div>
                        <div class="form-item">
                            <label for="cutWidth">cutWidth：
                                <input @input="setData($event)" name="cutWidth" type="text" v-model="params.cutWidth">
                            </label>
                        </div>
                        <div class="form-item">
                            <label for="cutHeight">cutHeight：
                                <input @input="setData($event)" name="cutHeight" type="text" v-model="params.cutHeight">
                            </label>
                        </div>
                        <div class="form-item">
                            <label for="isModal">isModal：
                                true:<input @change="setData($event)" type="radio" checked="checked" name="isModal" value="true" />
                                false:<input @change="setData($event)" type="radio" name="isModal" value="false" />
                            </label>
                        </div>
                        <div class="form-item">
                            <label for="showChooseBtn">showChooseBtn：
                                true:<input @change="setData($event)" type="radio" checked="checked" name="showChooseBtn" value="true" />
                                false:<input @change="setData($event)" type="radio" name="showChooseBtn" value="false" />
                            </label>
                        </div>
                        <div class="form-item">
                            <label for="lockScroll">lockScroll：
                                true:<input @change="setData($event)" type="radio" checked="checked" name="lockScroll" value="true" />
                                false:<input @change="setData($event)" type="radio" name="lockScroll" value="false" />
                            </label>
                        </div>
                        <div class="form-item">
                            <label for="sizeChange">sizeChange：
                                true:<input @change="setData($event)" type="radio" checked="checked" name="sizeChange" value="true" />
                                false:<input @change="setData($event)" type="radio" name="sizeChange" value="false" />
                            </label>
                        </div>
                        <div class="form-item">
                            <label for="moveAble">moveAble：
                                true:<input @change="setData($event)" type="radio" checked="checked" name="moveAble" value="true" />
                                false:<input @change="setData($event)" type="radio" name="moveAble" value="false" />
                            </label>
                        </div>
                        <div class="form-item">
                            <label for="tool">tool：
                                true:<input @change="setData($event)" type="radio" checked="checked" name="tool" value="true" />
                                false:<input @change="setData($event)" type="radio" name="tool" value="false" />
                            </label>
                        </div>
                    </form>
                </div>
                <div style="float:right;width:49%;">
                    <textarea style="width:100%;border:1px solid #dedede;margin-top:20px;" rows="18" readonly>{{code1}}</textarea>
                    <textarea style="width:100%;border:1px solid #dedede;margin-top:20px;" rows="12" readonly>{{code2}}</textarea>
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
                <div v-if="params.showChooseBtn===false" class="btn btn-primary" style="margin-bottom:20px;" @click="forIe9">兼容IE9的裁剪按钮</div>
                <ImgCutter
                        v-if="refresh"
                        ref="imgCutterModal"
                        :label="params.label"
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
                        v-on:cutDown="cutDown">
                    <div class="btn btn-primary" slot="open">{{params.label}}</div>
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
                imgSrc:null,
                refresh:true,
                isForIe9:false,
                params:{
                    label:'选择图片',
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
                "// 兼容IE9的方法\n" +
                "forIe9:function(){\n" +
                "   let $image = document.getElementById('image');\n" +
                "   $image.name = 'eg.png';\n" +
                "   this.$refs.imgCutterModal.handleOpen(()=>{\n" +
                "   let $image = document.getElementById('image');\n" +
                "   $image.name = 'eg.png';\n" +
                "   this.$refs.imgCutterModal.importImgToCanv($image);\n" +
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
                let $image = document.getElementById('image');
                $image.name = 'eg.png';
                this.$refs.imgCutterModal.handleOpen(()=>{
                    let $image = document.getElementById('image');
                    $image.name = 'eg.png';
                    this.$refs.imgCutterModal.importImgToCanv($image);
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
                let value = $event.target.value;
                if(value==='true') {value = true}
                if(value==='false') {value = false}
                if(typeof parseInt(value) === 'number' && parseInt(value)>0) {
                    value = parseInt(value);
                }
                this.params[$event.target.name] = value;
                this.doRefresh();
                this.createCode();
            },
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
        margin-top:20px;
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