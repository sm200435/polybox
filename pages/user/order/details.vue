<template>
	<view style="background: #f7f7f7;height: 100%;">
		<view class="edgeInsetTop"></view>
		<view class="wanl-order" style="padding-bottom: 120rpx;background-color: #f7f7f7;"> 
			<!-- 头部 -->
			<view class="header">
				<view class="content">
					<view>
						<view class="status-text">{{getStatusText(orderData.state)}}</view>
						<view class="reason"><text class="reason-text">{{orderData.statetime}}</text></view>
					</view>
				</view>
			</view>
			<!-- 详情 -->
			<view class="address cu-list menu-avatar">
				<!-- 物流状态 -->
				<navigator style="width: 699.28rpx;margin: auto;" open-type="navigate" app-id="wx6885acbedba59c14" target="miniProgram" :path="'pages/result/result?nu='+orderData.express_no+'&com='+orderData.express_name+'&querysource=third_xcx'">
					<view style="width: 100%;display: inline-flex; align-items: center;border-radius: 13rpx; padding: 20rpx 20rpx;background-color: #fff;" class="cu-item"  v-if="orderData.state != 7 && orderData.state != 1 && orderData.state != 2 && logisticsType">
						<view class="cu-avatar round wanl-bg-blue"><text class="wlIcon-yunshuzhong"></text></view>
						<view class="content" style="flex: 1;margin-left: 20rpx;">
							<view>
								<text class="text-cut-2 text-sm wanl-pip">{{orderData.logistics.status}} - {{orderData.logistics.context}}</text>
							</view>
							<view class="wanl-gray">
								<text class="text-sm">{{orderData.logistics.time}}</text>
							</view>
						</view>
						<view class="action">
							<text class="wlIcon-fanhui2 wanl-gray"></text>
						</view>
					</view>
				</navigator>
				<!-- 地址 -->
				<view class="cu-item" style="padding: 0;" v-if="orderData.state!=3">
					<view class="content" style="left: 0 !important;width: 100%;height: 100%;">
						<view style="overflow: hidden;right: 20rpx;position: absolute;right: 20rpx;top: 90rpx;font-size: 25rpx;">
							<text class="wanl-pip margin-right-sm">{{orderData.address.name}}</text>
							<text class="wanl-gray text-sm">{{orderData.address.mobile}}</text>
						</view>
						<view style="width: 100%;display: flex;justify-content: space-between;position: absolute;right: 0;top: 20rpx;">
							<view style="font-size: 25rpx;font-weight: 400;color: #999999;line-height: 36rpx;padding-left: 20rpx;">
								详细地址
							</view>
							<view class="wanl-pip text-cut-2 text-sm" style="width: 50%;font-size: 25rpx;">
								{{orderData.address.address.replace(/\//g,' ')}}
								<text class="margin-left-xs" v-if="orderData.address.address_name">（{{orderData.address.address_name}}）附近</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="lists bg-white"  v-if="orderData.order_no" style="border-bottom: 2rpx #E0E0E0 solid;margin-top: 30rpx;border-radius: 13rpx 13rpx 0 0;">
				<view class="cu-list menu-avatar" style="padding: 30rpx 0 0;">
					<block v-for="(item, index) in orderData.goods" :key="item.id">
						<view class="cu-item">
							<view class="cu-avatar radius" :style="{ backgroundImage: 'url(' + $wanlshop.oss(item.image, 77, 77) + ')' }" @tap="onGoods(item.goods_id)"></view>
							<view class="content" @tap="onGoods(item.goods_id)">
								<view class="text-cut-2">{{item.title}}</view>
								<view class="wanl_sku text-sm" style="margin-top: 15rpx;">
									<text class="wanl-gray-dark">{{item.difference}}</text>
								</view>
							</view>
							<view class="action text-sm">
								<view class="wanl-gray text-price">{{item.price}}</view>
								<view class="wanl-gray">x {{item.number}}</view>
								<view class="text-orange">实付 <text class="text-price">{{item.actual_payment}}</text></view>
							</view>
						</view>
						<view style="text-align: right;margin-right: 30rpx;margin-bottom: 20rpx;">
							<view class="tui" style="margin-right: 10rpx;" @tap="$wanlshop.auth('/pages/user/invoice/message')" v-if="orderData.state == 2 || orderData.state == 3 || orderData.state == 4 || orderData.state == 6 ">开具发票</view>
							<!-- 1.0.2升级 取消订单后去掉退款按钮 -->
							<view class="tui" @tap="onRefund(orderData.id, item.refund_status, item.refund_id, index)" v-if="orderData.state == 2 || orderData.state == 3 || orderData.state == 4 || orderData.state == 6 "> {{getRefund(item.refund_status)}}</view>
						</view>
					</block>
				</view>
				<!-- 价格信息 -->
				<!-- <view class="price padding-lr-bj padding-bottom-bj text-sm">
					<view style="margin: 15rpx 0;"> <text> 商品总价 </text> <text class="text-price"> {{orderData.pay.order_price}} </text> </view>
					<view style="margin: 15rpx 0;"> <text> 运费 </text> <text class="text-price"> {{orderData.pay.freight_price}} </text> </view>
					<view style="margin: 15rpx 0;"> <text> 优惠</text> <text class="text-price"> {{orderData.pay.discount_price}} </text> </view>
					<view style="margin: 15rpx 0;"> <text> 总价 </text> <text class="text-price"> {{orderData.pay.price}} </text> </view>
					<view style="margin: 15rpx 0;" class="text-sm" v-if="orderData.pay.actual_payment != 0"> <text> 实付款 </text> <text class="text-price wanl-orange"> {{orderData.pay.actual_payment}} </text> </view>
				</view> -->
			</view>
			
			<view class="lists bg-white"  v-if="orderData.order_no" style="border-radius: 0rpx 0rpx 13rpx 13rpx;padding-top: 30rpx;">
				<view class="price padding-lr-bj padding-bottom-bj text-sm">
					<view style="padding: 15rpx 0;"> <text class="grayTitle"> 商品总价 </text> <text class="text-price"> {{orderData.pay.order_price}} </text> </view>
					<view style="margin: 15rpx 0;"> <text class="grayTitle"> 运费 </text> <text class="text-price"> {{orderData.pay.freight_price}} </text> </view>
					<view style="margin: 15rpx 0;"> <text class="grayTitle"> 优惠</text> <text class="text-price"> {{orderData.pay.discount_price}} </text> </view>
					<view style="margin: 15rpx 0;"> <text class="grayTitle"> 实付款 </text> <text class="text-price"> {{orderData.pay.price}} </text> </view>
					<view style="margin: 15rpx 0;" class="text-sm" v-if="orderData.pay.actual_payment != 0"> <text> 实付款 </text> <text class="text-price wanl-orange"> {{orderData.pay.actual_payment}} </text> </view>
				</view>
			</view>
			
			
			<view class="order bg-white margin-top-bj padding-bj" v-if="orderData.order_no" style="width: 687rpx;height: 286rpx;background: #FFFFFF;border-radius: 13rpx;margin: 30rpx auto 30rpx;">
				<view class="title" @tap="toMore">
					<view class="text-sm">订单详情</view>
				</view>
				<view class="text-sm">
					<view class="item">
						<view class="wanl-gray" style="width: 160rpx">订单编号：</view>
						<view> {{orderData.order_no}} </view>
					</view>
					<view class="item">
						<view class="wanl-gray" style="width: 160rpx">支付交易号：</view>
						<view> {{orderData.pay.pay_no}} </view>
					</view>
					<view class="item">
						<view class="wanl-gray" style="width: 160rpx">创建时间：</view>
						<view> {{orderData.createtime_text}} </view>
					</view>
					<block v-if="infoMore">
						<view class="item" v-if="orderData.paymenttime">
							<view class="wanl-gray-dark" style="width: 160rpx">付款时间：</view>
							<view> {{orderData.paymenttime_text}} </view>
						</view>
						<view class="item" v-if="orderData.delivertime">
							<view class="wanl-gray-dark" style="width: 160rpx">发货时间：</view>
							<view> {{orderData.delivertime_text}} </view>
						</view>
						<view class="item" v-if="orderData.taketime">
							<view class="wanl-gray-dark" style="width: 160rpx">收货时间：</view>
							<view> {{orderData.taketime_text}} </view>
						</view>
					</block>
				</view>
				<!-- <view class="foot solid-top" >
					<view @tap="toChat(orderData.shop_id)">
						<text class="wlIcon-xiaoxizhongxin text-sm"></text>联系卖家
					</view>
				</view> -->
			</view>
			<view class="wanl-cart-foot fixedView solid-top account" style="align-items: flex-start;padding-top: 15rpx;height: 150rpx; !important" v-if="orderData.state==1">
				<view class="text-sm text-right" style="display: flex;align-items: center;flex-direction: column;">
					<view style="margin-bottom: 8rpx;">
						<text style="font-size: 28rpx;font-weight: 500;">合计 </text>
						<text class="text-price wanl-orange" style="font-weight: 500;margin-left: 6rpx;"> {{orderData.pay.price}}</text>
					</view>
					<view style="font-size: 22rpx;">
						共优惠 
						<text class="text-price wanl-orange" style="margin-left: 6rpx;"> {{orderData.pay.discount_price}}</text>
					</view>
				</view>
				<view class="flex">
					<button class="cu-btn round bg-gradual-orange" style="font-size: 28rpx;height: 72rpx;width: 195rpx;" @tap="paymentOrder()">
						立即支付
					</button>
				</view>
			</view>
			<!-- <view class="order bg-white padding-bj" @tap="toChat(orderData.shop_id)">
				<view class="wlIcon-kefu" style="text-align: center;font-size: 33rpx;">联系卖家</view>
			</view> -->
			
			<view class="edgeInsetBottom"> </view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			orderData: {
				order_no: '',
				address: {
					name: '加载中...',
					mobile: '',
					address: '',
					address_name: ''
				},
				logistics: {
					context: '',
					status: '',
					time: ''
				},
				statetime: '',
				state:1
			},
			logisticsType: false,
			infoMore: false,
			order_id:-1
		};
	},
	onLoad(option) {
		this.order_id=option.id
		this.loadData({id:option.id});
	},
	methods: {
		// 立即支付
		paymentOrder(){
			let token=""
			let code=""
			// 获取token
			this.$api.post({
				url: '/wanlshop/pay/getPay',
				data: {
					order_id: this.order_id,
					order_type: "goods"
				},
				success: res => {
					console.log("res",res);
					token = res.token;
					// 获取code
					uni.login({
						success: (e) => {
							code=e.code
							this.$api.post({
								url: '/wanlshop/pay/payment',
								data: {
									order_type: "goods",
									type: 'wechat',
									method: 'miniapp',
									code: code,
									order_id: this.order_id,
									token: token
								},
								success: res => {
									// 微信小程序支付
									uni.requestPayment({
										appId: res.appId,
										nonceStr: res.nonceStr,
										package: res.package,
										paySign: res.paySign,
										signType: res.signType,
										timeStamp: res.timeStamp,
										success: (e) => {
											this.paySuccess(data[0].type);
										},
										fail: (e) => {
											// uni.showModal({
											//     content: "支付失败,原因为: " + e.errMsg,
											//     showCancel: false,
											// })
											this.payErr(data, token, code);
										}
									})
								}
							});
						},
						fail: (e) => {
							uni.showModal({
								content: "无法获取微信code,原因为: " + e.errMsg,
								showCancel: false
							})
						}
					})
				}
			});	
		},
		// 获取订单
		async loadData(data) {
			this.$api.get({
				url: '/wanlshop/order/getOrderInfo',
				data: data,
				success: res => {
					this.orderData = res;
					this.logisticsType = true;
					if(res.state == 0){
						this.orderData.statetime = '剩余时间0';
					}else if(res.state == 1){
						var diff = (res.createtime + res.config.cancel * 86400) - Date.parse(new Date()) / 1000;
						var days = Math.floor(diff / 86400);
						var hours = Math.floor(diff % 86400 / 3600); 
						var minutes = Math.floor(diff % 86400 % 3600 / 60);
						console.log("minutes",minutes);
						if (minutes => 0) {
							this.orderData.statetime = '还剩' +minutes+ '分自动关闭订单';
							this.orderData.state=1
						}
						if(minutes<0){
							this.orderData.statetime = '订单已经关闭';
							this.orderData.state=8
						}
						if (hours > 0) {
							this.orderData.statetime = '还剩' +hours+ '天' +minutes+ '分自动关闭订单';
						}
						if (days > 0) {
							this.orderData.statetime = '还剩' +days+ '天' +hours+ '小时' +minutes+ '分自动关闭订单';
						}
					}else if(res.state == 2){
						this.orderData.statetime = '等待卖家发货';
					}else if(res.state == 3){
						var diff = (res.delivertime + res.config.receiving * 86400) - Date.parse(new Date()) / 1000;
						var days = Math.floor(diff / 86400);
						var hours = Math.floor(diff % 86400 / 3600); 
						var minutes = Math.floor(diff % 86400 % 3600 / 60);
						if (minutes > 0) {
							this.orderData.statetime = '还剩' +minutes+ '分自动确认收货';
						}
						if (hours > 0) {
							this.orderData.statetime = '还剩' +hours+ '天' +minutes+ '分自动确认收货';
						}
						if (days > 0) {
							this.orderData.statetime = '还剩' +days+ '天' +hours+ '小时' +minutes+ '分自动确认收货';
						}
					}else if(res.state == 4){
						var diff = (res.taketime + res.config.comment * 86400) - Date.parse(new Date()) / 1000;
						var days = Math.floor(diff / 86400);
						var hours = Math.floor(diff % 86400 / 3600); 
						var minutes = Math.floor(diff % 86400 % 3600 / 60);
						if (minutes > 0) {
							this.orderData.statetime = '还剩' +minutes+ '分自动评论';
						}
						if (hours > 0) {
							this.orderData.statetime = '还剩' +hours+ '天' +minutes+ '分自动评论';
						}
						if (days > 0) {
							this.orderData.statetime = '还剩' +days+ '天' +hours+ '小时' +minutes+ '分自动评论';
						}
					}else if(res.state == 6){	
						this.orderData.statetime = res.dealtime_text;
					}else if(res.state == 7){	
						this.orderData.statetime = '订单已取消';
					}
				}
			});
		},
		getImg(status) {
			return ["img_order_payment3x.png", "img_order_send3x.png", "img_order_received3x.png", "img_order_signed3x.png", "img_order_closed3x.png", "img_order_signed3x.png", "img_order_closed3x.png"][status - 1];
		},
		getStatusText(status) {
			return ["等待您付款", "付款成功", "待收货", "待评论", "退款订单", "订单已完成", "交易关闭","超时未支付"][status - 1];
		},
		getRefund(status) {
			return ["退款", "退款中", "待退货", "退款完成", "退款关闭", "退款被拒"][status];
		},
		/**
		 * 进入退款
		 * @param {Object} order_id 订单ID 
		 * @param {Object} status 售后状态:0=未退款,1=退款中,2=待退货,3=退款完成
		 */
		onRefund(order_id, refund_status, refund_id, index){
			if (refund_status == 0) { //申请退款
				uni.redirectTo({
					url:`/pages/user/refund/apply?data=${JSON.stringify({
						order_id: this.orderData.id,
						order_type: 'goods',
						goods: this.orderData.goods[index],
						freight_type: this.orderData.freight_type,
						discount_price: this.orderData.pay.discount_price,
						goods_number: this.orderData.goods.length
					})}`
				})
			}else{ // 查看详情
				this.$wanlshop.to(`/pages/user/refund/details?id=${refund_id}`);
			}
		},
		// 折叠项
		toMore(){
			this.infoMore = !this.infoMore;
		},
		//返回首页
		toSho(){
			this.$wanlshop.on('/pages/index');
		}
	}
};
</script>

