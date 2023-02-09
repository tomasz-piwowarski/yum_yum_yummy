export function getQueryString(queries: any) {
	return Object.keys(queries)
		.reduce((result: any, key) => {
			if (!queries[key] || queries[key].length < 1) return result;
			return [
				...result,
				`${encodeURIComponent(key)}=${encodeURIComponent(queries[key])}`,
			];
		}, [])
		.join("&");
}
