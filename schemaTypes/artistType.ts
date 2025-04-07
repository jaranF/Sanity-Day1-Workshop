import {defineField, defineType} from "sanity";

export const artistType = defineType({
  name: "artist_of_the_week",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string"
    })
  ]
});
