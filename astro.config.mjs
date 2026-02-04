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
      components: {
        SocialIcons: './src/components/SocialIcons.astro',
      },
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/cowin3332-carl/my-wiki.git' }],
			sidebar: [
				{
					label: '标准解读',
					items: [
            { label: '📌 核心标准总览', link: '/标准解读/旭博认证cnas标准解读' },
            { 
              label: '🚗 汽车电子 (ISO/QC)', 
              autogenerate: { directory: '标准解读/各标准解读', collapsed: true },
            },
            { 
              label: '🛡️ 军工/航空 (GJB/RTCA)', 
              autogenerate: { directory: '标准解读/各标准解读', collapsed: true },
            },
            { 
              label: '🚆 轨道交通 (IEC/EN)', 
              autogenerate: { directory: '标准解读/各标准解读', collapsed: true },
            }
          ]
				},
				{
					label: '📚 标准原文',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
