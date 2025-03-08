import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { generateAllPagesData, generateRoutesConfig } from './src/utils/dataProcessors';

// https://vitejs.dev/config/
export default defineConfig(async ({ command }) => {
  // Only run data processing during build
  if (command === 'build') {
    try {
      console.log('Generating pages from CSV data...');
      
      // Generate all page data from CSV files
      const dataDir = path.resolve(__dirname, 'data');
      const pagesData = await generateAllPagesData(dataDir);
      
      // Generate routes config
      const routesConfig = generateRoutesConfig(
        pagesData.cityPages,
        pagesData.statePages,
        pagesData.businessPages
      );
      
      // Write data to a file that can be imported
      const outputDir = path.resolve(__dirname, 'src/data');
      
      // Ensure directory exists
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      // Write generated data
      fs.writeFileSync(
        path.join(outputDir, 'pagesData.json'), 
        JSON.stringify(pagesData, null, 2)
      );
      
      // Write routes config
      fs.writeFileSync(
        path.join(outputDir, 'routesConfig.json'), 
        JSON.stringify(routesConfig, null, 2)
      );
      
      console.log('Successfully generated pages data from CSV files');
    } catch (error) {
      console.error('Error generating pages data:', error);
    }
  }

  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});