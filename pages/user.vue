<template>
	<view style="background: #F7F7F7;height: 100vh;">
		<!-- <view style="background-image: url(/static/images/default/screen_icon_new.png);background-size: 100% 100%;"> -->
		<!-- #ifdef MP -->
		<view class="cu-custom text-white" :style="{color: common.appStyle.user_font_color == 'light'?'#ffffff':'#222222'}">
			<view class="cu-bar fixed" :style="{ height: $wanlshop.wanlsys().height + 'px', paddingTop: $wanlshop.wanlsys().top + 'px' }">
				<!-- <view class="action mp text-bold">
					<text class="wlIcon-shezhi" style="margin-right: 0.6em;" @tap="$wanlshop.auth('/pages/user/setting/setting')"></text>
					<text class="wlIcon-shiyongbangzhu1" @tap="help"></text>
				</view> -->
				<!-- 背景 -->
				<view class="bar-bg" v-if="headerOpacity > 0" :style="{ 
					height: $wanlshop.wanlsys().height + 'px', 
					opacity: headerOpacity,
					backgroundColor: common.appStyle.user_nav_color?'#ff6e98':'#f7f7f7',
					backgroundImage: 'url(' + $wanlshop.oss(common.appStyle.user_nav_image, 414, 0, 1, 'transparent', 'png') + ')'
				}"></view>
			</view>
		</view>
		 <!-- #endif -->
		<!-- #ifndef MP -->
		<view class="cu-custom" :style="{color: common.appStyle.user_font_color == 'light'?'#ffffff':'#222222'}">
			<view class="cu-bar fixed" :style="{ height: $wanlshop.wanlsys().height + 'px', paddingTop: $wanlshop.wanlsys().top + 'px' }">
				<view class="text-lg" @tap="$wanlshop.auth('/pages/user/setting/user')">
					<view v-if="headerOpacity == 1">
						<view class="cu-avatar round margin-right-xs" :style="{ backgroundImage: 'url(' + $wanlshop.oss(user.avatar, 35, 35, 2, 'avatar') + ')' }"></view>
						<text v-if="user.isLogin">{{ user.nickname }}</text>
						<text v-else style="color: white;">登录</text>
					</view>
				</view>
				<!-- 背景 -->
				<view class="bar-bg" v-if="headerOpacity > 0" :style="{ 
					height: $wanlshop.wanlsys().height + 'px', 
					opacity: headerOpacity,
					backgroundColor: common.appStyle.user_nav_color?common.appStyle.user_nav_color:'#f7f7f7',
					backgroundImage: 'url(' + $wanlshop.oss(common.appStyle.user_nav_image, 0, 50, 1, 'transparent', 'png') + ')',
					color: common.appStyle.user_font_color == 'light'?'#ffffff':'#222222'
				}"></view>
				<!-- <view class="action">
					<block>
						<text class="wlIcon-erweima" @tap="$wanlshop.auth('/pages/user/qrcode/qrcode')"></text>
						<text class="margin-right text-sm" @tap="$wanlshop.auth('/pages/user/qrcode/qrcode')">会员码</text>
					</block>
					<text class="wlIcon-shezhi" @tap="$wanlshop.auth('/pages/user/setting/setting')"></text>
					<text class="wlIcon-xiaoxizhongxin" @tap="$wanlshop.to('/pages/notice/notice')"></text>
					<view class="cu-tag badge" v-if="statistics.notice.notice +statistics.notice.order +statistics.notice.chat > 0">{{ statistics.notice.notice +statistics.notice.order +statistics.notice.chat }}</view>
				</view> -->
			</view>
		</view>
		<!-- #endif -->
		<view class="wanl-user" style="background-image: url(https://www.duomeihe.shop/uploads/20230327/test3.png);background-size: 100% 100%;height: 557.97rpx;">
			<view class="user">
				<view style="width: 144.93rpx;height: 144.93rpx;" v-if="user.isLogin" class="avatar margin-right-bj" @tap="portrai"><image class="round" :src="$wanlshop.oss(user.avatar, 62, 62, 2, 'avatar')" mode="widthFix"></image></view>
				<view style="width: 144.93rpx;height: 144.93rpx;" v-else class="avatar margin-right-bj" @tap="$wanlshop.auth('/pages/user')"><image class="round" :src="$wanlshop.oss(user.avatar, 62, 62, 2, 'avatar')" mode="widthFix"></image></view>
				<view class="content" v-if="user.isLogin">
					<view class="text-xxl" style="color: white;font-size: 40rpx;font-size: 500;" @tap="$wanlshop.auth('/pages/user/setting/user')">{{ user.nickname }}</view>
					<view style="font-size: 29rpx;margin-top: 12rpx;color: white;font-size: 400;">账号: {{ user.mobile }}</view>
					<!-- <view class="text-sm" @tap="$wanlshop.auth('/pages/user/signin/signin')">
						<view class="cu-tag sm radius bg-orange">
							Lv {{ user.level }}
						</view>
						<view class="cu-tag sm radius bg-orange">
							用户积分 {{ user.score }}
						</view>
					</view> -->
				</view>
				<view class="content" @tap="$wanlshop.auth('/pages/user')" v-else>
					<view class="text-xxl" style="color: white;">登录</view>
					<!-- <view class="cu-tag bg-orange sm radius">Hi</view> -->
					<view class="cu-tag wanl-bg-pink sm radius">Hi，欢迎登录</view>
				</view>
			</view>
		<!-- 	<view class="operate">
				<view class="text-sm" @tap="$wanlshop.auth('/pages/user/collect')">
					<text class="text-bold">{{ statistics.dynamic.collection }}</text>
					收藏夹
				</view>
				<view class="text-sm" @tap="$wanlshop.auth('/pages/user/follow')">
					<text class="text-bold">{{ statistics.dynamic.concern }}</text>
					关注店铺
				</view>
				<view class="text-sm" @tap="$wanlshop.auth('/pages/user/footprint')">
					<text class="text-bold">{{ statistics.dynamic.footprint }}</text>
					足迹
				</view>
				<view class="text-sm" @tap="$wanlshop.auth('/pages/user/order/order')">
					<text class="text-bold">{{ $wanlshop.toFormat(statistics.order.whole, 'hundred') }}</text>
					全部订单
				</view>
			</view> -->
		</view>
		<!-- <view class="wanl-user-order-s margin-bj padding-sm" v-if="user.isLogin"> -->
			<!-- <view class="my-coup" v-if="user.isLogin"> -->
				<!-- <view class="bg-white radius grid text-center col-2 padding-lr-bj padding-tb-sm"> -->
					<!-- <view class="flex justify-between" @tap="$wanlshop.auth('/pages/user/coupon/list')">
						<view class="content">
							<view class="coupons wanl-black text-sm">红包卡券</view> -->
													<!-- <view class="text-min text-orange">
														领取优惠券
														<text class="wlIcon-fanhui2 margin-left-xs"></text>
													</view> -->
						<!-- </view>
						<view class="coupons-right">
							<image class="clickview-img" src="../static/images/user/right.png"></image>
						</view> -->
													<!-- <view class="cu-avatar" :style="{ backgroundImage: 'url(' + $wanlshop.appstc('/user/icon_card_bag.png') + ')' }"></view> -->
					<!-- </view> -->
													<!-- <view class="flex justify-between" @tap="$wanlshop.auth('/pages/user/signin/log')">
														<view class="content margin-left-bj">
															<view class="wanl-black text-sm text-bold6">我的积分</view>
															<view class="text-min text-orange">
																查看积分明细
																<text class="wlIcon-fanhui2 margin-left-xs"></text>
															</view>
														</view>
														<view class="cu-avatar" :style="{ backgroundImage: 'url(' + $wanlshop.appstc('/user/icon_super_vip.png') + ')' }"></view>
													</view> -->
												<!-- </view> -->
			<!-- </view> -->
			<view class="user-box" style="position: absolute;width: 100%;top:420rpx;background-color: #f9f9f9;border-radius: 24.15rpx  24.15rpx  0rpx  0rpx ;">
				<view class="my-coupons wanl-user-order-s margin-bj padding-sm" @tap="$wanlshop.auth('/pages/user/coupon/mycard')" v-if="user.isLogin">
						<view class="coupons">我的优惠券</view>
						<view class="coupons-right">
							<view style="font-size: 29rpx;color: #999999;">{{ statistics.dynamic.coupon}}张</view>
							<image class="clickview-img" src="../static/images/user/right.png"></image>
						</view>
				</view>
				<!-- </view> -->
				
				<view class="my-coupons wanl-user-order-s margin-bj padding-sm" @tap="$wanlshop.auth('/pages/user/invoice/invoice')" v-if="user.isLogin">
						<view class="coupons">发票中心</view>
						<view class="coupons-right">
							<image class="clickview-img" src="../static/images/user/right.png"></image>
						</view>
				</view>
				
				<view class="wanl-user-order padding-sm margin-bj" v-if="user.isLogin">
					<view class="myorder">我的订单</view>
					<view class="project text-sm wanl-gray-dark" style="padding-bottom: 20rpx;">
						<view @tap="$wanlshop.auth('/pages/user/order/order')">
							<text class="wlIcon-31daipingjia wanl-pip"></text>
							<view style="color: #141414;font-size: 27rpx;">全部</view>
							<view class="cu-tag badge bg-orange" v-if="statistics.order.evaluate > 0">{{ $wanlshop.toFormat(statistics.order.evaluate, 'hundred') }}</view>
						</view>
						<view @tap="$wanlshop.auth('/pages/user/order/order?state=1')">
							<text class="wlIcon-31daifukuan wanl-pip"></text>
							<view style="color: #141414;font-size: 27rpx;">待支付</view>
							<view class="cu-tag badge bg-orange" v-if="statistics.order.pay > 0">{{ $wanlshop.toFormat(statistics.order.pay, 'hundred') }}</view>
						</view>
						<view @tap="$wanlshop.auth('/pages/user/order/order?state=2')">
							<text class="wlIcon-31daifahuo wanl-pip"></text>
							<view style="color: #141414;font-size: 27rpx;">待发货</view>
							<view class="cu-tag badge bg-orange" v-if="statistics.order.delive > 0">{{ $wanlshop.toFormat(statistics.order.delive, 'hundred') }}</view>
						</view>
						<view @tap="$wanlshop.auth('/pages/user/order/order?state=3')">
							<text class="wlIcon-31daishouhuo wanl-pip"></text>
							<view style="color: #141414;font-size: 27rpx;">待收货</view>
							<view class="cu-tag badge bg-orange" v-if="statistics.order.receiving > 0">{{ $wanlshop.toFormat(statistics.order.receiving, 'hundred') }}</view>
						</view>
						<!-- <view @tap="$wanlshop.auth('/pages/user/order/order?state=4')">
							<text class="wlIcon-31daipingjia wanl-pip"></text>
							待评价
							<view class="cu-tag badge bg-orange" v-if="statistics.order.evaluate > 0">{{ $wanlshop.toFormat(statistics.order.evaluate, 'hundred') }}</view>
						</view> -->
						<view class="solid-left" @tap="$wanlshop.auth('/pages/user/refund/lists')">
							<text class="wlIcon-31youhuiquan wanl-orange"></text>
							<view style="color: #141414;font-size: 27rpx;">退货/售后</view>	
							<view class="cu-tag badge bg-orange" v-if="statistics.order.customer > 0">{{ $wanlshop.toFormat(statistics.order.customer, 'hundred') }}</view>
						</view>
					</view>
					<!-- <view class="logistics margin-top-bj padding-sm" v-if="statistics.logistics.length > 0">
						<swiper vertical autoplay circular disable-touch interval="4000" class="swiper">
							<swiper-item @tap="$wanlshop.auth('/pages/notice/logistics/details')">
								<view class="title">
									<view class="text-sm">最新物流</view>
									<view class="text-sm">18:00</view>
								</view>
								<view class="flex align-center">
									<view class="cu-avatar" :style="{ backgroundImage: 'url(' + $wanlshop.oss(user.avatar, 40, 40) + ')' }"></view>
									<view class="content">
										<view class="text-df">
											<text class="wlIcon-paisongtixing"></text>
											派送中
										</view>
										<view class="text-sm">【自提柜】已签收，签收人凭取件码 已取件。</view>
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view> -->
				</view>
				
				<!-- <view class="wanl-user-order padding-sm margin-bj" style="margin-top: 25rpx;">
					<view class="project text-sm wanl-gray-dark">
						<view style="line-height: 1.8;" @tap="$wanlshop.auth('/pages/user/coupon/mycard')">
							<view class="wanl-pip text-lg text-bold6">{{ statistics.dynamic.coupon }}</view>
							我的卡券
						</view>
						<view style="line-height: 1.8;" @tap="$wanlshop.auth('/pages/user/money/money')">
							<view class="wanl-pip text-lg text-bold6">{{ user.money?user.money:'0.00' }}</view>
							余额
						</view>
						<view style="line-height: 1.8;" @tap="$wanlshop.auth('/pages/user/bank/bank')">
							<view class="wanl-pip text-lg text-bold6">{{ statistics.dynamic.accountbank }}</view>
							银行卡
						</view>
						<view style="line-height: 1.8;" @tap="$wanlshop.auth('/pages/user/signin/log')">
							<view class="wanl-pip text-lg text-bold6">{{ user.score?user.score:0 }}</view>
							积分
						</view>
						<view class="solid-left" @tap="$wanlshop.auth('/pages/user/money/list')">
							<text class="wlIcon-hongbao wanl-orange"></text>
							账单明细
						</view>
					</view>
				</view> -->
				
				<!-- <view class="wanl-user-tool padding-top-bj margin-lr-bj">
					<view class="list text-sm grid col-5 wanl-gray-dark"> -->
						<!-- <view @tap="$wanlshop.auth('/pages/user/money/money')">
							<text class="wlIcon-youhuiquantuangou wanl-orange"></text>
							钱包
						</view>
						<view @tap="$wanlshop.auth('/pages/apps/groups/order/order')">
							<text class="wlIcon-pintuan2 wanl-text-yellow"></text>
							拼团订单
							<view class="cu-tag badge bg-orange" v-if="statistics.order.groups > 0">{{ $wanlshop.toFormat(statistics.order.groups, 'hundred') }}</view>
						</view>
						<view @tap="$wanlshop.auth('/pages/user/comment/comment')">
							<text class="wlIcon-icon_pinglun wanl-text-red"></text>
							评论
						</view> -->
						<!-- <view @tap="$wanlshop.auth('/pages/user/distribution/distribution')">
							<text class="wlIcon-fenxiao wanl-text-yellow"></text>
							分销
						</view>
						<view @tap="$wanlshop.auth('/pages/user/order/bargain')">
							<text class="wlIcon-jiage wanl-text-light-blue"></text>
							我的砍价
						</view> -->
						<!-- <view @tap="$wanlshop.auth('/pages/user/address/address')">
							<text class="wlIcon-dizhi wanl-text-yellow"></text>
							收货地址
						</view>
						<view @tap="$wanlshop.auth('/pages/user/signin/signin')">
							<text class="wlIcon-mianxing-rili wanl-orange"></text>
							签到
						</view>
						<view @tap="$wanlshop.auth('/pages/user/complaint/lists')">
							<text class="wlIcon-31guanzhuxuanzhong wanl-text-light-blue"></text>
							我的举报
						</view>
						<view @tap="$wanlshop.auth('/pages/user/feedback/lists')">
							<text class="wlIcon-pingjiazongjie wanl-text-blue"></text>
							反馈
						</view>
						<view @tap="help">
							<text class="wlIcon-bangzhu3 wanl-text-green"></text>
							帮助中心
						</view>
						<view @tap="$wanlshop.auth('/pages/user/service')">
							<text class="wlIcon-icon-service wanl-text-purple"></text>
							智能小蜜
						</view>
						<view @tap="$wanlshop.auth('/pages/apps/find/user')">
							<text class="wlIcon-pengyouquan wanl-text-red"></text>
							创作中心
						</view> -->
						<!-- <view @tap="setting">
							<text class="wlIcon-shezhi1 wanl-text-green"></text>
							设置
						</view>
					</view>
				</view> -->
				<!-- <view class="wanl-you-like" :style="{ backgroundImage: 'url(' + $wanlshop.appstc('/common/guess_you_like_it.png') + ')' }"></view> -->
				<!-- <wanl-product :dataList="likeData"/>
				<uni-load-more :status="status" :content-text="contentText" /> -->
				<view class="wanl-user-order-s padding-sm margin-bj">
					<view class="myorder" v-if="user.isLogin">设置</view>
					<view class="clickview" @click="addressclick()" v-if="user.isLogin">
						<view class="clickview-left">
							<image class="clickview-img" src="../static/images/user/addres.png"></image>
							<view class="clickview-text">收货地址</view>	
						</view>
						<view class="clickview-right">
							<image class="clickview-img" src="../static/images/user/right.png"></image>
						</view>
					</view>
					<view class="clickview" @click="aboutclick()">
						<view class="clickview-left">
							<image class="clickview-img" src="../static/images/user/concerning.png"></image>
							<view class="clickview-text">关于我们</view>	
						</view>
						<view class="clickview-right">
							<image class="clickview-img" src="../static/images/user/right.png"></image>
						</view>
					</view>
					<view class="clickview" @tap="onDetails($store.state.common.appConfig.user_agreement, '用户协议')">
						<view class="clickview-left">
							<image class="clickview-img" src="../static/images/user/agreement.png"></image>
							<view class="clickview-text">用户协议</view>	
						</view>
						<view class="clickview-right">
							<image class="clickview-img" src="../static/images/user/right.png"></image>
						</view>
					</view>
				</view>		
				<view class="out" v-if="user.isLogin">
					<view class="out-btn" @click="outclick()">退出登录</view>
				</view>
			</view>
			
		<view class="edgeInsetBottom"></view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			headerOpacity: 0,
			// 上拉刷新
			reload: true,
			likeData: [],
			current_page: 1, //当前页码
			last_page: 1, //总页码
			status: 'loading',
			contentText: {
				contentdown: ' ',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了'
			}
		};
	},
	computed: {
		...mapState(['user', 'statistics','common'])
	},
	onPullDownRefresh() {
		this.loadData();
	},
	onShow() {
		setTimeout(()=> {
			uni.setNavigationBarColor({  
				frontColor: this.$store.state.common.appStyle.user_font_color == 'light'?'#ffffff':'#000000',  
				backgroundColor: this.$store.state.common.appStyle.user_nav_color
		    })  
		}, 200);
		if (this.$store.state.user.isLogin) {
			this.loadData();
		}
	},
	onLoad() {
		
		// this.loadlikeData();
	},
	onPageScroll(e) {
		let tmpY = 50;
		e.scrollTop = e.scrollTop > tmpY ? 50 : e.scrollTop; //如果当前高度大于250则250否则当前高度
		this.headerOpacity = e.scrollTop * (1 / tmpY); //$headerOpacity 赋值当前高度x（1÷250）
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
	methods: {
		async loadData() {
			this.$api.post({
				url: '/wanlshop/user/refresh',
				success: res => {
					this.$store.commit('statistics/edit', res.statistics);
					this.$store.commit('user/setUserInfo', res.userinfo);
				}
			});
			uni.stopPullDownRefresh();
		},
		// 滚动底部加载猜你喜欢
		async loadlikeData() {
			this.$api.get({
				url: '/wanlshop/product/likes?pages=user',
				data: {
					page: this.current_page
				},
				success: res => {
					this.likeData = this.reload ? res.data : this.likeData.concat(res.data); //评论数据 追加
					this.current_page = res.current_page; //当前页码
					this.last_page = res.last_page; //总页码
					this.status = res.total == 0 ? 'noMore' : 'more';
				}
			});
		},
		// 帮助
		help() {
			this.$wanlshop.to('/pages/user/help');
		},
		// 设置
		setting() {
			this.$wanlshop.to('/pages/user/setting/setting');
		},
		portrai() {
			this.$wanlshop.to('/pages/user/portrait/portrait');
		},
		//地址
		addressclick(){
			this.$wanlshop.to('/pages/user/address/address');
		},
		//关于我们
		aboutclick(){
			this.$wanlshop.to('/pages/user/setting/about');
		},
		outclick() {
			this.$api.get({
				url: '/wanlshop/user/logout',
				data: {
					client_id: uni.getStorageSync("wanlshop:chat_client_id")?uni.getStorageSync("wanlshop:chat_client_id") : null
				},
				success: res => {
					this.$store.dispatch('user/logout');
					this.$wanlshop.msg('退出成功');
				}
			});
		},
	}
};
</script>

