const path = require('path');
module.exports = {
  typescript: true,
  ext: 'tsx',
  prettier: false,
  svgo: true,
  svgoConfig: {
    plugins: [
      {
        name: 'removeAttrs',
        params: {
          attrs: [
            'path:fill',
            'path:strokeWidth',
            'path:strokeLinecap',
            'path:strokeLinejoin',
          ],
        },
      },
    ],
  },
  template: (variables, { tpl }) => tpl`
${variables.imports};

interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}

export function ${variables.componentName}(props: Props) {
  return (
    ${variables.jsx}
  );
}
`,
  svgProps: {
    width: '{props.size || 24}',
    height: '{props.size || 24}',
    fill: '{props.fill || "currentColor"}',
  },
  replaceAttrValues: {
    none: '{props.fill || "none"}',
  },
  jsxRuntime: 'automatic',
  indexTemplate: (filePaths) => {
    const exportEntries = filePaths.map(({ path: filePath }) => {
      const basename = path.basename(filePath, path.extname(filePath));
      const actualComponentName =
        'Svg' + basename.charAt(0).toUpperCase() + basename.slice(1);
      return `export { ${actualComponentName} } from './${basename}';`;
    });
    return exportEntries.join('\n') + '\n';
  },
};
