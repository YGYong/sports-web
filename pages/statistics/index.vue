<template>
  <view class="container">
    <!-- 时间筛选器 -->
    <view class="filter-section">
      <view class="filter-tabs">
        <view 
          v-for="period in timePeriods" 
          :key="period.value"
          :class="['filter-tab', { active: currentPeriod === period.value }]"
          @click="setPeriod(period.value)"
        >
          {{ period.label }}
        </view>
      </view>
    </view>

    <!-- 总体统计 -->
    <view class="card overview-card">
      <text class="section-title">总体统计</text>
      <view class="stats-grid">
        <view class="stat-item">
          <text class="stat-value">{{ totalStats.duration }}</text>
          <text class="stat-label">总时长</text>
        </view>
        <view class="stat-item">
          <text class="stat-value">{{ totalStats.calories }}</text>
          <text class="stat-label">消耗卡路里</text>
        </view>
        <view class="stat-item">
          <text class="stat-value">{{ totalStats.count }}</text>
          <text class="stat-label">运动次数</text>
        </view>
        <view class="stat-item">
          <text class="stat-value">{{ totalStats.days }}</text>
          <text class="stat-label">运动天数</text>
        </view>
      </view>
    </view>

    <!-- 运动项目统计 -->
    <view class="card">
      <text class="section-title">项目统计</text>
      <view class="exercise-stats">
        <view 
          class="exercise-stat-item"
          v-for="stat in exerciseStats"
          :key="stat.id"
        >
          <view class="exercise-info">
            <view class="exercise-icon-wrapper" :class="'exercise-' + stat.id">
              <view class="exercise-shape"></view>
            </view>
            <view class="exercise-details">
              <text class="exercise-name">{{ stat.name }}</text>
              <text class="exercise-subtitle">{{ stat.duration }} | {{ stat.count }}次</text>
            </view>
          </view>
          <view class="exercise-data">
            <text class="data-value">{{ stat.calories }}</text>
            <text class="data-unit">千卡</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 趋势图表 -->
    <view class="card">
      <view class="chart-header">
        <text class="section-title">运动趋势</text>
        <view class="chart-tabs">
          <text 
            v-for="tab in chartTabs" 
            :key="tab.value"
            :class="['chart-tab', { active: currentChartTab === tab.value }]"
            @click="setChartTab(tab.value)"
          >{{ tab.label }}</text>
        </view>
      </view>
      <view class="chart-container">
        <!-- 这里后续可以集成图表组件 -->
        <text class="placeholder-text">图表区域</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { formatDuration } from '../../utils/index.js';
import { exerciseTypes, trainingRecords } from '../../mock/data.js';

// 时间筛选选项
const timePeriods = [
  { label: '周', value: 'week' },
  { label: '月', value: 'month' },
  { label: '年', value: 'year' },
  { label: '全部', value: 'all' }
];

const currentPeriod = ref('week');
const setPeriod = (period) => {
  currentPeriod.value = period;
  calculateStats();
};

// 图表选项
const chartTabs = [
  { label: '时长', value: 'duration' },
  { label: '卡路里', value: 'calories' },
  { label: '次数', value: 'count' }
];

const currentChartTab = ref('duration');
const setChartTab = (tab) => {
  currentChartTab.value = tab;
  updateChart();
};

// 总体统计数据
const totalStats = ref({
  duration: '0小时',
  calories: '0',
  count: '0',
  days: '0'
});

// 各项目统计数据
const exerciseStats = ref([]);

// 计算统计数据
const calculateStats = () => {
  // 模拟数据，实际应该根据 currentPeriod 筛选数据
  const stats = {
    duration: 0,
    calories: 0,
    count: trainingRecords.length,
    days: new Set(trainingRecords.map(r => r.date.split(' ')[0])).size
  };

  // 计算总时长和卡路里
  trainingRecords.forEach(record => {
    stats.duration += record.duration;
    stats.calories += record.calories;
  });

  // 格式化数据
  totalStats.value = {
    duration: formatDuration(stats.duration),
    calories: stats.calories.toFixed(0),
    count: stats.count.toString(),
    days: stats.days.toString()
  };

  // 计算各项目统计
  const exerciseStatsMap = new Map();
  exerciseTypes.forEach(type => {
    exerciseStatsMap.set(type.id, {
      id: type.id,
      name: type.name,
      duration: 0,
      calories: 0,
      count: 0
    });
  });

  trainingRecords.forEach(record => {
    const stats = exerciseStatsMap.get(record.typeId);
    if (stats) {
      stats.duration += record.duration;
      stats.calories += record.calories;
      stats.count += 1;
    }
  });

  exerciseStats.value = Array.from(exerciseStatsMap.values())
    .map(stat => ({
      ...stat,
      duration: formatDuration(stat.duration),
      calories: stat.calories.toFixed(0)
    }))
    .sort((a, b) => b.calories - a.calories);
};

// 更新图表
const updateChart = () => {
  // 后续集成图表组件后实现
};

// 初始化
calculateStats();
</script>

<style lang="scss">
.filter-section {
  margin: 20rpx 0;
  padding: 0 24rpx;
}

.filter-tabs {
  display: flex;
  background: #f5f5f5;
  border-radius: 12rpx;
  padding: 4rpx;
}

.filter-tab {
  flex: 1;
  text-align: center;
  padding: 16rpx 0;
  font-size: 28rpx;
  color: var(--text-color);
  border-radius: 8rpx;

  &.active {
    background: #fff;
    color: var(--primary-color);
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
  }
}

.overview-card {
  background: linear-gradient(135deg, var(--primary-color), #2e7d32);
  color: white;

  .section-title {
    color: white;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30rpx;
  margin-top: 30rpx;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;

  .stat-value {
    font-size: 40rpx;
    font-weight: bold;
    margin-bottom: 8rpx;
  }

  .stat-label {
    font-size: 24rpx;
    opacity: 0.8;
  }
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: var(--text-color);
  margin-bottom: 24rpx;
}

.exercise-stats {
  .exercise-stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx 0;
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }
  }

  .exercise-info {
    display: flex;
    align-items: center;
  }

  .exercise-icon-wrapper {
    width: 80rpx;
    height: 80rpx;
    border-radius: 16rpx;
    margin-right: 20rpx;
  }

  .exercise-details {
    .exercise-name {
      font-size: 28rpx;
      font-weight: bold;
      color: var(--text-color);
      margin-bottom: 4rpx;
    }

    .exercise-subtitle {
      font-size: 24rpx;
      color: var(--text-color-light);
    }
  }

  .exercise-data {
    text-align: right;

    .data-value {
      font-size: 32rpx;
      font-weight: bold;
      color: var(--primary-color);
    }

    .data-unit {
      font-size: 24rpx;
      color: var(--text-color-light);
      margin-left: 4rpx;
    }
  }
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.chart-tabs {
  display: flex;
  gap: 20rpx;
}

.chart-tab {
  font-size: 26rpx;
  color: var(--text-color-light);
  padding: 8rpx 16rpx;
  border-radius: 100rpx;

  &.active {
    color: var(--primary-color);
    background: rgba(var(--primary-color-rgb), 0.1);
  }
}

.chart-container {
  height: 400rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  border-radius: 12rpx;

  .placeholder-text {
    color: var(--text-color-light);
    font-size: 28rpx;
  }
}

// 继承运动图标样式
.exercise-icon-wrapper {
  @extend .exercise-icon-wrapper;
}

.exercise-1, .exercise-2, .exercise-3, .exercise-4, .exercise-5, .exercise-6, .exercise-7, .exercise-8 {
  @extend .exercise-icon-wrapper;
}
</style> 