<template>
	<view class="container">
		<!-- 训练头部 -->
		<view class="training-header">
			<view class="header-info">
				<text class="exercise-name">{{ exercise?.name }}</text>
				<text class="training-mode">{{ modeName }}</text>
			</view>
			<view class="timer">{{ formattedTime }}</view>
		</view>

		<!-- 训练数据 -->
		<view class="training-stats">
			<view class="stat-item">
				<text class="stat-value">{{ distance || '0.00' }}</text>
				<text class="stat-label">距离(km)</text>
			</view>
			<view class="stat-item">
				<text class="stat-value">{{ pace || '0\'00"' }}</text>
				<text class="stat-label">配速</text>
			</view>
			<view class="stat-item">
				<text class="stat-value">{{ calories || '0' }}</text>
				<text class="stat-label">卡路里</text>
			</view>
		</view>

		<!-- 训练计划内容 -->
		<view class="card training-plan" v-if="mode === 'plan' && currentPlan">
			<text class="section-title">当前训练计划</text>
			<view class="plan-content">
				<text class="plan-name">{{ currentPlan.name }}</text>
				<text class="plan-session">{{ currentSession?.description }}</text>
			</view>
		</view>

		<!-- 地图区域 -->
		<view class="map-container" v-if="showMap">
			<map 
				class="map"
				:latitude="latitude"
				:longitude="longitude"
				:polyline="polyline"
				:markers="markers"
				show-location
			></map>
		</view>

		<!-- 训练项目列表 -->
		<view class="card exercise-list" v-if="mode === 'free' && exercise?.type === 2">
			<text class="section-title">训练项目</text>
			<view class="exercise-item" v-for="(item, index) in exerciseItems" :key="index">
				<view class="exercise-info">
					<text class="exercise-title">{{ item.name }}</text>
					<text class="exercise-desc">{{ item.sets }}组 × {{ item.reps }}次</text>
				</view>
				<checkbox :checked="item.completed" @click="toggleExercise(index)"></checkbox>
			</view>
		</view>

		<!-- 底部控制栏 -->
		<view class="footer-controls">
			<button 
				class="btn-control btn-pause" 
				v-if="isTraining"
				@click="pauseTraining"
			>暂停</button>
			<button 
				class="btn-control btn-resume" 
				v-if="isPaused"
				@click="resumeTraining"
			>继续</button>
			<button 
				class="btn-control btn-start" 
				v-if="!isTraining && !isPaused"
				@click="startTraining"
			>开始训练</button>
			<button 
				class="btn-control btn-end" 
				v-if="isTraining || isPaused"
				@click="endTraining"
			>结束训练</button>
		</view>

		<!-- 结束训练确认弹窗 -->
		<uni-popup ref="endConfirmPopup" type="dialog">
			<uni-popup-dialog
				title="结束训练"
				content="确定要结束本次训练吗？"
				:show-cancel="true"
				@confirm="confirmEndTraining"
			></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { exerciseTypes, trainingPlans } from '../../mock/data.js'
import { formatDuration, generateId } from '../../utils/index.js'

const exerciseId = ref(null)
const mode = ref('free')
const exercise = ref(null)
const currentPlan = ref(null)
const currentSession = ref(null)
const isTraining = ref(false)
const isPaused = ref(false)
const timer = ref(0)
const timerInterval = ref(null)
const distance = ref(0)
const pace = ref('0\'00"')
const calories = ref(0)
const latitude = ref(39.909)
const longitude = ref(116.397)
const polyline = ref([])
const markers = ref([])
const showMap = ref(false)
const exerciseItems = ref([
	{ name: '深蹲', sets: 3, reps: 12, completed: false },
	{ name: '卧推', sets: 3, reps: 10, completed: false },
	{ name: '引体向上', sets: 3, reps: 8, completed: false }
])
const endConfirmPopup = ref(null)
const locationUpdateInterval = ref(null)

const formattedTime = computed(() => {
	return formatDuration(timer.value)
})

const modeName = computed(() => {
	const modes = {
		free: '自由训练',
		plan: '计划训练',
		challenge: '挑战模式'
	}
	return modes[mode.value] || '训练'
})

const loadExerciseData = () => {
	exercise.value = exerciseTypes.find(e => e.id === exerciseId.value)
	if (!exercise.value) {
		uni.showToast({
			title: '项目不存在',
			icon: 'none'
		})
		setTimeout(() => {
			uni.navigateBack()
		}, 1500)
	}
}

const loadPlanData = (planId) => {
	currentPlan.value = trainingPlans.find(p => p.id === planId)
	if (currentPlan.value) {
		currentSession.value = currentPlan.value.sessions.find(s => !s.completed)
	}
}

const startTraining = () => {
	isTraining.value = true
	startTimer()
	if (showMap.value) {
		startLocationUpdate()
	}
}

const pauseTraining = () => {
	isPaused.value = true
	isTraining.value = false
	clearTimer()
	if (showMap.value) {
		stopLocationUpdate()
	}
}

