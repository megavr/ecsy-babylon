import { terser } from "rollup-plugin-terser";

export default [
  // dist/ecsy-babylon.js
  {
    external: [
      "ecsy",
      "@babylonjs/core",
    ],
    input: "packages/ecsy-babylon.js",
    output: {
      file: "dist/ecsy-babylon.js",
      format: "iife",
      name: "eb",
      globals: {
        "ecsy": "ECSY",
        "@babylonjs/core": "BABYLON",
      },
    },
  },
  // dist/ecsy-babylon.min.js
  {
    external: [
      "ecsy",
      "@babylonjs/core",
    ],
    input: "packages/ecsy-babylon.js",
    plugins: [
      terser({
        compress: {
          drop_console: true
        },
      })
    ],
    output: {
      file: "dist/ecsy-babylon.min.js",
      format: "iife",
      name: "eb",
      globals: {
        "ecsy": "ECSY",
        "@babylonjs/core": "BABYLON",
      },
    },
  },
]