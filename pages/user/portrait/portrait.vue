<template>
	<view class="content">
		<view class="edgeInsetTop"></view>
		<!-- <wanl-image-cutter @ok="getCropperImage" @cancel="oncancle" :url="url" :fixed="false" :blob="false" :maxWidth="500" :maxHeight="500" /> -->
		<button type="default" open-type="chooseAvatar" @chooseavatar="chooseImage" class="text-center padding-top-xl" plain="true" style="border: 0;">
			<view  class="cu-avatar avatar" v-if="path" :style="{ backgroundImage: 'url(' + path + ')' }"></view>
			<view  class="cu-avatar avatar" v-else :style="{ backgroundImage: 'url(' + $wanlshop.oss(user.avatar, 100, 100) + ')' }"></view>
			<view class=" text-sm" >点击修改头像</view>
		</button>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			url: '',
			path: ''
		};
	},
	computed: {
		...mapState(['user'])
	},
	methods: {
		chooseImage(e) {
			// uni.chooseImage({
			// 	count: 1, // 默认9
			// 	sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
			// 	sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			// 	success: res => {
			// 		// 设置url的值，显示控件
			// 		this.url = res.tempFilePaths[0];
			// 	}
			// });
			console.log(e)
			this.getCropperImage(e.detail.avatarUrl)
		},
		getCropperImage(e) {
			this.path = e;
			this.url = '';
			// 上传图片
			this.$api.get({
				url: '/wanlshop/common/uploadData',
				success: updata => {
					this.$api.upload({
						url: updata.uploadurl,
						filePath: e,
						name: 'file',
						formData: updata.storage == 'local' ? null : updata.multipart,
						success: res => {
							this.$api.post({
								url: '/wanlshop/user/profile', 
								data: {avatar: res.fullurl},
								success: data => {
									this.$store.commit('user/setUserInfo', {avatar: data.avatar});
								}
							});
						}
					});
				}
			});
		},
		oncancle() {
			this.url = '';
		}
	}
};
</script>
<style lang="scss">
.avatar {
	width: 5rem;
	height: 5rem;
	background-color: #e5e5e5;
	border-radius: 50%;
	margin: 30rpx;
}
button ::after{
	border: 0 solid #ffffff;
}
</style>
