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
				<!-- <text class="icon "></text> -->
				<image src="../../static/images/user/err.png" style="width: 120rpx;height: 120rpx;margin-top: 100rpx;" mode="widthFix"></image>
				<text class="text-lg margin-tb">支付已取消</text>
				<text style="font-size: 26rpx;width: 531rpx;height: 86rpx;">请在30分钟内完成支付，否则订单会被取消
				如已支付可稍后查询订单状态，无需重新支付</text>
				<view class="button padding-xl margin-top-lg">
					<button
						class="cu-btn block  margin-tb-sm lg"
						@tap="goOrder"
					>
						查看订单
					</button>
					<button
						class="cu-btn block wanl-bg-orange margin-tb-sm lg"
						@tap="payAgain"
					>
						重新支付
					</button>
				</view>
			</view>
		</view>
</template>

<script>
	export default {
		methods: {
			onBackUser() {
				uni.setTabBarStyle({
					backgroundColor: '#ffffff',
					borderStyle: 'white'
				});
				uni.switchTab({
					url: '/pages/user'
				});
			},
			// 点击重新支付
			payAgain(){
				let id=uni.getStorageSync('order_id')
				this.$wanlshop.to(`/pages/user/money/pay?order_id=${id}&order_type=goods`);
			},
			// 点击查看订单
			goOrder(){
				let id=uni.getStorageSync('order_id')
				uni.redirectTo({
					url:`/pages/user/order/details?id=${id}`
				})
			}
		},
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
		font-size: 180rpx;
		color: #3aa112;
		margin-top: 150rpx;
	}
	.wanl-success .content .button {
		width: 100%;
	}
</style>