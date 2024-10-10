// useUserStatus.ts
import { useBattery, useOnline, useIdle } from "@vueuse/core";

export function useUserStatus() {
  const battery = useBattery(); // 获取电池状态
  const isOnline = useOnline(); // 检测网络状态
  const { idle } = useIdle(1 * 1 * 1000); // 设置空闲时间为 5 分钟

  return {
    batteryLevel: battery.level, // 电池电量
    batteryCharging: battery.charging, // 是否正在充电
    isOnline,
    idle, // 用户是否空闲
  };
}
