<template>
	<!-- 发票提交成功页 -->
		<view class="wanl-success">
			<view class="content">
				<text class="icon wlIcon-pintuantuangouchenggong"></text>
				<text class="text-lg margin-tb" style="width: 618rpx;height: 94rpx;color: #000000;font-size: 30rpx;">您的发票申请成功，我们将于3个工作日内将电子发票发送至您的邮箱</text>
				<view style="display: flex;margin-top: 140rpx;">
					<button class="wancont" style="color: #141414;background: white;border: 2rpx solid #999999;" @tap="$wanlshop.on('/pages/user/invoice/detail')">
						查看详情
					</button>
					<button class="wancont" style="background: #F31064;color: white;margin-left: 30rpx;" @tap="onIndex">
						返回主页
					</button>
				</view>
			</view>
		</view>
	</template>
	
	<script>
	export default {
		data() {
			return {
				type: '',
				title: ''
			};
		},
		methods: {
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
	};
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
	.wancont {
		width: 233rpx;
		height: 72rpx;
		font-size: 29rpx;
		border-radius: 40rpx;
	}
	</style>
