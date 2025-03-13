// 日期公共方法
// 定义一个函数，返回当前时间的时分秒
function getCurrentTime() {
	const now = new Date(); // 获取当前时间
	const hours = now.getHours().toString().padStart(2, '0'); // 获取小时，补零
	const minutes = now.getMinutes().toString().padStart(2, '0'); // 获取分钟，补零
	const seconds = now.getSeconds().toString().padStart(2, '0'); // 获取秒，补零

	// 返回格式化的时分秒
	return `${hours}:${minutes}:${seconds}`;
}
export {
	getCurrentTime
}