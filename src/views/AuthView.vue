<template>
	<main>
		<h1>Authenticating with Strava...</h1>
	</main>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
// import { useLocalStorage } from '@/composables/useLocalStorage'
import { get } from '@/services/http'

const route = useRoute()
// const router = useRouter()

onMounted(() => {
	const code = route.query.code

	if (typeof code === 'string') {
		get('/token', { params: { code } })
			.then((res) => {
				console.log(res)
			})
			.catch((err) => {
				console.error('Error fetching token:', err)
			})
	} else {
		console.error('Authorization code not found in URL')
	}
})
</script>
