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
          label: '🧪 试验项目',
          items: [{ autogenerate: { directory: '试验项目' } }]
        },
        {
          label: '📂 试验案例',
          items: [{ autogenerate: { directory: '试验案例' } }]
        },
        {
          label: '📚 标准解读',
          items: [
            { label: '📌 核心标准总览', link: '/标准解读/检测标准解读指南' },
            { autogenerate: { directory: '标准解读', collapsed: true } },
          ]
        },
        {
          label: '📚 标准原文',
          items: [
            { label: '标准原文列表', link: '/标准原文/标准原文' },
            { autogenerate: { directory: '标准原文', collapsed: true } },
          ],
        },
        {
          label: '公司信息',
          items: [
            { label: '资质概况', link: '/公司信息/资质概况' },
            { label: '2026 春节放假安排', link: '/公司信息/2026春节放假安排' },
          ],
        },
        {
          label: '个人中心',
          items: [
            { label: '我的笔记', link: '/个人中心/笔记' },
          ],
        },
        {
          label: '服务',
          items: [
            { label: '在线咨询', link: '/服务/在线咨询' },
          ],
        },
        {
          label: '参考资源',
          items: [
            { label: '下载中心', link: '/参考资源/下载中心' },
          ],
        },
      ],
    }),
  ],
});