<style lang="scss">
.cu-bar .action.mp:first-child > text[class*='wlIcon-'] {
	margin-left: 0;
}

.wanl-user {
	background-repeat: no-repeat;
	background-size: 100%;
	position: relative;
	overflow: hidden;
}

.wanl-user .user {
	display: flex;
	align-items: center;
	justify-content: space-between;
    padding: 0rpx 0 0rpx 42rpx;
	margin-top: 220rpx;
}

.wanl-user .user .avatar {
	position: relative;
	height: 123rpx;
	width: 123rpx;
	border-radius: 5000rpx;
	overflow: hidden;
	border: 3px solid rgba(255, 255, 255, .25);
}

.wanl-user .user .avatar image {
	height: 120rpx;
}

.wanl-user .user .avatar .tag {
	position: absolute;
	bottom: 0;
	right: 0;
}

.wanl-user .user .content {
	flex: 1;
}

/* 操作 */
.wanl-user .operate {
	display: flex;
	justify-content: space-around;
	text-align: center;
	padding-bottom: 70rpx;
	line-height: 1.3;
}

.wanl-user .operate text {
	display: block;
	font-size: 32rpx;
}

/* 活动 */
.wanl-user .activity {
	position: absolute;
	width: 100%;
	bottom: -130rpx;
}

