import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: {
				index: "./index.js",
			},
			name: "dot-prop-bl",
			fileName: (ModuleFormat, entryName) => {
				return entryName + "." + ModuleFormat + ".js";
			},
			formats: ["es", "cjs", "umd"],
		},
	},
});
