<template>
	<view style="background: #f7f7f7;height: 100vh;">
		<view class="edgeInsetTop"></view>
		<wanl-empty v-if="addressList.length === 0 && status !== 'loading'" text="还没添加任何地址" />
		<view class="margin-top-bj">
			<view class="cu-list menu-avatar" style="width: 687rpx;margin:31rpx;">
				<view class="cu-item" style="border-radius: 24rpx;"
					:class="modalName == 'move-box-' + index ? 'move-cur' : ''" v-if="addressList"
					v-for="(item, index) in addressList" :key="item.id" @tap="checkAddress(item)"
					@touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd"
					:data-target="'move-box-' + index">
					<!-- <view style="width: 100%;background: white;display: flex;justify-content: space-between;border-radius: 24rpx;"> -->
						<view class="cu-avatar round lg"
							style="background-color: #Fddde9;justify-content: center;left: 20rpx;color:#f42a75">
							{{ item.name.substring(0, 1) }}
						</view>
						<view class="content" style="margin: 30rpx 30rpx 24rpx 18rpx;left: 120rpx;">
							<view>
								<text class="wanl-pip margin-right-sm text-lg">{{ item.name }}</text>
								<text class="wanl-gray-light text-sm">{{ item.mobile }}</text>
							</view>
							<view class="text-sm wanl-pip text-cut-2" style="line-height: 1.3;padding-top: 6rpx;">
								<text v-if="item.default == 1" style="padding: 4rpx 8rpx;width: 59.18rpx;height: 35.02rpx;font-size: 23rpx;font-weight: 400;color: #F31064;line-height: 32rpx;margin-right: 5rpx;background-color: #fedfea;border-radius: 4rpx;">
									默认
								</text>
								{{ item.province }} {{ item.city }} {{ item.district }} {{ item.address_full }}
							</view>
						</view>
						<view class="action" style="left: 85%;position: absolute" @tap.stop="addAddress('edit', item)">
							<image style="width: 28.38rpx;height: 28.38rpx;" src="../../../static/images/user/addressEdit.png" mode=""></image>
						</view>
						<view class="move" style="height: 185rpx;right: -2rpx;width: 160rpx;">
							<!-- <view class="bg-grey" @tap.stop="addAddress('edit', item)">编辑</view> -->
							<view class="bg-gradual-orange" style="border-radius: 13rpx;" @tap.stop="delAddress(item.id, index)">删除</view>
						</view>
					
					<!-- </view> -->
				</view>
				<wanl-empty text="没有找到任何地址" src="address_default3x" v-else />
			</view>
		</view>
		<uni-load-more :status="status" :content-text="contentText" />
		<view class="wanlian cu-bar tabbar foot" style="display: flex;background-color: #f7f7f7;height: 150rpx;">
			<view>
				<button @tap="addAddress('add')" class="wanl-bg-orange" style="width: 290rpx;border-radius: 40rpx;font-size: 30rpx;margin-left: 70rpx;">添加新地址</button>
			</view>
			<view>
				<button @tap="importAddress" style="width: 290rpx;border-radius: 40rpx;font-size: 30rpx;background-color: #75BA77; color: white;margin-right: 70rpx;">导入微信地址</button>
			</view>
		</view>

		<!-- <view class="wanlian cu-bar tabbar foot"><button @tap="addAddress('add')" class="wanl-bg-orange" style="width: 584rpx;margin-bottom: 90rpx;border-radius: 40rpx;font-size: 30rpx;">导入微信地址</button></view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				source: 0,
				order_id: 0,
				addressList: [],
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,
				//上拉下拉
				total: 0, //数据量
				current_page: 1, //当前页码
				last_page: 1, //总页码
				status: 'loading',
				contentText: {
					contentdown: ' ',
					contentrefresh: '正在加载..',
					contentnomore: ''
				}
			};
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			this.current_page = 1;
			this.reload = true;
			this.loadData();
		},
		// 监听上拉加载
		onReachBottom() {
			//判断是否最后一页
			if (this.current_page >= this.last_page) {
				this.status = 'noMore';
			} else {
				this.current_page = this.current_page + 1; //页码+1
				this.status = 'loading';
				this.loadData(true);
			}
		},
		onLoad(option) {
			this.source = option.source;
			this.order_id = option.order_id;
			this.loadData();
		},
		methods: {
			// 导入微信地址
			importAddress() {
				console.log(213123);
				uni.chooseAddress({
					success(res) {
						// uni.setStorageSync('wxAddress', res);
						console.log(res.userName)
						console.log(res.postalCode)
						console.log(res.provinceName)
						console.log(res.cityName)
						console.log(res.countyName)
						console.log(res.detailInfo)
						console.log(res.nationalCode)
						console.log(res.telNumber)
						uni.navigateTo({
							url:`/pages/user/address/addressManage?type=wxAddress&data=${JSON.stringify(res)}`
						})
					},
				})
				// this.$wanlshop.to(`/pages/user/address/addressManage?type=wxAddress`);
			},
			async loadData(reload, refresh) {
				this.$api.get({
					url: '/wanlshop/address/getaddress',
					loadingTip: refresh ? '更新列表中...' : '',
					data: {
						page: reload ? (this.current_page) : 1
					},
					success: res => {
						if (reload) {
							this.addressList = this.addressList.concat(res.data);
						} else {
							this.addressList = res.data;
							uni.stopPullDownRefresh();
						}
						this.total = res.total; //数据量
						this.current_page = res.current_page; //当前页码
						this.last_page = res.last_page; //总页码
						this.status = res.total == 0 ? 'noMore' : 'more';
					}
				});
			},
			// 删除
			async delAddress(id, key) {
				uni.showModal({
					content: '是否删除地址?',
					success: res => {
						if (res.confirm) {
							this.$delete(this.addressList, key);
							this.$api.post({
								url: '/wanlshop/address/deladdress',
								data: {
									id: id
								}
							});
						}
					}
				});
			},
			//添加或修改成功之后回调
			async refreshList(data, type) {
				this.$api.post({
					url: '/wanlshop/address/address',
					data: {
						data: data,
						type: type
					},
					success: (res) => {
						this.loadData(false, true);
					}
				});
			},
			//选择地址
			checkAddress(item) {
				if (this.source == 1) {
					this.$wanlshop.prePage().loadData(item.id);
					this.$wanlshop.back(1);
				} else if (this.source == 2) { //我的订单修改地址  地址ID   返回订单ID
					this.$wanlshop.prePage().refreshList(item.id, this.order_id);
					this.$wanlshop.back(1);
				}
			},
			// 新增地址
			addAddress(type, item) {
				console.log(item);
				this.$wanlshop.to(`/pages/user/address/addressManage?type=${type}&data=${JSON.stringify(item)}`);
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
	};
</script>

<style>
	.cu-avatar.lg {
		width: 90rpx;
		height: 90rpx;
		font-size: 1.5em;
	}

	.cu-list.menu-avatar>.cu-item {
		position: relative;
		display: flex;
		padding-right: 10rpx;
		height: 185rpx;
		/* justify-content: flex-end; */
		align-items: center;
		margin-top: 30rpx;
		background: white;
		justify-content: space-between;
		border-radius: 24rpx;
		/* margin: 30rpx 31rpx; */
	}

	.wanlian.cu-bar.tabbar {
		background-color: transparent;
	}

	.wanlian.cu-bar.tabbar .cu-btn {
		width: calc(100% - 50rpx);
	}

	.wanlian.cu-bar.tabbar .cu-btn.lg {
		font-size: 32rpx;
		height: 86rpx;
	}
</style>
