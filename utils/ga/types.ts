type ConversionName =
  | "conversion_connect_wallet"
  | "conversion_create_philand"
  | "conversion_get_quest"
  | "conversion_get_shop"
  | "conversion_deposit"
  | "conversion_withdraw"
  | "conversion_set_link"
  | "conversion_save"
  | "conversion_share";

type Action = "click" | ConversionName;

export type Event = {
  action: Action;
  category?: string;
  label?: string;
  value?: number;
};
