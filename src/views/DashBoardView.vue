<script setup lang="ts">
import { useLocalStorage } from '@/composables/useLocalStorage'
import { get } from '@/services/http'

const accessToken = useLocalStorage('access_token', '')

get('/activities', {
	headers: {
		Authorization: `Bearer ${accessToken.value}`,
	},
	params: {
		page: 1,
		per_page: 10,
		after: 1696200000,
		before: 1698800000,
	},
})
	.then((response) => {
		console.log('활동 데이터:', response.data)
	})
	.catch((error) => {
		console.error('활동 데이터를 가져오는 중 오류 발생:', error)
	})
</script>

<template>
	<div>
		<h1>내 Strava 대시보드</h1>
		<!-- 활동 데이터 표시 -->
	</div>
</template>
