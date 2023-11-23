import { _decrypt, _encrypt } from "./Crypto";

const nameApp = "devjobs";

export const getItem = (key, needDecrypt = true) => {
  const data = localStorage.getItem(`${nameApp}_${key}`);
  return needDecrypt ? _decrypt(data) : data;
};

export const setItem = (key, data, needEncrypt = true) => {
  localStorage.setItem(
    `${nameApp}_${key}`,
    needEncrypt ? _encrypt(data) : data
  );
};

export const clearItems = () => localStorage.clear();
