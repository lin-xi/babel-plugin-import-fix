publish:
	npm run build
	npm publish

publish-sync: publish
	cnpm sync babel-plugin-import