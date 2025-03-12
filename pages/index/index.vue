<template>
	<view style="padding: 20px;">
		<up-button type="primary" text="确定"></up-button>
		<up-button type="primary" :plain="true" text="镂空"></up-button>
		<up-button type="primary" :plain="true" :hairline="true" text="细边"></up-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			console.log("6666");
		},
		methods: {

		}
	}
</script>

<style>
</style>