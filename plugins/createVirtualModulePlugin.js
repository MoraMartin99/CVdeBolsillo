/** @module createVirtualModulePlugin */

/**
 * defaultExportString
 * @type {string}
 */
const defaultExportString = `const text = "hi";
            export default text;`;

/**
 * The [resolveId]{@link https://rollupjs.org/plugin-development/#resolveid} hook
 * @callback resolveId
 * @param {string} id
 * @returns {string|undefined}
 */

/**
 * The [load]{@link https://rollupjs.org/plugin-development/#load} hook
 * @callback load
 * @param {string} id
 * @returns {string|undefined}
 */

/**
 *
 * @typedef {object} plugin
 * @property {string} name The name of the plugin: "virtual-" + moduleId
 * @property {resolveId} resolveId
 * @property {load} load
 */

/**
 * createVirtualModulePlugin creates a plugin for vite that allows the use of [virtual modules]{@link https://vite.dev/guide/api-plugin#importing-a-virtual-file}
 * @param {object} settings
 * @param {string} settings.moduleId The name of the target file
 * @param {string} [settings.exportString = defaultExportString] The code that the virtual module must exports formatted as a string
 * @example
 * // Inside vite.config.js
 *
 * const moduleId = "A" // the target file is ./src/A.js
 * const exportString = "export default function exec(){}"
 *
 * const myPlugin = createVirtualModulePlugin({moduleId, exportString})
 * 
 * export default defineConfig({
  plugins: [myPlugin],
});
 * @returns {plugin}
 */
function createVirtualModulePlugin({
  moduleId,
  exportString = defaultExportString,
}) {
  const virtualId = `virtual:${moduleId}`;
  const resolvedVirtualId = "\0" + virtualId;

  const isExpectedId = (id) => {
    const regex = new RegExp(`${moduleId}(\\.\\w+)?$`);
    return regex.test(id);
  };

  const resolveId = (id) => {
    if (isExpectedId(id)) return resolvedVirtualId;
  };

  const load = (id) => {
    if (id === resolvedVirtualId) return exportString;
  };

  return {
    get name() {
      return "virtual-" + moduleId;
    },
    load,
    resolveId,
  };
}

export default createVirtualModulePlugin;
