module.exports = {
    roots: ['../test'],

    // Indicates that the test environment is node (default)
    testEnvironment: 'node',

    // The glob patterns Jest uses to detect test files
    testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],

    // A map from regular expressions to paths to transformers
    transform: {
        '^.+\\.js$': 'babel-jest', // Use Babel for JavaScript files
    },

    // An array of file extensions your modules use
    moduleFileExtensions: ['js', 'json', 'node'],
    moduleDirectories: ['../node_modules'],

    // Coverage settings
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['json', 'lcov', 'text', 'clover'],

    // Other Jest configuration options...
};