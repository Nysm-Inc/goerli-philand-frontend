export type Event = ClickEvent;

type ClickEvent = {
  action: "click";
  category: string;
  label: string;
  value?: number;
};
