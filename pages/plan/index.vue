<template>
  <view class="container">
    <!-- 顶部标题和添加按钮 -->
    <view class="header">
      <text class="text-title">我的训练计划</text>
      <button class="btn-add" @click="addNewPlan">+</button>
    </view>
    
    <!-- 计划列表 -->
    <view v-if="trainingPlans.length > 0">
      <view class="plan-card" v-for="plan in trainingPlans" :key="plan.id" @click="viewPlanDetail(plan)">
        <view class="plan-header">
          <view>
            <text class="plan-title">{{ plan.name }}</text>
            <text class="plan-type">{{ plan.typeName }}</text>
          </view>
          <text class="plan-status" :class="{ completed: plan.completed }">
            {{ plan.completed ? '已完成' : '进行中' }}
          </text>
        </view>
        
        <view class="plan-progress">
          <progress :percent="plan.progress" stroke-width="3" color="#4CAF50" />
          <text class="progress-text">{{ plan.progress }}%</text>
        </view>
        
        <view class="plan-info">
          <view class="info-item">
            <text class="info-label">频率</text>
            <text class="info-value">{{ plan.frequency }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">周期</text>
            <text class="info-value">{{ plan.duration }}周</text>
          </view>
          <view class="info-item">
            <text class="info-label">开始日期</text>
            <text class="info-value">{{ formatDateShort(plan.startDate) }}</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 空状态 -->
    <view v-else class="empty-plans">
      <image src="/static/images/empty-plan.png" mode="aspectFit" class="empty-image"></image>
      <text class="empty-text">暂无训练计划</text>
      <button class="btn btn-primary" @click="addNewPlan">添加新计划</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { formatDate } from '../../utils/index.js'
import { trainingPlans } from '../../mock/data.js'

const plans = ref(trainingPlans)

const formatDateShort = (dateStr) => {
  return formatDate(dateStr, 'MM-DD')
}

const viewPlanDetail = (plan) => {
  uni.navigateTo({
    url: `/pages/plan/detail?id=${plan.id}`
  })
}

const addNewPlan = () => {
  uni.navigateTo({
    url: '/pages/plan/create'
  })
}
</script>

<style lang="scss">
@import '../../static/styles/common.css';

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
  
  .btn-add {
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40rpx;
    line-height: 1;
    padding: 0;
  }
}

.plan-card {
  background-color: var(--card-background);
  border-radius: var(--border-radius);
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: var(--shadow);
  
  .plan-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20rpx;
    
    .plan-title {
      font-size: 32rpx;
      font-weight: bold;
      display: block;
    }
    
    .plan-type {
      font-size: 24rpx;
      color: var(--text-color-light);
      display: block;
      margin-top: 5rpx;
    }
    
    .plan-status {
      font-size: 24rpx;
      padding: 4rpx 16rpx;
      background-color: #E8F5E9;
      color: var(--primary-color);
      border-radius: 20rpx;
      
      &.completed {
        background-color: #EEEEEE;
        color: var(--text-color-light);
      }
    }
  }
  
  .plan-progress {
    margin: 30rpx 0;
    position: relative;
    
    .progress-text {
      position: absolute;
      right: 0;
      top: -5rpx;
      font-size: 24rpx;
      color: var(--primary-color);
    }
  }
  
  .plan-info {
    display: flex;
    justify-content: space-between;
    
    .info-item {
      display: flex;
      flex-direction: column;
      
      .info-label {
        font-size: 24rpx;
        color: var(--text-color-light);
        margin-bottom: 5rpx;
      }
      
      .info-value {
        font-size: 28rpx;
      }
    }
  }
}

.empty-plans {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80rpx 0;
  
  .empty-image {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 30rpx;
  }
  
  .empty-text {
    font-size: 28rpx;
    color: var(--text-color-light);
    margin-bottom: 30rpx;
  }
}
</style>