import type {StructureResolver} from "sanity/structure";
import {CalendarIcon, UsersIcon, PinIcon} from "@sanity/icons";

export const structure: StructureResolver = (S) =>
  S.list()
    .id("root")
    .title("Content")
    .items([
      ...S.documentTypeListItems()
        .map((item, index) => {
          console.groupCollapsed(`${" " + (index + 1)}. item.getSchemaType()`);
          // [Log] {jsonType: "object", type: Object, name: "event", title: "Event", fields: Array, …}
          console.log(item.getSchemaType());
          console.groupEnd();
          console.groupCollapsed(`${" " + (index + 1)}. item.getId()`);
          //[Log] "event"|"venue"|"artist" (i.e. logs one of those)
          console.log(item.getId());
          console.groupEnd();
          console.groupCollapsed(`${" " + (index + 1)}. item.getChild()`);
          //[Log] function (id, childContext) => { const parent = childContext.parent, parentItem = isList(parent) ? parent.items.find((item) => item.id === id) : null; ... ... ...
          console.log(item.getChild());
          console.groupEnd();
          return item;
        })
        .reverse()
    ]);
