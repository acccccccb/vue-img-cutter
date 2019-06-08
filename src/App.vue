<template>
  <div id="app">
    <ImgCutter
			:label="'选择图片'"
			:boxWidth="700"
			:boxHeight="400"
			v-on:cutDown="cutDown">
        <button slot="openImgCutter">选择图片</button>
	</ImgCutter>
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
		}
	}
}
</script>
