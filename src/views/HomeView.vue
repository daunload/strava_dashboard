<script setup lang="ts">
import { onMounted } from 'vue'

function getStravaAuthUrl() {
	const clientId = import.meta.env.VITE_STRAVA_CLIENT_ID
	const redirectUri = `http://${window.location.host}/auth`
	const responseType = 'code'
	const approvalPrompt = 'auto'
	const scope = 'activity:read_all,activity:write'

	return `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&approval_prompt=${approvalPrompt}&scope=${scope}`
}

onMounted(() => {
	const authUrl = getStravaAuthUrl()
	window.location.href = authUrl
})
</script>

<template>
	<main>
		<h1>This is a home page</h1>
	</main>
</template>

<style scoped></style>
