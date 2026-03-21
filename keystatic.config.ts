import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: {
    // 'local' for dev — switch to 'github' for production CMS on Vercel
    // See README for GitHub storage setup
    kind: 'local',
  },

  ui: {
    brand: {
      name: 'My Blog',
    },
  },

  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Published Date' }),
        excerpt: fields.text({
          label: 'Excerpt',
          description: 'Short summary shown in listings',
          multiline: true,
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: (props) => props.fields.value,
          }
        ),
        content: fields.mdx({
          label: 'Content',
          options: {
            image: {
              directory: 'public/images/posts',
              publicPath: '/images/posts/',
            },
          },
        }),
      },
    }),

    essays: collection({
      label: 'Essays',
      slugField: 'title',
      path: 'src/content/essays/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        subtitle: fields.text({ label: 'Subtitle', description: 'Optional subheading' }),
        date: fields.date({ label: 'Published Date' }),
        excerpt: fields.text({
          label: 'Excerpt',
          description: 'Short summary shown in listings',
          multiline: true,
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: (props) => props.fields.value,
          }
        ),
        content: fields.mdx({
          label: 'Content',
          description: 'Use ## headings to create named sections with auto-generated TOC',
          options: {
            image: {
              directory: 'public/images/essays',
              publicPath: '/images/essays/',
            },
          },
        }),
      },
    }),

    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Date' }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Completed', value: 'completed' },
            { label: 'Concept', value: 'concept' },
          ],
          defaultValue: 'active',
        }),
        excerpt: fields.text({
          label: 'Excerpt',
          multiline: true,
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: (props) => props.fields.value,
          }
        ),
        content: fields.mdx({
          label: 'Content',
          options: {
            image: {
              directory: 'public/images/projects',
              publicPath: '/images/projects/',
            },
          },
        }),
      },
    }),
  },
});
