/**
 * 格式化日期
 * @param {Date|string|number} date 日期对象、日期字符串或时间戳
 * @param {string} format 格式化模板，如 'YYYY-MM-DD HH:mm:ss'
 * @returns {string} 格式化后的日期字符串
 */
export function formatDate(date, format = 'YYYY-MM-DD') {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * 计算两个日期之间的天数差
 * @param {Date|string|number} date1 
 * @param {Date|string|number} date2 
 * @returns {number} 天数差
 */
export function daysBetween(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * 生成随机ID
 * @returns {string} 随机ID
 */
export function generateId() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

/**
 * 格式化时长（秒转为分钟:秒）
 * @param {number} seconds 秒数
 * @returns {string} 格式化后的时长
 */
export function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

/**
 * 存储数据到本地
 * @param {string} key 键名
 * @param {any} data 数据
 */
export function saveToStorage(key, data) {
  uni.setStorageSync(key, JSON.stringify(data));
}

/**
 * 从本地获取数据
 * @param {string} key 键名
 * @returns {any} 获取的数据
 */
export function getFromStorage(key) {
  try {
    const value = uni.getStorageSync(key);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.error('读取存储失败:', e);
    return null;
  }
}

/**
 * 显示消息提示
 * @param {string} title 提示内容
 * @param {string} icon 图标类型
 */
export function showToast(title, icon = 'none') {
  uni.showToast({
    title,
    icon
  });
}

/**
 * 防抖函数
 * @param {Function} fn 需要防抖的函数
 * @param {number} delay 延迟时间
 * @returns {Function} 防抖处理后的函数
 */
export function debounce(fn, delay = 300) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}