module.exports = {
	mock: "/mock/mock.json", // dir for mock data
	webpack: true, // flag for using webpack or not
	proxy: {
		route: "/api",
		// origin: "http://xueer.muxixyz.com"
		origin:"http://localhost:8080"
	},
	staticDir: "/static",
	templateDir: "/templates",
}