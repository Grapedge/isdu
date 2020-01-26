import Taro from '@tarojs/taro';
import { STU_ID, PASSWORD, CRYPTO_KEY } from '@/constants/data';
import CryptoJS from 'crypto-js';

/**
 * 设置学生学号
 * @param {String} stuID
 */
export const setStuID = stuID => {
  Taro.setStorageSync(STU_ID, stuID);
};

/**
 * 获取学生学号
 */
export const getStuID = () => Taro.getStorageSync(STU_ID);

/**
 * 设置学生密码
 * @param {String} password 学生密码
 */
export const setPassword = password =>
  Taro.setStorageSync(
    PASSWORD,
    CryptoJS.AES.encrypt(password, CRYPTO_KEY).toString()
  );

/**
 * 获取学生密码（明文，请谨慎使用）
 */
export const getPassword = () =>
  (Taro.getStorageSync(PASSWORD) &&
    CryptoJS.AES.decrypt(Taro.getStorageSync(PASSWORD), CRYPTO_KEY).toString(
      CryptoJS.enc.Utf8
    )) ||
  '';
