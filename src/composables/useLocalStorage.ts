import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
	const value = ref<T>(getFromStorage()) as Ref<T>

	function getFromStorage(): T {
		try {
			const storedValue = localStorage.getItem(key)
			if (storedValue) return JSON.parse(storedValue)
			else {
				localStorage.setItem(key, JSON.stringify(defaultValue))
				return defaultValue
			}
		} catch (error) {
			console.error(`Error reading localStorage key "${key}":`, error)
			return defaultValue
		}
	}

	watch(
		value,
		(newValue) => {
			try {
				localStorage.setItem(key, JSON.stringify(newValue))
			} catch (error) {
				console.error(`Error setting localStorage key "${key}":`, error)
			}
		},
		{ deep: true },
	)

	return value
}
