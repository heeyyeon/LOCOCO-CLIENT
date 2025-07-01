module.exports = {
  typescript: true,
  ext: 'tsx',
  prettier: false,

  template: (variables, { tpl }) => {
    return tpl`
${variables.imports};

interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  stroke?: string;
  fill?: string;
}

export function ${variables.componentName}(props: Props) {
  return (
    ${variables.jsx}
  );
}
`;
  },

  svgProps: {
    width: '{props.size || 24}',
    height: '{props.size || 24}',
    fill: '{props.fill || "none"}',
  },

  replaceAttrValues: {
    currentColor: '{props.stroke || "currentColor"}',
    none: '{props.fill || "none"}',
  },

  jsxRuntime: 'automatic',

  indexTemplate: (filePaths) => {
    const exportEntries = filePaths.map(({ path: filePath }) => {
      const basename = filePath.replace(/\.[^/.]+$/, '');
      const componentName =
        basename.charAt(0).toUpperCase() + basename.slice(1);
      return `export { ${componentName} } from './${basename}';`;
    });
    return exportEntries.join('\n') + '\n';
  },
};
