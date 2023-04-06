<template>
	<view class="empty-content">
		<view class="wanl-gray text-center">
			<image class="animation-scale-down" :src="src ? src : $wanlshop.appstc('/default/default3x.png')"></image>
			<view class="text-30" style="margin: 36rpx 0 57rpx 0;">{{ text }}</view>
			<slot></slot>
		</view>
	</view>
</template>

<script>
/**
 * WanlEmpty 缺省页
 */
export default {
	name: 'WanlEmpty',
	props: {
		src: {
			type: String,
			default: ''
		},
		text: {
			type: String,
			default: '没有找到任何内容'
		}
	}
};
</script>

<style>
	.empty-content {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		padding: 200rpx 130rpx;
	}
	.empty-content image{
		width: 274.15rpx;
		height: 315.22rpx;
	}
</style>
