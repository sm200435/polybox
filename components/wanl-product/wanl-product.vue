<template>
	<view style="background: #f7f7f7;height: 100vh;">
		<view class="wanl-product">
			<view class="product_warter" :class="dataStyle"
				v-if="dataStyle == 'col-2-10' || dataStyle == 'col-2-15' || dataStyle == 'col-2-20' || dataStyle == 'col-2-25' || dataStyle == 'col-2-30'">
				<view class="wanl-waterfall">
					<view id="wanl-left-cloumn" class="wanl-cloumn">
						<view class="warter left" v-for="(item, index) in leftList" :key="index"
							@tap="handleGoods(item.id)">
							<view class="img-wrap">
								<image class="image" :src="item.image" mode="widthFix"></image>
							</view>
							<view class="content" style="padding: 15rpx 0;">
								<view class="text-cut-2" style="margin: 0 14rpx;">
									<!-- <block v-if="item.shop.isself == 1">
										<view class="cu-tag radius sm bg-red">自营</view>
									</block>
									<block v-else>
										<view class="cu-tag radius sm bg-gray" v-if="item.shop.state == 0">个人</view>
										<view class="cu-tag radius sm wanl-bg-blue" v-else-if="item.shop.state == 1">企业
										</view>
										<view class="cu-tag radius sm wanl-bg-orange" v-else-if="item.shop.state == 2">
											旗舰</view>
									</block>
									<block v-if="dataType === 'groups'">
										<view class="cu-tag radius sm bg-red">
											{{item.is_ladder === 1 ? '阶梯' : item.people_num+'人'}}拼团
										</view>
									</block> -->
									<!-- <text class="margin-left-xs">{{ item.title }}</text> -->
									<text style="font-size: 30rpx;">{{ item.title }}</text>
								</view>
								<view class="goods-tag">
									<view class="cu-tag radius sm line-red" v-if="item.shop.isself == 1">官方放心购</view>
									<view class="cu-tag radius sm line-gray" v-if="item.isLive"
										@tap="onLive(item.isLive)">LIVE</view>
								</view>
								<view class="flex align-center justify-between">
									<view class="text-red text-bold text-lg" style="margin: 0 14rpx;">
										<text class="text-price">{{ item.price }}</text>
									</view>
									<!-- <view class="text-sm wanl-gray" v-if="dataType === 'groups'">
										<text>已拼团 {{$wanlshop.toFormat(item.groups_num, 'hundred')}} 件</text>
									</view>
									<view class="text-sm wanl-gray" v-else>
										<text>{{$wanlshop.toFormat(item.comment, 'hundred')}} 评价</text>
									</view> -->
									<view class="text-sm" style="margin-right: 20rpx;">
										<image class="addcart" src="../../static/images/user/jiahao.png" @tap.stop="addcartclick(item)"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view id="wanl-right-cloumn" class="wanl-cloumn">
						<view class="warter right" v-for="(item, index) in rightList" :key="index"
							@tap="handleGoods(item.id)">
							<view class="img-wrap">
								<image class="image"  :src="item.image" mode="widthFix"></image>
							</view>
							<view class="content" style="padding: 15rpx 0;">
								<view class="text-cut-2 text-lg" style="margin: 0 14rpx;">
									<!-- <block v-if="item.shop.isself == 1">
										<view class="cu-tag radius margin-right-xs sm bg-red">自营</view>
									</block>
									<block v-else>
										<view class="cu-tag radius sm margin-right-xs bg-gray"
											v-if="item.shop.state == 0">个人</view>
										<view class="cu-tag radius sm margin-right-xs wanl-bg-blue"
											v-else-if="item.shop.state == 1">企业</view>
										<view class="cu-tag radius sm margin-right-xs wanl-bg-orange"
											v-else-if="item.shop.state == 2">旗舰</view>
									</block> -->
									<text>{{ item.title }}</text>
								</view>
								<view class="goods-tag">
									<view class="cu-tag radius sm line-red" v-if="item.shop.isself == 1">官方放心购</view>
									<view class="cu-tag radius sm line-gray" v-if="item.isLive"
										@tap="onLive(item.isLive)">LIVE</view>
								</view>
								<view class="flex align-center justify-between">
									<view class="text-red text-bold text-lg" style="margin: 0 14rpx;">
										<text class="text-price">{{ item.price }}</text>
									</view>
									<!-- <view class="text-sm wanl-gray" v-if="dataType === 'groups'">
										<text>已拼团 {{$wanlshop.toFormat(item.groups_num, 'hundred')}} 件</text>
									</view>
									<view class="text-sm wanl-gray" v-else>
										<text>{{$wanlshop.toFormat(item.comment, 'hundred')}} 评价</text>
									</view> -->
									<!-- <view class="text-sm">
										<view class="addcart" @tap.stop="addcartclick(item)">+</view>
									</view> -->
									<view class="text-sm" style="margin-right: 20rpx;">
										<image class="addcart" src="../../static/images/user/jiahao.png" @tap.stop="addcartclick(item)"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 普通布局 -->
			<view class="product_list" :class="dataStyle" v-else>
				<view class="item" v-for="(item, index) in dataList" :key="index" @tap="handleGoods(item.id)">
					<view class="img-wrap">
						<image :src="$wanlshop.oss(item.image, 125, 125)" mode="aspectFill"></image>
					</view>
					<view class="content padding-sm">
						<view class="content" style="padding: 15rpx 0;">
							<view class="text-cut-2 text-lg" style="margin: 0 14rpx;">
								<!-- <block v-if="item.shop.isself == 1">
									<view class="cu-tag radius margin-right-xs sm bg-red">自营</view>
								</block>
								<block v-else>
									<view class="cu-tag radius sm margin-right-xs bg-gray" v-if="item.shop.state == 0">
										个人</view>
									<view class="cu-tag radius sm margin-right-xs wanl-bg-blue"
										v-else-if="item.shop.state == 1">企业</view>
									<view class="cu-tag radius sm margin-right-xs wanl-bg-orange"
										v-else-if="item.shop.state == 2">旗舰</view>
								</block> -->
								<text>{{ item.title }}</text>
							</view>
							<view class="goods-tag">
								<view class="cu-tag radius sm line-red" v-if="item.shop.isself == 1">官方放心购</view>
								<view class="cu-tag radius sm line-gray" v-if="item.isLive"
									@tap="onLive(item.isLive)">LIVE</view>
							</view>
						</view>
						<view class="flex align-center justify-between">
							<view class="text-red text-bold text-lg">
								<text class="text-price">{{ item.price }}</text>
							</view>
							<!-- <view class="text-sm wanl-gray">
								<text class="margin-right">{{$wanlshop.toFormat(item.comment, 'hundred')}} 评价</text>
								<text>{{ item.comment > 0 ? parseInt((item.praise / item.comment) * 100) : 0 }}%
									好评</text>
							</view> -->
							<!-- <view class="text-sm" >
								<view class="addcart" @tap.stop="addcartclick(item)">+</view>
							</view> -->
							<view class="text-sm" style="margin-right: 20rpx;">
								<image src="../../static/images/user/jiahao.png" style="width: 40rpx;height: 40rpx;text-align: center;line-height: 40rpx;" @tap.stop="addcartclick(item)"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-cart :goodsData="selegoods" v-if="showcart" @hidecart="hidecart"></uni-cart>
	</view>
