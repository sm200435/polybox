<!-- App全局模板配置-->
<script>
	import Vue from 'vue';
	export default {
		onLaunch() {
			// 检测客户端更新
			this.$store.dispatch('update/update');
			// 仅首次打开一次性加载数据
			this.$store.dispatch('common/init');
			// 同步购物车 本地 & 网络
			this.$store.dispatch('cart/get');
			// 同步 动态数据
			this.$store.dispatch('statistics/get');
			// #ifdef MP
			wx.onAppRoute(()=>{
				var pages=getCurrentPages()
				var curPage=pages[pages.length-1]
				curPage.onShareAppMessage=()=>{
								   return{
									   title:'订货就用多美盒，一站采购，超级省心！',
									   path:'pages/index',
									   imageUrl:'https://www.duomeihe.shop/uploads/20230327/test2.png'
								   }
				}
			})
			   
			// #endif
		},
		onShow() {
			// 启动或重启即时通讯
			this.$store.dispatch('chat/start');
		},
		onHide() {
			// 断开即时通讯
			this.$store.dispatch('chat/close');
		}
	};
</script>

<style>
	/* #ifndef APP-NVUE */
	@import 'static/style/colorui.css';
	@import 'static/style/wanlshop.css';
	@import 'static/style/iconfont.css';
	/* #endif */
</style>
