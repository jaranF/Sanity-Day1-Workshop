import {defineField, defineType} from "sanity";

export const artistType = defineType({
  name: "blahrtist",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string"
    })
  ]
});
