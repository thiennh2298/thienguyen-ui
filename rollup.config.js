// rollup.config.js
// import resolve from "@rollup/plugin-node-resolve";
// import commonjs from "@rollup/plugin-commonjs";
// import typescript from "@rollup/plugin-typescript";
// import { dts } from "rollup-plugin-dts";
// import postcss from "rollup-plugin-postcss";
// import peerDepsExternal from "rollup-plugin-peer-deps-external";

// const packageJson = require("./package.json");

// export default [
//   {
//     input: "src/index.ts",
//     output: [
//       {
//         file: "dist/index.js",
//         format: "cjs",
//         sourcemap: true,
//       },
//       {
//         file: "dist/index.esm.js",
//         format: "esm",
//         sourcemap: true,
//       },
//     ],
//     plugins: [
//       peerDepsExternal(),
//       resolve(),
//       commonjs(),
//       typescript({
//         tsconfig: "./tsconfig.json",
//         declaration: true,
//         declarationDir: "./dist/types",
//       }),
//       postcss({
//         config: {
//           path: "./postcss.config.js",
//         },
//         extensions: [".css"],
//         extract: true,
//         minimize: true,
//       }),
//     ],
//     external: ["react", "react-dom"],
//   },
//   {
//     input: "dist/types/index.d.ts",
//     output: [{ file: "dist/index.d.ts", format: "esm" }],
//     plugins: [dts()],
//     external: [/\.css$/],
//   },
// ];

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { dts } from "rollup-plugin-dts";

const packageJson = require("./package.json");

export default [
  // JS/CSS Bundle
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(), // Don't bundle react, react-dom
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "dist/types",
        rootDir: "src",
        exclude: ["**/*.stories.tsx", "**/*.test.tsx"],
      }),
      postcss({
        extract: true, // Output dist/index.css
        minimize: true,
        extensions: [".css"],
      }),
    ],
    external: ["react", "react-dom"],
  },

  // Type Definitions
  {
    input: "dist/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
