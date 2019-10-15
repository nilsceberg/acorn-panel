const { FuseBox, SassPlugin, CSSPlugin } = require("fuse-box");
const path = require("path");
const express = require("express");

const fuse = FuseBox.init({
	homeDir: "src",
	output: "dist/$name.js",
	target: "browser",
	experimentalFeatures: true,
//	plugins: [
//		[SassPlugin(), CSSPlugin()]
//	],
	sourceMaps: true
});

fuse
	.bundle("app")
	.instructions(`> index.tsx`)
	.watch()
	.hmr({ socketURI: "ws://localhost:4445" });

fuse.dev({ root: false, port: 4445 }, server => {
	const dist = path.resolve("./dist");
	const static = path.resolve("./static");

	const app = server.httpServer.app;
	app.use("/dist/", express.static(dist));
	app.use("/", express.static(static));
});

fuse.run();
