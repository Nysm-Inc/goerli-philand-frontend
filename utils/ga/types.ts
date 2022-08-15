type ConversionName =
  | "conversion_connect_wallet"
  | "conversion_create_philand"
  | "conversion_get_quest"
  | "conversion_get_free"
  | "conversion_get_premium"
  | "conversion_get_wallpaper"
  | "conversion_deposit"
  | "conversion_save"
  | "conversion_share";

type Action = "click" | ConversionName;

export type Event = {
  action: Action;
  category?: string;
  label?: string;
  value?: number;
};
