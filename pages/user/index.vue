<template>
  <view class="container">
    <!-- 用户信息头部 -->
    <view class="user-header">
      <image class="user-bg" src="/static/images/user-bg.jpg" mode="aspectFill"></image>
      <view class="user-info">
        <image class="user-avatar" :src="userData.avatar" mode="aspectFill"></image>
        <view class="user-details">
          <text class="user-nickname">{{ userData.nickname }}</text>
          <text class="user-motto">{{ userData.goal }}</text>
        </view>
      </view>
    </view>
    
    <!-- 用户数据概览 -->
    <view class="user-stats card">
      <view class="stat-item">
        <text class="stat-value">{{ userData.totalWorkouts }}</text>
        <text class="stat-label">总训练</text>
      </view>
      <view class="stat-divider"></view>
      <view class="stat-item">
        <text class="stat-value">{{ userData.achievements.length }}</text>
        <text class="stat-label">成就</text>
      </view>
      <view class="stat-divider"></view>
      <view class="stat-item">
        <text class="stat-value">{{ daysSinceRegister }}</text>
        <text class="stat-label">坚持天数</text>
      </view>
    </view>
    
    <!-- 功能菜单 -->
    <view class="card">
      <view class="menu-list">
        <view class="menu-item" @click="navigateTo('/pages/records/index')">
          <view class="menu-icon">📊</view>
          <view class="menu-content">
            <text class="menu-title">我的记录</text>
          </view>
          <uni-icons type="right" size="16" color="#999"></uni-icons>
        </view>
        
        <view class="menu-item" @click="navigateTo('/pages/plan/index')">
          <view class="menu-icon">📝</view>
          <view class="menu-content">
            <text class="menu-title">我的计划</text>
          </view>
          <uni-icons type="right" size="16" color="#999"></uni-icons>
        </view>
        
        <view class="menu-item" @click="navigateTo('/pages/growth/index')">
          <view class="menu-icon">📈</view>
          <view class="menu-content">
            <text class="menu-title">我的成长</text>
          </view>
          <uni-icons type="right" size="16" color="#999"></uni-icons>
        </view>
      </view>
    </view>
    
    <!-- 个人资料 -->
    <view class="card">
      <text class="section-title">个人资料</text>
      <view class="profile-info">
        <view class="profile-item">
          <text class="profile-label">性别</text>
          <text class="profile-value">{{ userData.gender }}</text>
        </view>
        <view class="profile-item">
          <text class="profile-label">年龄</text>
          <text class="profile-value">{{ userData.age }}岁</text>
        </view>
        <view class="profile-item">
          <text class="profile-label">身高</text>
          <text class="profile-value">{{ userData.height }}cm</text>
        </view>
        <view class="profile-item">
          <text class="profile-label">体重</text>
          <text class="profile-value">{{ userData.weight }}kg</text>
        </view>
      </view>
      <button class="btn btn-outline" @click="editProfile">编辑资料</button>
    </view>
    
    <!-- 设置 -->
    <view class="card">
      <view class="menu-item" @click="navigateTo('/pages/settings/index')">
        <view class="menu-icon">⚙️</view>
        <view class="menu-content">
          <text class="menu-title">设置</text>
        </view>
        <uni-icons type="right" size="16" color="#999"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { formatDate, daysBetween } from '../../utils/index.js';
import { userData as userDataSource } from '../../mock/data.js';

const userData = ref(userDataSource);

const daysSinceRegister = computed(() => {
  return daysBetween(userData.value.registerDate, new Date());
});

const navigateTo = (url) => {
  uni.navigateTo({ url });
};

const editProfile = () => {
  uni.navigateTo({
    url: '/pages/user/edit-profile'
  });
};
</script>

<style lang="scss">
@import '../../static/styles/common.css';

.user-header {
  position: relative;
  height: 300rpx;
  margin-bottom: 120rpx;
  
  .user-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 300rpx;
  }
  
  .user-info {
    position: absolute;
    bottom: -80rpx;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    
    .user-avatar {
      width: 160rpx;
      height: 160rpx;
      border-radius: 50%;
      border: 4rpx solid #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .user-details {
      margin-left: 30rpx;
      
      .user-nickname {
        font-size: 36rpx;
        font-weight: bold;
        color: #fff;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      }
      
      .user-motto {
        font-size: 28rpx;
        color: #fff;
        margin-top: 5rpx;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      }
    }
  }
}

.user-stats {
  display: flex;
  justify-content: space-around;
  padding: 30rpx 0;
  
  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .stat-value {
      font-size: 40rpx;
      font-weight: bold;
      color: var(--text-color);
    }
    
    .stat-label {
      font-size: 26rpx;
      color: var(--text-color-light);
      margin-top: 5rpx;
    }
  }
  
  .stat-divider {
    width: 1px;
    background-color: #eee;
  }
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  display: block;
}

.menu-list {
  margin-top: 10rpx;
  
  .menu-item {
    display: flex;
    align-items: center;
    padding: 20rpx 0;
    border-bottom: 1rpx solid #eee;
    
    &:last-child {
      border-bottom: none;
    }
    
    .menu-icon {
      font-size: 36rpx;
      margin-right: 20rpx;
    }
    
    .menu-content {
      flex: 1;
      
      .menu-title {
        font-size: 30rpx;
        color: var(--text-color);
      }
    }
  }
}

.profile-info {
  margin-bottom: 30rpx;
  
  .profile-item {
    display: flex;
    justify-content: space-between;
    padding: 16rpx 0;
    border-bottom: 1rpx solid #eee;
    
    &:last-child {
      border-bottom: none;
    }
    
    .profile-label {
      font-size: 28rpx;
      color: var(--text-color);
    }
    
    .profile-value {
      font-size: 28rpx;
      color: var(--text-color-light);
    }
  }
}
</style>