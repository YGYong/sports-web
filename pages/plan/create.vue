<template>
	<view class="container">
		<form @submit="submitPlan">
			<!-- 基本信息 -->
			<view class="card">
				<text class="section-title">基本信息</text>
				<view class="form-item">
					<text class="form-label">计划名称</text>
					<input 
						class="form-input" 
						v-model="planForm.name" 
						placeholder="请输入计划名称"
					/>
				</view>
				
				<view class="form-item">
					<text class="form-label">运动类型</text>
					<picker 
						@change="handleTypeChange" 
						:value="typeIndex" 
						:range="exerciseTypes" 
						range-key="name"
					>
						<view class="picker-value">
							{{ planForm.typeName || '请选择运动类型' }}
							<uni-icons type="down" size="14"></uni-icons>
						</view>
					</picker>
				</view>
				
				<view class="form-item">
					<text class="form-label">训练频率</text>
					<input 
						class="form-input" 
						v-model="planForm.frequency" 
						placeholder="如：每周3次"
					/>
				</view>
			</view>

			<!-- 时间设置 -->
			<view class="card">
				<text class="section-title">时间设置</text>
				<view class="form-item">
					<text class="form-label">开始日期</text>
					<picker 
						mode="date" 
						:value="planForm.startDate" 
						@change="handleStartDateChange"
					>
						<view class="picker-value">
							{{ planForm.startDate || '请选择开始日期' }}
							<uni-icons type="down" size="14"></uni-icons>
						</view>
					</picker>
				</view>
				
				<view class="form-item">
					<text class="form-label">持续时间</text>
					<picker 
						@change="handleDurationChange" 
						:value="durationIndex" 
						:range="durations"
					>
						<view class="picker-value">
							{{ planForm.duration ? `${planForm.duration}周` : '请选择持续时间' }}
							<uni-icons type="down" size="14"></uni-icons>
						</view>
					</picker>
				</view>
			</view>

			<!-- 训练安排 -->
			<view class="card">
				<view class="section-header">
					<text class="section-title">训练安排</text>
					<button class="btn-add" @click="addSession">添加</button>
				</view>
				
				<view class="session-list">
					<view 
						class="session-item" 
						v-for="(session, index) in planForm.sessions" 
						:key="index"
					>
						<view class="session-content">
							<view class="session-day">
								<picker 
									@change="(e) => handleDayChange(e, index)" 
									:value="dayIndex[index]" 
									:range="weekDays"
								>
									<view class="picker-value">
										{{ session.day }}
										<uni-icons type="down" size="14"></uni-icons>
									</view>
								</picker>
							</view>
							<input 
								class="session-input" 
								v-model="session.description" 
								placeholder="训练内容描述"
							/>
						</view>
						<button class="btn-delete" @click="deleteSession(index)">删除</button>
					</view>
				</view>
			</view>

			<!-- 提交按钮 -->
			<button class="btn btn-primary submit-btn" form-type="submit">创建计划</button>
		</form>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { exerciseTypes } from '../../mock/data.js'
import { generateId } from '../../utils/index.js'

const typeIndex = ref(0)
const durationIndex = ref(0)
const dayIndex = ref([])
const durations = ['1周', '2周', '4周', '8周', '12周']
const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

const planForm = ref({
	name: '',
	type: '',
	typeName: '',
	frequency: '',
	duration: '',
	startDate: '',
	sessions: []
})

const handleTypeChange = (e) => {
	const type = exerciseTypes[e.detail.value]
	typeIndex.value = e.detail.value
	planForm.value.type = type.id
	planForm.value.typeName = type.name
}

const handleStartDateChange = (e) => {
	planForm.value.startDate = e.detail.value
}

const handleDurationChange = (e) => {
	durationIndex.value = e.detail.value
	planForm.value.duration = parseInt(durations[e.detail.value])
}

const handleDayChange = (e, index) => {
	dayIndex.value[index] = e.detail.value
	planForm.value.sessions[index].day = weekDays[e.detail.value]
}

const addSession = () => {
	planForm.value.sessions.push({
		day: '周一',
		description: '',
		completed: false
	})
	dayIndex.value.push(0)
}

const deleteSession = (index) => {
	planForm.value.sessions.splice(index, 1)
	dayIndex.value.splice(index, 1)
}

const submitPlan = () => {
	// 表单验证
	if (!planForm.value.name) {
		uni.showToast({
			title: '请输入计划名称',
			icon: 'none'
		})
		return
	}
	
	if (!planForm.value.type) {
		uni.showToast({
			title: '请选择运动类型',
			icon: 'none'
		})
		return
	}
	
	if (!planForm.value.startDate) {
		uni.showToast({
			title: '请选择开始日期',
			icon: 'none'
		})
		return
	}
	
	if (planForm.value.sessions.length === 0) {
		uni.showToast({
			title: '请添加训练安排',
			icon: 'none'
		})
		return
	}

	// 计算结束日期
	const startDate = new Date(planForm.value.startDate)
	const endDate = new Date(startDate)
	endDate.setDate(endDate.getDate() + planForm.value.duration * 7)
	
	// 构建计划数据
	const plan = {
		id: generateId(),
		...planForm.value,
		endDate: endDate.toISOString().split('T')[0],
		completed: false,
		progress: 0
	}

	// TODO: 保存到服务器
	console.log('创建计划:', plan)
	
	uni.showToast({
		title: '创建成功',
		icon: 'success'
	})
	
	setTimeout(() => {
		uni.navigateBack()
	}, 1500)
}
</script>

<style lang="scss">
@import '../../static/styles/common.css';

.form-item {
	margin-bottom: 30rpx;
}

.form-label {
	font-size: 28rpx;
	color: var(--text-color);
	margin-bottom: 10rpx;
	display: block;
}

.form-input {
	height: 80rpx;
	border-bottom: 1px solid #eee;
	font-size: 28rpx;
}

.picker-value {
	height: 80rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #eee;
	font-size: 28rpx;
	color: var(--text-color);
}

.section-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20rpx;
}

.btn-add {
	font-size: 26rpx;
	padding: 6rpx 20rpx;
	background-color: var(--primary-color);
	color: white;
	border-radius: 30rpx;
}

.session-item {
	display: flex;
	align-items: center;
	margin-bottom: 20rpx;
	
	.session-content {
		flex: 1;
		display: flex;
		margin-right: 20rpx;
		
		.session-day {
			width: 160rpx;
			margin-right: 20rpx;
		}
		
		.session-input {
			flex: 1;
			height: 80rpx;
			border-bottom: 1px solid #eee;
			font-size: 28rpx;
		}
	}
}

.btn-delete {
	font-size: 26rpx;
	padding: 6rpx 20rpx;
	background-color: #ff4444;
	color: white;
	border-radius: 30rpx;
}

.submit-btn {
	margin: 40rpx 20rpx;
}
</style>