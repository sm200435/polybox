<template>
	<view class="orderDetail" style="min-height: 100vh;">
		<view class="edgeInsetTop"></view>
		<view class="wanl-order">
			<view class="address cu-list menu-avatar margin-bj radius-bock">
				<view class="cu-item">
					<view class="addressContent" v-if="addressData.address" @tap="userAddress()">
						<view class="text-sm wanl-pip text-cut">{{ addressData.province}} {{ addressData.city }}
							{{ addressData.district }} {{ addressData.address }}
						</view>
						<view style="font-size: 24rpx;font-weight: 400;color: #999999">
							<text class="wanl-pip margin-right-sm" style="color: #999999;">{{ addressData.name }}</text>
							<text class="wanl-gray-light text-sm">{{ addressData.mobile }}</text>
						</view>
					</view>
					<view class="content" @tap="addAddress('newadd')" v-else>
						<view class="text-sm wanl-pip text-cut">点击此处填写收货地址</view>
					</view>
					<view class="action" @tap="userAddress()"><text class="wlIcon-fanhui2 text-lg"></text></view>
				</view>
			</view>
			<view v-for="(shop, index) in orderData.lists" :key="index" class="lists bg-white margin-bj radius-bock">
				<view class="box">
					<view class="shopname">
						<view class="shopname-left">
							订单列表
						</view>
						<view class="shopname-right">共计{{ orderData.statis.allnum }}件</view>
					</view>
					<view class="cu-list menu-avatar">
						<view class="cu-item margin-bottom list-shop" v-for="(goods, key) in shop.products" :key="key">
							<view class="cu-avatar radius-bock"
								:style="{ backgroundImage: 'url(' + $wanlshop.oss(goods.image, 77, 77) + ')' }"></view>
							<view class="content">
								<view class="text-sm text-cut-2">{{ goods.title }}</view>
								<view class="wanl_sku text-sm">
									<text v-for="(item, skey) in goods.sku.difference" :key="skey">
										<block v-if="skey != 0">-</block>{{ item }}
									</text>
								</view>
							</view>
							<view class="action">
								<view class="wanl-pip text-sm text-price">{{ goods.sku.price }}</view>
								<view class="wanl-gray-light text-sm">x{{ goods.number }}</view>
							</view>
						</view>
					</view>
				</view>


				<form>
					<!-- <view class="cu-form-group" v-if="cartType">
						<view class="wanl-gray-light title">购买数量</view>
						<uni-number-box :min="1" :max="orderData.lists[0].products[0].sku.stock" :value="shop.number" @change="changeNum"></uni-number-box>
					</view> -->
					<view class="box-ky">
						<view class="cu-form-group list-height">
							<view class="title" style="font-weight: 500;font-size: 29rpx;color: #2D2D2D;">快递运费</view>
							<view class="picker" style="font-size: 29rpx;font-weight: 400;color: #141414;">{{shop.freight.name}} <text
									class="text-price margin-left-xs">{{shop.freight.price}}</text></view>
						</view>
						<view class="cu-form-group list-height" @tap="queryCoupon(index)">
							<view class="title"  style="font-weight: 500;font-size: 29rpx;color: #2D2D2D;">优惠券</view>
							<view class="picker">
								<block v-if="couponData[index]">
									<text class="wlIcon-youhuiquantuangou text-red margin-right-xs"></text>
									<block
										v-if="couponData[index].type == 'reduction' || (couponData[index].type == 'vip' && couponData[index].usertype == 'reduction')">
										<text>满{{Number(couponData[index].limit)}}减</text>
										￥{{Number(couponData[index].price)}}
									</block>
									<block
										v-if="couponData[index].type == 'discount' || (couponData[index].type == 'vip' && couponData[index].usertype == 'discount')">
										<text>满{{Number(couponData[index].limit)}}打</text>
										{{Number(couponData[index].discount)}} 折
									</block>
									<block v-if="couponData[index].type == 'shipping'">
										<text>满{{Number(couponData[index].limit)}}</text>包邮
									</block>
								</block>
								<block v-else>
									<text class="text-gray" style="font-size: 29rpx;">请选择</text>
								</block>
								<text class="wlIcon-fanhui2" style="margin-left: 15rpx;"></text>
							</view>
						</view>
					</view>
					
					<view class="cu-form-group align-start list-height" style="margin-bottom: 30rpx;align-items: center;">
						<view class="title" style="font-weight: 500;font-size: 29rpx;color: #2D2D2D;margin: 0;">支付方式</view>
						<view class="title" style="padding: 0;margin: 0;font-size: 29rpx;font-weight: 400;color: #141414;;">
							微信支付
						</view>
					</view>

					<view class="cu-form-group align-start">
						<view class="wanl-gray-light title" style="font-weight: 500;font-size: 29rpx;color: #2D2D2D;">备注</view>
						<textarea disable-default-padding maxlength="100" v-model="shop.remarks" placeholder="订单备注可选" style="height: 229.47rpx;"></textarea>
					</view>
				</form>
			</view>
			<view class="safeAreaBottom"> </view>
			<!-- 弹出层 -->
			<view class="WANL-MODAL text-sm" @touchmove.stop.prevent="moveHandle">
				<!-- 优惠券 -->
				<view class="cu-modal bottom-modal" :class="modalName == 'coupon' ? 'show' : ''" @tap="hideModal">
					<view class="cu-dialog bg-bgcolor" @tap.stop="">
						<view class="wanl-modal">
							<view class="head padding-bj">
								<view class="content" style="justify-content: space-around;">
									<view class="text-lg" :class="couponsStatus==0 ? 'text-lg-chose' : ''"
										@click="couponsStatus=0">可用优惠券</view>
									<view class="text-lg" :class="couponsStatus==1 ? 'text-lg-chose' : ''"
										@click="couponsStatus=1">不可用优惠券</view>
								</view>
								<view class="close wlIcon-31guanbi" @tap="hideModal"></view>
							</view>
							<scroll-view class="wanl-coupon scroll-y" scroll-y="true"
								v-if="couponIndex != null&&couponsStatus==0">
								<view v-for="(coupon, index) in orderData.lists[couponIndex].coupon" :key="index"
									:class="coupon.type" style="height: auto;"
									class="item margin-bottom-bj radius-bock">
									<!-- <image :src="$wanlshop.appstc('/coupon/bg_coupon_3x.png')" class="coupon-bg"></image> -->
									<!-- <image :src="$wanlshop.appstc('/coupon/img_couponcentre_received_3x.png')" class="coupon-sign" v-if="coupon.state"></image> -->
									<view class="item-left" style="height: auto;">
										<block
											v-if="coupon.type == 'reduction' || (coupon.type == 'vip' && coupon.usertype == 'reduction')">
											<view class="colour">
												<text class="text-price"></text>
												<text class="prices">{{Number(coupon.price)}}</text>
											</view>
											<view class="wanl-orange radius text-sm">
												满{{Number(coupon.limit)}}减{{Number(coupon.price)}}
											</view>
										</block>
										<block
											v-if="coupon.type == 'discount' || (coupon.type == 'vip' && coupon.usertype == 'discount')">
											<view class="colour">
												<text class="prices">{{Number(coupon.discount)}}</text>
												<text class="discount">折</text>
											</view>
											<view class="wanl-orange radius text-sm">
												满{{Number(coupon.limit)}}打{{Number(coupon.discount)}}折
											</view>
										</block>
										<!-- <block v-if="coupon.type == 'shipping'">
											<view class="colour">
												<text class="prices">包邮</text>
											</view>
											<view class="wanl-orange radius text-sm">
												满{{Number(coupon.limit)}}元包邮
											</view>
										</block> -->
									</view>


									<view class="item-right padding-bj" style="height: auto;">
										<!-- <view class="shop" @tap="onShop(coupon.shop_id)">
											<view class="name">
												<text class="wlIcon-dianpu margin-right-xs"></text> {{coupon.shop.shopname}}
											</view>
											<view>
												<text class="wlIcon-fanhui2"></text>
											</view>
										</view> -->
										<view class="title">
											<!-- <view class="cu-tag sm radius margin-right-xs tagstyle">
												{{coupon.type_text}}
											</view> -->
											<text class="text-cut wanl-gray text-min"
												style="color: #141414;font-size: 35rpx;font-weight: bold;">{{coupon.name}}</text>
										</view>
										<view class="content text-min" style="padding-top: 15rpx;">
											<view class="wanl-gray">
												<view v-if="coupon.pretype == 'fixed'">
													<text></text>有效期至 {{coupon.enddate}}
												</view>
												<view v-else-if="coupon.pretype == 'appoint' && coupon.validity != 0">
													<text></text>{{$wanlshop.timeFormat(coupon.createtime + coupon.validity * 86400)}}
													前有效
												</view>
												<view v-else>
													<text></text>未使用前 长期 有效
												</view>
											</view>
										</view>
										<view class="content text-min">
											<view class="wanl-bg-grey" style="padding-bottom: 11rpx;color: #F31064;">
												<text></text>{{coupon.rangetype_text}}
											</view>
											<view class="cu-btn sm round line-colour"
												style="background: rgba(243, 16, 100, 0.14);color: #F31064;"
												@tap="onCoupons(index)">
												<text v-if="preferentialFlag==index"> 已选择 </text>
												<text v-else> 立即使用 </text>
											</view>
											<!-- <view class="cu-btn sm round" @tap="onReceive(index)" v-else>
												立即领取
											</view> -->
										</view>
									</view>


									<!-- <view class="item-right padding-bj">
										<view class="title">
											<view class="cu-tag sm radius margin-right-xs tagstyle">
												{{coupon.type_text}}
											</view>
											<text class="text-cut wanl-gray text-min">{{coupon.name}}</text>
										</view>
										<view class="content text-min">
											<view class="wanl-gray">
												
												<view v-if="coupon.grant != '-1'">
													<text class="wlIcon-dot"></text>目前仅剩余 {{coupon.surplus}} 张
												</view>
												
												<view v-if="coupon.drawlimit != 0">
													<text class="wlIcon-dot"></text>每人仅限领取 {{coupon.drawlimit}} 张
												</view>
												<block v-if="coupon.pretype == 'fixed'">
													<view>
														<text class="wlIcon-dot"></text>生效 {{coupon.startdate}}
													</view>
													<view>
														<text class="wlIcon-dot"></text>结束 {{coupon.enddate}}
													</view>
												</block>
												<block v-if="coupon.pretype == 'appoint'">
													<view v-if="coupon.validity == 0">
														<text class="wlIcon-dot"></text>未使用前 永久 有效
													</view>
													<view v-else>
														<text class="wlIcon-dot"></text>领取后 {{coupon.validity}} 天有效
													</view>
												</block>
											</view>
											<view class="cu-btn sm round line-colour" @tap="onCoupons(index)" v-if="coupon.state" >
												<text v-if="coupon.choice"> 已选择 </text>
												<text v-else> 立即使用 </text>
											</view>
											<view class="cu-btn sm round" @tap="onReceive(index)" v-else>
												立即领取
											</view>
										</view>
									</view> -->
								</view>
							</scroll-view>
							<scroll-view class="wanl-coupon scroll-y" scroll-y="true"
								v-if="couponIndex != null&&couponsStatus==1">
								<view v-for="(coupon, index) in orderData.lists[couponIndex].coupon_no" :key="index"
									:class="coupon.type" style="height: auto;"
									class="item margin-bottom-bj radius-bock">
									<!-- <image :src="$wanlshop.appstc('/coupon/bg_coupon_3x.png')" class="coupon-bg"></image> -->
									<!-- <image :src="$wanlshop.appstc('/coupon/img_couponcentre_received_3x.png')" class="coupon-sign" v-if="coupon.state"></image> -->
									<view class="item-left" style="background-color: #F0F0F0;height: auto;">
										<block
											v-if="coupon.type == 'reduction' || (coupon.type == 'vip' && coupon.usertype == 'reduction')">
											<view class="colour" style="color: #999999;">
												<text class="text-price"></text>
												<text class="prices">{{Number(coupon.price)}}</text>
											</view>
											<view class="wanl-orange radius text-sm" style="color: #999999;">
												满{{Number(coupon.limit)}}减{{Number(coupon.price)}}
											</view>
										</block>
										<block
											v-if="coupon.type == 'discount' || (coupon.type == 'vip' && coupon.usertype == 'discount')">
											<view class="colour" style="color: #999999;">
												<text class="prices">{{Number(coupon.discount)}}</text>
												<text class="discount">折</text>
											</view>
											<view class="wanl-orange radius text-sm" style="color: #999999;">
												满{{Number(coupon.limit)}}打{{Number(coupon.discount)}}折
											</view>
										</block>
										<!-- <block v-if="coupon.type == 'shipping'">
											<view class="colour">
												<text class="prices">包邮</text>
											</view>
											<view class="wanl-orange radius text-sm">
												满{{Number(coupon.limit)}}元包邮
											</view>
										</block> -->
									</view>


									<view class="item-right padding-bj" style="height: auto;">
										<!-- <view class="shop" @tap="onShop(coupon.shop_id)">
											<view class="name">
												<text class="wlIcon-dianpu margin-right-xs"></text> {{coupon.shop.shopname}}
											</view>
											<view>
												<text class="wlIcon-fanhui2"></text>
											</view>
										</view> -->
										<view class="title">
											<!-- <view class="cu-tag sm radius margin-right-xs tagstyle">
												{{coupon.type_text}}
											</view> -->
											<text class="text-cut wanl-gray text-min"
												style="color: #141414;font-size: 35rpx;font-weight: bold;">{{coupon.name}}</text>
										</view>
										<view class="content text-min" style="padding-top: 15rpx;">
											<view class="wanl-gray">
												<view v-if="coupon.pretype == 'fixed'">
													<text></text>有效期至 {{coupon.enddate}}
												</view>
												<view v-else-if="coupon.pretype == 'appoint' && coupon.validity != 0">
													<text></text>{{$wanlshop.timeFormat(coupon.createtime + coupon.validity * 86400)}}
													前有效
												</view>
												<view v-else>
													<text></text>未使用前 长期 有效
												</view>
											</view>
										</view>
										<view class="content text-min">
											<view class="wanl-bg-grey" style="padding-bottom: 11rpx;color: #333333;">
												<text></text>{{coupon.rangetype_text}}
											</view>
											<view class="cu-btn sm round line-colour"
												style="background-color: #F0F0F0;">
												<text style="color: #999999;"> 立即使用 </text>
											</view>
											<!-- <view class="cu-btn sm round" @tap="onReceive(index)" v-else>
												立即领取
											</view> -->
										</view>
										<view class="coupons-reason">
											<text class="iconfont">&#xe6b3;</text>
											<view class="coupons-reason-text">订单总额需满¥{{coupon.limit}}</view>
										</view>
									</view>


									<!-- <view class="item-right padding-bj">
										<view class="title">
											<view class="cu-tag sm radius margin-right-xs tagstyle">
												{{coupon.type_text}}
											</view>
											<text class="text-cut wanl-gray text-min">{{coupon.name}}</text>
										</view>
										<view class="content text-min">
											<view class="wanl-gray">
												
												<view v-if="coupon.grant != '-1'">
													<text class="wlIcon-dot"></text>目前仅剩余 {{coupon.surplus}} 张
												</view>
												
												<view v-if="coupon.drawlimit != 0">
													<text class="wlIcon-dot"></text>每人仅限领取 {{coupon.drawlimit}} 张
												</view>
												<block v-if="coupon.pretype == 'fixed'">
													<view>
														<text class="wlIcon-dot"></text>生效 {{coupon.startdate}}
													</view>
													<view>
														<text class="wlIcon-dot"></text>结束 {{coupon.enddate}}
													</view>
												</block>
												<block v-if="coupon.pretype == 'appoint'">
													<view v-if="coupon.validity == 0">
														<text class="wlIcon-dot"></text>未使用前 永久 有效
													</view>
													<view v-else>
														<text class="wlIcon-dot"></text>领取后 {{coupon.validity}} 天有效
													</view>
												</block>
											</view>
											<view class="cu-btn sm round line-colour" @tap="onCoupons(index)" v-if="coupon.state" >
												<text v-if="coupon.choice"> 已选择 </text>
												<text v-else> 立即使用 </text>
											</view>
											<view class="cu-btn sm round" @tap="onReceive(index)" v-else>
												立即领取
											</view>
										</view>
									</view> -->
								</view>
							</scroll-view>
							<view class="foot padding-lr-bj"><button
									class="cu-btn bg-gradual-orange round text-bold complete"
									@tap="hideModal">完成</button></view>
						</view>
					</view>
				</view>
			</view>
			<view class="wanlian cu-bar tabbar solid-top foot text-df" style="position: fixed;left: 0;border: 0;justify-content: space-between;">
				<view style="padding-left: 25rpx;font-weight: 500;">
					合计：
					<text class="text-price text-orange">{{ orderData.statis.allsub }}</text>
					<view>
						<view v-if="couponData[couponIndex]" style="font-size: 22rpx;margin-top: 8rpx;">
							共优惠：
							<text class="text-price text-orange">{{ Number(couponData[couponIndex].price) }}</text>
						</view>
					</view>
				</view>
				<view>
					<button v-if="loading" class="cu-btn round lg bg-gradual-orange margin-lr-bj">
						<text class="wlIcon-jiazai wlIconfont-spin margin-right-xs"></text> 支付中...
					</button>
					<button v-else @tap="addOrder" class="cu-btn round lg bg-gradual-orange margin-lr-bj"> 立即支付 </button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				token: '',
				optionData: {},
				addressData: {},
				modalName: null, // 弹出层
				cartType: null,
				couponData: {},
				couponIndex: null,
				orderData: {
					lists: [],
					statis: {
						allnum: 1,
						allsub: 0
					}
				},
				couponsStatus: 0,
				preferentialFlag: -1
			};
		},
		onLoad(option) {
			console.log(option);
			console.log(this.loading, 8888888888888888888);
			this.optionData = JSON.parse(option.data);
			this.loadData();
			this.cartType = option.type;
		},

		// onshow(){
		// 	console.log(this.loading,8888888888888888888);
		// },
		methods: {
			loadData(address_id) {
				this.$api.post({
					url: '/wanlshop/order/getOrderGoodsList',
					loadingTip: '加载中',
					data: {
						data: this.optionData,
						address_id: address_id
					},
					success: res => {
						console.log("res", res);
						this.token = res.token;
						this.orderData = res.orderData;
						if (res.addressData) {
							this.addressData = res.addressData;
						} else {
							this.addAddress('newadd');
						}
					}
				});
			},
			// 提交订单
			async addOrder() {
				if (this.orderData.statis.allnum === 0) {
					this.$wanlshop.msg('订单异常')
					return;
				}
				let address_id = this.addressData.id;
				if (address_id === 0) {
					this.$wanlshop.msg('请填写地址')
					return;
				}
				let data = {
						lists: [],
						address_id: address_id
					},
					cart = [];
				this.orderData.lists.forEach((item, index) => {
					data.lists.push({
						shop_id: item.shop_id,
						remarks: item.remarks,
						products: [],
						//店铺优惠券和其他 在下追加
						coupon_id: this.couponData[index] ? this.couponData[index].id : 0
					});
					item.products.forEach(goods => {
						// 购物车数据
						cart.push({
							goods_id: goods.id,
							sku_id: goods.sku.id
						});
						// 商品数据
						data.lists[index].products.push({
							goods_id: goods.id,
							number: goods.number,
							sku_id: goods.sku.id,
							freight_id: goods.freight_id
						});
					});
				});
				this.loading = true;
				// 提交订单数据data
				this.$api.post({
					url: '/wanlshop/order/addOrder',
					data: {
						order: data,
						token: this.token
					},
					loadingTip: '提交订单中...',
					success: res => {
						this.$store.commit('statistics/order', {
							pay: this.$store.state.statistics.order.pay + res.list.length,
							whole: this.$store.state.statistics.order.whole + res.list.length
						});
						// 如果使用优惠券全局减去
						let coupon = Object.keys(this.couponData).length;
						if (coupon != 0) {
							this.$store.commit('statistics/dynamic', {
								coupon: this.$store.state.statistics.dynamic.coupon - coupon
							});
						}
						// 大厂软件，就是这么迷幻
						if (this.cartType == 'cart') {
							this.$store.dispatch('cart/del');
						}
						// uni.redirectTo({
						// 	url: `/pages/user/money/pay?token=${res.token}&data=${JSON.stringify(res.list)}`
						// })
						// 把当前商品id存到本地
						uni.setStorage({
							key: 'order_id',
							data: res.list[0].order_id,
						});
						// 获取小程序code
						uni.login({
							success: (e) => {
								this.wanlPay(res.list, res.token, e.code);
							},
							fail: (e) => {
								uni.showModal({
									content: "无法获取微信code,原因为: " + e.errMsg,
									showCancel: false
								})
							}
						})
						// #ifndef MP
						// // 如果是公众号获取code
						// this.wanlPay(data);
						// // #endif
					}
				});
			},
			async wanlPay(data, token, code = null) {
				this.$api.post({
					url: '/wanlshop/pay/payment',
					data: {
						order_type: data[0].type,
						type: 'wechat',
						method: 'miniapp',
						code: code,
						order_id: data[0].order_id,
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
			// 支付成功
			paySuccess(type) {
				uni.redirectTo({
					url:`/pages/page/success?type=pay&order_type=${type}`
				})
			},
			//支付失败
			payErr() {
				let id=uni.getStorageSync('order_id')
				uni.redirectTo({
					url:`/pages/user/order/details?id=${id}`
				})
			},
			//添加或修改成功之后回调
			async refreshList(data, type) {
				this.$api.post({
					url: '/wanlshop/address/address',
					data: {
						data: data,
						type: 'add'
					},
					success: res => {
						this.addressData = res;
						this.loadData()
					}
				});
			},
			// 查询优惠券，减缓服务器压力，单独查询（仅查询首次）
			async queryCoupon(index) {
				let data = this.orderData.lists[index];
				if (data.coupon.length == 0) {
					let goods_id = [];
					let shop_category_id = [];
					for (var i = 0; i < data.products.length; i++) {
						goods_id.push(data.products[i]['id']);
						shop_category_id.push(data.products[i]['shop_category_id']);
					};
					this.$api.post({
						url: '/wanlshop/coupon/new_query',
						data: {
							shop_id: data.shop_id,
							goods_id: this.unique(goods_id),
							shop_category_id: this.unique(shop_category_id),
							price: data.order_price
						},
						success: res => {
							data.coupon = res.type_ky;
							data.coupon_no = res.type_noky;
						}
					});
				}
				this.couponIndex = index;
				this.modalName = 'coupon';
			},
			// 领取优惠券
			async onReceive(index) {
				let coupon = this.orderData.lists[this.couponIndex].coupon[index];
				this.$api.post({
					url: '/wanlshop/coupon/receive',
					loadingTip: '领取中',
					data: {
						id: coupon.id
					},
					success: res => {
						coupon.id = res.id;
						coupon.state = true;
						this.$wanlshop.msg(res.msg);
						this.$store.commit('statistics/dynamic', {
							coupon: this.$store.state.statistics.dynamic.coupon + 1
						});
					}
				});
			},
			// 选中优惠券, 将优惠券放进数组中
			onCoupons(index) {
				console.log(index);
				this.preferentialFlag = index
				let order = this.orderData.lists[this.couponIndex];
				let data = this.orderData.lists[this.couponIndex].coupon;
				data[index].choice = !data[index].choice;
				// console.log(index,order,data,88888888);
				if (data[index].choice) {
					// 遍历取消掉其他选择的状态，for性能高于其他历遍
					for (var i = 0; i < data.length; i++) {
						if (i != index) {
							data[i].choice = false;
						}
					};
					// 更新选择
					this.couponData[this.couponIndex] = data[index];
					// @ 精度计算 this.$wanlshop.bcadd('0.132123',0.132123)
					// 满减计算
					if (data[index].type == 'reduction' || (data[index].type == 'vip' && data[index].usertype ==
							'reduction')) {
						order.freight.price = order.freight_price_bak;
						order.sub_price = this.$wanlshop.bcsub(this.$wanlshop.bcadd(order.order_price, order.freight
							.price), data[index].price);
						if (order.sub_price < 0) {
							order.sub_price = 0.01;
						}
					}
					// 折扣计算  前端出问题
					if (data[index].type == 'discount' || (data[index].type == 'vip' && data[index].usertype ==
							'discount')) {
						let discount = data[index].discount > 10 ? this.$wanlshop.bcdiv(data[index].discount, 100) : this
							.$wanlshop.bcdiv(data[index].discount, 10);
						order.freight.price = order.freight_price_bak;
						order.sub_price = this.$wanlshop.bcadd(this.$wanlshop.bcmul(order.order_price, discount), order
							.freight.price);
					}
					// 包邮计算
					if (data[index].type == 'shipping') {
						order.freight.price = 0;
						order.sub_price = order.order_price;
					}
				} else {
					// 恢复原价 1.0.2升级
					this.couponData = {};
					if (data[index].type == 'shipping') {
						order.freight.price = order.freight_price_bak;
					}
					order.sub_price = this.$wanlshop.bcadd(order.order_price, order.freight.price);
				}
				// 精度计算合计
				this.orderData.statis.allsub = 0;
				for (var i = 0; i < this.orderData.lists.length; i++) {
					this.orderData.statis.allsub = this.$wanlshop.bcadd(this.orderData.statis.allsub, this.orderData.lists[
						i].sub_price);
				};
				this.modalName = null;
			},
			// 修改数量
			// changeNum(num) {
			// 	num = num == 0 ? 1 : num;
			// 	this.orderData.lists[0].number = num;
			// 	this.orderData.lists[0].products[0].number = num;
			// 	this.orderData.statis.allnum = num;
			// 	// 计算价格
			// 	this.orderData.lists[0].sub_price = this.$wanlshop.bcmul(this.orderData.lists[0].products[0].sku.price,
			// 		num);
			// 	this.orderData.statis.allsub = this.$wanlshop.bcmul(this.orderData.lists[0].products[0].sku.price, num);
			// },
			addAddress(type) {
				this.$wanlshop.to(`/pages/user/address/addressManage?type=${type}`);
			},
			userAddress() {
				this.$wanlshop.to('/pages/user/address/address?source=1');
			},
			// 弹出层，暂时不需要但后续版本可能需要
			showModal(name) {
				this.modalName = name;
			},
			// 关闭弹出层
			hideModal() {
				this.modalName = null;
			},
			// 数组去重并字符串
			unique(arr) {
				return Array.from(new Set(arr)).join(',');
			},
			//禁止父元素滑动
			moveHandle() {}
		}
	};
</script>

<style lang="scss" scoped>
	.orderDetail {
		background-color: #F7F7F7
	}

	.text-lg-chose {
		color: #F31064;
	}

	.coupons-reason {
		width: 100%;
		margin-top: 16rpx;
		display: flex;
		align-items: center;
		padding-top: 16rpx;
		border-top: #F0F0F0 solid 2rpx;
		color: #F31064;
		font-size: 24rpx;

		.coupons-reason-text {
			color: #999999;
			margin-left: 10rpx;
		}
	}

	.wanl-order {
		width: 699rpx;
		// padding: 30rpx 25rpx 30rpx;
		margin: auto;
		overflow: hidden;
		.margin-bj{
			margin: 30rpx 0 0 0;
		}
		.cu-item {
			height: 148rpx;
			background: #FFFFFF;
			border-radius: 13rpx;

			.text-cut {
				width: 400rpx;
				margin-bottom: 12rpx;
				font-size: 29rpx;
				font-weight: 500;
			}

			.addressContent {
				position: absolute;
				top: 31rpx;
				left: 26rpx;
			}

			.action {
				margin-bottom: 50rpx;
			}
		}

		.lists {
			background: transparent;

			.box {
				border-radius: 13rpx;
				background-color: #FFFFFF;

				.shopname {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 30rpx 20rpx 30rpx 20rpx;
					margin: 0 !important;

					.shopname-left {
						font-size: 29rpx;
						font-weight: 500;
						color: #141414;
					}

					.shopname-right {
						font-size: 29rpx;
						font-weight: 400;
						color: #999999 !important;
					}
				}

				.list-shop {
					border-radius: 0 !important;
				}

				.wanl-gray-light {
					margin-top: 60rpx;
				}
			}
			
			.box-ky{
				margin-bottom: 30rpx;
				border-radius: 13rpx !important;
				background-color: #FFFFFF;
			}
			.cu-form-group{
				border-radius: 13rpx !important;
			}
			.list-height{
				height: 88.77rpx;
			}
		}
	}
</style>
