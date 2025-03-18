<template>
  <view class="container">
    <!-- 顶部打卡区域 -->
    <view class="card check-in-card">
      <view class="check-in-header">
        <text class="text-title">今日打卡</text>
        <text class="text-caption">{{ today }}</text>
      </view>
      <view class="check-in-body" v-if="!todayChecked">
        <button class="btn btn-primary check-in-btn" @click="checkIn">立即打卡</button>
        <text class="text-caption">已连续打卡 {{ consecutiveDays }} 天</text>
      </view>
      <view class="check-in-body" v-else>
        <view class="check-in-success">
          <text class="success-icon">✓</text>
          <text class="text-subtitle">今日已打卡</text>
        </view>
        <text class="text-caption">已连续打卡 {{ consecutiveDays }} 天</text>
      </view>
    </view>

    <!-- 运动项目入口 -->
    <view class="card">
      <text class="text-title">运动项目</text>
      <view class="exercise-grid">
        <view class="exercise-item" v-for="item in exerciseTypes" :key="item.id" @click="navigateToExercise(item)">
          <image class="exercise-icon" :src="item.icon" mode="aspectFit"></image>
          <text class="exercise-name">{{ item.name }}</text>
        </view>
      </view>
    </view>

    <!-- 历史训练时间段 -->
    <view class="card">
      <view class="flex-row space-between">
        <text class="text-title">训练统计</text>
        <text class="text-caption" @click="viewMoreStats">查看更多</text>
      </view>
      <view class="stats-row">
        <view class="stat-item">
          <text class="stat-value">{{ totalTrainingTime }}</text>
          <text class="stat-label">总训练时长</text>
        </view>
        <view class="stat-item">
          <text class="stat-value">{{ totalWorkouts }}</text>
          <text class="stat-label">总训练次数</text>
        </view>
        <view class="stat-item">
          <text class="stat-value">{{ totalCalories }}</text>
          <text class="stat-label">总消耗卡路里</text>
        </view>
      </view>
    </view>

    <!-- 训练记录 -->
    <view class="card">
      <view class="flex-row space-between">
        <text class="text-title">近期训练</text>
        <text class="text-caption" @click="viewAllRecords">全部记录</text>
      </view>
      <view v-if="trainingRecords.length > 0">
        <view class="record-item" v-for="record in recentRecords" :key="record.id" @click="viewRecordDetail(record)">
          <view class="record-header">
            <view class="flex-row">
              <text class="record-type">{{ record.typeName }}</text>
              <text class="record-date">{{ formatDate(record.date) }}</text>
            </view>
            <uni-icons type="right" size="16"></uni-icons>
          </view>
          <view class="record-details">
            <view class="record-detail-item">
              <text class="detail-label">时长</text>
              <text class="detail-value">{{ formatDuration(record.duration) }}</text>
            </view>
            <view class="record-detail-item" v-if="record.distance">
              <text class="detail-label">距离</text>
              <text class="detail-value">{{ record.distance }}km</text>
            </view>
            <view class="record-detail-item">
              <text class="detail-label">消耗</text>
              <text class="detail-value">{{ record.calories }}kcal</text>
            </view>
          </view>
        </view>
      </view>
      <view v-else class="empty-records">
        <text>暂无训练记录</text>
        <button class="btn btn-outline" @click="startNewTraining">开始训练</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { formatDate, formatDuration } from '../../utils/index.js'
import { exerciseTypes, trainingRecords } from '../../mock/data.js'

const today = ref(formatDate(new Date(), 'YYYY年MM月DD日'))
const todayChecked = ref(false)
const consecutiveDays = ref(5)
const totalWorkouts = ref(0)
const totalCalories = ref(0)
const totalTrainingTime = ref('0小时')

const recentRecords = computed(() => {
  // 获取最近5条记录
  return trainingRecords.slice(0, 3)
})

const calculateStats = () => {
  totalWorkouts.value = trainingRecords.length
  
  let calories = 0
  let seconds = 0
  
  trainingRecords.forEach(record => {
    calories += record.calories
    seconds += record.duration
  })
  
  totalCalories.value = calories
  
  // 将秒转换为小时，保留1位小数
  const hours = (seconds / 3600).toFixed(1)
  totalTrainingTime.value = `${hours}小时`
}

const checkIn = () => {
  todayChecked.value = true
  consecutiveDays.value++
  uni.showToast({
    title: '打卡成功！',
    icon: 'success'
  })
}

const navigateToExercise = (exercise) => {
  uni.navigateTo({
    url: `/pages/exercise/detail?id=${exercise.id}&name=${exercise.name}`
  })
}

const viewMoreStats = () => {
  uni.navigateTo({
    url: '/pages/statistics/index'
  })
}

const viewAllRecords = () => {
  uni.navigateTo({
    url: '/pages/records/index'
  })
}

const viewRecordDetail = (record) => {
  uni.navigateTo({
    url: `/pages/records/detail?id=${record.id}`
  })
}

const startNewTraining = () => {
  uni.navigateTo({
    url: '/pages/exercise/start'
  })
}

onMounted(() => {
  calculateStats()
})
</script>

<style lang="scss">
@import '../../static/styles/common.css';

.check-in-card {
  background: linear-gradient(135deg, var(--primary-color), #2E7D32);
  color: white;
  
  .check-in-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;
    
    .text-title {
      color: white;
    }
    
    .text-caption {
      color: rgba(255, 255, 255, 0.8);
    }
  }
  
  .check-in-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30rpx 0;
    
    .check-in-btn {
      width: 70%;
      background-color: white;
      color: var(--primary-color);
      font-weight: bold;
      margin-bottom: 20rpx;
    }
    
    .check-in-success {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20rpx;
      
      .success-icon {
        font-size: 80rpx;
        margin-bottom: 10rpx;
      }
    }
  }
}

.exercise-grid {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20rpx;
  
  .exercise-item {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30rpx;
    
    .exercise-icon {
      width: 80rpx;
      height: 80rpx;
      margin-bottom: 10rpx;
    }
    
    .exercise-name {
      font-size: 24rpx;
    }
  }
}

.stats-row {
  display: flex;
  justify-content: space-around;
  margin-top: 20rpx;
  
  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .stat-value {
      font-size: 36rpx;
      font-weight: bold;
      color: var(--primary-color);
    }
    
    .stat-label {
      font-size: 24rpx;
      color: var(--text-color-light);
      margin-top: 5rpx;
    }
  }
}

.record-item {
  border-bottom: 1px solid #eee;
  padding: 20rpx 0;
  
  &:last-child {
    border-bottom: none;
  }
  
  .record-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15rpx;
    
    .record-type {
      font-size: 30rpx;
      font-weight: bold;
      margin-right: 15rpx;
    }
    
    .record-date {
      font-size: 24rpx;
      color: var(--text-color-light);
    }
  }
  
  .record-details {
    display: flex;
    
    .record-detail-item {
      display: flex;
      flex-direction: column;
      margin-right: 40rpx;
      
      .detail-label {
        font-size: 24rpx;
        color: var(--text-color-light);
      }
      
      .detail-value {
        font-size: 28rpx;
        color: var(--text-color);
      }
    }
  }
}

.empty-records {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx 0;
}
</style>