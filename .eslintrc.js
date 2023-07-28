module.exports = {
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/type-annotation-spacing": [
        "error",
        {
            "before": true,
            "after": true,
        },
    ],
  }
}