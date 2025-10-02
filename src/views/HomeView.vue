<script setup lang="ts">
const stravaLogin = () => {
	window.location.href = 'http://localhost:3000/auth/strava'
}
</script>

<template>
	<main>
		<button @click="stravaLogin">{{ 'strava 로그인' }}</button>
	</main>
</template>

<style scoped></style>
