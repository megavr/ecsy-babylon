import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default [
  // dist/ecsy-babylon.js
  {
    external: [
      "ecsy",
      "@babylonjs/core",
    ],
    input: "packages/ecsy-babylon.js",
    plugins: [
      resolve({}),
    ],
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
  // dist/ecsy-babylon.module.js
  {
    external: [
      "ecsy",
      "@babylonjs/core",
    ],
    input: "packages/index.js",
    output: {
      file: "dist/ecsy-babylon.module.js",
      format: "esm",
      paths: {
        "ecsy": "https://ecsy.io/build/ecsy.module.js",
        "@babylonjs/core": "../js-modules/babylon.module.js",
      }
    },
  },
  // examples/js/basic.js
  {
    external: [
      "ecsy",
      "@babylonjs/core",
      "@ecsy-babylon"
    ],
    input: "packages/examples/app.js",
    output: {
      file: "examples/js/basic.js",
      format: "iife",
      globals: {
        "ecsy": "ECSY",
        "@babylonjs/core": "BABYLON",
        "@ecsy-babylon": "EB"
      },
    },
  },
  // examples/js/module.js
  {
    external: [
      "ecsy",
      "@ecsy-babylon"
    ],
    input: "packages/examples/app.js",
    output: {
      file: "examples/js/module.js",
      format: "esm",
      paths: {
        "ecsy": "https://ecsy.io/build/ecsy.module.js",
        "@ecsy-babylon": "../../dist/ecsy-babylon.module.js"
      }
    },
  },
  // js-modules/babylon.module.js
  {
    external: [
      "@babylonjs/core",
    ],
    input: "packages/js-modules/babylon.module.js",
    plugins: [
      resolve({ browser: true }),
      terser({
        compress: {
          drop_console: true
        },
        module: true
      })
    ],
    output: {
      file: "js-modules/babylon.module.js",
      format: "esm",
    },
  },
]