<template>
	<!-- 发票进度详情 -->
	<view class="bg-gray" style="height: 100%;">
		<view class="padding-bj" style="background-image: url(https://www.duomeihe.shop/uploads/20230327/test3.png);background-size: 100% 100%;height: 330rpx;">
			<view class="wen">我们会在3个工作日内开具，请耐心等待</view>
			<view class="hangs">
				<view style="position: absolute;height: 4rpx;width: 411rpx;background: white;margin-top: 16rpx;margin-left: 70rpx;"></view>
				<view style="width: 200rpx;height: 120rpx;">
					<image class="box" src="../../../static/images/user/xuanze.png"></image>
					<!-- <image class="box" src="../../../static/images/user/audit.png"></image> -->
					<view style="margin-top: 24rpx;margin-left: 30rpx;color: #FFFFFF;">申请提交</view>
				</view>
				<view style="width: 200rpx;height: 120rpx;">
					<!-- <image class="box" src="../../../static/images/user/xuanze.png"></image> -->
					<image class="box" src="../../../static/images/user/audit.png"></image>
					<view style="margin-top: 24rpx;margin-left: 30rpx;color: #FFFFFF;">发票申请</view>
				</view>
				<view style="width: 200rpx;height: 120rpx;">
					<!-- <image class="box" src="../../../static/images/user/xuanze.png"></image> -->
					<image class="box" src="../../../static/images/user/audit.png"></image>
					<view style="margin-top: 24rpx;margin-left: 30rpx;color: #FFFFFF;">开具发票</view>
				</view>
			</view>
		</view>
		<view style="border-radius: 13rpx;background: white;margin-top: -25rpx;">
			<view style="display: flex;padding-top: 36rpx;padding-left: 31rpx;display: flex;justify-content: space-between;">
				<view style="color: #999999;font-size: 26rpx;">抬头名称</view>
				<view style="font-size: 26rpx;color: #141414;margin-right: 37rpx;">企业</view>
			</view>
			<view style="display: flex;padding-top: 36rpx;padding-left: 31rpx;display: flex;justify-content: space-between;">
				<view style="color: #999999;font-size: 26rpx;">申请时间</view>
				<view style="font-size: 26rpx;color: #141414;margin-right: 37rpx;">2023-03-04 22:25:32</view>
			</view>
			<view style="display: flex;padding-top: 36rpx;padding-left: 31rpx;display: flex;justify-content: space-between;">
				<view style="color: #999999;font-size: 26rpx;">收件人</view>
				<view style="font-size: 26rpx;color: #141414;margin-right: 37rpx;">某某某</view>
			</view>
			<view style="display: flex;padding-top: 36rpx;padding-left: 31rpx;display: flex;justify-content: space-between;padding-bottom: 36rpx;">
				<view style="color: #999999;font-size: 26rpx;">电子邮箱</view>
				<view style="font-size: 26rpx;color: #141414;margin-right: 37rpx;">483345875@qq.com</view>
			</view>
		</view>

		<view style="border-radius: 13rpx;background: white;margin-top: 30rpx;">
			<view style="background: white;border-radius: 12rpx;padding-top: 36rpx;">
				<view style="color: #909090;font-size: 24rpx;margin-left: 31rpx;">2023-03-06 09:12:05</view>
				<view style="width: 750rpx;display: flex;margin-top: 30rpx;">
					<image style="width: 117rpx;height: 117rpx;margin-right: 24rpx;margin-left: 31rpx;"
						src="https://img.sandingtv.com/20190930/0c82d162395c19118c7dc979fe129f7b.jpg">
					</image>
					<view>
						<view style="display: flex;justify-content: space-between;width: 580rpx;">
							<view style="color: #2D2D2D;font-size: 30rpx;">农家土鸡蛋</view>
							<view style="color: #353535;font-size: 31rpx;font-weight: bold;margin-right: 31rpx;">
								￥124</view>
						</view>
						<view style="color: #909090;font-size: 20rpx;margin-top: 16rpx;">鲜鸡蛋2斤装
						</view>
					</view>
				</view>
			</view>

				<view class="secwy">
					<view style="color: #848689;">订单状态</view>
					<view style="color: #2D2D2D;">已完成</view>
				</view>
				<view class="secwy">
					<view style="color: #848689;">订单编号</view>
					<view style="color: #2D2D2D;">202303066313937210202337737</view>
				</view>
				<view class="secwy" style="padding-bottom: 36rpx;">
					<view style="color: #848689;">下单时间</view>
					<view style="color: #2D2D2D;">2023-03-06 09:12:05</view>
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
		width: 531rpx;
		height: 42rpx;
		font-size: 30rpx;
		margin: 0 auto;
		margin-top: 30rpx;
		color: #FFFFFF;
	}

	.hangs {
		width: 600rpx;
		height: 140rpx;
		display: flex;
		margin: 0 auto;
		margin-top: 48rpx;
	}

	.box {
		width: 40rpx;
		height: 40rpx;
		margin-left: 70rpx;
	}
	.secwy{
		display: flex;
		margin-top: 30rpx;
		justify-content: space-between;
		font-size: 24rpx;
		margin-right: 31rpx;
		margin-left: 31rpx;
	}
</style>
