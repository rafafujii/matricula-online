import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Substitua 'matricula-online' pelo nome exato do seu repositório no GitHub!
export default defineConfig({
  base: '/matricula-online/', 
  plugins: [react()],
})
