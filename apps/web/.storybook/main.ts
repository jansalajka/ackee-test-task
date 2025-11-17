import type { StorybookConfig } from '@storybook/nextjs';

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): string {
    return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const toPosix = (path: string) => path.replace(/\\/g, '/');

const config: StorybookConfig = {
    stories: [
        toPosix(join(__dirname, '../src/**/*.mdx')),
        toPosix(join(__dirname, '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)')),
        toPosix(join(__dirname, '../../../packages/ui/**/*.stories.@(js|jsx|mjs|ts|tsx)')),
    ],
    addons: [getAbsolutePath('@chromatic-com/storybook'), getAbsolutePath('@storybook/addon-docs'), getAbsolutePath('@storybook/addon-onboarding')],
    framework: {
        name: getAbsolutePath('@storybook/nextjs'),
        options: {},
    },
    staticDirs: [toPosix(join(__dirname, '../public'))],
    previewHead: head => `
    ${head}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
  `,
};

export default config;

