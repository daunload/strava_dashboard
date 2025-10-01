import axios, {
	type AxiosInstance,
	type AxiosRequestConfig,
	AxiosError,
	type InternalAxiosRequestConfig,
} from 'axios'

export interface ApiResponse<T = any> {
	data: T
	message?: string
	code?: number
}

export interface ApiError {
	message: string
	code?: number
	status?: number
}

const createApiClient = (): AxiosInstance => {
	const instance = axios.create({
		baseURL: import.meta.env.VITE_API_BASE_URL,
		timeout: 15000,
		headers: {
			'Content-Type': 'application/json',
		},
	})

	// 요청 인터셉터
	instance.interceptors.request.use(
		(config: InternalAxiosRequestConfig) => {
			const token = localStorage.getItem('access_token')
			if (token && config.headers) {
				config.headers.Authorization = `Bearer ${token}`
			}

			if (import.meta.env.DEV) {
				console.log('🚀 Request:', config.method?.toUpperCase(), config.url)
			}

			return config
		},
		(error: AxiosError) => {
			console.error('❌ Request Error:', error)
			return Promise.reject(error)
		},
	)

	// 응답 인터셉터
	instance.interceptors.response.use(
		(response) => {
			if (import.meta.env.DEV) {
				console.log('✅ Response:', response.status, response.config.url)
			}
			return response.data
		},
		async (error: AxiosError) => {
			if (!error.response) {
				return Promise.reject({
					message: '네트워크 연결을 확인해주세요.',
					code: 0,
				} as ApiError)
			}

			const { status, data } = error.response

			switch (status) {
				case 401: {
					localStorage.removeItem('access_token')
					console.warn('🔐 Unauthorized - Token removed')
					break
				}
				case 403:
					console.error('🚫 Forbidden:', data)
					break
				case 404:
					console.error('🔍 Not Found:', error.config?.url)
					break
				case 500:
					console.error('💥 Server Error:', data)
					break
			}

			return Promise.reject({
				message: (data as any)?.message || '요청 처리 중 오류가 발생했습니다.',
				code: (data as any)?.code,
				status,
			} as ApiError)
		},
	)

	return instance
}

export const apiClient = createApiClient()

export const setAuthToken = (token: string): void => {
	localStorage.setItem('access_token', token)
	apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
export const removeAuthToken = (): void => {
	localStorage.removeItem('access_token')
	delete apiClient.defaults.headers.common['Authorization']
}

export const get = <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
	return apiClient.get<T, T>(url, config)
}
export const post = <T = any, D = any>(
	url: string,
	data?: D,
	config?: AxiosRequestConfig,
): Promise<T> => {
	return apiClient.post<T, T>(url, data, config)
}
