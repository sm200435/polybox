<template>
	<!-- 发票提交成功页 -->
		<view class="wanl-success">
			<view class="content">
				<text class="icon wlIcon-pintuantuangouchenggong"></text>
				<text class="text-lg margin-tb">{{ title }}已成功</text>
				<view class="button padding-xl margin-top-lg">
					<button
						class="cu-btn block wanl-bg-orange margin-tb-sm lg"
						@tap="$wanlshop.on('/pages/user/invoice/detail')">
						查看详情
					</button>
					<button class="cu-btn block line-gray margin-tb-sm lg" @tap="onIndex">
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
	.wanl-success .content .button {
		width: 100%;
	}
	</style>
