import {defineField, defineType} from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string"
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {source: "name"}
    }),
    defineField({
      name: "eventType",
      type: "string",
      options: {
        list: ["in-person", "virtual"],
        layout: "radio"
      }
    }),
    defineField({
      name: "date",
      type: "datetime"
    }),
    defineField({
      name: "doorsOpen",
      description: "Number of minutes before the start time for admission",
      type: "number",
      placeholder: "60 minutes"
    }),
    defineField({
      name: "venue",
      type: "reference",
      to: [{type: "venue"}]
    }) /* 4m44secs into video. */,
    defineField({
      name: "headline",
      type: "reference",
      to: [{type: "artist"}]
    }),
    defineField({
      name: "image",
      type: "image"
    }),
    defineField({
      name: "details",
      type: "array",
      of: [{type: "block"}]
    }),
    defineField({
      name: "tickets",
      type: "url"
    })
  ]
});
