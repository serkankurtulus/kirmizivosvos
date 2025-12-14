import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  icon: () => '📷',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Live', value: 'Live' },
          { title: 'Backstage', value: 'Backstage' },
          { title: 'Studio', value: 'Studio' },
          { title: 'Promo', value: 'Promo' },
          { title: 'Other', value: 'Other' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.integer(),
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      caption: 'caption',
      category: 'category',
      media: 'image',
      order: 'order',
    },
    prepare({ caption, category, media, order }) {
      return {
        title: caption || `Image ${order || ''}`,
        subtitle: category || 'Uncategorized',
        media,
      };
    },
  },
});
