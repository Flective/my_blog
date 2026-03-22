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


    gallery: collection({
      label: 'Gallery',
      slugField: 'title',
      path: 'src/content/gallery/*',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        caption: fields.text({
          label: 'Caption',
          description: 'Shown on hover in the gallery',
          multiline: true,
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Personal Photos',          value: 'photo'     },
            { label: 'AI-Generated Imagery',     value: 'ai-art'    },
            { label: 'Fiat Lux / Reflective',    value: 'fiat-lux'  },
            { label: 'Music Videos / Stills',    value: 'music'     },
          ],
          defaultValue: 'photo',
        }),
        imagePath: fields.text({
          label: 'Image Path',
          description: 'Path relative to /public — e.g. /gallery/my-photo.jpg',
        }),
        isPanoramic: fields.checkbox({
          label: 'Panoramic / wide image',
          description: 'Enables horizontal scroll in the lightbox for wide images',
          defaultValue: false,
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          { label: 'Tags', itemLabel: (props) => props.fields.value }
        ),
        date: fields.date({ label: 'Date' }),
      },
    }),
  
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
