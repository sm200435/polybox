<template>
	<view style="flex: 1;">
		<!-- #ifndef H5 -->
		<!-- 基本所有小程序都支持m3u8，但m3u8延迟较高，App使用rtmp -->
		<video
			:style="{ height: screenHeight + 'px',width: screenWidth + 'px'}"
			:src="source"
			:controls="false"
			object-fit="fill"
			loop
			autoplay
		></video>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<!-- 因Flash业务调整，Flash播放已停止更新，很遗憾不能使用rtmp播放，可以选择m3u8、flv -->
		<wanl-player
			:autoplay="true"
			:playsinline="true"
			:source="source"
			:height="screenHeight + 'px'"
			:videoHeight="screenHeight + 'px'"
			:width="screenWidth + 'px'"
			videoWidth="auto"
			:skinLayout="skinLayout"
			:preload="true"
			:isLive="true"
		></wanl-player>
		<!-- #endif -->
	</view>
</template>

<script>
export default {
	name: "wanlLivePlay",
	props: {
		screenHeight: {
			default: 0
		},
		screenWidth: {
			default: 0
		},
		source: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			skinLayout: [{name: "bigPlayButton", align: "blabs", x: this.screenWidth/2 - 30, y: this.screenHeight/2 - 90}]
		};
	},
};
</script>

<style></style>
