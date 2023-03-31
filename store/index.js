/**
 * 状态管理器
 **/
import Vue from 'vue';
import Vuex	from 'vuex';
// 模块
import common from './modules/common';
import user	from './modules/user';
import chat	from './modules/chat';
import cart from './modules/cart';
import statistics from './modules/statistics';
import update from './modules/update';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		chat, // 即时通讯
		common, // 系统初始化
		user, // 用户中心
		cart, // 购物车
		statistics, // 系统更新
		update // 系统更新
	}
});

export default store;
