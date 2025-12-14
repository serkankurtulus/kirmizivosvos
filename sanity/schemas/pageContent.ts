import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pageContent',
  title: 'Page Content',
  type: 'document',
  icon: () => '📄',
  fields: [
    // About Section
    defineField({
      name: 'aboutTitle',
      title: 'About Section Title',
      type: 'string',
      group: 'about',
    }),
    defineField({
      name: 'aboutText',
      title: 'About Section Text',
      type: 'text',
      rows: 5,
      group: 'about',
    }),
    defineField({
      name: 'aboutImage',
      title: 'About Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'about',
    }),

    // Upcoming Tour Info (shown in About section)
    defineField({
      name: 'upcomingTourVenue',
      title: 'Upcoming Tour Venue',
      type: 'string',
      group: 'about',
    }),
    defineField({
      name: 'upcomingTourLocation',
      title: 'Upcoming Tour Location',
      type: 'string',
      group: 'about',
    }),
    defineField({
      name: 'upcomingTourDate',
      title: 'Upcoming Tour Date Range',
      type: 'string',
      description: 'e.g., Sunday to Wednesday, July 23 to 26, 2025',
      group: 'about',
    }),

    // Countdown Section
    defineField({
      name: 'countdownTitle',
      title: 'Countdown Title',
      type: 'string',
      group: 'countdown',
    }),
    defineField({
      name: 'countdownSubtitle',
      title: 'Countdown Subtitle',
      type: 'string',
      group: 'countdown',
    }),
    defineField({
      name: 'countdownDate',
      title: 'Countdown Target Date',
      type: 'datetime',
      group: 'countdown',
    }),
    defineField({
      name: 'countdownImage',
      title: 'Countdown Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'countdown',
    }),

    // Pre-sale Section
    defineField({
      name: 'presaleTitle',
      title: 'Pre-sale Section Title',
      type: 'string',
      group: 'presale',
    }),
    defineField({
      name: 'presaleInfo',
      title: 'Pre-sale Information',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g., Pre-Sale Tour 1',
            }),
            defineField({
              name: 'dates',
              title: 'Dates',
              type: 'string',
              description: 'e.g., 2/07 - 2/09',
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'dates',
            },
          },
        },
      ],
      group: 'presale',
    }),
    defineField({
      name: 'presaleNote',
      title: 'Pre-sale Note',
      type: 'string',
      description: 'e.g., All pre-sales begin 12am local and end 6pm local time.',
      group: 'presale',
    }),
    defineField({
      name: 'presaleImage',
      title: 'Pre-sale Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'presale',
    }),

    // Gallery Section
    defineField({
      name: 'instagramHandle',
      title: 'Instagram Handle',
      type: 'string',
      description: 'e.g., @kirmizivosvos (shown below gallery)',
      group: 'gallery',
    }),

    // Contact Section
    defineField({
      name: 'contactTitle',
      title: 'Contact Section Title',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'contactText',
      title: 'Contact Section Text',
      type: 'text',
      rows: 3,
      group: 'contact',
    }),
  ],
  groups: [
    { name: 'about', title: 'About Section' },
    { name: 'countdown', title: 'Countdown Section' },
    { name: 'presale', title: 'Pre-sale Section' },
    { name: 'gallery', title: 'Gallery Section' },
    { name: 'contact', title: 'Contact Section' },
  ],
  preview: {
    prepare() {
      return {
        title: 'Page Content',
        subtitle: 'Homepage sections content',
      };
    },
  },
});
