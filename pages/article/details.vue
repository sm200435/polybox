<template>
	<view class="wanl-article">
		<view class="edgeInsetTop"></view>
		<!-- 进度条 -->
		<view class="load-progress" :class="loadProgress!=0?'show':'hide'">
			<view class="load-progress-bar bg-orange" :style="[{transform: 'translate3d(-' + (100-loadProgress) + '%, 0px, 0px)'}]"></view>
		</view>
		<view style="margin: auto;width: 687rpx;font-size: 29rpx;font-weight: 400;color: #141414;line-height: 43rpx;letter-spacing: 2px;font-family: 宋体;">
			江西多美盒数字智能科技有限公司<br/>
			坐落于江西省南昌市南昌经济技术开发区，公司注册资金2000万，为国家高新技术企业，具有"双软”资 质，并通过IS09001质量管理体系认证，以及3A信用企业认定。公司是以软件定制研发领域为主导，聚焦政府、企事业单位、高校、零售企业等领域，先后研发了多项具有核心自主知识产权的系统产品与APP平台，深受广大客户的好评，并且 已经获得数十项软件产品专利证书。公司以客户业务为中心，实际业务需求为导向，从客户利益岀发，为客户提供完善的信息化应用解决方案。
		</view>
	</view>
</template>

<script>
	import htmlParser from '@/common/html-parser';
	export default {
		data() {
			return {
				loadProgress: 0, //进度条
				detailsData: {}
			}
		},
		onLoad(option) {
			// 进度条
			// this.LoadProgress();
			// this.loadData({id:option.id});
			// this.$wanlshop.title(option.title);
		},
		methods: {
			// 异步加载
			async loadData(data) {
				this.$api.get({
					url: '/wanlshop/article/details',
					data: data,
					success: res => {
						//详情正则
						res.content = res.content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, (match, capture) => {
							var img = `<img style="display: block; max-width: 100%;" src="${this.$wanlshop.oss(capture, 500, 0)}">`;
							return img;
						});
						this.detailsData = res;
						this.loadProgress = 90;
					}
				});
			},
			// 进度条
			LoadProgress() {
				this.loadProgress = this.loadProgress + 2;
				if (this.loadProgress < 100) {
					setTimeout(() => {
						this.LoadProgress();
					}, 100)
				} else {
					this.loadProgress = 0;
				}
			}
		}
	}
</script>

<style>
	.wanl-article .content{
		
	}
</style>
