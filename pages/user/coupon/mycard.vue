<template>
	<view class="wanl-order-list" style="background: #f7f7f7;">
		<view class="navbar" style="background: white;padding-bottom: 8rpx;">
			<view class="nav-item" style="font-size: 30rpx;padding-bottom: 16rpx;" v-for="(item, index) in navList"
				:key="item.state" :class="{ current: tabCurrentIndex === index }" @tap="tabClick(index)">
				{{ item.text }}
			</view>
		</view>
		<swiper :current="tabCurrentIndex" style="height: calc(100% - 60rpx)" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tag, key) in navList" :key="tag.state">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData">
					<!-- 空白页 -->
					<wanl-empty text="还没有优惠券" src="/static/images/user/wucollect.png"
						v-if="tag.loaded === true && tag.cardList.length === 0" />
					<!-- 订单列表 -->
					<view class="wanl-coupon">
						<view v-for="(coupon, seat) in tag.cardList" :key="coupon.id"
							:class="[coupon.state == 1 ? coupon.type : 'wanl-gray']" class="item margin-bj radius-bock"
							@tap="onDetails(coupon)">
							<!-- <image :src="$wanlshop.appstc('/coupon/bg_coupon_3x.png')" class="coupon-bg "></image> -->
							<image v-if="coupon.state == 2" :src="$wanlshop.appstc('/coupon/img_coupon_beused_3x.png')"
								class="coupon-sign"></image>
							<image v-if="coupon.state == 3" :src="$wanlshop.appstc('/coupon/img_coupon_failure_3x.png')"
								class="coupon-sign"></image>

							<view v-if="coupon.state == 1">
								<view class="item-left">
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
								</view>
							</view>

							<view v-if="coupon.state != 1">
								<view class="item-left" style="background-color: #E8E8E8;">
									<block
										v-if="coupon.type == 'reduction' || (coupon.type == 'vip' && coupon.usertype == 'reduction')">
										<view class="colour">
											<text class="text-price"></text>
											<text class="price">{{Number(coupon.price)}}</text>
										</view>
										<view class="wanl-bg-grey radius text-sm">
											满{{Number(coupon.limit)}}减{{Number(coupon.price)}}
										</view>
									</block>
									<block
										v-if="coupon.type == 'discount' || (coupon.type == 'vip' && coupon.usertype == 'discount')">
										<view class="colour">
											<text class="price">{{Number(coupon.discount)}}</text>
											<text class="discount">折</text>
										</view>
										<view class="wanl-bg-grey radius text-sm">
											满{{Number(coupon.limit)}}打{{Number(coupon.discount)}}折
										</view>
									</block>
									<block v-if="coupon.type == 'shipping'">
										<view class="colour">
											<text class="price">包邮</text>
										</view>
										<view class="wanl-bg-grey radius text-sm">
											满{{Number(coupon.limit)}}元包邮
										</view>
									</block>
								</view>
							</view>

							<view class="item-right padding-bj" style="background: white;">
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
								<view class="people" v-if="coupon.state == 1">
									新人福利
								</view>
								<view class="content text-min">
									<view class="wanl-bg-grey" style="padding-bottom: 11rpx;">
										<text></text>{{coupon.rangetype_text}}
									</view>
									<view class="cu-btn sm round line-colour"
										style="background: rgba(243, 16, 100, 0.14);color: #F31064;"
										v-if="coupon.state == 1" @tap.stop="onApply()">
										立即使用
									</view>
								</view>
							</view>
						</view>
					</view>
					<uni-load-more :status="tag.loadingType" :content-text="contentText" />
					<view class="edgeInsetBottom"></view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabCurrentIndex: 0,
				navList: [{
						state: 1,
						text: '可使用',
						loadingType: 'more',
						current_page: 1,
						cardList: []
					},
					{
						state: 2,
						text: '已使用',
						loadingType: 'more',
						current_page: 1,
						cardList: []
					},
					{
						state: 3,
						text: '已过期',
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
				let state = navItem.state;
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
					url: '/wanlshop/coupon/getMyList',
					data: {
						state: state,
						page: navItem.current_page
					},
					success: res => {
						navItem.current_page = res.current_page; //当前页码
						if (res.last_page === res.current_page) {
							navItem.loadingType = 'noMore';
						} else {
							navItem.loadingType = 'more';
							navItem.current_page++;
						}
						let cardList = res.data.filter(item => {
							if (state === 0) {
								//0为全部订单
								return item;
							}
							return Number(item.state) === state;
						});
						cardList.forEach(item => {
							navItem.cardList.push(item);
						});
						//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
						this.$set(navItem, 'loaded', true);
					}
				});
			},
			onApply() {
				uni.switchTab({
					url: '/pages/category',
					fail: () => {
						console.log('wewe');
					}
				})
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
</style>
