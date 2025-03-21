<template>
  <view class="container">
    <!-- 顶部打卡区域 -->
    <view class="card check-in-card">
      <view class="check-in-header">
        <text class="text-title">今日打卡</text>
        <text class="text-caption">{{ today }}</text>
      </view>
      <view class="check-in-body" v-if="!todayChecked">
        <button class="btn btn-primary check-in-btn" @click="checkIn">
          立即打卡
        </button>
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
    <view class="card exercise-card">
      <view class="flex-row space-between">
        <text class="text-title">运动项目</text>
        <text class="text-caption" @click="manageExercises">管理</text>
      </view>
      <scroll-view class="exercise-scroll" scroll-x="true" show-scrollbar="false">
        <view class="exercise-list">
          <view
            class="exercise-item"
            v-for="item in exerciseTypes"
            :key="item.id"
            @click="navigateToExercise(item)"
          >
            <view class="exercise-icon-wrapper" :class="'exercise-' + item.id">
              <view class="exercise-shape"></view>
            </view>
            <text class="exercise-name">{{ item.name }}</text>
          </view>
          <view class="exercise-item add-exercise" @click="addCustomExercise">
            <view class="exercise-icon-wrapper">
              <view class="add-shape"></view>
            </view>
            <text class="exercise-name">添加</text>
          </view>
        </view>
      </scroll-view>
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
        <view
          class="record-item"
          v-for="record in recentRecords"
          :key="record.id"
          @click="viewRecordDetail(record)"
        >
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
              <text class="detail-value">{{
                formatDuration(record.duration)
              }}</text>
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
        <button class="btn btn-outline" @click="startNewTraining">
          开始训练
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { formatDate, formatDuration } from "../../utils/index.js";
import { exerciseTypes, trainingRecords } from "../../mock/data.js";

const today = ref(formatDate(new Date(), "YYYY年MM月DD日"));
const todayChecked = ref(false);
const consecutiveDays = ref(5);
const totalWorkouts = ref(0);
const totalCalories = ref(0);
const totalTrainingTime = ref("0小时");

const recentRecords = computed(() => {
  // 获取最近5条记录
  return trainingRecords.slice(0, 3);
});

const calculateStats = () => {
  totalWorkouts.value = trainingRecords.length;

  let calories = 0;
  let seconds = 0;

  trainingRecords.forEach((record) => {
    calories += record.calories;
    seconds += record.duration;
  });

  totalCalories.value = calories;

  // 将秒转换为小时，保留1位小数
  const hours = (seconds / 3600).toFixed(1);
  totalTrainingTime.value = `${hours}小时`;
};

const checkIn = () => {
  todayChecked.value = true;
  consecutiveDays.value++;
  uni.showToast({
    title: "打卡成功！",
    icon: "success",
  });
};

const navigateToExercise = (exercise) => {
  uni.navigateTo({
    url: `/pages/exercise/detail?id=${exercise.id}&name=${exercise.name}`,
  });
};

const viewMoreStats = () => {
  uni.navigateTo({
    url: "/pages/statistics/index",
  });
};

const viewAllRecords = () => {
  uni.navigateTo({
    url: "/pages/records/index",
  });
};

const viewRecordDetail = (record) => {
  uni.navigateTo({
    url: `/pages/records/detail?id=${record.id}`,
  });
};

const startNewTraining = () => {
  uni.navigateTo({
    url: "/pages/exercise/start",
  });
};

const addCustomExercise = () => {
  uni.navigateTo({
    url: '/pages/exercise/custom',
  });
};

const manageExercises = () => {
  uni.navigateTo({
    url: '/pages/exercise/manage',
  });
};

onMounted(() => {
  calculateStats();
});
</script>

<style lang="scss">
@import "../../static/styles/common.css";

