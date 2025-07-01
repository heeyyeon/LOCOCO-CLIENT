module.exports = {
  typescript: true,
  ext: 'tsx',
  prettier: false,

  // 커스텀 템플릿으로 인터페이스 포함
  template: (variables, { tpl }) => {
    return tpl`
${variables.imports};

interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
}

const ${variables.componentName} = (props: Props) => (
  ${variables.jsx}
);

${variables.exports};
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
      return `export { default as ${componentName} } from './${basename}';`;
    });
    return exportEntries.join('\n') + '\n';
  },
};
