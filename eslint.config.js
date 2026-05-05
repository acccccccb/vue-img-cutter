import pluginVue from "eslint-plugin-vue"
import globals from "globals"
import tsParser from "@typescript-eslint/parser"
import vueParser from "vue-eslint-parser"

export default [
  // ❗ 1. 忽略
  {
    ignores: ["dist/**", "node_modules/**"]
  },

  // Vue 推荐规则
  ...pluginVue.configs["flat/recommended"],

  // ❗ 2. JS + TS
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.browser
      }
    }
  },

  // ❗ 3. Vue SFC（关键修复）
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser, // 👉 Vue 内部 TS
        ecmaVersion: 2020,
        sourceType: "module"
      },
      globals: {
        ...globals.browser
      }
    }
  },

  // ❗ 4. 规则覆盖
  {
    rules: {
        "vue/multi-word-component-names": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-this-alias": "off",
        "vue/require-toggle-inside-transition": "off",
        "vue/attribute-hyphenation": "off",
        "vue/prop-name-casing": "off"
    }
  }
]