<template>
    <div id="app">
        <img v-show="false" id="image" width="737" height="552" src="./../static/image/eg.png" alt="">
        <ImgCutter
                ref="imgCutter"
                :label="'选择图片'"
                :boxWidth="700"
                :boxHeight="400"
                :cutWidth="250"
                :cutHeight="250"
                :sizeChange="true"
                :moveAble="true"
                v-on:cutDown="cutDown">
            <button slot="open">选择图片</button>
        </ImgCutter>
        <button type="button" @click="forIe9">兼容IE9</button>
        <div style="margin-top:20px;">
            <img :src="imgSrc" v-if="!!imgSrc" alt="">
        </div>
        <div style="margin-top:20px;">
            <a v-if="!!imgSrc" :href="imgSrc" download="image">下载图片</a>
        </div>
    </div>
</template>

<script>
    import ImgCutter from './components/ImgCutter.vue'
    export default {
        name: 'App',
        components: {
            ImgCutter
        },
        data(){
            return {
                imgSrc:null
            }
        },
        methods:{
            cutDown:function(res){
                console.log(res);
                this.imgSrc = res.dataURL;
            },
            forIe9:function(){
                let $image = document.getElementById('image');
                $image.name = 'eg.png';
                this.$refs.imgCutter.handleOpen(()=>{
                    let $image = document.getElementById('image');
                    $image.name = 'eg.png';
                    this.$refs.imgCutter.importImgToCanv($image);
                });
            },
        }
    }
</script>