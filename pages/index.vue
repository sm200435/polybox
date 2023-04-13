<template>
	<view class="wanlshop-container">
		<view
			v-if="common.modulesData.homeModules.page"
			class="wanlshop-container__head"
			:style="{
				height: headHeight + 'px',
				color: common.modulesData.homeModules.page ? common.modulesData.homeModules.page.style.navigationBarTextStyle == '#ffffff' ? '#ffffff' : '#333333' : '',
				backgroundColor: common.modulesData.homeModules.page ? common.modulesData.homeModules.page.style.navigationBarBackgroundColor : '#f7f7f7',
				backgroundImage: 'url(' + $wanlshop.oss( common.modulesData.homeModules.page ? common.modulesData.homeModules.page.style.navigationBackgroundImage : '', 0, 50, 1, 'transparent', 'png' ) + ')'
			}"
		>	
			<view :style="{ height: headHeight + 'px', paddingTop: headTop + 'px' }" >
				<!-- <image class="home-logo" style="margin-top: 30rpx;" src="/static/images/home/logo.png"></image><br/> -->
				<view @click="reposition" style="display: flex;margin: 30rpx 0 10rpx 28rpx;">
					<view style="margin-right: 8rpx;">
						<image style="width: 33.82rpx;height: 35.02rpx;" src="../static/images/home/address.png" mode=""></image>
					</view>
					<view style="max-width: 400rpx;min-width: 60rpx;;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-size: 30rpx;font-weight: 500;line-height: 35rpx;">
						{{address}}
					</view>
					<view style="margin-top: 2rpx;">
						<image style="width: 35.02rpx;height: 35.02rpx;" src="../static/images/home/right.png" mode=""></image>
					</view>
				</view>
				<view class="navigater flex align-center justify-between">
					<!-- <view class="flex" @tap="scanCode"> -->
						<!-- <view class="text-xxl"><text class="wlIcon-saoyisao"></text></view> -->
					<!-- </view> -->
					<view class="search flex align-center margin-lr-sm round">
						<view class="text-df text-bold wanl-gray-dark" style="margin-left: 16rpx;margin-right: 6rpx;margin-top: 8rpx;">
							<image src="../static/images/user/searchs.png" style="width: 33rpx;height: 33rpx;"></image>
						</view>
						<swiper vertical autoplay circular interval="3000">
							<swiper-item @tap="handleSearch('')">
								<text class="text-cut" style="font-size: 24rpx;color: #999999;">请输入您要搜索的商品</text>
							</swiper-item>
							<swiper-item v-for="(item, index) in common.modulesData.searchModules" :key="item.keywords" @tap="handleSearch(item.keywords)" >
								<text class="wanl-gray-dark text-cut">{{ item.keywords }}</text>
							</swiper-item>
						</swiper>
					</view>
					<!-- <view class="flex"> -->
						<!-- <view class="margin-right-bj text-xxl position-relative" @tap="$wanlshop.to('/pages/user/coupon/list')">
							<text class="wlIcon-coupon"/>
							<view class="cu-tag badge">减</view>
						</view>
						<view class="text-xxl" @tap="$wanlshop.to('/pages/notice/notice')">
							<text class="wlIcon-xiaoxizhongxin"></text>
						</view> -->
					<!-- </view> -->
				</view>
				<!-- <view class="toolbar flex padding-lr-bj align-center">
					<scroll-view
						class="scroll"
						scroll-x
						scroll-with-animation
						:scroll-left="scrollLeft"
					>
						<view class="scroll__item" :class="{ action: currentItemId === 'follow' }" @tap="handleSelect('follow', 0)" >
							关注
						</view>
						<view class="scroll__item" :class="{ action: currentItemId === 'home' }" @tap="handleSelect('home', 1)" >
							推荐
						</view>
						<view class="scroll__item" v-for="(item, index) in common.modulesData.categoryModules" :key="item.id" :class="{ action: currentItemId === 'cid' + item.id }" @tap="handleSelect('cid' + item.id, index + 2)" >
							{{ item.name }}
						</view>
					</scroll-view>
					<view class="category flex align-center" @tap="handleModal">
						<text v-if="isModal" class="wlIcon-fanhui3"></text>
						<text v-else class="wlIcon-fanhui4"></text>
					</view>
				</view> -->
			</view>
		</view>
		<!-- 主体 -->
		<swiper
			class="wanlshop-container__main"
			:current-item-id="currentItemId"
			:style="{
				height: windowHeight + 'px'
			}"
			@change="changeCurrent"
			@animationfinish="animationFinish"
		>
			<!-- 发现页 -->
			<!-- <swiper-item item-id="follow">
				<wanl-shop-find
					:windowHeight="windowHeight"
					:headHeight="headHeight"
					:currentItemId="currentItemId"
					:homeModules="common.modulesData.homeModules"
					:appConfig="common.appConfig"
					:user="user"
				/>
			</swiper-item> -->
			<!-- 主页 -->
			<swiper-item item-id="home">
				<wanl-shop-page
					:windowHeight="windowHeight"
					:headHeight="headHeight"
					:headTop="headTop"
					:pageModules="common.modulesData.homeModules"
					:adData="common.adData"
				/>
			</swiper-item>
			<!-- 分类 -->
			<!-- <swiper-item
				v-for="(item, index) in common.modulesData.categoryModules"
				:key="item.id"
				:item-id="'cid' + item.id"
			>
				<wanl-shop-category
					:cid="item.id"
					:headHeight="headHeight"
					:windowHeight="windowHeight"
					:currentItemId="currentItemId"
					:homeModules="common.modulesData.homeModules"
					:childlist="item.childlist"
				/>
			</swiper-item> -->
		</swiper>
		<!-- 弹窗 -->
		<view class="WANL-MODAL" @touchmove.stop.prevent="moveHandle">
			<!-- 顶部 -->
			<!-- <view class="cu-modal top-modal" :class="{ show: isModal }" @tap="handleModal">
				<view
					class="cu-dialog padding-lr-bj padding-bottom-bj"
					:style="{ paddingTop: headHeight + 12 + 'px' }"
					@tap.stop=""
				>
					<view class="category text-min">
						<view
							class="item round bg-gray"
							:class="{ action: currentItemId === 'follow' }"
							@tap="handleSelect('follow', 0)"
						>
							我的关注
						</view>
						<view
							class="item round bg-gray"
							:class="{ action: currentItemId === 'home' }"
							@tap="handleSelect('home', 1)"
						>
							主页
						</view> -->
						<!-- <view
							class="item round bg-gray"
							v-for="(item, index) in common.modulesData.categoryModules"
							:key="item.id"
							:class="{ action: currentItemId === 'cid' + item.id }"
							@tap="handleSelect('cid' + item.id, index + 2)"
						>
							{{ item.name }}
						</view>
					</view>
				</view>
			</view> -->
			<!-- 版本更新 -->
			<view class="cu-modal" :class="{ show: update.update }">
				<view class="cu-dialog">
					<view class="hade">
						<image
							:src="$wanlshop.appstc('/common/update.png')"
							mode="aspectFit"
						></image>
						<view class="title">
							<view class="text-white text-bold5">{{ update.data.title }}</view>
							<text class="text-white text-bold5">
								最新版本：{{ update.data.versionName }}
							</text>
						</view>
					</view>

					<view class="info">
						<view class="text-lg text-bold5"><text>更新内容：</text></view>
						<rich-text class="wanl-gray-dark" :nodes="update.data.content" />
						<!-- 开始下载 -->
						<view class="margin-top-xl" v-if="update.download.start">
							<view class="flex margin-bottom-sm">
								<view class="cu-progress round striped active">
									<view
										class="bg-orange"
										:style="{ width: update.download.progress + '%' }"
									></view>
								</view>
								<text class="margin-left-sm">{{ update.download.progress }}%</text>
							</view>
							<view class="wanl-gray-dark text-sm text-center">
								<text>
									下载中，请稍等（{{
										$wanlshop.conver(update.download.totalBytesWritten)
									}}/{{
										$wanlshop.conver(update.download.totalBytesExpectedToWrite)
									}}）
								</text>
							</view>
						</view>
						<!-- 开始安装 -->
						<view class="margin-top-xl text-center" v-else-if="update.download.install">
							安装中...
						</view>
						<!-- 更新提示 -->
						<view class="flex justify-around margin-top-xl" v-else>
							<button class="cu-btn radius-bock bg-gray lg" @tap="ignore">
								忽略升级
							</button>
							<button class="cu-btn radius-bock bg-blue lg" @tap="download">
								立刻升级
							</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import wanlShopPage from '@/components/wanl-shop/page';
