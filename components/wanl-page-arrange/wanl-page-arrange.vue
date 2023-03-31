<template>
	<view class="arrange">
		<view class="arrs" @tap="onBas()">
			<image src="../../static/images/user/door.png" mode="aspectFit" style="width: 100rpx;height: 100rpx;"></image>
			<view class="anges">热门商品</view>
		</view>
		<!-- <view class="arrs">
			<image src="../../static/images/bank/BOC.png" mode="aspectFit" style="width: 100rpx;height: 100rpx;"></image>
			<view>采购清单</view>
		</view> -->
		<view class="arrs" @tap="onVolume()">
			<image src="../../static/images/user/centre.png" mode="aspectFit" style="width: 100rpx;height: 100rpx;"></image>
			<view class="anges">领券中心</view>
		</view>
		<view class="arrs" @tap="onClient()">
			<image src="../../static/images/user/big.png" mode="aspectFit" style="width: 100rpx;height: 100rpx;"></image>
			<view class="anges">大客户</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "WanlPageArrange",
		methods:{
			onBas(){
				uni.navigateTo({
					url:'/pages/user/group/hot'
				})
			},
			//领劵是否登录
			onVolume(){
				if(this.$store.state.user.isLogin==false){
					uni.navigateTo({
						url:'/pages/user/auth/auth'
					})
				}else{
					uni.navigateTo({
						url:'/pages/user/coupon/list'
					})
				}
				
			},
			//客户是否登录
			onClient(){
				if(this.$store.state.user.isLogin==false){
					uni.navigateTo({
						url:'/pages/user/auth/auth'
					})
				}else{
					uni.navigateTo({
						url:'/pages/user/group/client'
					})
				}
				
			}
		}
	}
</script>

<style>
	.arrange{
		width: 700rpx;
		height: 196rpx;
		margin: 30rpx 0;
		background: white;
		display: flex;
		align-items: center;
		border-radius: 13rpx;
		justify-content: space-around;
	}
	.arrs{
		text-align: center;
		margin: 30rpx 0;
	}
	.anges{
		font-size: 24rpx;
		color: #353535;
		padding-top: 12rpx;
	}
</style>