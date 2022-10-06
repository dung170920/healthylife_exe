// import { RecipeRequestModel } from "models";
import { axiosPrivate } from "config/axiosConfig";
import queryString from "query-string";
import CryptoJS from "crypto-js";


const apiPath = "/payment";

export const sendRequestPayment = async (money: number) => {
  return await axiosPrivate.post(`${apiPath}`, { amount: money });
};

export const completePayment = async (orderCode: string) => {
  return await axiosPrivate.get(`${apiPath}/payment?orderCode=${orderCode}`);
};

export const sendRequestToNganLuong = async (params: any) => {
  const nganluongParams = {
    merchant_site_code: process.env.REACT_APP_MERCHANT_CODE,
    return_url: `https://helife.netlify.app/users/${params.userId}`,
    receiver: process.env.REACT_APP_RECEIVER_EMAIL,
    transaction_info: "nạp tiền",
    order_code: params.orderCode,
    price: params.price,
    currency: "vnd",
    quantity: 1,
    tax: 0,
    discount: 0,
    fee_cal: 0,
    fee_shipping: 0,
    lang: "vi",
    secure_code: CryptoJS.MD5(
      `${process.env.REACT_APP_MERCHANT_CODE} https://helife.netlify.app/users/${params.userId} ${process.env.REACT_APP_RECEIVER_EMAIL} nạp tiền ${params.orderCode} ${params.price} vnd 1 0 0 0 0 vi ${process.env.REACT_APP_MERCHANT_PASSWORD}`
    ),
  };
  return await axiosPrivate.get(
    `https://www.nganluong.vn/checkout.php?${queryString.stringify(
      nganluongParams
    )})`
  );
};

