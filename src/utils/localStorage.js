import { _decrypt, _encrypt } from "./Crypto";

const nameApp = "devjobs";

export const getItem = (key) => {
  const data = localStorage.getItem(`${nameApp}_${key}`);
  return _decrypt(data);
};

export const setItem = (key, data) => {
  localStorage.setItem(`${nameApp}_${key}`, _encrypt(data));
};

export const clearItems = () => localStorage.clear();