import wanlShopFind from '@/components/wanl-shop/find';
import wanlShopCategory from '@/components/wanl-shop/category';

export default {
	components: {
		wanlShopPage,
		wanlShopFind,
		wanlShopCategory
	},
	computed: {
		...mapState(['common', 'user', 'update'])
	},
	data() {
		return {
			// 定位
			address:"北京",
			headHeight: 75,
			windowHeight: 0,
			headTop: 0,
			currentItemId: 'home',
			currentData: {},
			scrollLeft: 0,
			isModal: false,
			contentText: {
				contentdown: '下拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '我是有底线的'
			},
			// 经度
			longitude:0,
			// 纬度
			latitude:0
		};
	},
	onLoad() {
		var QQMapWX = require('@/components/qqmap-wx-jssdk1.2/qqmap-wx-jssdk');
		var qqmapsdk;
		qqmapsdk = new QQMapWX({
		      key: 'FFCBZ-PGFKT-LPGXQ-VETEY-FQPUS-CEFBD'
		    });
		 qqmapsdk.reverseGeocoder({
		    success: (res)=>{
				console.log("地理位置",res);
				this.address = res.result.address;
				this.longitude=res.result.location.lng
				this.latitude=res.result.location.lat
		    }
		   })
	},
	onShow() {
		// 加载位置，后续版本开启加载写入全局
		// uni.getLocation({
		// 	type: 'wgs84',
		// 	geocode: true,
		// 	success: mres=> {
		// 		console.log('当前位置的经度：' + mres.longitude);
		// 		console.log('当前位置的纬度：' + mres.latitude);
		// 		this.latitude=mres.latitude,
		// 		this.longitude=mres.longitude,
		// 		uni.request({
		// 		    url: 'https://restapi.amap.com/v3/geocode/regeo',
		// 		    data: {
		// 				key: this.$wanlshop.config('amapkey'),
		// 				location: mres.longitude+','+mres.latitude
		// 		    },
		// 		    success: res=> {
		// 				if(res.statusCode == 200){
		// 					this.address= res.data.regeocode.formatted_address;
		// 				}
		// 		    }
		// 		});
		// 	},
		// 	fail(res) {
		// 		console.log(res)
		// 	}
		// });
		// #ifdef APP-PLUS
		plus.navigator.setFullscreen(false);
		// #endif
		// 计算页面尺寸
		let sys = this.$wanlshop.wanlsys();
		this.headTop = sys.top;
		this.headHeight = sys.height + uni.upx2px(20) + 40;
		this.windowHeight = sys.windowHeight;
		setTimeout(() => {
			uni.setNavigationBarColor({
				frontColor: this.$store.state.common.modulesData.homeModules.page
					? this.$store.state.common.modulesData.homeModules.page.style
							.navigationBarTextStyle
					: '',
				backgroundColor: this.$store.state.common.modulesData.homeModules.page
					? this.$store.state.common.modulesData.homeModules.page.style
							.navigationBarBackgroundColor
					: ''
			});
		}, 200);
	},
	onReady() {
		// 判断网络类型
		uni.getNetworkType({
			success: res => {
				if (res.networkType == '2g' || res.networkType == '3g' || res.networkType == '4g') {
					this.$wanlshop.msg('当前使用非WIFI环境，请注意流量使用');
				} else if (res.networkType == 'none') {
					this.$wanlshop.msg('没有网络');
				}
			}
		});
	},
	methods: {
		...mapActions({
			download: 'update/download', // 立即下载
			ignore: 'update/ignore' // 忽略更新
		}),
		// 重新定位
		reposition(){
			uni.chooseLocation({
				latitude:this.latitude,
				longitude:this.longitude,
				success: (res)=>{
					console.log('位置名称：' + res.name);
					console.log('详细地址：' + res.address);
					console.log('纬度：' + res.latitude);
					console.log('经度：' + res.longitude);
					this.address=res.address+res.name
					this.latitude=res.latitude
					this.longitude=res.longitude
				}
			});
		},
		// 选择Tag
		handleSelect(id, index) {
			this.currentItemId = id;
			this.scrollLeft = (index - 1) * 50;
		},
		// 弹出层
		handleModal() {
			this.isModal = !this.isModal;
		},
		// 动画
		animationFinish(e) {
			//#ifdef APP-PLUS
			this.changeCurrent(e);
			//#endif
		},
		// 滚动的tag
		changeCurrent(e) {
			this.currentItemId = e.detail.currentItemId;
			this.scrollLeft = (e.detail.current - 1) * 50;
		},
		// 一下扫码
		scanCode() {
			// #ifndef H5
			uni.scanCode({
				success: res => {
					var QRcode = this.getUrlParam(res.result);
					switch (QRcode.QRtype) {
						case 'goods':
							this.onGoods(QRcode.id);
							break;
						case 'user':
							this.$wanlshop.to(`/pages/user/info?id=${QRcode.id}`);
							break;
						case 'category':
							this.$wanlshop.on('/pages/category');
							break;
						case 'page':
							this.$wanlshop.to(`/pages/page/index?id=${QRcode.id}`);
							break;
						case 'shop':
							this.onShop(QRcode.id);
							break;
						case 'live':
							// #ifdef APP-PLUS || MP-WEIXIN
							this.$wanlshop.auth(`/pages/shop/live/live`);
							// #endif
							// #ifndef APP-PLUS || MP-WEIXIN
							this.$wanlshop.msg('目前只开放App和微信小程序鸡蛋');
							// #endif
							break;
						case 'chat':
							this.toChat(QRcode.id);
							break;
					}
				}
			});
			// #endif
			// #ifdef H5
			this.$wanlshop.msg('暂不支持H5扫码');
			// #endif
		},
		// 解析Url
		getUrlParam(url) {
			var obj = {};
			var data = url.split('?')[1].split('&');
			for (var i = 0; i < data.length; i++) {
				var res = data[i].split('=');
				obj[res[0]] = res[1];
			}
			return obj;
		},
		// 搜索
		handleSearch(text) {
			this.$wanlshop.to(`/pages/page/search?type=goods&keywords=${text}`, 'fade-in', 100);
		},
		//禁止父元素滑动 1.0.3升级
		moveHandle() {}
	}
};
</script>

