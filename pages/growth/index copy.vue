<template>
  <view class="container">
    <view class="card">
      <text class="text-title">我的成长记录</text>
      <view class="filter-tabs">
        <text 
          v-for="(tab, index) in tabs" 
          :key="index" 
          :class="['filter-tab', activeTab === index ? 'active' : '']"
          @click="activeTab = index"
        >
          {{ tab }}
        </text>
      </view>
      
      <view class="chart-container">
        <!-- 这里需要集成echarts或其他图表库，这里用简单展示代替 -->
        <view class="chart-placeholder">
          <view class="chart-bars">
            <view 
              v-for="(item, index) in currentChartData" 
              :key="index" 
              class="chart-bar"
              :style="{ height: `${item.value * 3}px` }"
            >
              <text class="bar-value">{{ item.value }}</text>
            </view>
          </view>
          <view class="chart-labels">
            <text 
              v-for="(item, index) in currentChartData" 
              :key="index" 
              class="chart-label"
            >
              {{ formatDate(item.date, 'MM-DD') }}
            </text>
          </view>
        </view>
      </view>
    </view>
    
    <view class="card">
      <text class="text-title">训练一致性</text>
      <view class="consistency-chart">
        <view class="week-item" v-for="(item, index) in growthData.consistency" :key="index">
          <view class="week-bar-container">
            <view class="week-bar" :style="{ height: `${item.count * 20}px` }"></view>
          </view>
          <text class="week-label">{{ item.week }}</text>
          <text class="week-count">{{ item.count }}次</text>
        </view>
      </view>
    </view>
    
    <view class="card">
      <text class="text-title">运动成就</text>
      <view class="achievement-list">
        <view class="achievement-item" v-for="(achievement, index) in userData.achievements" :key="index">
          <view class="achievement-icon">🏆</view>
          <view class="achievement-content">
            <text class="achievement-title">{{ achievement.name }}</text>
            <text class="achievement-desc">{{ achievement.description }}</text>
            <text class="achievement-date">{{ formatDate(achievement.date) }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { formatDate } from '../../utils/index.js'
import { growthData, userData } from '../../mock/data.js'

const tabs = ['跑步距离', '训练时长', '消耗卡路里']
const activeTab = ref(0)

const currentChartData = computed(() => {
  switch(activeTab.value) {
    case 0:
      return growthData.runningDistance
    case 1:
      return growthData.workoutDuration
    case 2:
      return growthData.calories
    default:
      return []
  }
})
</script>

<style lang="scss">
@import '../../static/styles/common.css';

.filter-tabs {
  display: flex;
  margin: 20rpx 0 30rpx;
  border-bottom: 1px solid #eee;
  
  .filter-tab {
    padding: 10rpx 30rpx;
    font-size: 28rpx;
    color: var(--text-color-light);
    position: relative;
    
    &.active {
      color: var(--primary-color);
      
      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 3px;
        background-color: var(--primary-color);
      }
    }
  }
}

.chart-container {
  height: 400rpx;
  margin-top: 20rpx;
}

.chart-placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  
  .chart-bars {
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    
    .chart-bar {
      width: 30rpx;
      background-color: var(--primary-color);
      position: relative;
      border-radius: 4rpx 4rpx 0 0;
      
      .bar-value {
        position: absolute;
        top: -30rpx;
        left: 50%;
        transform: translateX(-50%);
        font-size: 20rpx;
        color: var(--text-color-light);
      }
    }
  }
  
  .chart-labels {
    display: flex;
    justify-content: space-around;
    margin-top: 10rpx;
    
    .chart-label {
      font-size: 20rpx;
      color: var(--text-color-light);
    }
  }
}

.consistency-chart {
  display: flex;
  justify-content: space-around;
  margin-top: 30rpx;
  height: 250rpx;
  
  .week-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .week-bar-container {
      flex: 1;
      display: flex;
      align-items: flex-end;
      
      .week-bar {
        width: 40rpx;
        background-color: var(--accent-color);
        border-radius: 4rpx 4rpx 0 0;
      }
    }
    
    .week-label {
      margin-top: 10rpx;
      font-size: 24rpx;
      color: var(--text-color);
    }
    
    .week-count {
      font-size: 20rpx;
      color: var(--text-color-light);
    }
  }
}

.achievement-list {
  margin-top: 20rpx;
  
  .achievement-item {
    display: flex;
    margin-bottom: 30rpx;
    
    .achievement-icon {
      font-size: 50rpx;
      margin-right: 20rpx;
    }
    
    .achievement-content {
      flex: 1;
      
      .achievement-title {
        font-size: 30rpx;
        font-weight: bold;
        color: var(--text-color);
      }
      
      .achievement-desc {
        font-size: 26rpx;
        color: var(--text-color-light);
        margin: 5rpx 0;
      }
      
      .achievement-date {
        font-size: 24rpx;
        color: var(--text-color-light);
      }
    }
  }
}
</style>