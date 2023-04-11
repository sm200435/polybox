<template>
	<!-- 开票信息详情 -->
	<view style="background: #f7f7f7;">
		<view>
			<view class="fil">发票详情（必填）</view>
			<view class="padding-sm " style="border-radius: 13rpx;background: white;margin: 10rpx 20rpx;">
				<view class="messases">
					<view>抬头类型</view>
					<!-- <radio-group>
						<radio style="padding-left: 20rpx;transform:scale(0.7)">企业</radio>
						<radio style="padding-left: 20rpx;transform:scale(0.7)">个人</radio>
					</radio-group> -->
				</view>
				<view class="messases">
					<view>发票抬头</view>
					<input style="text-align: right;font-size: 30rpx;" placeholder="请填写发票抬头" />
				</view>
				<view class="messases">
					<view>纳税人许别号</view>
					<input style="text-align: right;font-size: 30rpx;" placeholder="请填写纳税人许别号" />
				</view>
				<view class="messases">
					<view>电子邮箱</view>
					<input style="text-align: right;font-size: 30rpx;" placeholder="请填写电子邮箱地址" />
				</view>
			</view>
		</view>

		<view>
			<view class="fil">其他信息（非必填）</view>
			<view class="padding-sm" style="border-radius: 13rpx;background: white;margin: 10rpx 20rpx;">
				<view class="messases">
					<view>开户银行</view>
					<input style="text-align: right;font-size: 30rpx;" placeholder="用于开具发票使用" />
				</view>
				<view class="messases">
					<view>银行账户</view>
					<input style="text-align: right;font-size: 30rpx;" placeholder="用于开具发票使用" />
				</view>
				<view class="messases">
					<view>地址</view>
					<input style="text-align: right;font-size: 30rpx;" placeholder="用于开具发票使用" />
				</view>
				<view class="messases">
					<view>电话</view>
					<input style="text-align: right;font-size: 30rpx;" placeholder="用于开具发票使用" />
				</view>
			</view>
		</view>

		<view style="width: 600rpx;height: 80rpx;margin: 0 auto;border-radius: 50rpx;" class="wanl-bg-orange">
			<view style="text-align: center;align-items: center;font-size: 35rpx;line-height: 80rpx;margin-top: 60rpx;" @tap="onSave">
				保存</view>
		</view>
		<view style="display: flex;justify-content: center;font-size: 28rpx;margin-top: 6rpx;">点击保存即代表同意<view style="color:#F31064;padding-left: 10rpx;">开具发票确认书</view></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods:{
			onSave(){
				this.$wanlshop.on('/pages/user/invoice/succeed');
			}
		}
	}
</script>

<style lang="scss">
	.fil {
		padding: 20rpx;
	}

	.messases {
		// width: 100%;
		margin: 0 auto;
		// background: white;
		display: flex;
		justify-content: space-between;
		padding-top: 30rpx;
		padding-bottom: 20rpx;
		padding-left: 15rpx;
	}
</style>
