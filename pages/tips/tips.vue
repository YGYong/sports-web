<template>
	<view class="tips-container">
		<!-- 运动类型介绍 -->
		<view class="exercise-types">
			<view class="exercise-card aerobic">
				<view class="exercise-header">
					<uni-icons type="heart-filled" size="28" color="#20c997"></uni-icons>
					<text class="exercise-title">有氧运动</text>
				</view>
				<view class="exercise-content">
					<view class="exercise-item">
						<text class="item-title">运动特点：</text>
						<text class="item-desc">持续性运动，心率保持在最大心率的60-80%</text>
					</view>
					<view class="exercise-item">
						<text class="item-title">运动项目：</text>
						<text class="item-desc">慢跑、游泳、骑行、快走、健身操等</text>
					</view>
					<view class="exercise-item">
						<text class="item-title">主要好处：</text>
						<view class="benefits-list">
							<text class="benefit-item">• 提高心肺功能</text>
							<text class="benefit-item">• 加快脂肪燃烧</text>
							<text class="benefit-item">• 改善血液循环</text>
							<text class="benefit-item">• 增强耐力</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="exercise-card anaerobic">
				<view class="exercise-header">
					<uni-icons type="fire-filled" size="28" color="#ff6b6b"></uni-icons>
					<text class="exercise-title">无氧运动</text>
				</view>
				<view class="exercise-content">
					<view class="exercise-item">
						<text class="item-title">运动特点：</text>
						<text class="item-desc">短时高强度运动，心率可达最大心率的80-90%</text>
					</view>
					<view class="exercise-item">
						<text class="item-title">运动项目：</text>
						<text class="item-desc">举重、深蹲、HIIT、短跑等</text>
					</view>
					<view class="exercise-item">
						<text class="item-title">主要好处：</text>
						<view class="benefits-list">
							<text class="benefit-item">• 增加肌肉力量</text>
							<text class="benefit-item">• 提高代谢水平</text>
							<text class="benefit-item">• 增强爆发力</text>
							<text class="benefit-item">• 改善体态</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 1. 减脂塑形 -->
		<view class="tip-section fat-loss">
			<view class="section-header">
				<view class="header-content">
					<uni-icons type="fire" size="24" color="#ff6b6b"></uni-icons>
					<text class="section-title">1. 减脂塑形: 早晨 (6:00-9:00)</text>
				</view>
			</view>
			<view class="section-content">
				<view class="advantage">
					<view class="item-header">
						<uni-icons type="star" size="20" color="#ffd43b"></uni-icons>
						<text class="sub-title">优势：</text>
					</view>
					<text class="content-text">空腹状态（8-12小时未进食）下，糖原储备低，脂肪供能比例提高，燃脂效率提升约20%。</text>
				</view>
				<view class="notice">
					<view class="item-header">
						<uni-icons type="info" size="20" color="#4dabf7"></uni-icons>
						<text class="sub-title">注意：</text>
					</view>
					<text class="content-text">低血糖人群建议运动前吃少量香蕉或全麦面包。</text>
				</view>
				<view class="recommended">
					<view class="item-header">
						<uni-icons type="hand-up" size="20" color="#51cf66"></uni-icons>
						<text class="sub-title">推荐运动：</text>
					</view>
					<text class="content-text">低强度有氧（快走、慢跑、跳绳），持续30-45分钟。</text>
				</view>
			</view>
		</view>

		<!-- 2. 增肌/力量训练 -->
		<view class="tip-section muscle-gain">
			<view class="section-header">
				<view class="header-content">
					<uni-icons type="flag" size="24" color="#339af0"></uni-icons>
					<text class="section-title">2. 增肌/力量训练：下午至傍晚 (16:00-19:00)</text>
				</view>
			</view>
			<view class="section-content">
				<view class="scientific-basis">
					<view class="item-header">
						<uni-icons type="medal" size="20" color="#845ef7"></uni-icons>
						<text class="sub-title">科学依据：</text>
					</view>
					<text class="content-text">• 体温较早晨高1-2℃，肌肉柔韧性增强，关节活动度提升，减少受伤风险。</text>
					<text class="content-text">• 睾酮与皮质醇比值（T/C Ratio）达到峰值，肌肉合成效率比早晨高5-10%。</text>
				</view>
				<view class="recommended">
					<view class="item-header">
						<uni-icons type="hand-up" size="20" color="#51cf66"></uni-icons>
						<text class="sub-title">推荐运动：</text>
					</view>
					<text class="content-text">力量训练（器械、自重训练）、高强度间歇（HIIT）。</text>
				</view>
			</view>
		</view>

		<!-- 生物钟类型影响 -->
		<view class="tip-section bio-rhythm">
			<view class="section-header">
				<view class="header-content">
					<uni-icons type="calendar" size="24" color="#f76707"></uni-icons>
					<text class="section-title">生物钟类型影响</text>
				</view>
			</view>
			<view class="bio-types">
				<view class="bio-type-item morning">
					<uni-icons type="sun" size="24" color="#ffd43b"></uni-icons>
					<text class="type">晨型人</text>
					<text class="time">6:00-9:00</text>
					<text class="desc">早晨清爽快，夜间易困</text>
				</view>
				<view class="bio-type-item evening">
					<uni-icons type="moon" size="24" color="#748ffc"></uni-icons>
					<text class="type">晚型人</text>
					<text class="time">16:00-20:00</text>
					<text class="desc">午后至夜间精力旺盛</text>
				</view>
				<view class="bio-type-item neutral">
					<uni-icons type="refresh" size="24" color="#51cf66"></uni-icons>
					<text class="type">中间型</text>
					<text class="desc">根据目标灵活调整</text>
				</view>
			</view>
		</view>

		<!-- 特殊人群建议 -->
		<view class="tip-section special-group">
			<view class="section-header">
				<view class="header-content">
					<uni-icons type="help" size="24" color="#e64980"></uni-icons>
					<text class="section-title">特殊人群建议</text>
				</view>
			</view>
			<view class="special-tips">
				<view class="special-tip-item">
					<uni-icons type="heart" size="20" color="#ff6b6b"></uni-icons>
					<text class="content-text">高血压患者：避开晨峰（6:00-10:00血压最高时段），选择16:00-18:00运动。</text>
				</view>
				<view class="special-tip-item">
					<uni-icons type="star" size="20" color="#ffd43b"></uni-icons>
					<text class="content-text">糖尿病患者：餐后1小时运动（降低餐后血糖峰值），避免空腹运动引发低血糖。</text>
				</view>
				<view class="special-tip-item">
					<uni-icons type="moon" size="20" color="#748ffc"></uni-icons>
					<text class="content-text">失眠人群：避免19:00后剧烈运动，改做瑜伽或冥想。</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
