<template>
	<view class="container">
		<!-- 项目头部 -->
		<view class="exercise-header">
			<image class="exercise-bg" :src="exercise?.icon" mode="aspectFill"></image>
			<view class="header-content">
				<text class="exercise-name">{{ exercise?.name }}</text>
				<view class="exercise-stats">
					<view class="stat-item">
						<text class="stat-value">{{ totalWorkouts }}</text>
						<text class="stat-label">总训练次数</text>
					</view>
					<view class="stat-item">
						<text class="stat-value">{{ totalDuration }}h</text>
						<text class="stat-label">总训练时长</text>
					</view>
					<view class="stat-item">
						<text class="stat-value">{{ totalCalories }}</text>
						<text class="stat-label">总消耗卡路里</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 快速开始 -->
		<view class="card">
			<text class="section-title">快速开始</text>
			<view class="quick-start-grid">
				<view class="quick-start-item" @click="startTraining('free')">
					<text class="item-icon">🎯</text>
					<text class="item-name">自由训练</text>
				</view>
				<view class="quick-start-item" @click="startTraining('plan')">
					<text class="item-icon">📋</text>
					<text class="item-name">计划训练</text>
				</view>
				<view class="quick-start-item" @click="startTraining('challenge')">
					<text class="item-icon">🏆</text>
					<text class="item-name">挑战模式</text>
				</view>
			</view>
		</view>

		<!-- 训练记录 -->
		<view class="card">
			<view class="section-header">
				<text class="section-title">最近记录</text>
				<text class="view-all" @click="viewAllRecords">查看全部</text>
			</view>
			<view class="record-list">
				<view 
					class="record-item" 
					v-for="record in recentRecords" 
					:key="record.id"
					@click="viewRecordDetail(record.id)"
				>
					<view class="record-info">
						<text class="record-date">{{ formatDate(record.date) }}</text>
						<view class="record-stats">
							<text>{{ formatDuration(record.duration) }}</text>
							<text v-if="record.distance">{{ record.distance }}km</text>
							<text>{{ record.calories }}kcal</text>
						</view>
					</view>
					<uni-icons type="right" size="16"></uni-icons>
				</view>
			</view>
		</view>

		<!-- 相关计划 -->
		<view class="card">
			<view class="section-header">
				<text class="section-title">推荐计划</text>
				<text class="view-all" @click="viewAllPlans">更多计划</text>
			</view>
			<view class="plan-list">
				<view 
					class="plan-item" 
					v-for="plan in recommendPlans" 
					:key="plan.id"
					@click="viewPlanDetail(plan.id)"
				>
					<view class="plan-info">
						<text class="plan-name">{{ plan.name }}</text>
						<text class="plan-desc">{{ plan.frequency }} · {{ plan.duration }}周</text>
					</view>
					<button class="btn-join">加入</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { formatDate, formatDuration } from '../../utils/index.js'
import { exerciseTypes, trainingRecords, trainingPlans } from '../../mock/data.js'

const exerciseId = ref(null)
const exercise = ref(null)
const totalWorkouts = ref(0)
const totalDuration = ref(0)
const totalCalories = ref(0)
const recentRecords = ref([])
const recommendPlans = ref([])

const loadExerciseData = () => {
	// 获取运动项目信息
	exercise.value = exerciseTypes.find(e => e.id === exerciseId.value)
	if (!exercise.value) {
		uni.showToast({
			title: '项目不存在',
			icon: 'none'
		})
		setTimeout(() => {
			uni.navigateBack()
		}, 1500)
		return
	}

	// 获取相关记录
	const records = trainingRecords.filter(r => r.type === exerciseId.value)
	recentRecords.value = records.slice(0, 3)
	
	// 计算统计数据
	totalWorkouts.value = records.length
	totalCalories.value = records.reduce((sum, r) => sum + r.calories, 0)
	totalDuration.value = (records.reduce((sum, r) => sum + r.duration, 0) / 3600).toFixed(1)

	// 获取推荐计划
	recommendPlans.value = trainingPlans
		.filter(p => p.type === exerciseId.value)
		.slice(0, 2)
}

const startTraining = (mode) => {
	uni.navigateTo({
		url: `/pages/exercise/start?type=${exerciseId.value}&mode=${mode}`
	})
}

const viewAllRecords = () => {
	uni.navigateTo({
		url: `/pages/records/index?type=${exerciseId.value}`
	})
}

const viewRecordDetail = (id) => {
	uni.navigateTo({
		url: `/pages/records/detail?id=${id}`
	})
}

const viewAllPlans = () => {
	uni.navigateTo({
		url: `/pages/plan/index?type=${exerciseId.value}`
	})
}

const viewPlanDetail = (id) => {
	uni.navigateTo({
		url: `/pages/plan/detail?id=${id}`
	})
}

onMounted((options) => {
	exerciseId.value = parseInt(options.id)
	loadExerciseData()
})
</script>

<style lang="scss">
@import '../../static/styles/common.css';

.exercise-header {
	position: relative;
	height: 400rpx;
	margin-bottom: 20rpx;

	.exercise-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		filter: brightness(0.7);
	}

	.header-content {
		position: absolute;
		bottom: 40rpx;
		left: 30rpx;
		right: 30rpx;
		color: white;

		.exercise-name {
			font-size: 48rpx;
			font-weight: bold;
			margin-bottom: 30rpx;
			text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		}

		.exercise-stats {
			display: flex;
			justify-content: space-between;

			.stat-item {
				text-align: center;

				.stat-value {
					font-size: 36rpx;
					font-weight: bold;
					display: block;
					margin-bottom: 8rpx;
				}

				.stat-label {
					font-size: 24rpx;
					opacity: 0.9;
				}
			}
		}
	}
}

.quick-start-grid {
	display: flex;
	justify-content: space-around;
	padding: 20rpx 0;

	.quick-start-item {
		display: flex;
		flex-direction: column;
		align-items: center;

		.item-icon {
			font-size: 48rpx;
			margin-bottom: 10rpx;
		}

		.item-name {
			font-size: 26rpx;
			color: var(--text-color);
		}
	}
}

.section-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20rpx;

	.view-all {
		font-size: 26rpx;
		color: var(--text-color-light);
	}
}

.record-list {
	margin-top: 10rpx;

	.record-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1px solid #eee;

		&:last-child {
			border-bottom: none;
		}

		.record-info {
			flex: 1;

			.record-date {
				font-size: 28rpx;
				color: var(--text-color);
				margin-bottom: 8rpx;
				display: block;
			}

			.record-stats {
				font-size: 24rpx;
				color: var(--text-color-light);

				text {
					margin-right: 20rpx;
				}
			}
		}
	}
}

.plan-list {
	margin-top: 10rpx;

	.plan-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1px solid #eee;

		&:last-child {
			border-bottom: none;
		}

		.plan-info {
			flex: 1;

			.plan-name {
				font-size: 28rpx;
				color: var(--text-color);
				margin-bottom: 8rpx;
				display: block;
			}

			.plan-desc {
				font-size: 24rpx;
				color: var(--text-color-light);
			}
		}

		.btn-join {
			font-size: 26rpx;
			padding: 6rpx 20rpx;
			background-color: var(--primary-color);
			color: white;
			border-radius: 30rpx;
		}
	}
}
</style>