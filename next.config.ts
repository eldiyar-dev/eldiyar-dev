import createNextIntlPlugin from 'next-intl/plugin';
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    const oldStackHost = [{type: 'host' as const, value: 'stack.eldiyar.dev'}];
    const stackPaths = [
      {source: '/', destination: '/ru/stack'},
      {source: '/ru', destination: '/ru/stack'},
      {source: '/digest', destination: '/ru/stack/digest'},
      {source: '/digest/:slug', destination: '/ru/stack/digest/:slug'}
    ];
    return stackPaths.map(path => ({
      ...path,
      destination: `https://eldiyar.dev${path.destination}`,
      has: oldStackHost,
      permanent: true
    }));
  },
  turbopack: {rules: {'*.wgsl': {loaders: ['@vgpu/wgsl/loader-webpack'], as: '*.js'}}},
  webpack(config) {
    config.module.rules.push({test: /\.wgsl$/, loader: '@vgpu/wgsl/loader-webpack'});
    return config;
  },
};
export default createNextIntlPlugin('./i18n/request.ts')(nextConfig);