<style lang="scss">
.wanlshop-container {
	background: #f7f7f7;
	.home-logo {
		margin-top: 16rpx;
		margin-left: 28rpx;
		margin-bottom: 15rpx;
		width: 126rpx;
		height: 40rpx;
	}
	&__head {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
		background-size: 100% auto;
		background-repeat: no-repeat;
		.navigater {
			height: 86rpx;
			width: 100%;
			padding-left: 28rpx;
			padding-right: 28rpx;
			/* #ifdef MP */
			padding-right: 28rpx;
			/* #endif */
			.search {
				width: 94%;
				margin: auto;
				flex: 1;
				background-color: #fff;
				height: 66rpx;
				border: 2rpx solid #fff;
				margin-left: 0;
				.icon {
					margin: 0 20rpx;
				}
				swiper {
					height: 100%;
					width: 100%;
					margin-right: 10rpx;
					swiper-item {
						display: flex;
						align-items: center;
					}
				}
			}
		}
		.toolbar {
			.scroll {
				flex: 1;
				white-space: nowrap;
				overflow: hidden;
				width: 100%;
				&__item {
					position: relative;
					z-index: 2;
					font-size: 28rpx;
					display: inline-flex;
					height: 58rpx;
					align-items: center;
					margin-right: 40rpx;
					&.action {
						position: relative;
						font-weight: bold;
						font-size: 30rpx;
						&::after {
							content: ' ';
							position: absolute;
							bottom: 0;
							left: 50%;
							transform: translateX(-50%);
							height: 4rpx;
							width: 30rpx;
							border-radius: 6rpx;
							background-color: #fff;
						}
					}
				}
			}
			.category {
				box-shadow: #eee -16rpx 0 16rpx -16rpx;
				height: 58rpx;
				font-size: 28rpx;
				padding-left: 25rpx;
			}
		}
	}
	&__main {
		position: relative;
		z-index: 99;
	}
	.WANL-MODAL {
		.cu-modal {
			&.top-modal {
				background: rgba(0, 0, 0, 0.6);
				text-align: inherit;
				.cu-dialog {
					background: #fff;
					border-radius: 0 0 18rpx 18rpx;
					.category {
						display: grid;
						grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
						grid-auto-flow: row dense;
						grid-gap: 16rpx;
						.item {
							display: flex;
							align-items: center;
							justify-content: center;
							padding: 12rpx 0;
							border: 2rpx solid transparent;
							&.action {
								background-color: transparent;
								border-color: #f40;
								color: #f40;
								font-weight: bold;
							}
						}
					}
				}
			}
		}
	}
}
</style>
