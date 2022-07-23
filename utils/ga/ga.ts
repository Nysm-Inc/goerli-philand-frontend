import { GA_ID } from "~/constants";
import { Event } from "./types";

export const pageview = (path: string) => {
  window.gtag("config", GA_ID, { page_path: path });
};

export const event = ({ action, category, label }: Event) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: JSON.stringify(label),
  });
};
