<template>
	<view>
		<!-- <image src="../../../static/images/user/kehu.png" style="width: 100%;height: 457rpx;"></image> -->
		<view style="background: url(https://www.duomeihe.shop/uploads/20230327/test4.png) no-repeat 0 -90rpx;background-size: 100% 40%;padding-top: 548rpx;background-color:#f7f7f7" v-if="details.is_apply==0">
			<view class="clies">
				<view class="partOne">
					<view class="scanicon">
						<!-- <image class="scanicon" src="https://www.duomeihe.shop/uploads/20230327/test4.png" /> -->
					</view>
				</view>
				<!-- <image src="https://www.duomeihe.shop/uploads/20230327/test4.png" style="width: 100%;height: 457rpx;"></image> -->
				<view class="clies">
					<view style="width: 615rpx;margin: 0 auto;">
						<view style="padding-top: 30rpx;">
							<view class="cliet">姓名</view>
							<input placeholder="请输入姓名" v-model="form.name" />
						</view>
						<view>
							<view class="cliet">联系电话</view>
							<input placeholder="请输入联系电话" v-model="form.mobile" />
						</view>
						<view>
							<view class="cliet">商品品类</view>
							<input placeholder="示例：蛋类" v-model="form.goods_cate" />
						</view>
						<view>
							<view class="cliet">采购金额</view>
							<input placeholder="请输入采购金额" v-model="form.pur_money" />
						</view>
						<view>
							<view class="cliet">采购频率</view>
							<input placeholder="示例：一月采购一次" v-model="form.pur_notice" />
						</view>
					</view>
					<button class="cu-btn wanl-bg-redorange margin-tb lg clinbut" @tap="submit">提交</button>
				</view>
			</view>
		</view>
		<view v-else style="margin-top: 248rpx;display: flex;justify-content: center;">
			<view>
				<view style="text-align: center;">
					<image src="/static/images/user/client.png" mode="" style="width: 274.15rpx;height: 315.22rpx;"></image>
				</view>
				<view style="font-size: 24rpx;font-weight: 400;color: #999999;line-height: 34rpx;margin-top: 36rpx;">
					您已经申请大客户，详细等待客服联系
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 大客户表单
				form: {
					name: '',
					mobile: '',
					goods_cate: '',
					pur_money: '',
					pur_notice: '',
				},
				// 大客户详情
				details: {}
			}
		},
		onLoad() {
			// console.log(2332);
			this.clientDetails()
		},
		methods: {
			// 提交申请
			submit() {
				if(this.form.name=="" || this.form.mobile=="" || this.form.goods_cate=="" || this.form.pur_money=="" || this.form.pur_notice==""){
					uni.showToast({
						title: '表单内容不能为空',
						duration: 2000,
						icon: 'none',
					});
				}
				else{
					this.$api.post({
						url: '/wanlshop/user/apply_client',
						data: {
							...this.form
						},
						success: res => {
							console.log(res);
							uni.showToast({
								title: '申请大客户成功',
								icon: 'success'
							})
							uni.redirectTo({
								url:'/pages/page/submit'
							})
						}
					});
				}
			},
			// 判断用户是否申请
			clientDetails() {
				this.$api.post({
					url: '/wanlshop/user/client',
					success: res => {
						this.details = res
					}
				});
			}
		}
	}
</script>

<style>
	.cliet {
		font-size: 30rpx;
		padding-bottom: 12rpx;
	}

	.clies {
		flex: 1;
		display: -webkit-flex;
		flex-direction: column;
		justify-content: space-between;
		background: white;
		width: 700rpx;
		height: 1018rpx;
		margin: 0 auto;
		border-radius: 26rpx;
		margin-top: -110rpx;
	}

	input {
		font-size: 29rpx;
		background: #F8F8F8;
		border-radius: 41rpx;
		height: 85rpx;
		margin-bottom: 30rpx;
		padding-left: 30rpx;
	}

	.clinbut {
		margin: 0 auto;
		width: 470rpx;
		height: 78rpx;
		margin-bottom: 33rpx;
		border-radius: 39rpx;
		text-align: center;
		font-size: 30rpx;
	}
	.container {
		background-color: #eeeeee;
		height: 100vh;
		}
	.container{
	    background-color: #eeeeee;
	    height : 100vh;
	}
</style>
	
</style>
