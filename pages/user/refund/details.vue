<template>
	<view style="background-color: #F7F7F7; min-height: 100vh;padding-bottom: 10rpx;">
		<view class="edgeInsetTop"></view>
		<view class="wanl-refund"> 
			<!-- 头部 -->
			<view class="header">
				<!-- <image :src="$wanlshop.appstc('/order/img_detail_bg.png')" class="img-bg"></image> -->
				<view class="content" style="padding: 0 30rpx;"	>
					<view>
						<view class="status-text" style="font-size: 42rpx;font-weight: 500;color: #141414;line-height: 59rpx;">{{getStateText(refundData.state)}}</view>
						<view class="reason">
							<text class="reason-text" v-if="getStateText(refundData.state)=='卖家拒绝退款'" style="font-size: 30rpx;font-weight: 400;color: #141414;line-height: 42rpx;">{{refundData.statetime}}</text>
							<text class="reason-text" v-else style="font-size: 30rpx;font-weight: 400;color: #141414;line-height: 42rpx;">{{refundData.statetime}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view style="border-radius: 13rpx;margin: 0 25rpx 30rpx;">
				<view class="bg-white padding-bj" v-if="refundData.state != 4" style="padding: 30rpx 25rpx;border-radius: 13rpx;">
					{{getStateInfo(refundData.state)}}
				</view>
				<!-- 退款状态:0=申请退款,1=卖家同意,2=卖家拒绝,3=申请平台介入,4=成功退款,5=退款已关闭,6=已提交退货,7=第三方退款中 -->
				<view class="bg-white solid-top padding-bj current" v-if="refundData.state == 0" style="">
					<view class="wanl-gray text-sm">
						<view>
							<text class="wlIcon-dot margin-right-sm"></text>卖家同意或超时未处理，系统将自动确认
						</view>
						<view class="margin-top-xs">
							<text class="wlIcon-dot margin-right-sm"></text>如果退款被拒绝，您可以修改申请重新发起
						</view>
					</view>
					<view class="flex justify-end margin-top">
						<button class="cu-btn line-black margin-lr-xs" @tap="closeRefund(refundData.id)">关闭退款</button>
						<button class="cu-btn line-orange" @tap="editRefund(refundData.id)">修改申请</button>
					</view>
				</view>
				<view class="bg-white solid-top padding-bj current " style="padding: 30rpx 25rpx;" v-if="refundData.state == 2">
					<view class="text-sm">
						<text style="font-size: 27rpx;font-weight: 400;color: #141414;line-height: 37rpx;">拒绝理由：</text><text class="wanl-gray">{{refundData.refuse_content}}</text>
					</view>
					<view class="flex margin-top">
						<button class="cu-btn round line-black" style="margin-right: 13rpx;" @tap="arbitrationRefund(refundData.id)">平台介入</button>
						<button class="cu-btn round margin-lr-bj line-orange" style="margin: 0;" @tap="editRefund(refundData.id)">修改申请</button>
					</view>
				</view>
			</view>
			
			
			<view v-if="refundData.state == 1" style="width: 700rpx;margin: auto;">
				<view class="bg-white solid-top padding-bj receipt" style="border-radius: 13rpx 13rpx 0 0;">
					<view class="icon">
						<text class="wlIcon-guanzhu1"></text>
					</view>
					<view class="content">
						<view class="flex justify-between">
							<text>收件人：{{refundData.shopConfig.returnName}}</text><text>{{refundData.shopConfig.returnPhoneNum}}</text>
						</view>
						<view class="margin-top-xs">
							<view class="text-cut-2">
								{{refundData.shopConfig.returnAddr}}
							</view>
						</view>
					</view>
				</view>
				<view class="bg-white padding-bj solid-top" style="border-radius: 0rpx 0rpx 13rpx 13rpx;">
					<view class="wanl-gray text-sm">
						<view>
							<text class="wlIcon-dot margin-right-sm"></text>请勿使用平邮或到付，以免商家无法收到退货
						</view>
						<view class="margin-top-xs">
							<text class="wlIcon-dot margin-right-sm"></text>请填写真实快递信息，如超时则关闭退款
						</view>
					</view>
				</view>
				<view class="cu-form-group margin-top-bj" style="border-radius: 13rpx 13rpx 0rpx 0rpx;">
					<view class="title">快递单号：</view>
					<input placeholder="请填写快递单号" name="input" v-model="returnData.express_no"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">快递公司：</view>
					<picker @change="kuaidiChange" :range="refundData.kuaidi" range-key="name">
						<view class="picker">
							{{kuaidiKey>-1?refundData.kuaidi[kuaidiKey].name:'请选择'}}
						</view>
					</picker>
				</view>
				<view class="bg-white padding-bj current" style="border-radius: 0rpx 0rpx 13rpx 13rpx;margin-bottom: 30rpx;">
					<view class="flex justify-end">
						<button class="cu-btn line-orange margin-lr-xs" @tap="toExpress(refundData.id)">确认退货</button>
					</view>
				</view>
			</view>
			<view class="bg-white current" v-if="refundData.state == 6" style="width: 699.40rpx;border-radius: 13rpx;margin: 0 auto 30rpx;">
				<view class="solid-top padding-bj">
					退货物流：<text class="wanl-gray">{{refundData.express_name}}({{refundData.express_no}})</text>
				</view>
				<view class="solid-top padding-bj current">
					<view class="wanl-gray text-sm">
						<view>
							<text class="wlIcon-dot margin-right-sm"></text>如果退款被拒绝，您可以修改申请重新发起
						</view>
						<view class="margin-top-xs">
							<text class="wlIcon-dot margin-right-sm"></text>卖家超时未处理，系统将自动确认
						</view>
					</view>
				</view>
			</view>
			
			<view class="bg-white solid-top padding-bj current" v-if="refundData.state == 3">
				<view class="wanl-gray text-sm">
					<view>
						<text class="wlIcon-dot margin-right-sm"></text>客服正在审核退款详情及退款历史记录
					</view>
					<view class="margin-top-xs">
						<text class="wlIcon-dot margin-right-sm"></text>大概1-3个工作日做出答复，请耐心等待
					</view>
				</view>
			</view>
			<view style="padding: 30rpx 20rpx;background-color: #fff;margin: 0 25rpx;border-radius: 13rpx;">
				<view class="bg-white padding-bj flex justify-between align-center text-lg" style="padding: 0;margin-bottom: 30rpx;" v-if="refundData.state == 4">
					<text style="font-size: 29rpx;font-weight: 400;color: #141414;line-height: 40rpx;">退款总金额</text><text class="text-price wanl-orange">{{refundData.price}}</text>
				</view>
				<view class="bg-white padding-bj margin-top-bj flex justify-between align-center text-lg" style="padding: 0;margin: 0;" @tap="refundLog(refundData.id)">
					<text style="font-size: 29rpx;font-weight: 400;color: #141414;line-height: 40rpx;">退款历史</text><text class="wlIcon-fanhui2"></text>
				</view>
			</view>
			<view style="background-color: #fff;padding: 30rpx 0rpx 30rpx;margin: 25rpx;border-radius: 13rpx;">
				<view class="bg-white padding-bj margin-top-bj text-lg" style="padding: 0 20rpx;margin: 0;">
					退款详情
				</view>
				<view class="padding-bj flex" style="padding: 30rpx 20rpx;margin: 0;border-bottom: 1rpx solid #e5e5e5;">
					<view class="cu-avatar xl margin-right-bj" :style="{backgroundImage: 'url('+$wanlshop.oss(refundData.goods.image, 70, 70)+')'}"> </view>
					<view class="text-sm" style="width: calc(100% - 128rpx);">
						<view class="margin-bottom-xs">
							
							<view class="text-cut-2 text-lg">
								<view v-if="refundData.order_type === 'groups'" class="cu-tag sm margin-right-xs bg-gradual-orange radius">
									<text>拼团订单</text>
								</view>
								{{refundData.goods.title}}
							</view>
						</view>
						<view class="wanl-gray">
							规格：{{refundData.goods.difference}}
						</view>
					</view>
				</view>
				<view class="bg-white padding-bj text-sm" style="padding: 0 20rpx;margin: 30rpx 0 0;">
					<view class="item flex" style="justify-content: space-between;">
						<view style="font-size: 27rpx;font-weight: 400;color: #141414;line-height: 37rpx;"> 退款类型： </view> <view class="tk-title-right"> {{refundData.type_text}} </view>
					</view>
					<view class="item flex margin-top-bj" style="justify-content: space-between;">
						<view class="tk-title"> 退款原因： </view> <view class="tk-title-right"> {{refundData.reason_text}} </view>
					</view>
					<view class="item flex margin-top-bj" style="justify-content: space-between;">
						<view class="tk-title"> 退款金额： </view> <view class="tk-title-right"> {{refundData.price}} </view>
					</view>
					<view class="item flex margin-top-bj" style="justify-content: space-between;">
						<view class="tk-title"> 物流状态： </view> <view class="tk-title-right"> {{refundData.expressType_text}} </view>
					</view>
					<view class="item flex margin-top-bj" style="justify-content: space-between;">
						<view class="tk-title"> 退款时间： </view> <view class="tk-title-right"> {{refundData.createtime_text}} </view>
					</view>
				</view>
			</view>
		
			<view class="edgeInsetBottom"> </view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			refundData: {
				statetime: '',
				goods:{
					
				}
			},
			returnData:{
				id: 0,
				express_no: '',
				express_name: ''
			},
			kuaidiKey: -1
		};
	},
	onLoad(option) {
		this.loadData({id:option.id});
	},
	methods: {
		async loadData(data) {
			this.$api.get({
				url: '/wanlshop/refund/getRefundInfo',
				data: data,
				success: res => {
					this.refundData = res;
					this.returnData.id = res.id;
					// 时间差的毫秒数 
					if(res.state == 0){
						var diff = (res.createtime + res.config.autoagree * 86400) - Date.parse(new Date()) / 1000;
						var days = Math.floor(diff / 86400);
						var hours = Math.floor(diff % 86400 / 3600); 
						var minutes = Math.floor(diff % 86400 % 3600 / 60);
						if (minutes > 0) {
							this.refundData.statetime = '还剩' +minutes+ '分';
						}
						if (hours > 0) {
							this.refundData.statetime = '还剩' +hours+ '天' +minutes+ '分';
						}
						if (days > 0) {
							this.refundData.statetime = '还剩' +days+ '天' +hours+ '小时' +minutes+ '分';
						}
					}else if(res.state == 1){
						var diff = (res.agreetime + res.config.returntime * 86400) - Date.parse(new Date()) / 1000;
						var days = Math.floor(diff / 86400);
						var hours = Math.floor(diff % 86400 / 3600); 
						var minutes = Math.floor(diff % 86400 % 3600 / 60);
						if (minutes > 0) {
							this.refundData.statetime = '还剩' +minutes+ '分';
						}
						if (hours > 0) {
							this.refundData.statetime = '还剩' +hours+ '天' +minutes+ '分';
						}
						if (days > 0) {
							this.refundData.statetime = '还剩' +days+ '天' +hours+ '小时' +minutes+ '分';
						}
					}else if(res.state == 2){
						this.refundData.statetime = res.rejecttime_text;
					}else if(res.state == 6){
						var diff = (res.returntime + res.config.receivingtime * 86400) - Date.parse(new Date()) / 1000;
						var days = Math.floor(diff / 86400);
						var hours = Math.floor(diff % 86400 / 3600); 
						var minutes = Math.floor(diff % 86400 % 3600 / 60);
						if (minutes > 0) {
							this.refundData.statetime = '还剩' +minutes+ '分';
						}
						if (hours > 0) {
							this.refundData.statetime = '还剩' +hours+ '天' +minutes+ '分';
						}
						if (days > 0) {
							this.refundData.statetime = '还剩' +days+ '天' +hours+ '小时' +minutes+ '分';
						}
					}else if(res.state == 3){
						this.refundData.statetime = '等待平台处理';
					}else if(res.state == 4){
						this.refundData.statetime = res.completetime_text;
					}else if(res.state == 5){	
						this.refundData.statetime = res.closingtime_text;
					}
				}
			});
		},
		getStateText(state){
			return ["等待卖家同意", "等待买家退货", "卖家拒绝退款", "平台介入", "退款完成", "退款关闭", "等待卖家收取退货", "第三方支付退款中", "退款失败"][state];
		},
		getStateInfo(state){
			return [
				"您已成功发起退款，等待卖家同意", 
				"您发起的退款卖家已同意，请退货", 
				"您可以修改退货申请再次发起", 
				"您已申请平台介入，请等待平台对此判定", 
				"退款完成", "您已关闭本次退款申请", 
				"如果商家确认收到货物，并核查没有问题，将退款给您", 
				"因第三方快捷支付订单，退款将在24小时内原路返还", 
				"快捷支付退款失败，请联系商家", 
			][state];
		},
		kuaidiChange(e) {
			this.kuaidiKey = e.detail.value;
			this.returnData.express_name = this.refundData.kuaidi[e.detail.value].code;
		},
		// 退款历史
		refundLog(id){
			this.$wanlshop.to(`/pages/user/refund/log?id=${id}`);
		},
		// 平台介入
		async arbitrationRefund(id){
			this.$api.get({
				url: '/wanlshop/refund/arbitrationRefund',
				data: {id:id},
				success: res => {
					this.loadData({id:id});
				}
			});
		},
		// 关闭退款
		async closeRefund(id){
			this.$api.get({
				url: '/wanlshop/refund/closeRefund',
				data: {id:id},
				success: res => {
					this.$store.commit('statistics/order', {
						customer: this.$store.state.statistics.order.customer - 1
					});
					this.loadData({id:id});
				}
			});
		},
		// 提交物流
		async toExpress(){
			if (!this.returnData.express_no) {
				this.$wanlshop.msg('运单号不能为空');
				return false;
			}
			if (!this.returnData.express_name) {
				this.$wanlshop.msg('请选择快递公司');
				return false;
			}
			this.$api.post({
				url: '/wanlshop/refund/toExpress',
				data: this.returnData,
				success: res => {
					this.loadData({id:res});
				}
			});
		},
		// 修改退款
		editRefund(id){
			this.$wanlshop.to(`/pages/user/refund/edit?id=${id}`);
		}
		
	}
};
</script>

