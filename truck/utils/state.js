// vOrderState 订单状态
const DAI_FU_KUAN = 1              // 待付款
const DAI_FA_HUO = 2              // 待发货
const DAI_SHOU_HUO = 3           // 待收货
const WAN_CHENG = 5             // 已完成
const TUI_KUAN_IN = 6          // 退款中
const TUI_KUAN_OUT = 7        // 已退款
const GUO_QI = 8             // 已关闭(过期)

// vShopProductType	订单商品类型：1. 实物商品 2. 虚拟消费类商品（消费码）
const SHI_WU_GOODS = 1
const XU_NI_GOODS = 2

// vGroupOrderState 拼单状态
const PIN_DAN_ZHONG = 1
const PIN_WAN_WHENG = 2
const PIN_QUO_QI = 3

// vGroupProductLogState 砍价状态
const KAN_JIA_ZHONG = 1
const KAN_JIA_CHAO_SHI = 2

module.exports = {
  DAI_FU_KUAN,
  DAI_FA_HUO,
  DAI_SHOU_HUO,
  WAN_CHENG,
  TUI_KUAN_IN,
  TUI_KUAN_OUT,
  GUO_QI,
  SHI_WU_GOODS,
  XU_NI_GOODS,
  PIN_QUO_QI,
  PIN_DAN_ZHONG,
  PIN_WAN_WHENG,
  KAN_JIA_ZHONG,
  KAN_JIA_CHAO_SHI
}