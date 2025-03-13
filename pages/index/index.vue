<template>
	<view class="page-container">
		<view class="page-header">
			<view class="current-time">
				<text>{{currentTime}}</text>
			</view>
			<view class="current-check">
				<text class="record">已坚持打卡7天</text>
				<text class="check">打卡</text>
			</view>
			<!-- <up-button type="primary" text="确定"></up-button> -->
		</view>
		<view class="page-center">
			<img v-for="item in imgs" :key="item.name" :src="item.src" alt="" srcset="" />
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		onUnmounted
	} from "vue";
	import {
		onShow,
		onHide
	} from "@dcloudio/uni-app"
	import {
		getCurrentTime
	} from "@/utils/commonDate.js"
	const imgs = [{
			src: "/static/images/sports/yaling.png",
			name: "yaling"
		},
		{
			src: "/static/images/sports/paobu.png",
			name: "paobu"
		},
		{
			src: "/static/images/sports/qixing.png",
			name: "yaling"
		},
		{
			src: "/static/images/sports/lanqiu.png",
			name: "lanqiu"
		},
		{
			src: "/static/images/sports/youyong.png",
			name: "youyong"
		},
		{
			src: "/static/images/sports/jishiqi.png",
			name: "jishiqi"
		},
		{
			src: "/static/images/sports/xinlv.png",
			name: "xinlv"
		},
		{
			src: "/static/images/sports/shezhi.png",
			name: "shezhi"
		},
	]
	const currentTime = ref()
	const timer = ref(null)
	onShow(() => {
		timer.value = setInterval(() => {
			currentTime.value = getCurrentTime()
		}, 1000)
	})
	onHide(() => {
		timer.value = null
	})
</script>

<style lang="scss" scoped>
	.page-container {

		// padding:20px;
		.page-header {
			width: 750rpx;
			height: 350rpx;
			background-image: url("/static/images/sports/bg.jpeg");
			background-size: 100% 100%;

			.current-time {
				font-size: 24px;
				color: #46ae13;
				width: 160rpx;
				// margin: auto;
				padding-top: 6rpx;
			}

			.current-check {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.record {
					font-size: 20px;
					color: #F44336;
					margin-bottom: 30rpx;
				}

				.check {
					background-color: #5ac725;
					color: #fff;
					width: 200rpx;
					text-align: center;
					padding: 10rpx;
					border-radius: 40rpx;
				}
			}
		}

		.page-center {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			place-items: center;
			gap: 20rpx 0;
			margin: 20rpx 0;
		}
	}
</style>