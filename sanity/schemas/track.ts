import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'track',
  title: 'Track',
  type: 'document',
  icon: () => '🎵',
  fields: [
    defineField({
      name: 'title',
      title: 'Track Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'audioFile',
      title: 'Audio File (MP3)',
      type: 'file',
      options: {
        accept: 'audio/*',
      },
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., 3:45',
    }),
    defineField({
      name: 'lyrics',
      title: 'Lyrics',
      type: 'text',
      rows: 10,
    }),
    defineField({
      name: 'hasLyrics',
      title: 'Show Lyrics Button',
      type: 'boolean',
      initialValue: false,
      description: 'Enable to show lyrics toggle button',
    }),
    defineField({
      name: 'downloadUrl',
      title: 'Download URL',
      type: 'url',
      description: 'External link to download the track',
    }),
    defineField({
      name: 'purchaseUrl',
      title: 'Purchase URL',
      type: 'url',
      description: 'Link to purchase the track',
    }),
    defineField({
      name: 'trackNumber',
      title: 'Track Number',
      type: 'number',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
  ],
  orderings: [
    {
      title: 'Track Number',
      name: 'trackNumberAsc',
      by: [{ field: 'trackNumber', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      trackNumber: 'trackNumber',
      duration: 'duration',
    },
    prepare({ title, trackNumber, duration }) {
      return {
        title: `${trackNumber}. ${title}`,
        subtitle: duration || 'No duration set',
      };
    },
  },
});
