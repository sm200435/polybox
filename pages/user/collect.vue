<template>
	<view class="collect-container" style="width: 100%;height: 100%;">
		<view class="collect-container__main" :current-item-id="currentItemId" style="height: 100%;">
			<swiper-item v-for="(data, keys) in navList" :key="keys" :item-id="data.type" v-if="data.dataList.length != 0">
				<view class="action" @click="sho">
					<text v-if="cang">取消</text>
					<text v-else>多选</text>
				</view>
				<scroll-view class="content" scroll-y @scrolltolower="loadData">
					<view class="cu-list menu-avatar">
						<view class="cu-item" :class="modalName == 'move-box-' + index ? 'move-cur' : ''"
							v-if="data.dataList" v-for="(item, index) in data.dataList" :key="item.id"
							@touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd"
							:data-target="'move-box-' + index">
							<view class="item padding-sm" style="width: 100%;">
								<!-- 商品选择 -->
								<view class="wanl-cart-goods text-xxl margin-right-sm" v-if="cang" @click="checkTag(item)">
									<image src="../../static/images/user/xuanze.png" style="width: 36rpx;height: 36rpx;" v-if="item.checked"></image>
									<image src="../../static/images/user/danxuan.png" style="width: 36rpx;height: 36rpx;" v-else></image>
								</view>
								<view class="cu-avatar margin-right-bj radius"
									:style="{backgroundImage: `url(${$wanlshop.oss(item.image, 88, 88)})`}"></view>
								<view class="subject" @click="handleGoods(item.id)">
									<view class="text-cut-2" style="font-size: 30rpx;color: #353535;font-weight: bold;">
										{{item.title}}
									</view>
									<view class="flex align-center justify-between">
										<view class="text-red text-bold text-lg">
											<text class="text-price">{{ item.price }}</text>
										</view>
										<view class="text-sm" style="margin-right: 10rpx;">
											<image class="addcart" src="../../static/images/user/jiahao.png"
												@tap.stop="addcartclick(item)"></image>
										</view>
									</view>
								</view>
								<view class="move" style="left: 100%;width: 170rpx;margin-top: -20rpx;">
									<view class="bg-red" style="height: 220rpx;"
										@click.stop="loadFollow(item.id, index)">取消收藏</view>
								</view>
							</view>
						</view>
					</view>
					<!-- <uni-load-more :status="data.loadingType" :content-text="contentText" /> -->
				</scroll-view>
			</swiper-item>
			<wanl-empty text="你还没有任何收藏" src="/static/images/user/wucollect.png"  v-else>
				<template>
				<view @click="goCategory" style="width: 471.01rpx;height: 78.5rpx;border-radius: 39.25rpx;background-color: #F60F60;color: white;line-height: 78.5rpx;">
					去逛逛
				</view>
				</template>
			</wanl-empty>
		</view>
		<uni-cart :goodsData="selegoods" v-if="showcart" @hidecart="hidecart"></uni-cart>
		<view class="wanlian cu-bar foot" v-if="navList[0].dataList.length != 0 && cang">
			<button class="wanl-bg-orange" style="width: 470rpx;margin-bottom: 22rpx;border-radius: 40rpx;font-size: 30rpx;" @click="allCancel">取消收藏</button>
			<!-- <button v-else style="width: 470rpx;margin-bottom: 22rpx;border-radius: 40rpx;font-size: 30rpx;background: #F31064;color: #ffffff;opacity: 0.4;">取消收藏</button> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				headHeight: 0,
				windowHeight: 0,
				headTop: 0,
				currentId: 0,
				currentItemId: 'goods',
				modalName: null,
				cang: false,
				selegoods: null,
				showcart: false,
				navList: [{
					type: 'goods',
					type_text: '商品收藏',
					dataList: [],
					loadingType: 'more',
					current_page: 1
				}],
				contentText: {
					contentdown: ' ',
					contentrefresh: '收藏正在加载...',
					contentnomore: ''
				}
			};
		},
		onLoad() {
			// 计算页面尺寸
			let sys = this.$wanlshop.wanlsys();
			this.headTop = sys.top;
			this.headHeight = sys.height;
			this.windowHeight = sys.windowHeight - uni.upx2px(90);
			this.loadData();
		},
		methods: {
			goCategory(){
				uni.switchTab({
					url:'/pages/category'
				})
			},
			// 批量取消收藏
			allCancel(){
				let ids=[]
				this.navList[0].dataList.forEach(item=>{
					if(item.checked==true){
						ids.push(item.id)
					}
				})
				this.$api.post({
					url: '/wanlshop/product/del_folw',
					data: {
						ids:ids.toString()
					},
					success: res => {
						// 获取列表
						this.$api.get({
							url: '/wanlshop/product/collect',
							data: {
								type: "goods",
								page: 1
							},
							success: res => {
								this.navList[0].dataList=[]
								res.data.forEach(item => {
									this.navList[0].dataList.push(item.goods);
								});
							}
						});
					}
				});
			},
			// 点击选中取消
			checkTag(item){
				console.log(item);
				item.checked=!item.checked
			},
			loadData(source) {
				//这里是将订单挂载到tab列表下
				let navItem = this.navList[this.currentId];
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
					url: '/wanlshop/product/collect',
					data: {
						type: navItem.type,
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
						res.data.forEach(item => {
							navItem.dataList.push(item.goods);
						});
						//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
						this.$set(navItem, 'loaded', true);
					}
				});
			},
			async loadFollow(id, index) {
				if (this.currentItemId === 'goods') {
					var apiUrl = '/wanlshop/product/follow';
				} else if (this.currentItemId === 'groups') {
					var apiUrl = '/wanlshop/groups/product/follow';
				}
				uni.showModal({
					content: '您确定要取消收藏吗？',
					confirmColor: '#F31064',
					success: res => {
						if (res.confirm) {
							this.$api.post({
								url: apiUrl,
								loadingTip: '正在删除资源...',
								data: {
									id: id
								},
								success: res => {
									// 从列表删除
									this.$delete(this.navList[this.currentId].dataList, index);
									this.$store.commit('statistics/dynamic', {
										collection: this.$store.state.statistics
											.dynamic.collection - 1
									});
								}
							});
						}
					}
				});
			},
			handleBack() {
				this.$wanlshop.back(1);
			},
			handleGoods(id) {
				if (this.currentItemId === 'goods') {
					this.$wanlshop.to(`/pages/product/goods?id=${id}`)
				} else if (this.currentItemId === 'groups') {
					this.$wanlshop.to(`/pages/apps/groups/goods?id=${id}`)
				}
			},
			addcartclick(good) {
				console.log("good", good);
				this.selegoods = good
				this.showcart = true
			},
			hidecart() {
				this.showcart = false
			},
			sho() {
				if(this.cang==false){
					this.cang=true
				}else{
					this.cang = false;
				}
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX;
			},
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left';
			},
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target;
				} else {
					this.modalName = null;
				}
				this.listTouchDirection = null;
			}
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height: 100%;
	}
	.cu-list.menu-avatar>.cu-item {
		position: relative;
		display: flex;
		height: 227rpx;
		border-radius: 13rpx;
		justify-content: flex-end;
		align-items: center;
		margin: 30rpx 25rpx;
	}

	.action {
		margin: 30rpx 25rpx 0rpx;
	}

	.collect-container {
		background: #f7f7f7;

		&__head {
			.navigater {
				position: relative;

				.back {
					position: absolute;
					left: 25rpx;
					z-index: 9999;

					text {
						font-size: 36rpx;
						font-weight: bold;
					}
				}
			}
		}

		&__main {
			position: relative;
			z-index: 99;

			.content {
				height: 100%;

				.item {
					display: flex;

					.cu-avatar {
						height: 178rpx;
						width: 178rpx;
						flex-shrink: 0;
					}

					.subject {
						display: flex;
						flex: 1;
						flex-wrap: wrap;
						align-content: space-between;

						&>view {
							width: 100%;
						}

						.menu {
							display: flex;
							justify-content: space-between;

							.button {
								&>text+text {
									margin-left: 60rpx;
									margin-right: 10rpx;
								}
							}
						}
					}
				}
			}
		}

		.addcart {
			width: 40rpx;
			height: 40rpx;
			text-align: center;
			line-height: 40rpx;
		}

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
	}
</style>
