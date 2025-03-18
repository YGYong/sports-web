<template>
	<view class="container">
		<!-- 训练概览 -->
		<view class="overview-card card">
			<view class="overview-header">
				<view class="type-info">
					<text class="type-tag">{{ record?.typeName }}</text>
					<text class="training-date">{{ formatDate(record?.date) }}</text>
				</view>
				<button class="btn-share" @click="shareRecord">分享</button>
			</view>

			<view class="stats-grid">
				<view class="stat-item">
					<text class="stat-value">{{ formatDuration(record?.duration) }}</text>
					<text class="stat-label">训练时长</text>
				</view>
				<view class="stat-item" v-if="record?.distance">
					<text class="stat-value">{{ record?.distance }}km</text>
					<text class="stat-label">运动距离</text>
				</view>
				<view class="stat-item">
					<text class="stat-value">{{ record?.calories }}</text>
					<text class="stat-label">消耗卡路里</text>
				</view>
			</view>
		</view>

		<!-- 训练详情 -->
		<view class="detail-card card" v-if="record?.exercises">
			<text class="section-title">训练项目</text>
			<view class="exercise-list">
				<view class="exercise-item" v-for="(exercise, index) in record.exercises" :key="index">
					<text class="exercise-name">{{ exercise }}</text>
					<uni-icons type="right" size="16"></uni-icons>
				</view>
			</view>
		</view>

		<!-- 训练备注 -->
		<view class="notes-card card" v-if="record?.notes">
			<text class="section-title">训练备注</text>
			<text class="notes-content">{{ record?.notes }}</text>
		</view>

		<!-- 训练数据图表 -->
		<view class="chart-card card">
			<text class="section-title">训练数据</text>
			<view class="chart-container">
				<!-- 这里可以集成图表组件展示详细数据 -->
				<text class="chart-placeholder">训练数据图表</text>
			</view>
		</view>

		<!-- 底部操作按钮 -->
		<view class="footer-actions">
			<button class="btn btn-outline" @click="editRecord">编辑记录</button>
			<button class="btn btn-primary" @click="startSimilarTraining">开始相似训练</button>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { formatDate, formatDuration } from '../../utils/index.js'
import { trainingRecords } from '../../mock/data.js'

const recordId = ref('')
const record = ref(null)

const loadRecordData = () => {
	// 模拟从API获取数据
	const foundRecord = trainingRecords.find(r => r.id === recordId.value)
	if (foundRecord) {
		record.value = foundRecord
	} else {
		uni.showToast({
			title: '记录不存在',
			icon: 'none'
		})
		setTimeout(() => {
			uni.navigateBack()
		}, 1500)
	}
}

const shareRecord = () => {
	uni.showShareMenu({
		withShareTicket: true,
		menus: ['shareAppMessage', 'shareTimeline']
	})
}

const editRecord = () => {
	uni.navigateTo({
		url: `/pages/records/edit?id=${recordId.value}`
	})
}

const startSimilarTraining = () => {
	uni.navigateTo({
		url: `/pages/exercise/start?type=${record.value.type}`
	})
}

onMounted(() => {
	const pages = getCurrentPages()
	const currentPage = pages[pages.length - 1]
	recordId.value = currentPage.options.id
	loadRecordData()
})
</script>

<style lang="scss">
@import '../../static/styles/common.css';

.overview-card {
	margin-bottom: 20rpx;
}

.overview-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 30rpx;
	
	.type-info {
		display: flex;
		align-items: center;
		
		.type-tag {
			background-color: var(--primary-color);
			color: white;
			padding: 6rpx 20rpx;
			border-radius: 20rpx;
			font-size: 26rpx;
			margin-right: 16rpx;
		}
		
		.training-date {
			font-size: 26rpx;
			color: var(--text-color-light);
		}
	}
	
	.btn-share {
		font-size: 26rpx;
		padding: 6rpx 20rpx;
		background-color: transparent;
		border: 1px solid var(--primary-color);
		color: var(--primary-color);
		border-radius: 30rpx;
	}
}

.stats-grid {
	display: flex;
	justify-content: space-around;
	padding: 20rpx 0;
	
	.stat-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.stat-value {
			font-size: 36rpx;
			font-weight: bold;
			color: var(--text-color);
			margin-bottom: 8rpx;
		}
		
		.stat-label {
			font-size: 24rpx;
			color: var(--text-color-light);
		}
	}
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	margin-bottom: 20rpx;
	display: block;
}

.exercise-list {
	margin-top: 10rpx;
	
	.exercise-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1px solid #eee;
		
		&:last-child {
			border-bottom: none;
		}
		
		.exercise-name {
			font-size: 28rpx;
			color: var(--text-color);
		}
	}
}

.notes-content {
	font-size: 28rpx;
	color: var(--text-color);
	line-height: 1.6;
}

.chart-container {
	height: 300rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #f8f8f8;
	border-radius: var(--border-radius);
	
	.chart-placeholder {
		font-size: 28rpx;
		color: var(--text-color-light);
	}
}

.footer-actions {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: space-between;
	padding: 20rpx;
	background-color: #fff;
	box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
	
	.btn {
		width: 48%;
	}
}
</style>