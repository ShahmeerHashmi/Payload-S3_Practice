import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 'url',  // This is your cloudinary url
      type: 'text',
      required: true,
    },
  ],
  admin: {
    useAsTitle: 'alt',
    preview: (doc) => doc?.url as string,
  },
};
