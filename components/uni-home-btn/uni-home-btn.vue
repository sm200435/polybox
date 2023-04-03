<template>
	<view class="arrage">
		<view class="arrs" @tap="onBas()">
			<image src="../../static/images/user/door.png" mode="aspectFit" style="width: 100rpx;height: 100rpx;"></image>
			<view class="anges">热门商品</view>
		</view>
		<view class="arrs" @tap="onCollect()">
			<image src="../../static/images/user/cang.png" mode="aspectFit" style="width: 100rpx;height: 100rpx;"></image>
			<view class="anges">收藏商品</view>
		</view>
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
		name:"uni-home-btn",
		data() {
			return {
				
			};
		},
		methods:{
			onBas(){
				uni.navigateTo({
					url:'/pages/user/group/hot'
				})
			},
			//收藏
			onCollect(){
				if(this.$store.state.user.isLogin==false){
					uni.navigateTo({
						url:'/pages/user/auth/auth'
					})
				}else{
					uni.navigateTo({
						url:'/pages/user/collect'
					})
				}
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

<style lang="scss">
.arrage{
	// margin-top: 30rpx;
	width: 94%;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding: 40rpx 0;
	margin: 25rpx auto 0;
	border-radius: 10rpx;
	height: 184.78rpx;
	.arrs{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
}
.anges{
	font-size: 24rpx;
	margin-top: 12rpx;
}
</style>