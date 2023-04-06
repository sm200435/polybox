<template>
	<view class="cu-modal bottom-modal show" @tap="hideModal">
		<view class="cu-dialog" @tap.stop="">
			<view class="option wanl-modal">
				<view class="head text-left padding-bj solid-bottom">
					<view class="cu-avatar radius-bock margin-right"
						:style="{ backgroundImage: 'url(' + $wanlshop.oss(selectshop.thumbnail || goodsData.image, 100, 100) + ')' }">
					</view>

					<view>
						<view class="text-price wanl-orange text-xl margin-bottom-xs">
							{{ selectshop.price || goodsData.interval_price }}</view>
						<view v-if="selectArr.join('')" class="wanl-gray margin-bottom-xs">
							库存 <text class="margin-lr-xs">{{ selectshop.stock || 0 }}</text> 件
						</view>
						<view class="text-sm">
							<view v-if="selectArr.join('')">
								<text class="margin-right-bj">已选择</text>
								<text class="margin-right-xs"
									v-for="(name, key) in selectArr">{{ $base64.decode(name) }}</text>
							</view>
							<view v-else>
								请选择：
								<text class="wanl-gray-light" v-for="(item, index) in goodsData.spu" :key="item.id">
									<block v-if="index != 0">-</block>
									{{ $base64.decode(item.name) }}
								</text>
							</view>
						</view>
					</view>

					<view class="close wlIcon-31guanbi" @tap="hideModal"></view>
				</view>
				<!-- 1.0.8升级 -->
				<scroll-view scroll-y="true" :style="{maxHeight: wanlsys.screenHeight / 2 + 'px'}">
					<view class="opt text-left padding-bj solid-bottom" v-for="(value, spukey) in goodsData.spu"
						:key="value.id">
						<view class="text-df">{{ value.name }}</view>
						<view class="tag">
							<view class="cu-tag text-sm" v-for="(item, index) in value.item" :key="index"
								:class="[item.ishow ? '' : 'noactive', subIndex[spukey] == index ? 'active' : '']"
								@tap="skuClick(item, spukey, $event, index)">
								{{ $base64.decode(item.name) }}
							</view>
						</view>
					</view>
					<view class="number padding-bj">
						<view class="text-df">购买数量</view>
						<uni-number-box :min="1" :max="selectshop.stock" :value="selectNum" :disabled="canCount"
							@change="changeNum"></uni-number-box>
					</view>
				</scroll-view>

				<view class="foot padding-lr-bj">
					<button class="cu-btn bg-gradual-orange round text-bold complete"
						@tap="completeSelection">完成</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "uni-cart",
		props: {
			goodsData: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		computed: {
			canCount() {
				return this.subIndex.some(item => item === -1);
			}
		},
		mounted() {
			// 价格区间
			if (this.goodsData.sku.length == 0) {
				this.goodsData.interval_price = this.goodsData.price;
				this.goodsData.market_price = this.goodsData.price;
			} else {
				let price = [],
					market_price = [];
				for (let value of this.goodsData.sku) {
					price.push(value.price);
					market_price.push(value.market_price);
				}
				let minPrice = Math.min.apply(null, price),
					maxPrice = Math.max.apply(null, price),
					maxMarketPrice = Math.max.apply(null, market_price);
				this.goodsData.interval_price = minPrice == maxPrice ? Number(minPrice).toFixed(2) : (minPrice + '-' +
					Number(maxPrice).toFixed(2)); //区间价格
				this.goodsData.market_price = Number(maxMarketPrice).toFixed(2); //最大市场价
			}
			// 商品规格组合
			this.goodsData.spu.map(item => {
				// 1.1.3升级
				item.item.map((name, key, arr) => {
					arr[key].name = this.$base64.encode(arr[key].name)
				});
				this.selectArr.push('');
				this.subIndex.push(-1);
			});
			// 1.1.3升级
			this.goodsData.sku.map(item => {
				item.difference.map((name, index, arr) => {
					arr[index] = this.$base64.encode(name)
				});
			});
			this.checkItem(); //计算sku里面规格形成路径
			this.checkInpath(-1); //传-1是为了不跳过循环
			this.$set(this.selectArr, 0, this.goodsData.spu[0].item[0].name);
			this.$set(this.subIndex, 0, 0);
			this.checkInpath(0);
			//如果全部选完
			if (this.selectArr.every(item => item != '')) {
				this.selectshop = this.shopItemInfo[this.selectArr];
				// 1.1.3升级
				this.selectshop.difference.map((name, index, arr) => {
					arr[index] = this.$base64.decode(name)
				})
				this.loadStock(this.selectshop.id);
				this.selectNum = 1;
			}
		},
		data() {
			return {
				// 商品规格组合
				shopItemInfo: {}, //存放要和选中的值进行匹配的数据
				selectArr: [], //存放被选中的值
				subIndex: [], //是否选中 因为不确定是多规格还是但规格，所以这里定义数组来判断
				selectshop: {}, //存放最后选中的商品
				selectNum: 1, //选中数量
			};
		},
		methods: {
			// 商品规格组合 选择
			skuClick(value, spukey, event, index) {
				if (value.ishow) {
					if (this.selectArr[spukey] != value.name) {
						this.$set(this.selectArr, spukey, value.name);
						this.$set(this.subIndex, spukey, index);
					} else {
						this.$set(this.selectArr, spukey, '');
						this.$set(this.subIndex, spukey, -1);
					}
					this.checkInpath(spukey);
					//如果全部选完
					if (this.selectArr.every(item => item != '')) {
						this.selectshop = this.shopItemInfo[this.selectArr];
						// 1.1.3升级
						this.selectshop.difference.map((name, index, arr) => {
							arr[index] = this.$base64.decode(name)
						})
						this.loadStock(this.selectshop.id);
						this.selectNum = 1;
					}
				}
			},
			//循环所有属性判断哪些属性可选
			checkInpath(clickIndex) {

				//当前选中的兄弟节点和已选中属性不需要循环
				for (let i = 0, len = this.goodsData.spu.length; i < len; i++) {
					if (i == clickIndex) {
						continue;
					}
					let len2 = this.goodsData.spu[i].item.length;
					for (let j = 0; j < len2; j++) {
						if (this.subIndex[i] != -1 && j == this.subIndex[i]) {
							continue;
						}
						let choosed_copy = [...this.selectArr];
						this.$set(choosed_copy, i, this.goodsData.spu[i].item[j].name);
						let choosed_copy2 = choosed_copy.filter(item => item !== '' && typeof item !== 'undefined');
						if (this.shopItemInfo.hasOwnProperty(choosed_copy2)) {
							this.$set(this.goodsData.spu[i].item[j], 'ishow', true);
						} else {
							this.$set(this.goodsData.spu[i].item[j], 'ishow', false);
						}
					}
				}
				// console.log(this.goodsData.spu)
			},
			//计算有多小种可选路径
			checkItem() {
				let result = this.goodsData.sku.reduce(
					(arrs, items) => {
						return arrs.concat(
							items.difference.reduce(
								(arr, item) => {
									return arr.concat(
										arr.map(item2 => {
											//利用对象属性的唯一性实现二维数组去重
											if (!this.shopItemInfo.hasOwnProperty([...item2, item])) {
												this.shopItemInfo[[...item2, item]] = items;
											}
											return [...item2, item];
										})
									);
								},
								[
									[]
								]
							)
						);
					},
					[
						[]
					]
				);
			},
			//商品规格修改数量
			changeNum(val) {
				console.log(val,123123213);
				if (this.selectshop.stock) {
					let num = parseInt(val);
					if (num > this.selectshop.stock) {
						this.$wanlshop.msg(`数量不能超过库存 ${this.selectshop.stock} 件`);
						this.selectNum = parseInt(this.selectshop.stock);
					} else {
						this.selectNum = parseInt(val);
					}
				}
			},
			async loadStock(sku_id) {
				this.$api.get({
					url: '/wanlshop/product/stock',
					data: {
						sku_id: sku_id
					},
					success: res => {
						this.selectshop.stock = res;
					}
				});
			},
			hideModal() {
				this.$emit('hidecart')
			},
			completeSelection() {
				console.log(123123);
				// 判断用户当前是否登录
				if(this.$store.state.user.isLogin==false){
					uni.navigateTo({url:'/pages/user/auth/auth'});
					return
				}
				
				if (this.canCount) {
					this.$wanlshop.msg('请选择完成规格');
					return
				}
				this.$store.dispatch('cart/add', {
					shop_id: this.goodsData.shop_id,
					shop_name: this.goodsData.shop.shopname,
					goods_id: this.goodsData.id,
					title: this.goodsData.title,
					number: this.selectNum,
					image: this.goodsData.image,
					sku: this.selectshop,
					sku_id: this.selectshop.id,
					sum: this.$wanlshop.bcmul(this.selectshop.price, this.selectNum)
				});
				this.$wanlshop.msg('添加成功');
				this.$emit('hidecart')
			}
		}
	}
</script>

<style lang="scss">

</style>
