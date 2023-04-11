<template>
	<!-- 发票进度详情 -->
	<view class="bg-gray">
		<view class="margin-bj" style="border-radius: 13rpx;background: white;">
			<view class="wen">我们将会在3个工作日内开具，请耐心等待</view>
			<view class="hangs">
				<view style="width: 200rpx;height: 160rpx;">
					<image class="box" src="../../../static/images/user/xuanze.png"></image>
					<view style="margin-top: 30rpx;margin-left: 30rpx;">申请提交</view>
				</view>
				<view style="width: 200rpx;height: 160rpx;">
					<image class="box" src="../../../static/images/user/danxuan.png"></image>
					<view style="margin-top: 30rpx;margin-left: 30rpx;">发票申请</view>
				</view>
				<view style="width: 200rpx;height: 160rpx;">
					<image class="box" src="../../../static/images/user/danxuan.png"></image>
					<view style="margin-top: 30rpx;margin-left: 30rpx;">开具发票</view>
				</view>
			</view>
			<view style="display: flex;margin: 20rpx 20rpx;">
				<view>抬头名称</view>
				<view style="margin-left: 20rpx;">企业</view>
			</view>
			<view style="display: flex;margin: 20rpx 20rpx;">
				<view>申请时间</view>
				<view style="margin-left: 20rpx;">2023-4-11</view>
			</view>
		</view>

		<view class="margin-bj padding-bj" style="border-radius: 13rpx;background: white;">
			<view style="display: flex;margin: 30rpx 20rpx;">
				<view>收件人</view>
				<view style="margin-left: 20rpx;">某某某</view>
			</view>
			<view style="display: flex;margin: 30rpx 20rpx;">
				<view>电子邮箱</view>
				<view style="margin-left: 20rpx;">483345875@qq.com</view>
			</view>

			<view class="time" style="width: 700rpx;height: 241rpx;background: white;margin: 0 auto;margin-top: 20rpx;border-radius: 12rpx;">
				<view style="color: #909090;font-size: 24rpx;padding: 30rpx 30rpx;">2023-4-11 14:19:23</view>
				<view style="width: 700rpx;height: 174rpx;display: flex;">
					<image style="width: 117rpx;height: 117rpx;margin-left: 24rpx;margin-right: 24rpx;"
						src="https://img.sandingtv.com/20190930/0c82d162395c19118c7dc979fe129f7b.jpg">
					</image>
					<view>
						<view style="display: flex;width: 500rpx;justify-content: space-between;">
							<view style="color: #2D2D2D;font-size: 30rpx;">农家土鸡蛋</view>
							<view style="color: #353535;font-size: 31rpx;font-weight: bold;margin-right: 20rpx;">
								￥124</view>
						</view>
						<view style="color: #909090;font-size: 20rpx;margin-top: 16rpx;">鲜鸡蛋2斤装
						</view>
					</view>
				</view>
			</view>

				<view style="display: flex;margin: 30rpx 20rpx;">
					<view>订单状态</view>
					<view style="margin-left: 20rpx;">已完成</view>
				</view>
				<view style="display: flex;margin: 30rpx 20rpx;">
					<view>订单编号</view>
					<view style="margin-left: 20rpx;">266382248</view>
				</view>
				<view style="display: flex;margin: 30rpx 20rpx;">
					<view>下单时间</view>
					<view style="margin-left: 20rpx;">2023-4-11</view>
				</view>
			</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.wen {
		width: 460rpx;
		font-size: 24rpx;
		margin: 0 auto;
		margin-top: 30rpx;
	}

	.hangs {
		width: 600rpx;
		height: 200rpx;
		display: flex;
		margin: 0 auto;
		margin-top: 30rpx;
	}

	.box {
		width: 50rpx;
		height: 50rpx;
		margin-top: 30rpx;
		margin-left: 70rpx;
	}
</style>
