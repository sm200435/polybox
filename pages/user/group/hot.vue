<template>
	<view class="hotts" style="min-height: 100vh;overflow-y: auto;">
		<view style="height: 100%;">
			<view class="hot" v-for="(item, index) in listdata" :key="index" @tap="handleGoods(item.id)">
				<image class="hoimg" :src="$wanlshop.oss(item.image, 125, 125)" mode="aspectFit"></image>
				<view class="content">
					<view >
						<text style="font-size: 30rpx;">{{item.title}}</text>
					</view>
					<view class="flex align-center justify-between" style="width: 420rpx; height: 50rpx;text-align: center;">
						<view class="text-black text-bold" style="font-size: 31rpx;">
							<text>￥{{item.price}}</text>
						</view>
						<view>
							<image class="addcart" style="width: 40rpx;height: 40rpx;margin-top: 12rpx;" src="../../../static/images/user/jiahao.png" @tap.stop="addcartclick(item)"></image>
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
	export default{
		name: 'hot',
			props:{
				dataType: {
					type: String,
					default: 'goods'
				}
			},
			data(){
				return{
					listdata:[],
					selegoods:null,
					showcart:false
				}
			},
			methods:{
				async list(){
					uni.request({
						url: `${this.$wanlshop.config('appurl')}/wanlshop/product/hot_list`,
						method:'POST',
						success: (res) => {
							console.log("res",res.data.data)
							this.listdata = res.data.data
						},
						fail: (err) => {
							console.log(err)
						}
					})
				},
				handleGoods(id) {
					if (this.dataType === 'goods') {
						this.onGoods(id);
					} else if (this.dataType === 'groups') {
						this.$wanlshop.to(`/pages/apps/groups/goods?id=${14}`);
					}
				},
				addcartclick(good){
					console.log("good",good);
					this.selegoods=good
					this.showcart=true
				},
				hidecart(){
					this.showcart=false
				},
			},
			created() {
				this.list()
			}
		}
	
</script>

<style>
	page{
		height: 100%;
	}
	.hotts{
		height: 100%;
		background: #f7f7f7;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}
	.hot {
		width: 700rpx;
		height: 230rpx;
		background: white;
		margin: 0 30rpx 20rpx;
		display: flex;
		border-radius: 13rpx;
	}
	.hoimg {
		width: 178rpx;
		height: 178rpx;
		margin: 24rpx 20rpx 0;
		border-radius: 13rpx;
	}
	.content{
		width: 400rpx;
		height: 178rpx;
		margin: 24rpx 30rpx;
		flex: 1;
		display: -webkit-flex;
		flex-direction: column;
		justify-content: space-between;
	}
</style>