<style>
	.tk-title-right{
		font-size: 27rpx;
		font-weight: 400;
		color: #999999;
		line-height: 37rpx;
	}
	.tk-title{
		font-size: 27rpx;
		font-weight: 400;
		color: #141414;
		line-height: 37rpx;
	},
	.wanl-refund .header {
		width: 100%;
		height: 180rpx;
		position: relative;
		/* background-color: #f72b36; */
	}
	
	.wanl-refund .header .img-bg {
		width: 100%;
		height: 180rpx;
	}
	
	.wanl-refund .header .content {
		width: 100%;
		height: 180rpx;
		position: absolute;
		z-index: 10;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 60rpx;
		box-sizing: border-box;
	}
	
	.wanl-refund .header .status-text {
		font-size: 34rpx;
		line-height: 34rpx;
		color: #FEFEFE;
	}
	
	.wanl-refund .header .reason {
		font-size: 24rpx;
		line-height: 24rpx;
		color: rgba(254, 254, 254, 0.75);
		padding-top: 15rpx;
		display: flex;
		align-items: center;
	}
	
	.wanl-refund .header .reason-text {
		padding-right: 12rpx;
	}
	
	.wanl-refund .header .status-img {
		width: 100rpx;
		height: 100rpx;
		display: block;
	}
	
	.wanl-refund .current .cu-btn{
		width: 140rpx;
		font-size: 26rpx;
		padding: 0 12rpx;
	}
	.wanl-refund .receipt{
		display: flex;
		align-items: center;
	}
	
	.wanl-refund .receipt .icon{
		margin-right: 25rpx;
		font-weight: bold;
	}
	.wanl-refund .receipt .content{
		flex: 1;
	}
	
	.wanl-refund .cu-form-group .title{
		padding-right: 25rpx;
		font-size: 28rpx;
		height: 55rpx;
		line-height: 55rpx;
	}
	.wanl-refund .cu-form-group input{
		font-size: 28rpx;
		color: #555;
		padding-right: 10rpx;
	}
	
	
</style>
