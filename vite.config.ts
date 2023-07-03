import path from 'path'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        vue()
    ],
    resolve: {
        alias: [{
            find: '@',
            replacement: path.resolve(__dirname, 'src')
        }],
        extensions: ['.ts', '.js', '.vue']
    }
})
