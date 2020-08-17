module.exports = {
	modulePaths: [ '<rootDir>/../test', '<rootDir>/server', '<rootDir>', '<rootDir>/extensions' ],
	rootDir: '../../client',
	roots: [ '<rootDir>/server' ],
	testEnvironment: 'node',
	transform: {
		'\\.[jt]sx?$': 'babel-jest',
		'\\.(gif|jpg|jpeg|png|svg|scss|sass|css)$': require.resolve(
			'@automattic/calypso-build/jest/transform/asset.js'
		),
	},
	transformIgnorePatterns: [
		'node_modules[\\/\\\\](?!redux-form|draft-js|wp-calypso-client)(?!.*\\.(?:gif|jpg|jpeg|png|svg|scss|sass|css))',
	],
	moduleNameMapper: {
		'^wp-calypso-client/config$': 'wp-calypso-client/server/config',
		'^wp-calypso-client/config/(.*)$': 'wp-calypso-client/server/config/$1',
	},
	testMatch: [ '<rootDir>/server/**/test/*.[jt]s?(x)', '!**/.eslintrc.*' ],
	timers: 'fake',
	setupFiles: [ 'regenerator-runtime/runtime' ], // some NPM-published packages depend on the global
	setupFilesAfterEnv: [ '<rootDir>/../test/server/setup-test-framework.js' ],
	verbose: false,
};
