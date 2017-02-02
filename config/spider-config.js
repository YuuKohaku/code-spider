module.exports = ({
	"directory": "C:/Users/user/Documents/GitHub/",
	"files": [/\\iris-service-[^\\]+\\src\\.*\.js$/, /\\service-engine\\src\\.*\.js$/, /\\patchwerk\\src\\.*\.js$/],
	"exclude": ["node_modules"],
	"links": [{
			"name": "add-task",
			"exp": /\.(addTask)\(['|"]([a-zA-Z\-\.]+)['|"],[ ]*{[^}]*_action:[ ]*['|"]([a-zA-Z\-]+)['|"]/g,
			"format": "_.module.method"
		}, {
			"name": "add-task-neo",
			"exp": /\.(addTask)\(['|"]([a-zA-Z\-]+)\.([a-zA-Z\-]+)['|"]/g,
			"format": "_.module.method"
		}, {
			"name": "self",
			"exp": /this\.action([a-zA-Z])\(/g,
			"format": "method",
			"anchor": "self-def"
		}, {
			"name": "self-def",
			"exp": /[^\.]action([a-zA-Z])\(/g,
			"format": "method"
		},
		{
			"name": "emit",
			"exp": /\.(emit|command)\(['|"]([a-zA-Z\-\.]+)['|"]/g,
			"anchor": "onemit",
			"format": "_.method"
		},
		{
			"name": "onemit",
			"exp": /\.(listenTask)\(['|"]([a-zA-Z\-\.]+)['|"]/g,
			"format": "_.method"
		}
	],
	"alias": [{
		"matches": /\\iris-service-[^\\]+\\src\\.*\.js$/,
		"name_parts": /\\iris-service-[^\\]+\\*src\\[^\\]*\\(.*)\.js$/,
		"split": "\\",
		"join": "."
}, {
		"matches": /\\iris-[^\\]+\\src\\.*\.js$/,
		"name_parts": /\\iris-[^\\]+\\*src\\(.*)\.js$/,
		"split": "\\",
		"join": "."
}, {
		"matches": /\\service-engine\\src\\.*\.js$/,
		"name_parts": /\\service-engine\\src\\(.*)\.js$/,
		"split": "\\",
		"join": "."
}, {
		"matches": /\\patchwerk\\src\\.*\.js$/,
		"name_parts": /\\(patchwerk)\\src\\(.*)\.js$/,
		"split": "\\",
		"join": "."
}]
});