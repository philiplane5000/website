import { defineConfig } from 'vite'
// import ViteSassPlugin from 'vite-plugin-sass';
import path from 'path'

export default defineConfig({
  // Define your project root if necessary, otherwise it defaults to the location of the Vite config file
  root: path.resolve(__dirname, 'src'),
  publicDir: path.resolve(__dirname, './src/public'),

  // If your index.html is not in the project root or you need to specify how to find your main.ts
  // Vite automatically handles the entry from index.html to main.ts, so typically you won't need to adjust this
  // But if you have a unique structure, you might need to adjust your `build` options:
  build: {
    // entry: path.resolve(__dirname, 'src/index.html'),
    emptyOutDir: true,
    outDir: path.resolve(__dirname, 'dist'),
    // assetsDir: path.resolve(__dirname, 'assets'),
  },  

  // Configure the server options if needed, for development
  server: {
    port: 4173, // Optional: Change the port the dev server runs on
    open: true, // Optional: Open the browser automatically
  },

  // Configure paths if you have a specific need to alias directories
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@bootstrap': path.resolve(__dirname, './node_modules/bootstrap'),
      // Add other aliases here
    },
  },

  // Add plugins if you're using any, such as Vue, React, etc.
//   plugins: [ViteSassPlugin()],
})