</template>

<script>
  import unicart from '@/components/uni-cart/uni-cart.vue';
	export default {
		name: 'wanlProduct',
		props: {
			dataList: {
				type: Array,
				required: true,
				default: function() {
					return [];
				}
			},
			dataStyle: {
				type: String,
				default: 'col-2-20'
			},
			dataType: {
				type: String,
				default: 'goods'
			}
		},
		components:{
			unicart
		},
		data() {
			return {
				addTime: 180,
				leftList: [],
				rightList: [],
				tempList: [],
				children: [],
				selegoods:null,
				showcart:false
			}
		},
		watch: {
			copyFlowList(nVal, oVal) {
				// 取差值，即这一次数组变化新增的部分
				let startIndex = Array.isArray(oVal) && oVal.length > 0 ? oVal.length : 0;
				if (nVal.slice(startIndex).length == 0) {
					this.leftList = [];
					this.rightList = [];
					this.tempList = this.cloneData(this.copyFlowList);
				}else{
					this.tempList = this.tempList.concat(this.cloneData(nVal.slice(startIndex)));
				}
				this.splitData();
			},
		},
		mounted() {
			this.tempList = this.cloneData(this.copyFlowList);
			this.splitData();
		},
		computed: {
			// 破坏flowList变量的引用，否则watch的结果新旧值是一样的
			copyFlowList() {
				return this.cloneData(this.dataList);
			}
		},
		methods: {
			async splitData() {
				if (!this.tempList.length) return;
				let rightRect = await this.getRect('#wanl-right-cloumn');
				let leftRect = await this.getRect('#wanl-left-cloumn');
				// 如果左边小于或等于右边，就添加到左边，否则添加到右边
				let item = this.tempList[0];
				if(!item) return ;
				item.image = this.$wanlshop.oss(item.image, 172, 0, 1);
				item.comment = this.$wanlshop.toFormat(item.comment, 'hundred');
				item.praise = item.comment > 0 ? parseInt((item.praise / item.comment) * 100) : 0;
				if (leftRect.height < rightRect.height) {
					this.leftList.push(item);
				} else if (leftRect.height > rightRect.height) {
					this.rightList.push(item);
				} else {
					// 这里是为了保证第一和第二张添加时，左右都能有内容
					// 因为添加第一张，实际队列的高度可能还是0，这时需要根据队列元素长度判断下一个该放哪边
					if (this.leftList.length <= this.rightList.length) {
						this.leftList.push(item);
					} else {
						this.rightList.push(item);
					}
				}
				// 移除临时列表的第一项
				this.tempList.splice(0, 1);
				// 如果临时数组还有数据，继续循环
				if (this.tempList.length) {
					setTimeout(() => {
						this.splitData();
					}, this.addTime)
				}
			},
			// 复制而不是引用对象和数组
			cloneData(data) {
				return JSON.parse(JSON.stringify(data));
			},
			getRect(selector, all) {
				return new Promise(resolve => {
					let query = null;
					// 支付宝小程序不能加后面的.in(this)，是它自身的限制
					// #ifndef MP-ALIPAY
					query = uni.createSelectorQuery().in(this)
					// #endif
					// #ifdef MP-ALIPAY
					query = uni.createSelectorQuery()
					// #endif
					query[all ? 'selectAll' : 'select'](selector)
						.boundingClientRect(rect => {
							if (all && Array.isArray(rect) && rect.length) {
								resolve(rect)
							}
							if (!all && rect) {
								resolve(rect)
							}
						})
						.exec()
				})
			},
			handleGoods(id) {
				if (this.dataType === 'goods') {
					this.onGoods(id);
				} else if (this.dataType === 'groups') {
					this.$wanlshop.to(`/pages/apps/groups/goods?id=${id}`);
				}
			},
			addcartclick(good){
				console.log("good",good);
				this.selegoods=good
				this.showcart=true
			},
			hidecart(){
				this.showcart=false
			}
		}
	};
</script>

<style lang="scss" scoped>
	// .img-wrap{
	// 	height: 340rpx;
	// 	width: 340rpx;
	// }
	.wanl-waterfall {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		.wanl-cloumn {
			display: flex;
			flex: 1;
			flex-direction: column;
			height: auto;
			width: 50%;
			.wanl-image {
				width: 100%;
			}
		}
	}
	.addcart{
		width: 40rpx;
		height: 40rpx;
		// border-radius: 20rpx;
		// background-color: #F31064;
		// color: #ffffff;
		// font-size: 30rpx;
		// font-weight: bold;
		text-align: center;
		line-height: 40rpx;
	}
</style>
