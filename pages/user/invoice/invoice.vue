<template>
	<!-- 发票中心 -->
	<view class="wanl-order-list">
		<view class="navbar" style="background: white;padding-bottom: 8rpx;">
			<view class="nav-item " style="font-size: 30rpx;padding-bottom: 16rpx;" v-for="(item, index) in navList"
				:key="item.state" :class="{ current: tabCurrentIndex === index }" @tap="tabClick(index)">
				{{ item.text }}
			</view>
		</view>
		<swiper :current="tabCurrentIndex" style="height: calc(100% - 60rpx)" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tag, key) in navList" :key="tag.state">
				<scroll-view class="list-scroll-content" style="background: #f7f7f7;" scroll-y
					@scrolltolower="loadData">
					<!-- 空白页 -->
					<wanl-empty text="还没有发票" src="/static/images/user/wucollect.png"
						v-if="tag.loaded === true && tag.orderList.length === 0" />
					<!-- 订单列表 -->
					<view class="wanl-coupon">
						<view class="infor">
							<view>
							</view>
							<view style="color: #141414;font-size: 30rpx;" @tap="onMessage()">开票信息</view>
						</view>
						<view v-for="(order, okey) in tag.orderList" :key="order.id" class="order-item radius-bock" style="margin-top: 0rpx;margin-bottom: 30rpx;">
							<view class="time" v-for="(goods, gkey) in order.goods" :key="goods.id">
								<view style="color: #909090;font-size: 24rpx;margin: 30rpx 60rpx;">2023-4-11 14:19:23
								</view>
								<view style="width: 700rpx;display: flex;">
									<view style="padding-top: 8rpx;">
										<!-- <image src="../../../static/images/user/xuanze.png" style="width: 36rpx;height: 36rpx;"></image> -->
										<image src="../../../static/images/user/danxuan.png"
											style="width: 36rpx;height: 36rpx;"></image>
									</view>
									<view class="cu-avatar xl radius" style="margin-left: 24rpx;border-radius: 13rpx;margin-bottom: 30rpx;margin-right: 24rpx;"
										:style="{backgroundImage: 'url('+$wanlshop.oss(goods.image, 70, 70)+')'}"> </view>
									<view style="width: 478rpx;">
										<view style="display: flex;justify-content: space-between;">
											<view style="color: #2D2D2D;font-size: 30rpx;width: 340rpx;" class="text-cut-2">{{goods.title}}</view>
											<view
												style="color: #353535;font-size: 31rpx;font-weight: bold;margin-right: 20rpx;">
												{{ goods.price }}
											</view>
										</view>
										<view style="color: #909090;font-size: 20rpx;margin-top: 16rpx;">鲜鸡蛋2斤装
										</view>
									</view>
								</view>
								<!-- <view class="action-box padding-bottom-bj" v-if="order.state == 1">
									<button class="cu-btn round line-black" style="margin-right: 13rpx;color: #F31064;">查看详情</button>
									<button class="cu-btn round line-black" style="margin-right: 20rpx;color: #141414;">重新发送</button>
								</view> -->
							</view>
						</view>

						<view class="wanl-cart-foot fixedView" style="width: 100%;height: 160rpx;" v-if="tag.orderList.length != 0">
							<view class="amount">
								<view style="width: 217rpx;color: #F31064;font-size: 24rpx;line-height: 60rpx;">
									实际金额以发票为主</view>
							</view>
							<view style="height: 130rpx;background: white;display: flex;justify-content: space-between;">
								<view class="margin-left-sm" style="height: 40rpx;display: flex;margin-top: 30rpx;">
									<view style="color: #141414;font-size: 27rpx;padding-top: 4rpx;">共</view>
									<view style="color: #F31064;font-size: 30rpx;">￥124</view>
								</view>
								<view class="piao">
									去开票</view>
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
						state: 0,
						text: '开发票',
						loadingType: 'more',
						current_page: 1,
						orderList: []
					},
					{
						state: 1,
						text: '已申请',
						loadingType: 'more',
						current_page: 1,
						orderList: []
					},
					{
						state: 2,
						text: '已开票',
						loadingType: 'more',
						current_page: 1,
						orderList: []
					}
				],
				contentText: {
					contentdown: ' ',
					contentrefresh: '正在加载...',
					contentnomore: ''
				},
				searchtext: ''
			};
		},
		onLoad(options) {
			if (!options.state) {
				options.state = 0;
			}
			this.tabCurrentIndex = +options.state;
			// #ifndef MP
			this.loadData();
			// #endif
			// #ifdef MP
			if (options.state == 0) {
				this.loadData();
			}
			// #endif
		},
		methods: {
			//获取订单列表
			loadData(source) {
				//这里是将订单挂载到tab列表下
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				let state = navItem.state;
				console.log(index)
				console.log(state)
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
					url: '/wanlshop/order/getOrderList',
					data: {
						state: state,
						page: navItem.current_page,
						keys: this.searchtext
					},
					success: res => {
						navItem.current_page = res.current_page; //当前页码
						if (res.last_page === res.current_page) {
							navItem.loadingType = 'noMore';
						} else {
							navItem.loadingType = 'more';
							navItem.current_page++;
						}
						let orderList = res.data.filter(item => {
							//添加不同状态下订单的表现形式
							item = Object.assign(item, this.orderStateExp(item.state));
							//演示数据所以自己进行状态筛选
							if (state === 0) {
								//0为全部订单
								return item;
							}
							return item.state === state;
						});
						orderList.forEach(item => {
							navItem.orderList.push(item);
						});
						//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
						this.$set(navItem, 'loaded', true);
						console.log(navItem)
					}
				});
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
			////订单状态文字和颜色
			orderStateExp(state) {
				let stateTip = '',
					stateTipColor = '#141414';
				return {
					stateTip,
					stateTipColor
				};
			},
			onMessage(){
				this.$wanlshop.to('/pages/user/invoice/message');
			}
		}
	};
</script>

<style lang="scss">
	.infor {
		width: 90%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}

	.time {
		width: 700rpx;
		// height: 241rpx;
		background: white;
		margin: 0 auto;
		border-radius: 12rpx;
	}

	.imtus {
		width: 117rpx;
		height: 117rpx;
		margin-left: 24rpx;
		margin-right: 24rpx;
	}

	.amount {
		// height: 60rpx;
		background: #F5DFE7;
		border-top-left-radius: 15rpx;
		border-top-right-radius: 15rpx;
		display: flex;
		justify-content: center;
		text-align: center;
	}

	.piao {
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
