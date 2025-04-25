import type { CollectionConfig } from 'payload';
import { uploadToCloudinary } from '../utils/cloudinary'; // Adjust the path if needed

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
  ],
  hooks: {
    beforeChange: [
      async ({ req, data }) => {
        const file = req?.file;

        if (file) {
          const uploadResult = await uploadToCloudinary(file);
          data.url = uploadResult; // Save the Cloudinary URL
        }

        return data;
      },
    ],
  },
  admin: {
    useAsTitle: 'alt',
  },
};
