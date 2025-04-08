import type {StructuredResolver} from "sanity/structure";
import { CalendarIcon } from "@sanity/icons";

export const structure: StructuredResolver = (S) =>
  S.list()
    .id("root")
    .title("Content")
    .items([
      S.documentTypeListItem("event").title("Events").icon(CalendarIcon),
      S.documentTypeListItem("artist").title("Artists").icon(UsersIcon)
      S.documentTypeListItem("venue").title("Venues").icon(PinIcon),
    ]);