const resumeTraining = () => {
	isPaused.value = false
	isTraining.value = true
	startTimer()
	if (showMap.value) {
		startLocationUpdate()
	}
}

const endTraining = () => {
	endConfirmPopup.value.open()
}

const confirmEndTraining = () => {
	clearTimer()
	if (showMap.value) {
		stopLocationUpdate()
	}
	
	// 保存训练记录
	const record = {
		id: generateId(),
		type: exerciseId.value,
		typeName: exercise.value.name,
		duration: timer.value,
		distance: distance.value,
		calories: calories.value,
		date: new Date().toISOString(),
		notes: ''
	}

	console.log('训练记录:', record)
	
	// 跳转到记录详情页
	uni.redirectTo({
		url: `/pages/records/detail?id=${record.id}`
	})
}

const startTimer = () => {
	timerInterval.value = setInterval(() => {
		timer.value++
		// 模拟数据更新
		if (showMap.value) {
			updateTrainingData()
		}
	}, 1000)
}

const clearTimer = () => {
	if (timerInterval.value) {
		clearInterval(timerInterval.value)
		timerInterval.value = null
	}
}

const startLocationUpdate = () => {
	// 模拟位置更新
	locationUpdateInterval.value = setInterval(() => {
		updateLocation()
	}, 5000)
}

const stopLocationUpdate = () => {
	if (locationUpdateInterval.value) {
		clearInterval(locationUpdateInterval.value)
		locationUpdateInterval.value = null
	}
}

const updateLocation = () => {
	// 模拟位置变化
	latitude.value += (Math.random() - 0.5) * 0.001
	longitude.value += (Math.random() - 0.5) * 0.001
	
	polyline.value.push({
		points: [{
			latitude: latitude.value,
			longitude: longitude.value
		}],
		color: '#FF0000DD',
		width: 4
	})
}

const updateTrainingData = () => {
	// 模拟数据更新
	distance.value = (timer.value * 0.003).toFixed(2)
	calories.value = Math.floor(timer.value * 0.2)
	pace.value = '5\'30"'
}

const toggleExercise = (index) => {
	exerciseItems.value[index].completed = !exerciseItems.value[index].completed
}

onMounted((options) => {
	exerciseId.value = parseInt(options.id)
	mode.value = options.mode || 'free'
	loadExerciseData()
	
	if (mode.value === 'plan' && options.planId) {
		loadPlanData(options.planId)
	}

	// 根据运动类型决定是否显示地图
	showMap.value = [1, 5].includes(exerciseId.value) // 跑步和骑行显示地图
})

onUnmounted(() => {
	clearTimer()
})
</script>

<style lang="scss">
@import '../../static/styles/common.css';

.training-header {
	background-color: var(--primary-color);
	padding: 40rpx 30rpx;
	color: white;

	.header-info {
		margin-bottom: 20rpx;
	}

	.exercise-name {
		font-size: 36rpx;
		font-weight: bold;
		display: block;
	}

	.training-mode {
		font-size: 28rpx;
		opacity: 0.9;
	}

	.timer {
		font-size: 72rpx;
		font-weight: bold;
		text-align: center;
	}
}

.training-stats {
	display: flex;
	justify-content: space-around;
	padding: 30rpx;
	background-color: white;
	margin-bottom: 20rpx;

	.stat-item {
		text-align: center;

		.stat-value {
			font-size: 36rpx;
			font-weight: bold;
			color: var(--text-color);
			display: block;
		}

		.stat-label {
			font-size: 24rpx;
			color: var(--text-color-light);
			margin-top: 8rpx;
		}
	}
}

.map-container {
	height: 500rpx;
	margin: 20rpx;
	border-radius: var(--border-radius);
	overflow: hidden;

	.map {
		width: 100%;
		height: 100%;
	}
}

.exercise-list {
	margin: 20rpx;

	.exercise-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1px solid #eee;

		&:last-child {
			border-bottom: none;
		}

		.exercise-info {
			flex: 1;

			.exercise-title {
				font-size: 28rpx;
				color: var(--text-color);
				margin-bottom: 8rpx;
				display: block;
			}

			.exercise-desc {
				font-size: 24rpx;
				color: var(--text-color-light);
			}
		}
	}
}

.footer-controls {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: space-around;
	padding: 20rpx;
	background-color: white;
	box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);

	.btn-control {
		width: 45%;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 40rpx;
		font-size: 32rpx;
	}

	.btn-start {
		background-color: var(--primary-color);
		color: white;
	}

	.btn-pause {
		background-color: var(--accent-color);
		color: white;
	}

	.btn-resume {
		background-color: var(--primary-color);
		color: white;
	}

	.btn-end {
		background-color: #ff4444;
		color: white;
	}
}

.training-plan {
	margin: 20rpx;

	.plan-content {
		padding: 20rpx 0;

		.plan-name {
			font-size: 30rpx;
			font-weight: bold;
			color: var(--text-color);
			margin-bottom: 10rpx;
			display: block;
		}

		.plan-session {
			font-size: 28rpx;
			color: var(--text-color-light);
		}
	}
}
</style>