.wanl-user .activity .radius {
	border-radius: 24rpx;
}

.wanl-user .activity .cu-avatar {
	width: 69rpx;
	height: 69rpx;
	margin-right: 30rpx;
	background-color: transparent;
	/* border: 1px solid rgba(255,255,255,.6); */
}

.wanl-user .activity .content {
	text-align: left;
	height: 68rpx;
}
// 优惠券
.my-coup{
	background-color: white;
	border-radius: 13rpx;
}
.my-coupons{
	// background-color: white;
	// border-radius: 13rpx;
	height: 100rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.coupons{
	font-size: 29rpx;
	padding: 20rpx 20rpx;
	font-weight: bold;
}
.coupons-right{
	flex: 1;
	display: flex;
	justify-content: flex-end;
	padding-right: 24rpx;
}

/* 订单 */
.wanl-user-order {
	margin-top: 30rpx;
	border-radius: 24rpx;
	background-color: white;
	&-s{
		margin-top: 30.19rpx;
		border-radius: 24rpx;
		background-color: white;
	}
}

.wanl-user-order .title {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
}

.wanl-user-order .title text {}



/* 状态 */
.wanl-user-order .project {
	display: flex;
	justify-content: space-around;
	text-align: center;
}

.wanl-user-order .project>view {
	position: relative;
	flex: 1;
}

.wanl-user-order .project>view .cu-tag {
	top: -4rpx;
	right: 26rpx;
}

.wanl-user-order .project text {
	display: block;
	font-size: 50rpx;
	margin-bottom: 6rpx;
}

/* 物流 */
.wanl-user-order .logistics {
	background-color: #f9f9f9;
	border-radius: 24rpx;
}

.wanl-user-order .logistics .swiper {
	height: 120rpx;
}

.wanl-user-order .logistics .swiper .title {
	display: flex;
	justify-content: space-between;
	margin-bottom: 10rpx;
	color: #999999;
}

.wanl-user-order .logistics .swiper .cu-avatar {
	margin-right: 10rpx;
	height: 66rpx;
	width: 66rpx;
	border-radius: 12rpx;
	background-color: #ffffff;
}

.wanl-user-order .logistics .swiper .content .text-df {
	color: #3797e0;
	font-size: 27rpx;
	margin-bottom: 2rpx;
}

.wanl-user-order .logistics .swiper .content .text-sm {
	color: #999999;
}

.wanl-user-order .logistics .swiper .content text {
	font-size: 32rpx;
	margin-left: 15rpx;
	margin-right: 10rpx;
}

/* 工具箱 */
.wanl-user-tool {
	background-color: #ffffff;
	border-radius: 24rpx;
}

.wanl-user-tool .title {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
}

.wanl-user-tool .title text {
	margin-left: 2rpx;
}

/* 状态 */
.wanl-user-tool .list {
	text-align: center;
}

.wanl-user-tool .list>view {
	margin-bottom: 28rpx;
	position: relative;
}
.wanl-user-tool .list>view .cu-tag {
	top: -8rpx;
	left: 80rpx;
	right: unset;
}

.wanl-user-tool .list text {
	display: block;
	font-size: 54rpx;
	margin-bottom: 8rpx;
}
.myorder{
	padding: 20rpx;
	color: #141414;
	font-size: 30rpx;
	font-weight: bold;
	margin-bottom: 5rpx;
}
.clickview{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 30rpx 24rpx;
}
.clickview-left{
	display: flex;
	align-items: center;
	justify-content: flex-start;
}
.clickview-right{
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.clickview-img{
	width: 40rpx;
	height: 40rpx;
}
.clickview-text{
	margin-left: 20rpx;
	color: #141414;
	font-size: 27rpx;
}
.out{
	padding: 60rpx;
}
.out-btn{
	background-color: #F31064;
	border-radius: 40rpx;
	height: 80rpx;
	line-height: 80rpx;
	color: #ffffff;
	font-size: 30rpx;
	text-align: center;
}
</style>
