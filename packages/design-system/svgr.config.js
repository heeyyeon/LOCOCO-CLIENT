module.exports = {
  typescript: true,
  ext: 'tsx',
  prettier: false,

  svgProps: {
    width: '{props.size || 24}',
    height: '{props.size || 24}',
    stroke: '{props.stroke || "currentColor"}',
    fill: '{props.fill || "none"}',
  },

  jsxRuntime: 'automatic',

  replaceAttrValues: {
    currentColor: '{props.stroke || "currentColor"}',
    none: '{props.fill || "none"}',
  },

  indexTemplate: (filePaths) => {
    const exportEntries = filePaths.map(({ path: filePath }) => {
      const basename = filePath.replace(/\.[^/.]+$/, '');
      const componentName =
        basename.charAt(0).toUpperCase() + basename.slice(1);
      return `export { default as ${componentName} } from './${basename}';`;
    });
    return exportEntries.join('\n') + '\n';
  },
};
