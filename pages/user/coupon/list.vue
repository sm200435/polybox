<template>
	<view class="wanl-order-list" style="background: url(https://www.duomeihe.shop/uploads/20230327/lexiang.png) no-repeat 0 0rpx;;background-size: 100% 100%;padding-top: 42vh;">
		<view class="wanl-order-nav">
			<view @click="retreat">
				<image src="/static/images/user/left.png" mode="" style="width: 48rpx;height: 48rpx;"></image>
			</view>
			<view style="margin-right: 20rpx;padding-top: 6rpx;box-sizing: border-box;">
				领券中心
			</view>
			<view> 
			</view>
		</view>
		<!-- <image class="mytest" src="../../../static/images/bg.png" mode="scaleToFill"></image> -->
		<!-- <view class="navbar">
			<view class="nav-item text-df" v-for="(item, index) in navList" :key="index" :class="{ current: tabCurrentIndex === index }" @tap="tabClick(index)"> {{ item.text }} </view>
		</view> -->
		<swiper :current="tabCurrentIndex" duration="300" @change="changeTab" style="padding-bottom: 2rpx;height: 100%;">
			<swiper-item class="tab-content" v-for="(tag, key) in navList" :key="key">
				<!-- <scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData"> -->
					<!-- 空白页 -->
					<wanl-empty text="没有找到任何优惠券" src="ticket_default3x"
						v-if="tag.loaded === true && tag.cardList.length === 0" />
					<!-- 订单列表 -->
					<view class="wanl-coupon">
						<view v-for="(coupon, seat) in tag.cardList" :key="seat" :class="coupon.type"
							class="item margin-bj radius-bock borders" @tap="onDetails(coupon)">
							<!-- <image :src="$wanlshop.appstc('/coupon/bg_coupon_3x.png')" class="coupon-bg"></image> -->
							<image :src="$wanlshop.appstc('/coupon/img_couponcentre_received_3x.png')"
								class="coupon-sign" v-if="coupon.state"></image>
							<view class="item-left lef" style="background-color: white;">
								<block
									v-if="coupon.type == 'reduction' || (coupon.type == 'vip' && coupon.usertype == 'reduction')">
									<view class="colour">
										<text class="text-price"></text>
										<text class="price">{{Number(coupon.price)}}</text>
									</view>
									<view class="wanl-orange radius text-sm">
										满{{Number(coupon.limit)}}减{{Number(coupon.price)}}
									</view>
								</block>
								<block
									v-if="coupon.type == 'discount' || (coupon.type == 'vip' && coupon.usertype == 'discount')">
									<view class="colour">
										<text class="price">{{Number(coupon.discount)}}</text>
										<text class="discount">折</text>
									</view>
									<view class="wanl-orange radius text-sm">
										满{{Number(coupon.limit)}}打{{Number(coupon.discount)}}折
									</view>
								</block>
								<block v-if="coupon.type == 'shipping'">
									<view class="colour">
										<text class="price">包邮</text>
									</view>
									<view class="wanl-orange radius text-sm">
										满{{Number(coupon.limit)}}元包邮
									</view>
								</block>
								<block
									v-if="coupon.type == 'vip' || (coupon.type == 'vip' && coupon.usertype == 'vip')">


								</block>
							</view>
							<view class="item-right padding-bj" style="background-color: white;">
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
								<view class="content text-min">
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
								<view class="people">
									新人福利
								</view>
								<view class="content text-min">
									<view style="padding-bottom: 11rpx;">
										<text></text>{{coupon.rangetype_text}}
									</view>
									<view class="cu-btn sm round " @tap.stop="onReceive(key,seat)" v-if="coupon.is_lin==0">
										立即领取
									</view>
									<view class="cu-btn sm round line-colour"
										style="background: rgba(243, 16, 100, 0.14);color: #F31064;"
										@tap.stop="onApply(coupon.id)" v-else>
										立即使用
									</view>
								</view>
							</view>
						</view>
					</view>
					<uni-load-more :status="tag.loadingType" :content-text="contentText" />
					<view class="edgeInsetBottom"></view>
				<!-- </scroll-view> -->
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabCurrentIndex: 0,
				navList: [
					// {
					// 	type: 'reduction',
					// 	text: '满减券',
					// 	loadingType: 'more',
					// 	current_page: 1,
					// 	cardList: []
					// },
					// {
					// 	type: 'discount',
					// 	text: '折扣券',
					// 	loadingType: 'more',
					// 	current_page: 1,
					// 	cardList: []
					// },
					// {
					// 	type: 'shipping',
					// 	text: '包邮券',
					// 	loadingType: 'more',
					// 	current_page: 1,
					// 	cardList: []
					// },
					{
						type: 'vip',
						text: '新人优惠券',
						loadingType: 'more',
						current_page: 1,
						cardList: []
					}
				],
				contentText: {
					contentdown: ' ',
					contentrefresh: '正在加载...',
					contentnomore: ''
				}
			};
		},
		onLoad(options) {
			this.loadData();
		},
		methods: {
			retreat(){
				uni.navigateBack({
					delta:1
				})
			},
			//swiper 切换
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
				this.loadData('tabChange');
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			//获取订单列表
			async loadData(source) {
				//这里是将订单挂载到tab列表下
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				let type = navItem.type;
				//判断是否最后一页
				if (navItem.loadingType == 'noMore') {
					return;
				}
				//tab切换只有第一次需要加载数据
				if (source === 'tabChange' && navItem.loaded === true) {
					return;
				}
				//防止重复加载
				if (navItem.loadingType === 'loading') {
					return;
				}
				navItem.loadingType = 'loading';
				// 获取列表
				this.$api.get({
					url: '/wanlshop/coupon/getList',
					data: {
						type: type,
						page: navItem.current_page
					},
					success: res => {
						// console.log(res, 324324432432);
						navItem.current_page = res.current_page; //当前页码
						if (res.last_page === res.current_page) {
							navItem.loadingType = 'noMore';
						} else {
							navItem.loadingType = 'more';
							navItem.current_page++;
						}
						let cardList = res.data.filter(item => {
							item = Object.assign(item, {
								state: false
							});
							return item.type === type;
						});
						cardList.forEach(item => {
							navItem.cardList.push(item);
						});
						//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
						this.$set(navItem, 'loaded', true);
					}
				});
			},
			// 领取优惠券
			async onReceive(key, seat) {
				let coupon = this.navList[key].cardList[seat];
				this.$api.post({
					url: '/wanlshop/coupon/receive',
					loadingTip: '领取中',
					data: {
						id: coupon.id
					},
					success: res => {
						console.log(res, 213123123123123);
						coupon.id = res.id;
						coupon.is_lin = 1;
						this.$wanlshop.msg(res.msg);
						this.$store.commit('statistics/dynamic', {
							coupon: this.$store.state.statistics.dynamic.coupon + 1
						});
					}
				});
			},
			onApply(id) {
				uni.switchTab({
					url:'/pages/category'
				})
				// this.$wanlshop.to(`/pages/user/coupon/apply?id=${id}&state=true`);
			},
			onDetails(data) {
				// this.$wanlshop.to(`/pages/user/coupon/details?data=${JSON.stringify(data)}`);
			}
		}
	};
