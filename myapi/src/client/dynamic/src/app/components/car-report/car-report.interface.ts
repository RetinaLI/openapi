export let NEW_ENERGY_PLATFORM_MAP = {
  "A14": "欧辉",
  "A02": "欧马可",
  "A01": "奥铃",
  "轻商务车": { "A24": 1, "A03": 1, "03": 1, "A07": 1 },
  "A08": "时代"
}
export let PLATFORM_MAP = {
  "A09": "欧曼",
  "A14": "欧辉",
  "A02": "欧马可",
  "A01": "奥铃",
  "A08": "时代",
  "雷萨": { "12": 1, "A16": 1 }
}

export type CT_GlobalConfig = {
  SPEC_BRAND?: "轻商务车" | "雷萨",
  dataGroupType?: "brand" | "carType",
  dataRange?: "all" | "new_energy" | "brand",
  reportType?: "week" | "day" | "month",
  platformBrandMap?: any,
  startDate?: Date,
  endDate?: Date,
  dayCount?: number,
  days?: { d: string, t: string, md: string }[],
  brandMap?: {
    [x: string]: string
  },
  lineColors?: string[]
}