// Native document navigation intentionally preserves the approved loader and motion lifecycle.
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypes from 'eslint-config-next/typescript';
const config = [...nextVitals,...nextTypes,{ignores:['.next/**','.open-next/**','.wrangler/**','public/**']},{files:['src/cinematic/**/*.{js,jsx}'],rules:{'@next/next/no-img-element':'off','react/no-unescaped-entities':'off','react-hooks/set-state-in-effect':'off','react-hooks/immutability':'off','react-hooks/refs':'off','@next/next/no-html-link-for-pages':'off'}},{files:['src/app/not-found.tsx'],rules:{'@next/next/no-html-link-for-pages':'off'}},{files:['src/components/site/{Header,ThemeSwitch,ThemeToggle,DoorRoom}.tsx','src/components/sections/Hero.tsx'],rules:{'react-hooks/set-state-in-effect':'off'}}];
export default config;