</script>

<style>
	page {
		height: 100%;
	}
	.wanl-order-nav{
		color: white;
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		display: flex;
		width: 100%;
		height: 10vh;
		background-color: #e53a53;
		justify-content: space-between;
		padding: 6vh 20rpx 0 0rpx;
	}
	.mytest {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: -1;
	}

	.borders {
		border-style: solid;
		border-width: 1rpx;
		border-color: #F31064;
	}

	.lef {
		border-right-style: dashed;
		border-width: 2px;
		border-color: #F31064;
	}

	.people {
		width: 79rpx;
		height: 35rpx;
		background: #F31064;
		border-radius: 0rpx 0rpx 0rpx 12rpx;
		position: absolute;
		top: 0;
		right: 0;
		color: white;
		font-size: 14.49rpx;
		text-align: center;
		line-height: 35rpx;
	}
page {
	height: 100%;
}
.mytest{
   position: absolute;
   width:100%;
   height:100%;
   z-index:-1;
}
.borders{
	border-style: solid;
	border-width: 1rpx;
	border-color: #F31064;
}
.people{
	width: 79rpx;
	height: 35rpx;
	background: #F31064;
	border-radius: 0rpx 0rpx 0rpx 12rpx;
	position: absolute;
	top: 0;
	right: 0;
	color: white;
	font-size: 14.49rpx;
	text-align: center;
	line-height: 35rpx;
}
</style>
