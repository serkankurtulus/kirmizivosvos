import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({
      name: 'bandName',
      title: 'Band Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'A short description or slogan',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Main Contact Email',
      type: 'string',
      description: 'Primary contact email displayed on the website',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'twitter', title: 'Twitter/X', type: 'url' }),
        defineField({ name: 'youtube', title: 'YouTube', type: 'url' }),
        defineField({ name: 'spotify', title: 'Spotify', type: 'url' }),
        defineField({ name: 'appleMusic', title: 'Apple Music', type: 'url' }),
        defineField({ name: 'soundcloud', title: 'SoundCloud', type: 'url' }),
        defineField({ name: 'amazon', title: 'Amazon Music', type: 'url' }),
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({ name: 'bookingName', title: 'Booking Contact Name', type: 'string' }),
        defineField({ name: 'bookingPhone', title: 'Booking Phone', type: 'string' }),
        defineField({ name: 'bookingEmail', title: 'Booking Email', type: 'string' }),
        defineField({ name: 'pressName', title: 'Press Contact Name', type: 'string' }),
        defineField({ name: 'pressPhone', title: 'Press Phone', type: 'string' }),
        defineField({ name: 'pressEmail', title: 'Press Email', type: 'string' }),
        defineField({ name: 'infoName', title: 'Info Contact Name', type: 'string' }),
        defineField({ name: 'infoPhone', title: 'Info Phone', type: 'string' }),
        defineField({ name: 'infoEmail', title: 'Info Email', type: 'string' }),
      ],
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Copyright Text',
      type: 'string',
      description: 'e.g., "© 2025 Kırmızı Vosvos - All rights reserved"',
    }),
  ],
  preview: {
    select: {
      title: 'bandName',
      media: 'logo',
    },
  },
});
