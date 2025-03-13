import eslintConfig from "eslint-config-next";

export default [
    ...eslintConfig,
    {
        rules: {
            "@typescript-eslint/no-explicit-any": "error"
        }
    }
];