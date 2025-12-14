import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'album',
  title: 'Album',
  type: 'document',
  icon: () => '💿',
  fields: [
    defineField({
      name: 'title',
      title: 'Album Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
    }),
    defineField({
      name: 'label',
      title: 'Record Label',
      type: 'string',
    }),
    defineField({
      name: 'genre',
      title: 'Genre',
      type: 'string',
      description: 'e.g., Pop/Rock/Alternative',
    }),
    defineField({
      name: 'styles',
      title: 'Styles',
      type: 'string',
      description: 'e.g., Indie Rock, Alternative',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'tracks',
      title: 'Tracks',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'track' }],
        },
      ],
    }),
    defineField({
      name: 'streamingLinks',
      title: 'Streaming Links',
      type: 'object',
      fields: [
        defineField({ name: 'spotify', title: 'Spotify', type: 'url' }),
        defineField({ name: 'appleMusic', title: 'Apple Music', type: 'url' }),
        defineField({ name: 'amazonMusic', title: 'Amazon Music', type: 'url' }),
        defineField({ name: 'soundcloud', title: 'SoundCloud', type: 'url' }),
        defineField({ name: 'youtube', title: 'YouTube Music', type: 'url' }),
      ],
    }),
    defineField({
      name: 'isLatest',
      title: 'Featured as Latest Album',
      type: 'boolean',
      initialValue: false,
      description: 'Enable to show this album in the "Latest Album" section',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in discography section (lower = first)',
      validation: (Rule) => Rule.integer(),
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Release Date (Newest)',
      name: 'releaseDateDesc',
      by: [{ field: 'releaseDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      releaseDate: 'releaseDate',
      media: 'coverImage',
      isLatest: 'isLatest',
    },
    prepare({ title, releaseDate, media, isLatest }) {
      const year = releaseDate ? new Date(releaseDate).getFullYear() : 'No date';
      return {
        title: isLatest ? `⭐ ${title}` : title,
        subtitle: `${year}`,
        media,
      };
    },
  },
});