.check-in-card {
  background: linear-gradient(135deg, var(--primary-color), #2e7d32);
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

.exercise-card {
  overflow: hidden;
}

.exercise-scroll {
  margin: 20rpx -24rpx 0;
  padding: 0 24rpx;
  white-space: nowrap;
}

.exercise-list {
  display: inline-flex;
  padding-bottom: 10rpx;
}

.exercise-item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin-right: 40rpx;
  width: 140rpx;

  &:last-child {
    margin-right: 24rpx;
  }

  .exercise-icon-wrapper {
    width: 120rpx;
    height: 120rpx;
    border-radius: 24rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16rpx;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;

    &:active {
      transform: scale(0.95);
    }

    .exercise-shape {
      position: relative;
      z-index: 2;
    }
  }

  .exercise-name {
    font-size: 26rpx;
    color: var(--text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    text-align: center;
  }

  // 跑步
  .exercise-1 {
    background: linear-gradient(135deg, #FF6B6B, #FF8E8E);
    
    .exercise-shape {
      width: 40rpx;
      height: 40rpx;
      border: 4rpx solid #fff;
      border-radius: 50%;
      
      &::after {
        content: '';
        position: absolute;
        width: 24rpx;
        height: 32rpx;
        background: #fff;
        bottom: -16rpx;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 12rpx 12rpx 0 0;
      }
    }
  }

  // 哑铃
  .exercise-2 {
    background: linear-gradient(135deg, #4FACFE, #00F2FE);
    
    .exercise-shape {
      width: 60rpx;
      height: 24rpx;
      background: #fff;
      border-radius: 12rpx;
      
      &::before, &::after {
        content: '';
        position: absolute;
        width: 32rpx;
        height: 32rpx;
        background: #fff;
        border-radius: 50%;
        top: 50%;
        transform: translateY(-50%);
      }
      
      &::before {
        left: -20rpx;
      }
      
      &::after {
        right: -20rpx;
      }
    }
  }

  // 深蹲
  .exercise-3 {
    background: linear-gradient(135deg, #43E97B, #38F9D7);
    
    .exercise-shape {
      width: 40rpx;
      height: 40rpx;
      border: 4rpx solid #fff;
      border-radius: 50%;
      
      &::after {
        content: '';
        position: absolute;
        width: 48rpx;
        height: 4rpx;
        background: #fff;
        bottom: -16rpx;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  // 瑜伽
  .exercise-4 {
    background: linear-gradient(135deg, #FA709A, #FEE140);
    
    .exercise-shape {
      width: 48rpx;
      height: 48rpx;
      border: 4rpx solid #fff;
      transform: rotate(45deg);
      
      &::before {
        content: '';
        position: absolute;
        width: 24rpx;
        height: 24rpx;
        background: #fff;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
      }
    }
  }

  // 跳绳
  .exercise-5 {
    background: linear-gradient(135deg, #6B8DE3, #7B6BE3);
    
    .exercise-shape {
      width: 48rpx;
      height: 48rpx;
      
      &::before, &::after {
        content: '';
        position: absolute;
        background: #fff;
      }
      
      &::before {
        width: 48rpx;
        height: 4rpx;
        border-radius: 2rpx;
        top: 50%;
        transform: translateY(-50%) rotate(-30deg);
      }
      
      &::after {
        width: 16rpx;
        height: 16rpx;
        border-radius: 50%;
        top: 16rpx;
        right: 16rpx;
      }
    }
  }

  // 其他运动项目使用默认样式
  .exercise-6, .exercise-7, .exercise-8 {
    background: linear-gradient(135deg, #A8C0FF, #3F2B96);
    
    .exercise-shape {
      width: 40rpx;
      height: 40rpx;
      border: 4rpx solid #fff;
      border-radius: 12rpx;
    }
  }

  &.add-exercise {
    .exercise-icon-wrapper {
      background: #f5f5f5;
      border: 2rpx dashed #999;
      
      .add-shape {
        position: relative;
        width: 40rpx;
        height: 40rpx;
        
        &::before, &::after {
          content: '';
          position: absolute;
          background: #999;
          border-radius: 2rpx;
        }
        
        &::before {
          width: 40rpx;
          height: 4rpx;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
        
        &::after {
          width: 4rpx;
          height: 40rpx;
          left: 50%;
          top: 0;
          transform: translateX(-50%);
        }
      }
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
