import Taro from '@tarojs/taro';

/**
 * 小程序调试工具
 * 在开发版/体验版自动开启调试模式
 * 支持微信小程序和抖音小程序
 */
export function devDebug() {
  const env = Taro.getEnv();
  if (env === Taro.ENV_TYPE.WEAPP || env === Taro.ENV_TYPE.TT) {
    try {
      const accountInfo = Taro.getAccountInfoSync();
      const envVersion = accountInfo.miniProgram.envVersion;
      console.log('[Debug] envVersion:', envVersion);

      if (envVersion !== 'release') {
        Taro.setEnableDebug({ enableDebug: true });
      }
    } catch (error) {
      console.error('[Debug] 开启调试模式失败:', error);
    }
  }
}
