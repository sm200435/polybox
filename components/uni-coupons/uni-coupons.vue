<template>
	<view class="coupons" v-if="couponsArray.length>0" style="margin-top: 25rpx;">
		<!-- <view class="coupons-top">
			<view class="coupons-t">新人福利</view>
			<view class="coupons-more" @click="moreclick()">
				<view class="coupons-more-text">更多优惠</view>
				<view class="coupons-more-img">
					<text class="iconfont">&#xe6b2;</text>
				</view>
			</view>
		</view> -->
		<view class="coupons-list" v-if="couponsArray.length==1">
			<view class="coupons-item list-one" v-for="(item,index) of couponsArray" :key="index">
				<view class="list-one-left">
					<view class="list-left-top">
						<text style="font-size: 39rpx;font-weight: 500;color: #F31064;line-height: 53rpx;">
							满{{Number(item.limit)}}减{{Number(item.price)}}
						</text>
						<text style="margin-left: 10rpx;font-weight: 500;font-size: 39rpx;">{{item.name}}</text>
					</view>
					<view class="list-left-bottom">
						<view style="font-size: 27rpx;font-weight: normal;color: #999999;line-height: 36rpx;">
							新用户注册七天内领取
						</view>
						<view class="list-left-bottom-yi" v-if="item.is_lin==1">已领取</view>
						<view class="list-left-bottom-li" @click="getcoupons(item,index)" v-else>立即领取</view>
					</view>
				</view>
				<view class="list-one-right">
				</view>
			</view>
		<!-- 	<view class="coupons-item" v-for="(item,index) of couponsArray">
				<view class="coupons-first" v-if="item.usertype=='reduction'">
					<view class="coupons-first-m">¥</view>
					<view class="coupons-first-n">{{item.price}}</view>
				</view>
				<view class="coupons-first" v-if="item.usertype=='discount'">
					<view class="coupons-first-m">折</view>
					<view class="coupons-first-n">{{item.discount}}</view>
				</view>
				<view class="coupons-second">
					<view class="coupons-second-t">{{item.name}}</view>
					<view class="coupons-second-r" v-if="item.limit>0">满{{item.limit}}可用</view>
					<view class="coupons-second-r" v-else>无门槛</view>
				</view>
				<view class="coupons-third" style="background: rgba(243, 16, 100, 0.14);color: #F31064;opacity: 0.3;" v-if="item.is_lin==1">已领取</view>
				<view class="coupons-third" @click="getcoupons(item,index)" v-else>立即领取</view>
				<image class="coupons-img" src="../../static/images/coupons/coupons-1.png"></image>
			</view> -->
		</view>
		<view class="coupons-list list-two" v-if="couponsArray.length==2">
			<view class="coupons-item coupons-two" v-for="(item,index) of couponsArray">
				<view class="coupons-left">
					<view class="coupons-left-first" v-if="item.usertype=='reduction'">
						<view class="coupons-first-m">¥</view>
						<view class="coupons-first-n">{{item.price}}</view>
					</view>
					<view class="coupons-left-first" v-if="item.usertype=='discount'">
						<view class="coupons-first-m">折</view>
						<view class="coupons-first-n">{{item.discount}}</view>
					</view>
					<view class="coupons-left-t">{{item.name}}</view>
					<view class="coupons-left-r" v-if="item.limit>0">满{{item.limit}}可用</view>
					<view class="coupons-left-r" v-else>无门槛</view>
				</view>
				<view class="coupons-right">
					<image class="coupons-icon" src="../../static/images/coupons/coupons-2.png"></image>
					<view class="coupons-btn" style="opacity: 0.3;" v-if="item.is_lin==1">已领取</view>
					<view class="coupons-btn" @click="getcoupons(item,index)" v-else>立即领取</view>
				</view>
			</view>
		</view>
		<view class="coupons-list coupons-list-more" v-if="couponsArray.length>2">
			<scroll-view class="list-third" scroll-x="true">
				<view class="coupons-item-third" v-for="(item,index) of couponsArray">
					<view class="coupons-third-first" v-if="item.usertype=='reduction'">
						<view class="coupons-third-m">¥</view>
						<view class="coupons-third-n">{{item.price}}</view>
					</view>
					<view class="coupons-third-first" v-if="item.usertype=='discount'">
						<view class="coupons-third-m">折</view>
						<view class="coupons-third-n">{{item.discount}}</view>
					</view>
					<view class="coupons-third-t">{{item.name}}</view>
					<view class="coupons-third-r" v-if="item.limit>0">满{{item.limit}}可用</view>
					<view class="coupons-third-r" v-else>无门槛</view>
					<view class="coupons-third-btn" style="opacity: 0.3;" v-if="item.is_lin==1">已领取</view>
					<view class="coupons-third-btn" v-else @click="getcoupons(item,index)">立即领取</view>
				</view>
			</scroll-view>
			<view class="coupons-get" @click="allget">一键领取</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"uni-coupons",
		props:{
			couponsList:{
				type:Array,
				default: function() {
					return [];
				}
			}
		},
		data() {
			return {
				couponsArray:[]
			};
		},
		onshow(){
			
		},
		mounted() {
			this.couponsArray=this.couponsList
			console.log(this.couponsArray,23232342432432423);
		},
		methods:{
			getcoupons(item,index){
				let that=this
				that.$api.post({
					url: '/wanlshop/coupon/receive',
					data:{
						id:item.id
					},
					success: data => {
						uni.showToast({
							title:'领取成功',
							icon:'success'
						})
						that.couponsArray[index].is_lin=1
					}
				});
			},
			allget(){
				var idstr = ''
				for(let i=0;i<this.couponsArray.length;i++){
					var item=this.couponsArray[i]
					if(item.is_lin==0){
						if(i==0){
							idstr=item.id
						}
						else{
							idstr=idstr+','+item.id
						}
					}
				}
				this.$api.post({
					url: '/wanlshop/coupon/on_click_coll',
					data:{
						ids:idstr
					},
					success: data => {
						uni.showToast({
							title:'一键领取成功',
							icon:'success'
						})
						for(let i=0;i<this.couponsArray.length;i++){
							this.couponsArray[i].is_lin=1
						}
					}
				});
			},
			moreclick(){
				uni.navigateTo({
					url:'/pages/user/coupon/list'
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
.coupons{
	width: 100%;
	background-color: #F7F7F7;
	.coupons-top{
		padding: 30rpx 25rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.coupons-t{
		font-size: 30rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #141414;
	}
	.coupons-more{
		display: flex;
		align-items: center;
		justify-content: flex-end;
		.coupons-more-text{
			font-size: 27rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #848689;
		}
		.coupons-more-img{
			width: 36rpx;
			height: 36rpx;
			color: #848689;
		}
	}
	.coupons-list{
		border-radius: 10rpx;
		margin: 0 25rpx;
		background-color: #ffffff;
		display: flex;
		align-items: center;
		padding: 12rpx;
		.coupons-item{
			position: relative;
			background-color: #FDE7EF;
			display: flex;
			align-items: center;
			padding: 34rpx 0;
			border-radius: 10rpx;
			flex: 1;
			.coupons-first{
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 20rpx;
				color: #F31064;
				.coupons-first-m{
					font-size: 36rpx;
					margin-top: 24rpx;
				}
				.coupons-first-n{
					font-size: 72rpx;
					margin-left: 6rpx;
				}
			}
			.coupons-second{
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: center;
				.coupons-second-t{
					font-size: 30rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #141414;
				}
				.coupons-second-r{
					font-size: 21rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					margin-top: 10rpx;
					color: rgba(20,20,20,0.28);
				}
			}
			.coupons-third{
				width: 129rpx;
				height: 50rpx;
				background: #F31064;
				border-radius: 25rpx;
				text-align: center;
				line-height: 50rpx;
				margin-right: 40rpx;
				color: #ffffff;
				font-size: 22rpx;
			}
			.coupons-img{
				position: absolute;
				bottom: 0;
				right: -40rpx;
				width: 132rpx;
				height: 153rpx;
			}
			.coupons-left{
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				.coupons-left-first{
					display: flex;
					align-items: center;
					justify-content: flex-start;
					color: #F31064;
					.coupons-first-m{
						font-size: 21rpx;
						margin-top: 6rpx;
					}
					.coupons-first-n{
						font-size: 42rpx;
						margin-left: 6rpx;
					}
				}
				.coupons-left-t{
					font-size: 34rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #141414;
				}
				.coupons-left-r{
					font-size: 19rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					margin-top: 8rpx;
					color: rgba(20,20,20,0.28);
				}
			}
			.coupons-right{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				.coupons-icon{
					width: 43rpx;
					height: 50rpx;
				}
				.coupons-btn{
					width: 116rpx;
					height: 40rpx;
					background: #F31064;
					border-radius: 20rpx;
					text-align: center;
					line-height: 40rpx;
					color: #ffffff;
					font-size: 19rpx;
					margin-top: 20rpx;
				}
			}
		}
		.coupons-item-third{
			width: 35%;
			padding: 12rpx;
			background-color: #FDE7EF;
			border-radius: 10rpx;
			display: inline-flex;
			flex-direction: column;
			align-items: center;
			margin-right: 12rpx;
			.coupons-third-first{
				display: flex;
				align-items: center;
				justify-content: flex-start;
				color: #F31064;
				.coupons-third-m{
					font-size: 18rpx;
					margin-top: 6rpx;
				}
				.coupons-third-n{
					font-size: 36rpx;
					margin-left: 6rpx;
				}
			}
			.coupons-third-t{
				font-size: 22rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #141414;
			}
			.coupons-third-r{
				font-size: 18rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				margin-top: 4rpx;
				color: rgba(20,20,20,0.28);
			}
			.coupons-third-btn{
				width: 105rpx;
				height: 34rpx;
				background: #F31064;
				border-radius: 17rpx;
				text-align: center;
				line-height: 34rpx;
				color: #ffffff;
				font-size: 14rpx;
				margin-top: 10rpx;
			}
		}
		.coupons-two{
			flex: 1;
			margin-right: 12rpx;
			padding: 20rpx 20rpx;
		}
		.coupons-get{
			background-color: #F31064;
			font-size: 24rpx;
			color: #ffffff;
			width: 70%;
			height: 54rpx;
			line-height: 54rpx;
			text-align: center;
			margin: 20rpx;
			border-radius: 27rpx;
		}
	}
	.list-two{
		padding-right: 0rpx;
	}
	.list-third{
		white-space: nowrap;
	}
	.coupons-list-more{
		display: flex;
		flex-direction: column;
	}
	.list-one{
		background-color: #ffffff !important;
		padding: 27rpx 35rpx 25rpx 35rpx !important;
		justify-content: space-between;
		.list-left-bottom{
			width: 400rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 4rpx;
			.list-left-bottom-li{
				background: #F31064;
				width: 115rpx;
				height: 33rpx;
				border-radius: 16rpx;
				font-size: 22rpx;
				font-weight: 400;
				color: #FFFFFF;
				padding: 2rpx 2rpx 2rpx 0 !important;
				line-height: 30rpx;
				margin: 0 !important;
				text-align: center;
			}
			.list-left-bottom-yi{
				background: #ccc;
				width: 115rpx;
				height: 33rpx;
				border-radius: 16rpx;
				font-size: 22rpx;
				font-weight: 400;
				color: #FFFFFF;
				padding: 2rpx 2rpx 2rpx 0 !important;
				line-height: 30rpx;
				margin: 0 !important;
				text-align: center;
			}
		}
		.list-one-right{
			width: 145.53rpx;
			height: 116.55rpx;
			background: url('https://www.duomeihe.shop/uploads/20230331/money1.png') no-repeat 0 0;
			background-size: 100% 100%;
		}
	}
}
</style>