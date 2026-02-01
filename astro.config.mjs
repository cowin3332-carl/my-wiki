// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: '环境可靠性检测技术标准库',
			customCss: [
        './src/styles/custom.css',
      ],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/cowin3332-carl/my-wiki.git' }],
			sidebar: [
				{
					label: '标准解读',
					autogenerate: { directory: '标准解读' },
				},
				{
					label: '标准原文',
					autogenerate: { directory: '标准原文' },
				},
			],
		}),
	],
});
