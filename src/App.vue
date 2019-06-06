<template>
  <div id="app">
    <CropTool
			:label="'选择图片'"
			:boxWidth="800"
			:boxHeight="600"
			v-on:cutDown="cutDown"
		></CropTool>
		<div style="margin-top:20px;">
			<img :src="imgSrc" v-if="!!imgSrc" alt="">
		</div>
		<div style="margin-top:20px;">
			<a v-if="!!imgSrc" :href="imgSrc" download="image">下载图片</a>
		</div>
  </div>
</template>

<script>
import CropTool from './components/CropTool.vue'

export default {
  name: 'App',
  components: {
    CropTool
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
