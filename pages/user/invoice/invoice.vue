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
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData">
					<!-- 空白页 -->
					<wanl-empty text="还没有优惠券" src="/static/images/user/wucollect.png"
						v-if="tag.loaded === true && tag.cardList.length === 0" />
					<!-- 订单列表 -->
					<view class="wanl-coupon">
						<view style="width: 90%;margin: 0 auto;display: flex;justify-content: space-between;margin-top: 10rpx;">
							<view>多选</view>
							<view @tap="onMessage()">开票信息</view>
						</view>
						<view v-for="(coupon, seat) in tag.cardList" :key="coupon.id"
							:class="[coupon.state == 1 ? coupon.type : 'wanl-gray']" >
							<view v-if="coupon.state == 1">
								<!-- 11111111111222222222222 -->
							</view>

							<view v-if="coupon.state == 2">
								<!-- 222222222444444444 -->
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
			onMessage(){
				this.$wanlshop.on('/pages/user/invoice/message');
			}
		}
	};
</script>

<style lang="scss">

</style>
