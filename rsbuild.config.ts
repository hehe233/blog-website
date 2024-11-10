import path from 'path';
import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';
import { pluginHtmlMinifierTerser } from 'rsbuild-plugin-html-minifier-terser';
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  plugins: [
    pluginVue(),
    pluginSass({
      sassLoaderOptions: {
        additionalData: `@use "@/assets/scss/mixin.scss" as *;`,
        sourceMap: true,
      },
    }),
    pluginHtmlMinifierTerser({
      removeComments: true,
    }),
    pluginTypeCheck({
      enable: isDev,
      forkTsCheckerOptions: {
        async: false,
        typescript: {
          configFile: path.resolve(__dirname, './tsconfig.json'),
          context: path.resolve(__dirname, './src'),
        },
      },
    }),
  ],

  performance: {
    removeMomentLocale: true,
  },
  dev: {
    progressBar: isDev,
  },

  html: {
    template: './index.html',
  },
  source: {
    entry: {
      index: './src/index.ts',
    },
    alias: {
      '@/': path.resolve(__dirname, './src'),
      '~/': path.resolve(__dirname, './src'),
      'api/': path.resolve(__dirname, './src/api'),
      '~types/': path.resolve(__dirname, './src/types'),
      '~util/': path.resolve(__dirname, './src/util'),
    }
  },

  output: {
    sourceMap: {
      js: isDev ? 'source-map' : false,
      css: isDev,
    },
    distPath: {
      root: 'build',
    },
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost/drupal/jsonapi',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
        secure: false,
      }
    },
  },

  tools: {
    rspack (config, { appendPlugins }) {
      if (process.env.RSDOCTOR) {
        appendPlugins(
          new RsdoctorRspackPlugin({
            // 插件选项
          }),
        );
      }
    },
  },
});
