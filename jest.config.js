module.exports = {
    roots: [
        '<rootDir>/src'
    ],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(vue)$': '@vue/vue3-jest',
        '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    },
    transformIgnorePatterns: [
        '<rootDir>/node_modules/',
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
        '^.+\\.module\\.(css|sass|scss|less)$',
    ],
    moduleFileExtensions: [
        'vue',
        'js',
        'jsx',
        'ts',
        'tsx',
        'json',
        'node',
        'vue'
    ],
    resetMocks: true,
    // collectCoverage:true,
    // coverageReporters: ["html", "text-summary"], //报告的格式
};