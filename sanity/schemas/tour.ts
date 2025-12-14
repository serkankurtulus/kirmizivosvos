import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'tour',
  title: 'Tour Date',
  type: 'document',
  icon: () => '🎤',
  fields: [
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
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      description: 'e.g., "21:00" or "8:00 PM"',
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
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck to hide this event from the website',
    }),
  ],
  preview: {
    select: {
      date: 'date',
      venue: 'venue',
      city: 'city',
      isSoldOut: 'isSoldOut',
      isActive: 'isActive',
    },
    prepare({ date, venue, city, isSoldOut, isActive }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        : 'No date';
      let title = `${formattedDate} - ${city || 'No city'}`;
      if (!isActive) title = `[Inactive] ${title}`;
      return {
        title,
        subtitle: isSoldOut ? `${venue} (SOLD OUT)` : venue,
      };
    },
  },
  orderings: [
    {
      title: 'Date, Ascending',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
    {
      title: 'Date, Descending',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
});