<style>
	.page{
		height: 100%;
	}
	.wanl-order .header {
		width: 100%;
		height: 150rpx;
		position: relative;
	
	}
	
	.wanl-order .header .content {
		width: 100%;
		position: absolute;
		z-index: 10;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 13rpx 30rpx 30rpx;
		box-sizing: border-box;
	}
	
	.wanl-order .header .status-text {
		font-size: 42rpx;
		font-weight: 500;
		color: #141414;
		line-height: 59rpx;
	}
	
	.wanl-order .header .reason {
		font-size: 24rpx;
		line-height: 24rpx;
		padding-top: 6rpx;
		display: flex;
		align-items: center;
	}
	
	.wanl-order .header .reason-text {
		padding-right: 12rpx;
		font-size: 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #141414;
		line-height: 42rpx;
	}
	
	.cu-list.menu-avatar>.cu-item .action view+view{
		margin-top: 15rpx;
	}
	
	.wanl-order .header .status-img {
		width: 100rpx;
		height: 100rpx;
		display: block;
	}
	
	.tui{
		position: relative;
		/* border: 0rpx; */
		display: inline-flex;
		align-items: center;
		justify-content: center;
		/* box-sizing: border-box; */
		/* padding: 0 30rpx; */
		font-size: 25rpx;
		width: 140rpx;
		height: 54rpx;
		line-height: 1;
		text-align: center;
		text-decoration: none;
		border: 2rpx solid #999999; 
		border-radius: 40rpx;
		background-color: white;
		overflow: visible;
		margin-left: initial;
		/* transform: translate(0rpx, 0rpx); */
	}
	
	.lists{
		width: 687rpx;
		background: #FFFFFF;
		margin: auto;
	}
	.wanl-order .lists .shopname {
	    margin: 25rpx 25rpx 30rpx 25rpx;
	}
	.wanl-order .lists .price>view{
		display: flex;
		align-items: center;
		justify-content:space-between;
		height: 40rpx;
	}
	
	.wanl-order .lists .cu-btn{
		font-size: 22rpx;
		padding: 0 14rpx;
	}
	
	
	
	
	.cu-list.menu-avatar>.cu-item{
		width: 687rpx;
		height: 145rpx;
		background: #FFFFFF;
		border-radius: 13rpx;
		margin: auto;
	}
	.cu-list.menu-avatar>.cu-item .content{
		line-height: 1.4;
	}
	
	.wanl-order .order .title{
		display: flex;
		align-items: center;
		justify-items: center;
		justify-content: space-between;
	}
	.wanl-order .order .item{
		display: flex;
		justify-content: space-between;
		padding-top: 30rpx;
	}
	.wanl-order .order .foot{
		display: flex;
		justify-content: space-around;
		justify-items: center;
		align-items: center;
		padding-top: 25rpx;
		margin-top: 20rpx;
	}
	.wanl-order .order .foot text[class*="wlIcon-"]{
		color: #0081FF;
		margin-right: 10rpx;
		font-size: 32rpx;
	}
	
	.grayTitle{
		font-weight: 400;
		color: #848689;
	}
	
	.wanl-cart-foot.account button {
		margin-left: 25rpx;
	}
	
	.wanl-cart-foot.account .cu-btn {
		padding: 0 25rpx;
		font-size: 32rpx;
		height: 72rpx;
		margin-top: 6rpx;
		/* border-radius: 20rpx; */
	}
	
	.wanl-cart-foot {
		width: 100%;
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 997;
		min-height: 52px;
		background-color: #ffffff;
		padding: 0 25rpx;
	}
</style>
