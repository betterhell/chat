import {defineConfig} from 'vite'
import EnvironmentPlugin from "vite-plugin-environment";


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [EnvironmentPlugin('all')],
})
