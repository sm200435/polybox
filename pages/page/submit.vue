<template>
	<view class="wanl-success">
				<!-- 导航条 -->
				<view class="cu-custom" :style="{ height: $wanlshop.wanlsys().height + 'px' }">
					<view
						class="cu-bar bg-bgcolor fixed"
						:style="{
							height: $wanlshop.wanlsys().height + 'px',
							paddingTop: $wanlshop.wanlsys().top + 'px'
						}"
					>
						<view class="action" @tap="onBackUser"><text class="wlIcon-fanhui1"></text></view>
						<view class="content" :style="{ top: $wanlshop.wanlsys().top + 'px' }">
							<text></text>
						</view>
					</view>
		</view>
		
				<view class="content">
					<text class="icon wlIcon-pintuantuangouchenggong"></text>
					<text class="wen">
						申请成功，我们将会在提交后的一周内联系您请注意电话与短信
					</text>
					<button class="cu-btn block button margin-top-lg  margin-tb-sm lg" @tap="onIndex">
						返回首页
					</button>
				</view>
			</view>
</template>

<script>
	export default {
		methods: {
			onBackUser() {
				uni.switchTab({
					url: '/pages/index'
				});
			},
			onIndex() {
				uni.setTabBarStyle({
					backgroundColor: '#ffffff',
					borderStyle: 'white'
				});
				uni.switchTab({
					url: '/pages/index'
				});
			}
		}
	}
</script>

<style>
	.wanl-success .content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.wanl-success .content .icon {
		font-size: 120rpx;
		color: #3aa112;
		margin-top: 210rpx;
	}
	.wen{
		width: 603rpx;
		height: 84rpx;
		overflow-wrap: break-word;
		color: #000000;
		font-size: 30rpx;
		font-family: PingFangSC-Medium;
		font-weight: bold;
		text-align: center;
		margin: 70rpx 0 0 0;
	}
	.wanl-success .content .button {
		width: 471rpx;
		height: 72rpx;
		color: #141414;
		text-align: center;
		margin: 0 auto;
		border-radius: 40rpx;
		border: solid 1rpx  #999999;
		margin-top: 36rpx;
		margin-top: 268rpx;
		background: white;
	}
</style>