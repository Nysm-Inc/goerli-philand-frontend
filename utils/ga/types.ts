type Action = "click" | "conversions_save";

export type Event = {
  action: Action;
  category?: string;
  label?: string;
  value?: number;
};
