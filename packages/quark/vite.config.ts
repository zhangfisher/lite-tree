import { resolve } from 'path';
import { defineConfig } from 'vite'; 
// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@common": resolve(__dirname,'../common')
        }
    }
});
