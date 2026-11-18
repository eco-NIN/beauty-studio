const DEFAULT_DEVELOPMENT_URL = 'http://127.0.0.1:8000'

export function checkHealth(): Promise<void> {
  const configuredUrl = import.meta.env.VITE_API_BASE_URL?.trim()
  const baseUrl = configuredUrl || (import.meta.env.DEV ? DEFAULT_DEVELOPMENT_URL : '')

  if (!baseUrl) {
    return Promise.reject(new Error('请配置后端地址后重新构建小程序。'))
  }

  return new Promise((resolve, reject) => {
    uni.request({
      url: `${baseUrl.replace(/\/+$/, '')}/api/health`,
      method: 'GET',
      timeout: 5000,
      success(response) {
        const data = response.data as { status?: string } | null
        if (response.statusCode === 200 && data?.status === 'ok') {
          resolve()
        } else {
          reject(new Error('后端响应异常。请检查服务后重试。'))
        }
      },
      fail() {
        reject(new Error('暂时无法连接后端。请检查服务是否已启动。'))
      },
    })
  })
}
