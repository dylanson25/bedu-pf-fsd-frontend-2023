import { enc, AES } from "crypto-js";

export const _encrypt = (data) => {
  if (typeof data === "object") data = JSON.stringify(data);
  return AES.encrypt(data, "xD").toString();
};
export const _decrypt = (encrypted) => {
  if (encrypted) {
    const bytes = AES.decrypt(encrypted, "xD");
    const data = bytes.toString(enc.Utf8);

    return JSON.parse(data);
  } else return null;
};
