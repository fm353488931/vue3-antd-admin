import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    AutoImport({
      dts: 'src/auto-imports.d.ts', // 配置文件生成位置
      imports: ['vue', 'pinia', 'vue-router', 'vue-i18n'],
    }),
    Components({
      dirs: ['src/components'], // 要搜索组件的目录的相对路径
      extensions: ['vue'], //组件的有效文件扩展名
      dts: 'src/components.d.ts', // 配置文件生成位置
      deep: true, // 搜索子目录
      directoryAsNamespace: false, // 允许子目录作为组件的命名空间前缀
      resolvers: [AntDesignVueResolver()], // ui库解析器，也可以自定义
      include: [/.vue$/, /.vue?vue/],
      exclude: [/[\/]node_modules[\/]/, /[\/].git[\/]/],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: '@import "@/styles/index.less";',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  //启动服务配置
  server: {
    host: '0.0.0.0',
    port: 8000, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    https: false,
    // proxy: {
    //   '/api': {
    //     target: 'http://xxx.xxx.xxx.xxx:x000',
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace('/api/', '/'),
    //   },
    // },
  },
  // 生产环境打包配置
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})
