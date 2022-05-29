import axios from "axios";
import { COUPON_API_GATEWAY } from "~/constants";
import { conditionList, Coupon } from "~/types/quest";

export const getCoupon = async (address: string, tokneId: number): Promise<Coupon | undefined> => {
  const condition = conditionList[tokneId];
  const url = new URL(COUPON_API_GATEWAY);
  url.searchParams.append("address", address);
  url.searchParams.append("condition", condition.name);
  url.searchParams.append("value", condition.value);
  const res = await axios.get<{ coupon: Coupon } | undefined>(url.toString());
  return res.data?.coupon;
};
