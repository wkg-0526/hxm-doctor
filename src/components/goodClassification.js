const classificationAll = [
  { name: "全部" },
  { name: "眼部" },
  { name: "鼻部" },
  { name: "胸部" },
  { name: "耳部" },
  { name: "美体塑形" },
  { name: "面部轮廓" },
  { name: "玻尿酸" },
  { name: "唇部" },
  { name: "皮肤美容" },
  { name: "修复重建" },
  { name: "抗衰老" },
  { name: "私密" },
  { name: "脱毛" },
  { name: "其他" }
]
const goodClassification = [
  {
    name: "眼部",
    project: [
      { name: "去眼袋" },
      { name: "双眼皮" },
      { name: "眼综合" },
      { name: "开眼角" },
      { name: "眼型矫正" },
      { name: "眼周年轻化" },
      { name: "眼整形失败修复" }
    ]
  },
  {
    name: "鼻部",
    project: [{ name: "鼻综合" }, { name: "鼻头，鼻翼，鼻孔，矫正" }, { name: "鼻型矫正" }, { name: "垫鼻基底" }, { name: "垫鼻尖" }, { name: "鼻子失败修复" }]
  },
  { name: "胸部", project: [{ name: "隆胸" }, { name: "乳头 乳晕" }, { name: "胸行美化" }, { name: "去副乳" }, { name: "隆胸修复" }] },

  { name: "耳部", project: [{ name: "耳矫正" }, { name: "丰耳垂" }, { name: "耳再造" }] },

  {
    name: "美体塑形",
    project: [
      { name: "吸脂" },
      { name: "瘦腰腹" },
      { name: "瘦大腿" },
      { name: "瘦全身" },
      { name: "瘦手臂" },
      { name: "瘦臀" },
      { name: "瘦背" },
      { name: "瘦小腿" },
      { name: "吸脂失败修复" }
    ]
  },
  {
    name: "面部轮廓",
    project: [
      { name: "磨骨" },
      { name: "垫下巴" },
      { name: "颧骨颧弓" },
      { name: "瘦脸" },
      { name: "丰太阳穴" },
      { name: "丰额头" },
      { name: "丰苹果肌" },
      { name: "隆眉弓" },
      { name: "酒窝" },
      { name: "人中缩短" },
      { name: "上下颚整形" },
      { name: "去双下巴" },
      { name: "耳形矫正" },
      { name: "丰卧蚕" },
      { name: "丰下巴" }
    ]
  },
  { name: "玻尿酸", project: [{ name: "填充塑性" }, { name: "去静态皱纹" }, { name: "注射修复" }] },
  { name: "唇部", project: [{ name: "唇型美化" }, { name: "唇型矫正" }, { name: "唇部修复" }] },
  {
    name: "皮肤美容",
    project: [
      { name: "补水保湿" },
      { name: "美白嫩肤" },
      { name: "净肤祛痘" },
      { name: "祛斑" },
      { name: "去色素胎记" },
      { name: "去痣" },
      { name: "洗纹" },
      { name: "去妊娠纹" },
      { name: "抗过敏修复" }
    ]
  },
  {
    name: "牙齿美容",
    project: [{ name: "洗牙" }, { name: "牙齿美白" }, { name: "牙齿矫正" }, { name: "烤瓷牙" }, { name: "牙贴面" }, { name: "种植牙" }, { name: "牙齿治疗" }]
  },
  {
    name: "修复重建",
    project: [
      { name: "眼部修复" },
      { name: "鼻部修复" },
      { name: "唇部修复" },
      { name: "女性隐私修复" },
      { name: "胸部修复" },
      { name: "脂肪修复" },
      { name: "注射修复" }
    ]
  },
  { name: "抗衰老", project: [{ name: "紧致抗衰" }, { name: "注射除皱" }, { name: "紧致提升" }, { name: "去妊娠纹" }] },
  { name: "私密", project: [{ name: "女性私密" }, { name: "男性私密" }] },
  { name: "脱毛", project: [{ name: "面部脱毛" }, { name: "脱体毛" }] },
  { name: "其他", project: [{ name: "半永久化妆" }] }
]

export default { goodClassification, classificationAll }
