// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Erzan Engineering Docs',
  tagline: 'Architecture, systems, and engineering behind my projects',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  stylesheets: [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
  ],

  // Set the production url of your site here
  url: 'https://docs.erzan.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Erzan12', // Usually your GitHub org/user name.
  projectName: 'portfolio-v2', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/Erzan12/portfolio-v2/tree/master/apps/docs/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/Erzan12/portfolio-v2/tree/master/apps/docs/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/social-card.jpg',
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'docs.erzan',
        logo: {
          alt: 'Erzan Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '📖 Documentation',
          },
          // {
          //   type: 'docSideBar',
          //   sidebarId: 'caseStudiesSidebar',
          //   position: 'left',
          //   label: 'Case Studies',
          // },
          {
            to: '/blog', 
            label: '📝 Blog', 
            position: 'left'
          },
          {
            // href: "https://erzan.dev",
            //local dev
            href: "http://localhost:3001",
            label: "Portfolio",
            position: "right",
          },
          {
            href: "https://github.com/Erzan12",
            label: "GitHub",
            position: "right",
          },
          // {
          //   href: 'https://github.com/Erzan12/portfolio-v2/tree/master/apps/docs',
          //   label: 'GitHub',
          //   position: 'right',
          // },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: "Architecture",
                to: "/docs/architecture",
              },
              {
                label: "Engineering",
                to: "/docs/engineering/decisions",
              },
              {
                label: "Development Roadmap",
                to: "/docs/roadmap/development-roadmap",
              },
            ],
          },
          {
            title: 'Socials',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'X',
                href: 'https://x.com/docusaurus',
              },
            ],
          },
          {
            title: "Projects",
            items: [
              {
                label: "Portfolio",
                href: "https://erzan.dev",
              },
              {
                label: "GitHub",
                href: "https://github.com/Erzan12",
              },
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
                href: 'https://github.com/Erzan12',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Erzan Engineering Docs. Built with Docusaurus.❤️`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
