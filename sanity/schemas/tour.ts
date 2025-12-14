import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'tour',
  title: 'Tour',
  type: 'document',
  icon: () => '🎤',
  fields: [
    defineField({
      name: 'name',
      title: 'Tour Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: [
          { title: 'Turkey', value: 'turkey' },
          { title: 'Europe', value: 'europe' },
          { title: 'America', value: 'america' },
          { title: 'Other', value: 'other' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'promoImage',
      title: 'Promo Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'promoVideoUrl',
      title: 'Promo Video URL',
      type: 'url',
      description: 'YouTube or Vimeo URL',
    }),
    defineField({
      name: 'dates',
      title: 'Tour Dates',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'tourDate',
          title: 'Tour Date',
          fields: [
            defineField({
              name: 'date',
              title: 'Date',
              type: 'date',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'venue',
              title: 'Venue',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'city',
              title: 'City',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'country',
              title: 'Country',
              type: 'string',
            }),
            defineField({
              name: 'ticketUrl',
              title: 'Ticket URL',
              type: 'url',
            }),
            defineField({
              name: 'vipUrl',
              title: 'VIP Ticket URL',
              type: 'url',
            }),
            defineField({
              name: 'isSoldOut',
              title: 'Sold Out',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              date: 'date',
              venue: 'venue',
              city: 'city',
              isSoldOut: 'isSoldOut',
            },
            prepare({ date, venue, city, isSoldOut }) {
              const formattedDate = date
                ? new Date(date).toLocaleDateString('tr-TR', {
                    day: 'numeric',
                    month: 'short',
                  })
                : 'No date';
              return {
                title: `${formattedDate} - ${city || 'No city'}`,
                subtitle: isSoldOut ? `${venue} (SOLD OUT)` : venue,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'bookingUrl',
      title: 'Booking Enquiries URL',
      type: 'url',
    }),
    defineField({
      name: 'isActive',
      title: 'Currently Active',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck to hide this tour from the website',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      region: 'region',
      media: 'promoImage',
      isActive: 'isActive',
    },
    prepare({ title, region, media, isActive }) {
      const regionLabels: Record<string, string> = {
        turkey: '🇹🇷 Turkey',
        europe: '🇪🇺 Europe',
        america: '🇺🇸 America',
        other: '🌍 Other',
      };
      return {
        title: isActive ? title : `[Inactive] ${title}`,
        subtitle: regionLabels[region] || region,
        media,
      };
    },
  },
});
