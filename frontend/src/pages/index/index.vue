<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { checkHealth } from '../../services/health'

const checking = ref(false)
const status = ref('')
const detail = ref('')

async function refresh() {
  if (checking.value) return

  checking.value = true
  status.value = '正在连接'
  detail.value = ''

  try {
    await checkHealth()
    status.value = '连接成功'
  } catch (error) {
    status.value = '连接失败'
    detail.value = error instanceof Error ? error.message : '请稍后重试。'
  } finally {
    checking.value = false
  }
}

onLoad(refresh)
</script>

<template>
  <view class="page">
    <text class="title">后端连接检查</text>
    <view class="panel">
      <text class="status">{{ status }}</text>
      <text v-if="detail" class="detail">{{ detail }}</text>
      <button class="retry" :disabled="checking" @tap="refresh">重新检查</button>
    </view>
  </view>
</template>

<style scoped>
.page {
  padding: 64rpx 40rpx;
}

.title {
  display: block;
  margin-bottom: 36rpx;
  font-size: 48rpx;
  font-weight: 600;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 36rpx;
  border: 1px solid #e6ded3;
  border-radius: 24rpx;
  background: #fffdf9;
}

.status {
  font-size: 34rpx;
  font-weight: 600;
}

.detail {
  margin-top: 12rpx;
  color: #645950;
  font-size: 28rpx;
  line-height: 1.55;
}

.retry {
  margin: 32rpx 0 0;
  padding: 0 24rpx;
  border-radius: 12rpx;
  background: #4f3d32;
  color: #fffdf9;
  font-size: 28rpx;
}

.retry::after {
  border: 0;
}
</style>
