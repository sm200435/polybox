<template>
	<!-- 开票信息详情 -->
	<view style="background: #f7f7f7;">
		
		<view class="cu-custom text-white" :style="{color: common.appStyle.user_font_color == 'light'?'#ffffff':'#222222'}">
			<view class="cu-bar fixed" :style="{ height: $wanlshop.wanlsys().height + 'px', paddingTop: $wanlshop.wanlsys().top + 'px' }">
				<!-- 背景 -->
				<view class="bar-bg" v-if="headerOpacity > 0" :style="{ 
					height: $wanlshop.wanlsys().height + 'px', 
					opacity: headerOpacity,
					backgroundColor: common.appStyle.user_nav_color?'#ff6e98':'#f7f7f7',
					backgroundImage: 'url(' + $wanlshop.oss(common.appStyle.user_nav_image, 414, 0, 1, 'transparent', 'png') + ')'
				}"></view>
			</view>
		</view>
		
		<view>
			<view class="fil">发票详情（必填）</view>
			<view style="width: 700rpx;height: 455rpx;border-radius: 13rpx;background: white;margin: 10rpx 20rpx;">
				<view class="messases">
					<view class="type">抬头类型</view>
					<!-- <radio-group>
						<radio style="padding-left: 20rpx;transform:scale(0.7)">企业</radio>
						<radio style="padding-left: 20rpx;transform:scale(0.7)">个人</radio>
					</radio-group> -->
					
					<view style="width: 400rpx;height: 40rpx;margin: 15rpx 0rpx;margin-left: 108rpx;display: flex;">
						<view style="display: flex;">
							<image style="width: 36rpx;height: 36rpx;" src="../../../static/images/user/xuanze.png"></image>
							<view style="margin-left: 8rpx;font-size: 29rpx;color: #2D2D2D;">企业</view>
						</view>
						<view style="display: flex;margin-left: 101rpx;">
							<image style="width: 36rpx;height: 36rpx;" src="../../../static/images/user/danxuan.png"></image>
							<view style="margin-left: 8rpx;font-size: 29rpx;color: #2D2D2D;">个人</view>
						</view>
					</view>
					
				</view>
				<view class="messases">
					<view class="type">发票抬头</view>
					<input style="font-size: 29rpx;margin: 15rpx 0rpx;margin-left: 108rpx;" placeholder="请填写发票抬头" />
				</view>
				<view class="messases">
					<view class="type">纳税人许别号</view>
					<input style="font-size: 29rpx;margin: 15rpx 0rpx;margin-left: 50rpx;" placeholder="请填写纳税人许别号" />
				</view>
				<view class="message">
					<view class="type">电子邮箱</view>
					<input style="font-size: 29rpx;margin: 15rpx 0rpx;margin-left: 108rpx;" placeholder="请填写电子邮箱地址" />
				</view>
			</view>
		</view>

		<view>
			<view class="fil">其他信息（非必填）</view>
			<view style="width: 700rpx;height: 455rpx;border-radius: 13rpx;background: white;margin: 10rpx 20rpx;">
				<view class="messases">
					<view class="type">开户银行</view>
					<input style="font-size: 29rpx;margin: 15rpx 0rpx;margin-left: 108rpx;" placeholder="用于开具发票使用" />
				</view>
				<view class="messases">
					<view class="type">银行账户</view>
					<input style="font-size: 29rpx;margin: 15rpx 0rpx;margin-left: 108rpx;" placeholder="用于开具发票使用" />
				</view>
				<view class="messases">
					<view class="type">地址</view>
					<input style="font-size: 29rpx;margin: 15rpx 0rpx;margin-left: 166rpx;" placeholder="用于开具发票使用" />
				</view>
				<view class="message">
					<view class="type">电话</view>
					<input style="font-size: 29rpx;margin: 15rpx 0rpx;margin-left: 166rpx;" placeholder="用于开具发票使用" />
				</view>
			</view>
		</view>

		<view style="width: 585rpx;height: 78rpx;margin: 0 auto;border-radius: 50rpx;" class="wanl-bg-orange">
			<view style="text-align: center;font-size: 30rpx;line-height: 80rpx;margin-top: 130rpx;" @tap="onSave">
				保存</view>
		</view>
		<view style="display: flex;justify-content: center;font-size: 24rpx;margin-top: 12rpx;">点击保存即代表同意<view style="color:#F31064;padding-left: 10rpx;">开具发票确认书</view></view>
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
		padding: 30rpx 45rpx;
		font-size: 30rpx;
	}
	.type{
		color: #141414;
		font-size: 29rpx;
		margin: 15rpx 0rpx;
	}
	.messases {
		width: 660rpx;
		height: 112rpx;
		margin: 0 auto;
		display: flex;
		padding-top: 30rpx;
		padding-bottom: 20rpx;
		padding-left: 15rpx;
		border-bottom: 2rpx solid #C5C6C8;
	}
	.message{
		width: 660rpx;
		height: 112rpx;
		margin: 0 auto;
		display: flex;
		padding-top: 30rpx;
		padding-bottom: 20rpx;
		padding-left: 15rpx;
	}
</style>