</script>

<style>
.tips-container {
	padding: 20rpx;
	background-color: #f8f9fa;
}

.tip-section {
	background-color: #ffffff;
	border-radius: 16rpx;
	margin-bottom: 24rpx;
	padding: 24rpx;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
	border-left: 8rpx solid transparent;
}

.fat-loss {
	border-left-color: #ff6b6b;
}

.muscle-gain {
	border-left-color: #339af0;
}

.bio-rhythm {
	border-left-color: #f76707;
}

.special-group {
	border-left-color: #e64980;
}

.section-header {
	margin-bottom: 24rpx;
	border-bottom: 2rpx solid #f1f3f5;
	padding-bottom: 16rpx;
}

.header-content {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #212529;
}

.section-content {
	padding: 10rpx 0;
}

.item-header {
	display: flex;
	align-items: center;
	gap: 8rpx;
	margin-bottom: 8rpx;
}

.sub-title {
	font-weight: bold;
	color: #495057;
	margin-right: 10rpx;
}

.content-text {
	font-size: 28rpx;
	color: #495057;
	line-height: 1.6;
	padding-left: 28rpx;
}

.advantage, .notice, .recommended, .scientific-basis {
	margin-bottom: 20rpx;
}

.bio-types {
	display: flex;
	flex-wrap: wrap;
	gap: 24rpx;
}

.bio-type-item {
	background-color: #f8f9fa;
	padding: 20rpx;
	border-radius: 12rpx;
	flex: 1;
	min-width: 200rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	transition: transform 0.2s;
}

.bio-type-item:active {
	transform: scale(0.98);
}

.morning {
	background-color: #fff9db;
}

.evening {
	background-color: #e7f5ff;
}

.neutral {
	background-color: #ebfbee;
}

.bio-type-item .type {
	font-weight: bold;
	font-size: 28rpx;
	color: #212529;
	margin-top: 12rpx;
}

.bio-type-item .time {
	font-size: 24rpx;
	color: #495057;
	margin: 8rpx 0;
}

.bio-type-item .desc {
	font-size: 24rpx;
	color: #868e96;
}

.special-tips {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.special-tip-item {
	display: flex;
	align-items: flex-start;
	gap: 12rpx;
	padding: 12rpx;
	background-color: #f8f9fa;
	border-radius: 8rpx;
}

.special-tip-item .content-text {
	flex: 1;
	padding-left: 0;
}

.exercise-types {
	display: flex;
	gap: 24rpx;
	margin-bottom: 32rpx;
}

.exercise-card {
	flex: 1;
	background-color: #ffffff;
	border-radius: 16rpx;
	padding: 24rpx;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.aerobic {
	border-top: 8rpx solid #20c997;
}

.anaerobic {
	border-top: 8rpx solid #ff6b6b;
}

.exercise-header {
	display: flex;
	align-items: center;
	gap: 12rpx;
	margin-bottom: 20rpx;
	padding-bottom: 16rpx;
	border-bottom: 2rpx solid #f1f3f5;
}

.exercise-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #212529;
}

.exercise-content {
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.exercise-item {
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.item-title {
	font-size: 28rpx;
	font-weight: bold;
	color: #495057;
}

.item-desc {
	font-size: 26rpx;
	color: #495057;
	line-height: 1.5;
}

.benefits-list {
	display: flex;
	flex-direction: column;
	gap: 8rpx;
	padding-left: 8rpx;
}

.benefit-item {
	font-size: 26rpx;
	color: #495057;
	line-height: 1.5;
}
</style>
