<template>
	<view class="container">
		<!-- 筛选栏 -->
		<view class="filter-bar">
			<view class="filter-item" @click="showDatePicker">
				<text>{{ selectedDate || '时间筛选' }}</text>
				<uni-icons type="down" size="12"></uni-icons>
			</view>
			<view class="filter-item" @click="showTypeFilter">
				<text>{{ selectedType || '运动类型' }}</text>
				<uni-icons type="down" size="12"></uni-icons>
			</view>
		</view>

		<!-- 记录列表 -->
		<view class="record-list">
			<view 
				class="record-item card" 
				v-for="record in filteredRecords" 
				:key="record.id"
				@click="viewDetail(record.id)"
			>
				<view class="record-header">
					<view class="record-type">
						<text class="type-tag">{{ record.typeName }}</text>
						<text class="record-date">{{ formatDate(record.date) }}</text>
					</view>
					<uni-icons type="right" size="16"></uni-icons>
				</view>

				<view class="record-stats">
					<view class="stat-item">
						<text class="stat-label">时长</text>
						<text class="stat-value">{{ formatDuration(record.duration) }}</text>
					</view>
					<view class="stat-item" v-if="record.distance">
						<text class="stat-label">距离</text>
						<text class="stat-value">{{ record.distance }}km</text>
					</view>
					<view class="stat-item">
						<text class="stat-label">消耗</text>
						<text class="stat-value">{{ record.calories }}kcal</text>
					</view>
				</view>

				<view class="record-notes" v-if="record.notes">
					<text class="notes-text">{{ record.notes }}</text>
				</view>
			</view>
		</view>

		<!-- 空状态 -->
		<view class="empty-state" v-if="filteredRecords.length === 0">
			<image src="/static/images/empty-records.png" mode="aspectFit"></image>
			<text>暂无训练记录</text>
		</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { formatDate, formatDuration } from '../../utils/index.js';
import { trainingRecords } from '../../mock/data.js';

const records = ref(trainingRecords);
const selectedDate = ref('');
const selectedType = ref('');
const showDatePickerFlag = ref(false);
const showTypeFilterFlag = ref(false);

const filteredRecords = computed(() => {
	let result = records.value;
	
	if (selectedDate.value) {
		result = result.filter(record => 
			record.date.startsWith(selectedDate.value)
		);
	}
	
	if (selectedType.value) {
		result = result.filter(record => 
			record.typeName === selectedType.value
		);
	}
	
	return result;
});

const showDatePicker = () => {
	// 显示日期选择器
	uni.showActionSheet({
		itemList: ['全部时间', '本周', '本月', '上月'],
		success: (res) => {
			switch(res.tapIndex) {
				case 0:
					selectedDate.value = '';
					break;
				case 1:
					selectedDate.value = formatDate(new Date(), 'YYYY-MM');
					break;
				// ... 其他时间处理
			}
		}
	});
};

const showTypeFilter = () => {
	// 显示类型筛选
	const types = ['全部类型', '跑步', '健身', '瑜伽', '游泳', '骑行'];
	uni.showActionSheet({
		itemList: types,
		success: (res) => {
			selectedType.value = res.tapIndex === 0 ? '' : types[res.tapIndex];
		}
	});
};

const viewDetail = (id) => {
	uni.navigateTo({
		url: `/pages/records/detail?id=${id}`
	});
};
</script>

<style lang="scss">
@import '../../static/styles/common.css';

.filter-bar {
	display: flex;
	padding: 20rpx;
	background-color: #fff;
	margin-bottom: 20rpx;
	
	.filter-item {
		display: flex;
		align-items: center;
		margin-right: 30rpx;
		font-size: 28rpx;
		color: var(--text-color);
		
		uni-icons {
			margin-left: 6rpx;
		}
	}
}

.record-list {
	padding: 20rpx;
	
	.record-item {
		margin-bottom: 20rpx;
	}
}

.record-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20rpx;
	
	.record-type {
		display: flex;
		align-items: center;
		
		.type-tag {
			background-color: var(--primary-color);
			color: white;
			padding: 4rpx 16rpx;
			border-radius: 20rpx;
			font-size: 24rpx;
			margin-right: 16rpx;
		}
		
		.record-date {
			font-size: 26rpx;
			color: var(--text-color-light);
		}
	}
}

.record-stats {
	display: flex;
	margin-bottom: 20rpx;
	
	.stat-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.stat-label {
			font-size: 24rpx;
			color: var(--text-color-light);
			margin-bottom: 6rpx;
		}
		
		.stat-value {
			font-size: 30rpx;
			color: var(--text-color);
			font-weight: bold;
		}
	}
}

.record-notes {
	padding-top: 16rpx;
	border-top: 1px solid #eee;
	
	.notes-text {
		font-size: 26rpx;
		color: var(--text-color-light);
	}
}

.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 100rpx 0;
	
	image {
		width: 200rpx;
		height: 200rpx;
		margin-bottom: 20rpx;
	}
	
	text {
		font-size: 28rpx;
		color: var(--text-color-light);
	}
}
</style>