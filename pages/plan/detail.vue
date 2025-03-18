<template>
  <view class="container">
    <!-- 顶部信息卡片 -->
    <view class="plan-header-card">
      <view class="plan-header-top">
        <text class="plan-name">{{ plan?.name }}</text>
        <button class="btn-edit" @click="editPlan">编辑</button>
      </view>
      <view class="plan-progress">
        <text class="progress-label">进度</text>
        <progress :percent="plan?.progress" stroke-width="4" color="#4CAF50" />
        <text class="progress-text">{{ plan?.progress }}%</text>
      </view>
      <view class="plan-info-row">
        <view class="info-item">
          <text class="info-label">类型</text>
          <text class="info-value">{{ plan?.typeName }}</text>
        </view>
        <view class="info-item">
          <text class="info-label">频率</text>
          <text class="info-value">{{ plan?.frequency }}</text>
        </view>
        <view class="info-item">
          <text class="info-label">开始日期</text>
          <text class="info-value">{{ formatDate(plan?.startDate) }}</text>
        </view>
      </view>
      <view class="plan-date-range">
        <text>{{ formatDate(plan?.startDate) }} 至 {{ formatDate(plan?.endDate) }}</text>
      </view>
    </view>
    
    <!-- 训练安排 -->
    <view class="card">
      <text class="section-title">训练安排</text>
      <view class="session-list">
        <view class="session-item" v-for="(session, index) in plan?.sessions" :key="index">
          <view class="session-left">
            <checkbox :checked="session.completed" @click="toggleSessionComplete(index)" color="#4CAF50" />
            <view class="session-info">
              <text class="session-day">{{ session.day }}</text>
              <text class="session-desc">{{ session.description }}</text>
            </view>
          </view>
          <uni-icons type="right" size="16"></uni-icons>
        </view>
      </view>
    </view>
    
    <!-- 添加新训练安排按钮 -->
    <button class="btn-add-session" @click="addSession">添加训练安排</button>
    
    <!-- 底部操作按钮 -->
    <view class="footer-actions">
      <button class="btn btn-primary" @click="startTraining">开始训练</button>
      <button class="btn btn-outline" @click="completePlan">{{ plan?.completed ? '重新开始' : '标记完成' }}</button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { formatDate } from '../../utils/index.js'
import { trainingPlans } from '../../mock/data.js'

const planId = ref('')
const plan = ref(null)

const loadPlanData = () => {
  // 模拟从API获取数据
  const foundPlan = trainingPlans.find(p => p.id === planId.value)
  if (foundPlan) {
    plan.value = foundPlan
  } else {
    uni.showToast({
      title: '计划不存在',
      icon: 'none'
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }
}

const toggleSessionComplete = (index) => {
  plan.value.sessions[index].completed = !plan.value.sessions[index].completed
  
  // 更新进度
  const completedCount = plan.value.sessions.filter(s => s.completed).length
  const totalCount = plan.value.sessions.length
  plan.value.progress = Math.round((completedCount / totalCount) * 100)
  
  // 在实际应用中需要保存到服务器
  uni.showToast({
    title: plan.value.sessions[index].completed ? '已完成' : '已取消',
    icon: 'none'
  })
}

const editPlan = () => {
  uni.navigateTo({
    url: `/pages/plan/edit?id=${planId.value}`
  })
}

const addSession = () => {
  uni.navigateTo({
    url: `/pages/plan/add-session?id=${planId.value}`
  })
}

const startTraining = () => {
  uni.navigateTo({
    url: `/pages/exercise/start?type=${plan.value.type}&planId=${planId.value}`
  })
}

const completePlan = () => {
  plan.value.completed = !plan.value.completed
  if (plan.value.completed) {
    plan.value.progress = 100
    uni.showToast({
      title: '计划已完成',
      icon: 'success'
    })
  } else {
    // 重新计算进度
    const completedCount = plan.value.sessions.filter(s => s.completed).length
    const totalCount = plan.value.sessions.length
    plan.value.progress = Math.round((completedCount / totalCount) * 100)
    uni.showToast({
      title: '计划已重新开始',
      icon: 'none'
    })
  }
}

onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  planId.value = currentPage.options.id
  loadPlanData()
})
</script>

<style lang="scss">
@import '../../static/styles/common.css';

.plan-header-card {
  background-color: var(--card-background);
  border-radius: var(--border-radius);
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: var(--shadow);
  
  .plan-header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;
    
    .plan-name {
      font-size: 36rpx;
      font-weight: bold;
      color: var(--text-color);
    }
    
    .btn-edit {
      font-size: 26rpx;
      padding: 8rpx 20rpx;
      background-color: transparent;
      border: 1px solid var(--text-color-light);
      color: var(--text-color-light);
      border-radius: 30rpx;
    }
  }
  
  .plan-progress {
    margin-bottom: 30rpx;
    
    .progress-label {
      font-size: 26rpx;
      color: var(--text-color-light);
      margin-bottom: 10rpx;
      display: block;
    }
    
    .progress-text {
      font-size: 24rpx;
      color: var(--primary-color);
      margin-left: 10rpx;
    }
  }
  
  .plan-info-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20rpx;
    
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
        color: var(--text-color);
      }
    }
  }
  
  .plan-date-range {
    font-size: 24rpx;
    color: var(--text-color-light);
    text-align: center;
    margin-top: 20rpx;
  }
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  display: block;
}

.session-list {
  margin-top: 10rpx;
  
  .session-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 0;
    border-bottom: 1px solid #eee;
    
    &:last-child {
      border-bottom: none;
    }
    
    .session-left {
      display: flex;
      align-items: center;
      
      .session-info {
        margin-left: 20rpx;
        
        .session-day {
          font-size: 28rpx;
          font-weight: bold;
          color: var(--text-color);
          display: block;
        }
        
        .session-desc {
          font-size: 26rpx;
          color: var(--text-color-light);
          display: block;
          margin-top: 5rpx;
        }
      }
    }
  }
}

.btn-add-session {
  margin: 20rpx 0;
  background-color: #F5F5F5;
  color: var(--text-color);
  font-size: 28rpx;
  border: 1px dashed #BDBDBD;
  border-radius: var(--border-radius);
}

.footer-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 40rpx;
  
  .btn {
    width: 48%;
  }
}
</style>
