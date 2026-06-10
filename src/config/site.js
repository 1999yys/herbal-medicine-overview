/**
 * 网站内容配置 — 后续只需修改此文件即可更新页面文字、图片与视频
 * 图片/视频请放入 public/media/ 对应目录
 */
export const siteConfig = {
  brand: {
    name: '道地药材',
    tagline: '传承千年智慧 · 甄选品质之选',
    logo: '/favicon.svg',
  },

  hero: {
    title: '道地药材，品质之选',
    subtitle: '源自天然 · 匠心甄选 · 品质保障',
    description:
      '我们专注于优质中医药材的甄选与展示，每一味药材均经过严格筛选，力求呈现最纯正、最道地的中医药文化精髓。',
    // backgroundImage: '/media/images/hero-bg.svg',
    backgroundImage: '/media-new/imgs/bg.png',
  },

  about: {
    title: '关于我们',
    paragraphs: [
      '我们深耕中医药材领域多年，秉承"选材有道、品质为先"的理念，从源头把控药材质量，确保每一批次药材均可追溯、可信赖。',
      '我们与多个道地产区建立长期合作关系，涵盖人参、枸杞、黄芪、当归等数十种常用及珍稀药材，满足不同客户的需求。',
      '本网站旨在展示我们的核心产品与品牌理念，欢迎有意向的客户通过下方联系方式与我们取得联系，我们将竭诚为您服务。',
    ],
    highlights: [
      { icon: '🌿', label: '道地甄选', desc: '源自核心产区' },
      { icon: '🔍', label: '严格质检', desc: '全程品质把控' },
      { icon: '📦', label: '规范仓储', desc: '科学储存保鲜' },
      { icon: '🤝', label: '诚信服务', desc: '透明可追溯' },
    ],
  },

  products: {
    title: '产品展示',
    subtitle: '请先选择药材阶段，查看对应的实拍图片与视频介绍',
    stages: [
      {
        id: 'seedlings',
        label: '种苗 / 种子',
        summary: '源头培育 · 品种纯正',
        icon: '🌱',
        description:
          '展示各品种优质种苗与种子，来源可追溯，适合有种植需求的客户选购与考察。',
        images: [
          {
            id: 1,
            name: '人参种苗',
            origin: '吉林长白山',
            description: '优选五年参苗，根系发达，成活率高，适合基地扩种。',
            image: '/media/images/product-1.svg',
          },
          {
            id: 2,
            name: '枸杞育苗',
            origin: '宁夏中宁',
            description: '中宁优良品种扦插苗，株型整齐，便于规模化种植。',
            image: '/media/images/product-2.svg',
          },
          {
            id: 3,
            name: '黄芪种子',
            origin: '内蒙古恒山',
            description: '颗粒饱满、发芽率稳定，附带种植技术指导说明。',
            image: '/media/images/product-3.svg',
          },
        ],
        videos: [
          {
            id: 1,
            title: '种苗基地实拍',
            description: '走进育苗基地，了解种苗培育与日常管理流程。',
            poster: '/media/images/video-poster-1.svg',
            src: '/media/videos/seedlings-1.mp4',
          },
        ],
      },
      {
        id: 'fresh',
        label: '新鲜药材',
        summary: '刚采挖 · 保持鲜活',
        icon: '🌿',
        description:
          '采挖后及时分拣、保鲜处理，呈现药材最自然的状态，适合对鲜品有需求的客户。',
        images: [
          {
            id: 4,
            name: '鲜人参',
            origin: '吉林长白山',
            description: '采挖当日分拣，参体完整，泥少质净，冷链保鲜发出。',
            image: '/media/images/product-4.svg',
          },
          {
            id: 5,
            name: '鲜枸杞',
            origin: '宁夏中宁',
            description: '当季鲜果，色泽红润，颗粒饱满，适合加工或直销。',
            image: '/media/images/product-5.svg',
          },
          {
            id: 6,
            name: '鲜黄芪',
            origin: '内蒙古恒山',
            description: '条直质柔，断面菊花心明显，保留药材原有香气。',
            image: '/media/images/product-6.svg',
          },
        ],
        videos: [
          {
            id: 2,
            title: '鲜药材采挖现场',
            description: '记录采挖、分拣、装筐全过程，品质一目了然。',
            poster: '/media/images/video-poster-2.svg',
            src: '/media/videos/fresh-1.mp4',
          },
        ],
      },
      {
        id: 'processed',
        label: '初加工药材',
        summary: '规范加工 · 便于储运',
        icon: '📦',
        description:
          '经过清洗、切片、干燥等初加工工序，规格统一，便于储存、运输与后续使用。',
        images: [
          {
            id: 7,
            name: '生晒参片',
            origin: '吉林长白山',
            description: '人工挑选后切片，厚度均匀，干燥充分，易于保存。',
            image: '/media/images/product-1.svg',
          },
          {
            id: 8,
            name: '枸杞干',
            origin: '宁夏中宁',
            description: '自然晾晒，无硫熏，色泽正，干货储存期长。',
            image: '/media/images/product-2.svg',
          },
          {
            id: 9,
            name: '黄芪饮片',
            origin: '内蒙古恒山',
            description: '规范切制，断面平整，符合初加工质量标准。',
            image: '/media/images/product-3.svg',
          },
        ],
        videos: [
          {
            id: 3,
            title: '初加工车间实拍',
            description: '展示清洗、切制、干燥等工序，流程规范透明。',
            poster: '/media/images/video-poster-1.svg',
            src: '/media/videos/processed-1.mp4',
          },
        ],
      },
    ],
  },

  contact: {
    title: '联系我们',
    subtitle: '欢迎咨询合作，我们将尽快回复您',
    phone: '138-0000-0000',
    wechat: 'herbal_medicine_2024',
    email: 'contact@example.com',
    address: '中国 · 您的详细地址',
    workTime: '周一至周六  9:00 — 18:00',
    note: '如需了解具体产品价格、规格及合作方式，请通过以上方式与我们联系。',
  },

  footer: {
    copyright: '© 2024 道地药材 版权所有',
    icp: '',
  },

  nav: [
    { id: 'hero', label: '首页' },
    { id: 'about', label: '关于' },
    { id: 'products', label: '产品' },
    { id: 'contact', label: '联系' },
  ],
}
