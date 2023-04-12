<template>
	<!-- 发票中心 -->
	<view class="wanl-order-list">
		<view class="navbar">
			<view class="nav-item text-df" style="background: #ffffff;" v-for="(item, index) in navList"
				:key="item.state" :class="{ current: tabCurrentIndex === index }" @tap="tabClick(index)">
				{{ item.text }}
			</view>
		</view>

		<swiper :current="tabCurrentIndex" style="height: calc(100% - 60rpx)" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tag, key) in navList" :key="tag.state">
				<scroll-view class="list-scroll-content" style="background: #f7f7f7;" scroll-y
					@scrolltolower="loadData">
					<!-- 空白页 -->
					<wanl-empty text="还没有优惠券" src="/static/images/user/wucollect.png"
						v-if="tag.loaded === true && tag.cardList.length === 0" />
					<!-- 订单列表 -->
					<view class="wanl-coupon">
						<view class="infor">
							<view>
								<!-- 多选 -->
							</view>
							<view style="color: #141414;font-size: 30rpx;" @tap="onMessage()">开票信息</view>
						</view>
						<view v-for="(coupon, seat) in tag.cardList" :key="coupon.id"
							:class="[coupon.state == 1 ? coupon.type : 'wanl-gray']">
							<view v-if="coupon.state == 1">
								<!-- 11111111111222222222222 -->
								<view class="time">
									<view style="color: #909090;font-size: 24rpx;padding: 30rpx 77rpx;">2023-4-11 14:19:23</view>
									<view style="width: 700rpx;height: 174rpx;display: flex;">
										<view style="padding-top: 8rpx;margin-left: 16rpx;">
											<!-- <image src="../../../static/images/user/xuanze.png" style="width: 36rpx;height: 36rpx;"></image> -->
											<image src="../../../static/images/user/danxuan.png"
												style="width: 36rpx;height: 36rpx;"></image>
										</view>
										<image
											style="width: 117rpx;height: 117rpx;margin-left: 24rpx;margin-right: 24rpx;"
											src="https://img.sandingtv.com/20190930/0c82d162395c19118c7dc979fe129f7b.jpg">
										</image>
										<view>
											<view style="display: flex;width: 500rpx;justify-content: space-between;">
												<view style="color: #2D2D2D;font-size: 30rpx;">农家土鸡蛋</view>
												<view
													style="color: #353535;font-size: 31rpx;font-weight: bold;margin-right: 20rpx;">
													￥124</view>
											</view>
											<view style="color: #909090;font-size: 20rpx;margin-top: 16rpx;">鲜鸡蛋2斤装
											</view>
										</view>
									</view>
								</view>
							</view>

							<view v-if="coupon.state == 2">
								<!-- 222222222444444444 -->
							</view>

							<view class="wanl-cart-foot fixedView" style="width: 100%;height: 160rpx;">
								<view class="amount">
									<view style="width: 217rpx;color: #F31064;font-size: 24rpx;line-height: 60rpx;">
										实际金额以发票为主</view>
								</view>

								<view
									style="height: 120rpx;background: white;display: flex;justify-content: space-between;">
									<view class="margin-left-sm" style="height: 40rpx;display: flex;margin-top: 30rpx;">
										<view style="color: #141414;font-size: 27rpx;padding-top: 4rpx;">共</view>
										<view style="color: #F31064;font-size: 30rpx;">￥124</view>
									</view>
									<view class="piao">
										去开票</view>
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
						text: '开发票',
						loadingType: 'more',
						current_page: 1,
						cardList: []
					},
					{
						state: 2,
						text: '已申请',
						loadingType: 'more',
						current_page: 1,
						cardList: []
					},
					{
						state: 3,
						text: '已开票',
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
			// async list() {
			// 	uni.request({
			// 		url: `${this.$wanlshop.config('appurl')}/wanlshop/product/hot_list`,
			// 		method: 'POST',
			// 		success: (res) => {
			// 			console.log("res", res.data.data)
			// 			this.navList = res.data.data
			// 		},
			// 		fail: (err) => {
			// 			console.log(err)
			// 		}
			// 	})
			// },
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
			onMessage() {
				this.$wanlshop.on('/pages/user/invoice/message');
			}
		}
	};
</script>

<style lang="scss">
	.infor{
		width: 90%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		margin-top: 30rpx;
	}
	.time{
		width: 700rpx;
		height: 241rpx;
		background: white;
		margin: 0 auto;
		margin-top: 30rpx;
		border-radius: 12rpx;
	}
	.imtus{
		width: 117rpx;
		height: 117rpx;
		margin-left: 24rpx;
		margin-right: 24rpx;
	}
	.amount{
		height: 60rpx;
		background: #F5DFE7;
		border-top-left-radius: 15rpx;
		border-top-right-radius: 15rpx;
		display: flex;
		justify-content: center;
		text-align: center;
	}
	.piao{
		width: 195rpx;
		height: 72rpx;
		border-radius: 40rpx;
		background: #F31064;
		text-align: center;
		line-height: 70rpx;
		font-size: 28rpx;
		color: white;
		opacity: 0.4;
		margin-top: 10rpx;
		margin-right: 25rpx;
	}
</style>
