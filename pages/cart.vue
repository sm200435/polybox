<template>
	<view style="background: #f7f7f7;">
		<view v-if="show">
			<!-- 导航条 -->
			<view class="cu-custom" :style="{ height: $wanlshop.wanlsys().height + 'px' }">
				<view class="cu-bar fixed bg-bgcolor" :style="{
						height: $wanlshop.wanlsys().height + 'px',
						paddingTop: $wanlshop.wanlsys().top + 'px',
						backgroundColor: common.appStyle.cart_nav_color ? common.appStyle.cart_nav_color : '#ffffff',
						backgroundImage: 'url(' + $wanlshop.oss( common.appStyle.cart_nav_image, 0, 50, 1, 'transparent', 'png' ) + ')',
						color: common.appStyle.cart_font_color == 'light' ? '#ffffff' : '#333333'
					}">
					<view class="action" @tap="operate()">
						<text v-if="cart.operate">完成</text>
						<text v-else>管理</text>
					</view>
					<view class="content" :style="{ top: $wanlshop.wanlsys().top + 'px' }">
						购物车
						<text class="text-sm">（共{{ cart.cartnum }}件宝贝）</text>
					</view>
				</view>
			</view>
			<block v-if="cart.list.length > 0">
				<view class="wanl-cart-shop radius-bock margin-bj padding-bj" v-for="(item, index) in cart.list"
					:key="index">
					<!-- <view class="shop margin-bottom" @tap="onShop(item.shop_id)"> -->
				<!-- 	<view class="shop margin-bottom">
						店铺选择
						<view class="text-xxl margin-right-sm" @tap.stop="shopchoose(item)">
							<image src="../static/images/user/xuanze.png" style="width: 36rpx;height: 36rpx;" v-if="item.check"></image>
							<image src="../static/images/user/danxuan.png" style="width: 36rpx;height: 36rpx;" v-else></image>
							<text v-if="item.check" class="wlIcon-xuanze-danxuan wanl-orange"></text>
							<text v-else class="wlIcon-xuanze wanl-gray-light"></text>
						</view>
						<view class="shopname">
							<text class="wlIcon-dianpu1 margin-right-xs"></text>
							<text class="text-30">{{ item.shop_name }}</text>
						</view>
						<view class="info"><text class="wlIcon-fanhui2 margin-left-xs"></text></view>
					</view> -->
					<view class="wanl-cart-goods" v-for="(goods, keys) in item.products" :key="keys" v-if="goods.sku.stock!=0">
						<!-- 商品选择 -->
						<view class="text-xxl margin-right-sm" @tap="choose({ index: index, keys: keys })">
							<image src="../static/images/user/xuanze.png" style="width: 36rpx;height: 36rpx;" v-if="goods.checked"></image>
							<image src="../static/images/user/danxuan.png" style="width: 36rpx;height: 36rpx;" v-else></image>
							<!-- <text v-if="goods.checked" class="wlIcon-xuanze-danxuan wanl-orange"></text>
							<text v-else class="wlIcon-xuanze wanl-gray-light"></text> -->
						</view>
						<view class="picture" @tap="onGoods(goods.goods_id)">
							<image :src="$wanlshop.oss(goods.image, 100, 100, 1)" mode="aspectFill"></image>
						</view>
						<view class="content">
							<view class="text-cut-2 wanl-gray-dark text-lg" @tap="onGoods(goods.goods_id)">
								{{ goods.title }}
							</view>
							<view class="cu-tag wanl-gray opt" style="background-color: #ffffff;">
								规格：{{ goods.sku.difference.join(' ') }}
							</view>
							<view class="flex justify-between align-center">
								<view class="text-price wanl-orange text-lg">
									{{ goods.sku.price }}
								</view>
								
								<view class="wanl-numberBox solid">
									<view @tap="bcsub(goods)">
										<!-- <text class="wlIcon-jian round text-gray"></text> -->
										<image src="../static/images/user/jian.png" style="width: 40rpx;height: 40rpx;margin-top: 14rpx;"></image>
									</view>
									<view class="text-number" style="font-size: 24rpx;">
										<!-- {{ goods.number }}	 -->
										<input type="number" v-model="goods.number" :data-index="keys" @input="numberInput($event,goods)" @blur="numberBlur($event,goods)"/>
									</view>
									<view @tap="bcadd(goods)">
										<!-- <text class="wlIcon-tianjia round text-gray"></text> -->
										<image src="../static/images/user/jia.png" style="width: 40rpx;height: 40rpx;margin-top: 14rpx;"></image>
									</view>
								</view>
								<!-- <uni-number-box :min="1" :max="selectshop.stock" :value="goods.number" @change="changeNum" :keys=keys></uni-number-box> -->
							</view>
						</view>
					</view>
					<!-- 已失效没库存商品 -->
					<view v-if="item.products.some(item=> item.sku.stock==0)" style="font-size: 30rpx;font-weight: 600;color: #141414;line-height: 42rpx;margin: 36rpx 0 36rpx 0;">
						已失效商品
					</view>
					<view v-if="goods.sku.stock==0" class="wanl-cart-goods" v-for="(goods, keys) in item.products" :key="keys" style="position: relative;">
						<!-- 商品选择 -->
						<view class="text-xxl margin-right-sm" @tap="choose({ index: index, keys: keys })" v-if="cart.operate">
							<image src="../static/images/user/xuanze.png" style="width: 36rpx;height: 36rpx;" v-if="goods.checked"></image>
							<image src="../static/images/user/shi.png" style="width: 36rpx;height: 36rpx;" v-else></image>
							<!-- <text v-if="goods.checked" class="wlIcon-xuanze-danxuan wanl-orange"></text>
							<text v-else class="wlIcon-xuanze wanl-gray-light"></text> -->
						</view>
						<view class="text-xxl margin-right-sm" v-else>
							<image src="../static/images/user/shi.png" style="width: 36rpx;height: 36rpx;"></image>
						</view>
						<view class="picture" @tap="onGoods(goods.goods_id)" style="position: relative;">
							<view class="replenishment">
								补货中
							</view>
							<image :src="$wanlshop.oss(goods.image, 100, 100, 1)" mode="aspectFill" style="opacity: 0.4;"></image>
						</view>
						<view class="content" style="opacity: 0.4;">
							<view class="text-cut-2 wanl-gray-dark text-lg" @tap="onGoods(goods.goods_id)">
								{{ goods.title }}
							</view>
							<view class="cu-tag wanl-gray opt" style="background-color: #ffffff;">
								规格：{{ goods.sku.difference.join(' ') }}
							</view>
							<view class="flex justify-between align-center">
								<view class="text-price wanl-orange text-lg">
									{{ goods.sku.price }}
								</view>
							</view>
						</view>
					</view>
				</view>
			</block>
			<block class="margin-bj padding-bj" v-else>
				<wanl-empty src="/static/images/cart/wuCart.png" text="哎呀，购物车空空如也！">
					<template>
					<view @click="toAround" style="width: 471.01rpx;height: 78.5rpx;border-radius: 39.25rpx;background-color: #F60F60;color: white;line-height: 78.5rpx;">
						去购买
					</view>
					</template>
				</wanl-empty>
				<wanl-product :dataList="likeData" />
			</block>
			<uni-load-more :status="status" :content-text="contentText" />
			<!-- #ifdef APP-PLUS -->
			<view style="height: 100rpx;"></view>
			<!-- #endif -->
			<view class="safeAreaBottom"></view>
			<!-- 操作栏 -->
			<view v-if="cart.list.length!=0">
				<view class="wanl-cart-foot fixedView solid-top edit" v-if="cart.operate">
					<view class="flex align-center" @tap="toCartchoose()">
						<view class="text-xxl">
							<image src="../static/images/user/xuanze.png" style="width: 36rpx;height: 36rpx;" v-if="cart.status"></image>
							<image src="../static/images/user/danxuan.png" style="width: 36rpx;height: 36rpx;" v-else></image>
							<!-- <text v-if="cart.status" class="wlIcon-xuanze-danxuan wanl-orange"></text>
							<text v-else class="wlIcon-xuanze wanl-gray-light"></text> -->
						</view>
						<view class="margin-left-sm" style="font-size: 25rpx;">
							<text>{{ cart.status ? '取消' : '全选' }}</text>
						</view>
					</view>
					<view class="flex">
						<!-- <button v-if="cart.allnum == 0" class="cu-btn round line-gray">移动关注</button>
						<button v-else class="cu-btn round line-orange" @tap="move()">移动关注</button>
						<button class="cu-btn round line-orange" @tap="toEmpty()">快速清理</button> -->
						<button v-if="cart.list[0].products.every(item=>item.checked==false)" class="cu-btn round line-gray" style="width: 195rpx;height: 72rpx;font-size: 28rpx;background: #F31064;color: #ffffff;opacity: 0.4;">删除</button>
						<button v-else class="cu-btn round bg-gradual-orange" style="width: 195rpx;height: 72rpx;font-size: 28rpx;" @tap="toEmpty()">删除</button>
					</view>
				</view>
				<view class="wanl-cart-foot fixedView solid-top account" v-else>
					<view class="flex align-center" @tap="toCartchoose()">
						<view class="text-xxl">
							<image src="../static/images/user/xuanze.png" style="width: 36rpx;height: 36rpx;" v-if="cart.status"></image>
							<image src="../static/images/user/danxuan.png" style="width: 36rpx;height: 36rpx;" v-else></image>
							<!-- <text v-if="cart.status" class="wlIcon-xuanze-danxuan wanl-orange"></text>
							<text v-else class="wlIcon-xuanze wanl-gray-light"></text> -->
						</view>
						<view class="margin-left-sm" style="font-size: 25rpx;">
							<text>{{ cart.status ? '取消' : '全选' }}</text>
						</view>
					</view>
					<view class="text-sm text-right" style="display: flex;align-items: center;">
						<view>
							合计：
							<text class="text-price wanl-orange text-lg">{{ cart.allsum }} </text>
						</view>
						<view style="margin-left: 3rpx;"> (不含运费) </view>
					</view>
					<view class="flex">
						<button v-if="cart.allnum == 0" class="cu-btn round line-gray" style="font-size: 28rpx;height: 72rpx;width: 195rpx;background: #F31064;opacity: 0.4;color: #ffffff;">去结算</button>
						<button v-else class="cu-btn round bg-gradual-orange" style="font-size: 28rpx;height: 72rpx;width: 195rpx;" @tap="settlement()">
							去结算 ({{ cart.allnum }})
						</button>
					</view>
				</view>
			</view>
		</view>
		<view style="display: flex;justify-content: center;align-items: center;height: 100vh;" v-else>
			<view>
				<view style="text-align: center;">
					<view>
						<image src="/static/images/cart/暂未登录.png" mode="" style="width: 274.15rpx;height: 315.22rpx;"></image>
					</view>
					<view style="font-size: 24rpx;color: #999999;margin:36rpx 0 178rpx 0">
						登录后才能查看购物车哦
					</view>
				</view>
				
				<view class="cart_btn" @click="goLogin">立即登录</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex';
	export default {
		data() {
			return {
				reload: true,
				likeData: [],
				current_page: 1, //当前页码
				last_page: 1, //总页码
				status: 'loading',
				contentText: {
					contentdown: '',
					contentrefresh: '正在加载...',
					contentnomore: ''
				},
				show:true,//判断用户是否登录
			};
		},
		onReachBottom() {
			//判断是否最后一页
			if (this.current_page >= this.last_page) {
				this.status = 'noMore';
			} else {
				this.reload = false;
				this.current_page = this.current_page + 1; //页码+1
				this.status = 'loading';
				this.loadlikeData();
			}
		},
		computed: {
			...mapState(['cart', 'common'])
		},
		onShow() {
			let cart = uni.getStorageSync("wanlshop:cart");
			this.$api.post({
							url: '/wanlshop/cart/synchro',
							data: {
								cart: cart ? cart: null
							},
							success: res => {
								console.log(res);
							}
						});
			setTimeout(() => {
				uni.setNavigationBarColor({
					frontColor: this.$store.state.common.appStyle.cart_font_color == 'light' ?
						'#ffffff' :
						'#000000',
					backgroundColor: this.$store.state.common.appStyle.cart_nav_color
				});
			}, 200);
			// console.log("this.$store.state.user.isLogin",this.$store.state.user.isLogin);
			this.show=this.$store.state.user.isLogin
		},
		onLoad() {
			// 加载猜你喜欢
			this.loadlikeData();
		},
		methods: {
			numberBlur(e,val){
				console.log("val666",val.sku.stock);
				const {index}=e.currentTarget.dataset
				let cartList=this.cart.list
				// console.log("cartList[0].products[index].sku.stock",cartList[0].products[index].sku.stock);
				// console.log("cartList[0].products[index]66666666",cartList[0].products[index]);
				if(cartList[0].products[index].number==0){
					cartList[0].products[index].number=1
				}
				if(cartList[0].products[index].number>cartList[0].products[index].sku.stock){
					// this.$wanlshop.msg(`数量不能超过库存 ${cartList[0].products[index].sku.stock} 件`);
					uni.showModal({
						content: `商品最多还有 ${cartList[0].products[index].sku.stock} 件`,
						showCancel:false,
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
							}
						}
					});
					cartList[0].products[index].number=cartList[0].products[index].sku.stock
				}
				this.$store.dispatch('cart/zdyBcadd',cartList[0].products[index]);
			},
			numberInput(){
				
			},
			...mapActions({
				operate: 'cart/operate', // 管理购物车
				choose: 'cart/choose', // 选择商品
				shopchoose: 'cart/shopchoose', // 选择店铺
				bcadd: 'cart/bcadd', // 添加数量
				bcsub: 'cart/bcsub', // 减少数量
				move: 'cart/move', // 移动购物车
				settlement: 'cart/settlement', // 结算购物车
				del: 'cart/del' // 删除选中购物车
			}),
			async loadlikeData() {
				this.$api.get({
					url: '/wanlshop/product/likes?pages=cart',
					data: {
						page: this.current_page
					},
					success: res => {
						this.likeData = this.reload ? res.data : this.likeData.concat(res.data); //评论数据 追加
						this.current_page = res.current_page; //当前页码
						this.last_page = res.last_page; //总页码
						this.status = 'more';
					}
				});
			},
			// 禁止空购物车点击全选
			toCartchoose() {
				if (this.$store.state.cart.list.length == 0) {
					uni.showModal({
						content: '购物车没有任何宝贝，马上去选一个心仪的宝贝吧~',
						success: res => {
							if (res.confirm) {
								this.$wanlshop.on('/pages/category');
							}
						}
					});
				} else {
					this.$store.dispatch('cart/cartchoose');
				}
			},
			toEmpty() {
				uni.showModal({
					content: '是否删除商品？',
					confirmColor: '#F31064',
					success: res => {
						if (res.confirm) {
							this.$store.dispatch('cart/del');
						}
					}
				});
			},
			//逛逛分类
			toAround() {
				this.$wanlshop.on('/pages/category');
			},
			//判断是否登录
			onTabItemTap(e) {
				// console.log(this.$store.state.user.isLogin,12321321312);
				this.show=this.$store.state.user.isLogin
				if (this.$store.state.user.isLogin == false) {
					uni.navigateTo({
						url: '/pages/user/auth/auth'
					})
				}
			},
			// 点击去登录页面
			goLogin(){
				uni.navigateTo({
					url:'/pages/user/auth/auth'
				})
			},
			//商品规格修改数量
			// changeNum(val,index) {
			// 	console.log(val,index,123123213)
			// 	if (this.$store.state.cart.list[0].products[index].sku.stock) {
			// 		let num = parseInt(val);
			// 		if (num > this.$store.state.cart.list[0].products[index].sku.stock) {
			// 			this.$wanlshop.msg(`数量不能超过库存 ${this.$store.state.cart.list[0].products[index].sku.stock} 件`);
			// 			this.$store.state.cart.list[0].products[index].number = parseInt(this.$store.state.cart.list[0].products[index].sku.stock);
			// 		} else {
			// 			this.$store.state.cart.list[0].products[index].number = parseInt(val);
			// 		}
			// 	}
			// 	console.log(this.$store.state.cart.list[0].products[index].number,88888888)
			// 	uni.setStorageSync('wanlshop:cart',this.$store.state.cart.list);
			// },
		}
	};
