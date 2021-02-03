module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        'plugin:vue/essential'
        // 'plugin:vue/recommended'
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'semi': ['warn', 'always'],
        'one-var-declaration-per-line': ['warn', 'initializations'],
        'space-before-function-paren': ['warn', {'anonymous': 'never', 'named': 'never', 'asyncArrow': 'always'}],
        'indent': ['warn', 2],
        'vue/valid-v-on': 'off',

        'vue/html-indent': 'off',
        // 'vue/html-indent': ['warn', 4,  {
        //   alignAttributesVertically: true
        // }],

        'vue/html-self-closing': ['warn', {
            html: {
                void: 'never',
                normal: 'never',
                component: 'never'
            }
        }],
        'vue/max-attributes-per-line': ['warn', {
            singleline: 3,
            multiline: {
                max: 1,
                allowFirstLine: false,
            }
        }],
        "vue/html-closing-bracket-newline": "off",
    }
};
