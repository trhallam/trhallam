import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';



const config: Config = {
  title: 'Tony Hallam',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/man.png',

  // Set the production url of your site here
  url: 'https://trhallam.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/trhallam',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'trhallam', // Usually your GitHub org/user name.
  projectName: '/trhallam', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // plugins
  plugins: [require.resolve('docusaurus-lunr-search'), require.resolve('custom-webpack')],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/trhallam/trhallam/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Tony Hallam',
      logo: {
        alt: 'My Site Logo',
        src: 'img/man.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'gistSidebar',
          position: 'left',
          label: 'Gists',
        },
        {
          type: 'docSidebar',
          sidebarId: 'projectsSidebar',
          position: 'left',
          label: 'Projects',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          type: 'dropdown',
          label: 'Pages',
          position: 'left',
          items: [
            {
              label: 'Conway\'s Game of Life',
              to: '/gol'
            },
            {
              label: 'React Tic-tac-toe',
              to: '/tictactoe'
            },
            {
              label: 'Super Secret Santa',
              to: '/super-secret-santa'
            }
          ]
        },
        {
          href: 'https://github.com/trhallam/trhallam',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'My Work',
          items: [
            {
              label: 'Gists',
              to: '/docs/gist-intro',
            },
            {
              label: 'Projects',
              to: 'docs/projects/overview'
            }
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Github Discussions',
              href: 'https://github.com/trhallam/trhallam/discussions',
            },
            {
              label: 'LinkedIn',
              href: 'https://uk.linkedin.com/in/antonyhallam',
            }
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/trhallam',
            },
            {
              label: 'Credits',
              to: '/credits'
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Tony Hallam. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['toml', 'bash', 'rust', 'python'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
