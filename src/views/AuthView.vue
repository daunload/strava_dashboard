<template>
	<main>
		<h1>Authenticating with Strava...</h1>
	</main>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useLocalStorage } from '@/composables/useLocalStorage'
// import { get } from '@/services/http'

const route = useRoute()
const router = useRouter()

const accesssToken = useLocalStorage('access_token', '')
if (route.query.token) {
	const accessToken = route.query.token as string
	accesssToken.value = accessToken

	router.replace({ path: '/dashboard' })
}
</script>