</script>

<style>
	.text-number{
		text-align: center;
	}
	.wanl-gray-light {
		color: #eee;
	}

	.wanl-cart-shop {
		background-color: #ffffff;
	}

	/* #ifndef MP-ALIPAY */
	.wanl-cart-shop radio::before,
	.wanl-cart-shop checkbox::before {
		margin-top: -7px;
		right: 1px;
	}

	.wanl-cart-shop radio .wx-radio-input,
	.wanl-cart-shop checkbox .wx-checkbox-input,
	.wanl-cart-shop radio .uni-radio-input,
	.wanl-cart-shop checkbox .uni-checkbox-input {
		margin: 0;
		width: 16px;
		height: 16px;
	}

	/* #endif */
	.wanl-cart-shop checkbox-group {
		margin-right: 25rpx;
	}

	.wanl-cart-shop .shop {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.wanl-cart-shop .shop .shopname {
		position: absolute;
		display: flex;
		align-items: center;
		left: 60rpx;
	}

	.wanl-cart-shop .shop uni-checkbox .uni-checkbox-input {
		border: 1px solid #cccccc;
	}

	/* 商品 */
	.wanl-cart-goods {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
	}

	.wanl-cart-goods:last-child {
		margin-bottom: 18rpx;
	}

	.wanl-cart-goods .picture {
		width: 180rpx;
		height: 180rpx;
	}

	.wanl-cart-goods .picture image {
		width: 180rpx;
		height: 180rpx;
		overflow: hidden;
		border-radius: 20rpx;
	}

	/* 1.0.6升级 */
	.wanl-cart-goods .content {
		padding-left: 25rpx;
		width: 100%;
		overflow: hidden;
	}

	.wanl-cart-goods .content .opt {
		font-size: 24rpx;
		padding: 0;
		color: #000000;
		height: 32rpx;
		background-color: #f6f6f6;
		font-weight: 300;
		margin-top: 10rpx;
		margin-bottom: 25rpx;
		border-radius: 4rpx;
	}

	.wanl-cart-goods .content .opt text {
		padding-right: 6rpx;
		padding-left: 10rpx;
	}

	/* 操作条 */
	.wanl-cart-foot {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 997;
		min-height: 52px;
		background-color: #ffffff;
		padding: 0 25rpx;
	}

	.wanl-cart-foot.solid:after {}

	/* #ifndef MP-ALIPAY */
	.wanl-cart-foot radio:before,
	.wanl-cart-foot checkbox:before {
		margin-top: -7px;
		right: 1px;
	}

	.wanl-cart-foot radio .wx-radio-input,
	.wanl-cart-foot checkbox .wx-checkbox-input,
	.wanl-cart-foot radio .uni-radio-input,
	.wanl-cart-foot checkbox .uni-checkbox-input {
		margin: 0;
		width: 16px;
		height: 16px;
	}

	/* #endif */
	.wanl-cart-foot.account button {
		margin-left: 25rpx;
	}

	.wanl-cart-foot.edit button {
		margin-left: 20rpx;
	}

	.wanl-cart-foot.account .cu-btn {
		padding: 0 25rpx;
		font-size: 32rpx;
		height: 72rpx;
		margin-top: 6rpx;
		/* border-radius: 20rpx; */
	}

	.wanl-cart-foot.edit .cu-btn {
		padding: 0 30rpx;
		font-size: 24rpx;
		height: 56rpx;
	}

	.cart_btn {
		height: 80rpx;
		line-height: 80rpx;
		color: #ffffff;
		background: #F31064;
		width: 200px;
		font-size: 30rpx;
		text-align: center;
		margin: 0 auto;
		margin-bottom: 20px;
		border-radius: 39.25rpx;
	}
	.replenishment{
		width: 93rpx;
		height: 40rpx;
		font-size: 23rpx;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 40rpx;
		background: #141414;
		position: absolute;
		top: 70rpx;
		left: 50rpx;
		border-radius: 20rpx;
		opacity: 0.4;
		text-align: center;
	}
</style>
