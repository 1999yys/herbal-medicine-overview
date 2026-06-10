/**
 * 网站内容配置 — 后续只需修改此文件即可更新页面文字、图片与视频
 * 图片/视频请放入 public/media/ 对应目录
 *
 * 产品展示结构说明：
 * - stages：三阶段（种苗/新鲜/初加工），切换阶段查看对应内容
 * - imageCategories：每个阶段下的「图片类」，如枸杞类、人参类
 *   - 每类含多张图片，点击后在预览中左右切换
 *   - 页面每页展示 categoriesPerPage 个类，超出自动分页
 * - videos：每个阶段下的视频列表，每页展示 videosPerPage 条
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
    categoriesPerPage: 3,
    videosPerPage: 3,
    stages: [
      {
        id: 'seedlings',
        label: '种苗 / 种子',
        summary: '源头培育 · 品种纯正',
        icon: '🌱',
        description:
          '展示各品种优质种苗与种子，来源可追溯，适合有种植需求的客户选购与考察。',
        imageCategories: [
          {
            id: 'goji-seedlings',
            name: '枸杞类',
            summary: '中宁优良品种扦插苗，涵盖育苗大棚与田间管理实拍。',
            origin: '宁夏中宁',
            images: [
              {
                id: 'goji-s1',
                name: '枸杞育苗大棚',
                description: '恒温大棚内整齐排列的枸杞扦插苗，株型匀称。',
                image: '/media/images/product-2.svg',
              },
              {
                id: 'goji-s2',
                name: '枸杞成苗近景',
                description: '生长90天的成苗，根系发达，叶片浓绿。',
                image: '/media/images/product-5.svg',
              },
              {
                id: 'goji-s3',
                name: '枸杞苗装箱待发',
                description: '出圃前分拣包装，根部保湿处理，便于运输。',
                image: '/media/images/product-2.svg',
              },
              {
                id: 'goji-s4',
                name: '基地全景',
                description: '规模化育苗基地外景，便于客户实地考察。',
                image: '/media/images/product-5.svg',
              },
            ],
          },
          {
            id: 'ginseng-seedlings',
            name: '人参类',
            summary: '长白山优选参苗，五年参苗与种子均有供应。',
            origin: '吉林长白山',
            images: [
              {
                id: 'ginseng-s1',
                name: '五年参苗',
                description: '优选五年参苗，根系发达，成活率高。',
                image: '/media/images/product-1.svg',
              },
              {
                id: 'ginseng-s2',
                name: '参苗根系特写',
                description: '须根完整，无损伤，适合基地扩种。',
                image: '/media/images/product-4.svg',
              },
              {
                id: 'ginseng-s3',
                name: '参种子筛选',
                description: '颗粒饱满、发芽率稳定，附带种植指导。',
                image: '/media/images/product-1.svg',
              },
            ],
          },
          {
            id: 'astragalus-seedlings',
            name: '黄芪类',
            summary: '恒山道地黄芪种子与育苗记录。',
            origin: '内蒙古恒山',
            images: [
              {
                id: 'astragalus-s1',
                name: '黄芪种子',
                description: '颗粒饱满，发芽率稳定，附带种植技术指导说明。',
                image: '/media/images/product-3.svg',
              },
              {
                id: 'astragalus-s2',
                name: '黄芪幼苗',
                description: '出苗整齐，生长健壮，适合订单种植。',
                image: '/media/images/product-6.svg',
              },
            ],
          },
          {
            id: 'angelica-seedlings',
            name: '当归类',
            summary: '甘肃岷县当归种苗，品种纯正。',
            origin: '甘肃岷县',
            images: [
              {
                id: 'angelica-s1',
                name: '当归育苗床',
                description: '规范育苗床管理，温湿度可控。',
                image: '/media/images/product-3.svg',
              },
              {
                id: 'angelica-s2',
                name: '当归成苗',
                description: '株高达标，可移栽大田。',
                image: '/media/images/product-6.svg',
              },
            ],
          },
        ],
        videos: [
          {
            id: 'seedlings-v1',
            title: '种苗基地实拍',
            description: '走进育苗基地，了解种苗培育与日常管理流程。',
            poster: '/media/images/video-poster-1.svg',
            src: '/media/videos/seedlings-1.mp4',
          },
          {
            id: 'seedlings-v2',
            title: '枸杞育苗过程',
            description: '记录扦插、覆膜、日常浇水等关键步骤。',
            poster: '/media/images/video-poster-2.svg',
            src: '/media/videos/seedlings-2.mp4',
          },
          {
            id: 'seedlings-v3',
            title: '人参参苗出圃',
            description: '出圃分拣、根部处理与装箱流程展示。',
            poster: '/media/images/video-poster-1.svg',
            src: '/media/videos/seedlings-3.mp4',
          },
          {
            id: 'seedlings-v4',
            title: '客户实地考察',
            description: '客户到访基地，实地查看种苗质量。',
            poster: '/media/images/video-poster-2.svg',
            src: '/media/videos/seedlings-4.mp4',
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
        imageCategories: [
          {
            id: 'goji-fresh',
            name: '枸杞类',
            summary: '当季鲜果与田间采挖实拍。',
            origin: '宁夏中宁',
            images: [
              {
                id: 'goji-f1',
                name: '鲜枸杞采摘',
                description: '当季鲜果，色泽红润，颗粒饱满。',
                image: '/media/images/product-5.svg',
              },
              {
                id: 'goji-f2',
                name: '枸杞鲜果近景',
                description: '果柄新鲜，无病虫害，适合加工或直销。',
                image: '/media/images/product-2.svg',
              },
              {
                id: 'goji-f3',
                name: '采后分拣',
                description: '按规格分级，剔除杂质，保证品质。',
                image: '/media/images/product-5.svg',
              },
            ],
          },
          {
            id: 'ginseng-fresh',
            name: '人参类',
            summary: '采挖当日分拣，参体完整，冷链保鲜发出。',
            origin: '吉林长白山',
            images: [
              {
                id: 'ginseng-f1',
                name: '鲜人参采挖',
                description: '采挖当日分拣，参体完整，泥少质净。',
                image: '/media/images/product-4.svg',
              },
              {
                id: 'ginseng-f2',
                name: '鲜参清洗',
                description: '轻柔清洗，保留表皮完整，避免损伤。',
                image: '/media/images/product-1.svg',
              },
            ],
          },
          {
            id: 'astragalus-fresh',
            name: '黄芪类',
            summary: '条直质柔，断面菊花心明显，保留原有香气。',
            origin: '内蒙古恒山',
            images: [
              {
                id: 'astragalus-f1',
                name: '鲜黄芪采挖',
                description: '条直质柔，断面菊花心明显。',
                image: '/media/images/product-6.svg',
              },
              {
                id: 'astragalus-f2',
                name: '黄芪捆扎',
                description: '采挖后及时捆扎，减少折损。',
                image: '/media/images/product-3.svg',
              },
            ],
          },
        ],
        videos: [
          {
            id: 'fresh-v1',
            title: '鲜药材采挖现场',
            description: '记录采挖、分拣、装筐全过程，品质一目了然。',
            poster: '/media/images/video-poster-2.svg',
            src: '/media/videos/fresh-1.mp4',
          },
          {
            id: 'fresh-v2',
            title: '枸杞鲜果采摘',
            description: '当季采摘现场，鲜果色泽与饱满度展示。',
            poster: '/media/images/video-poster-1.svg',
            src: '/media/videos/fresh-2.mp4',
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
        imageCategories: [
          {
            id: 'goji-processed',
            name: '枸杞类',
            summary: '自然晾晒，无硫熏，色泽正，干货储存期长。',
            origin: '宁夏中宁',
            images: [
              {
                id: 'goji-p1',
                name: '枸杞干燥场',
                description: '自然晾晒，无硫熏，色泽正。',
                image: '/media/images/product-2.svg',
              },
              {
                id: 'goji-p2',
                name: '枸杞干货近景',
                description: '颗粒均匀，杂质少，符合初加工标准。',
                image: '/media/images/product-5.svg',
              },
            ],
          },
          {
            id: 'ginseng-processed',
            name: '人参类',
            summary: '人工挑选后切片，厚度均匀，干燥充分。',
            origin: '吉林长白山',
            images: [
              {
                id: 'ginseng-p1',
                name: '生晒参片',
                description: '厚度均匀，干燥充分，易于保存。',
                image: '/media/images/product-1.svg',
              },
              {
                id: 'ginseng-p2',
                name: '参片包装',
                description: '真空包装，防潮防虫，便于储运。',
                image: '/media/images/product-4.svg',
              },
            ],
          },
          {
            id: 'astragalus-processed',
            name: '黄芪类',
            summary: '规范切制，断面平整，符合质量标准。',
            origin: '内蒙古恒山',
            images: [
              {
                id: 'astragalus-p1',
                name: '黄芪饮片',
                description: '规范切制，断面平整，符合初加工质量标准。',
                image: '/media/images/product-3.svg',
              },
              {
                id: 'astragalus-p2',
                name: '黄芪条货',
                description: '整条分级，长度规格统一。',
                image: '/media/images/product-6.svg',
              },
            ],
          },
          {
            id: 'angelica-processed',
            name: '当归类',
            summary: '岷县当归，切片规范，香气浓郁。',
            origin: '甘肃岷县',
            images: [
              {
                id: 'angelica-p1',
                name: '当归片',
                description: '切片厚薄均匀，断面油润。',
                image: '/media/images/product-3.svg',
              },
            ],
          },
        ],
        videos: [
          {
            id: 'processed-v1',
            title: '初加工车间实拍',
            description: '展示清洗、切制、干燥等工序，流程规范透明。',
            poster: '/media/images/video-poster-1.svg',
            src: '/media/videos/processed-1.mp4',
          },
          {
            id: 'processed-v2',
            title: '枸杞干燥工艺',
            description: '自然晾晒与翻晒过程记录。',
            poster: '/media/images/video-poster-2.svg',
            src: '/media/videos/processed-2.mp4',
          },
          {
            id: 'processed-v3',
            title: '饮片包装流程',
            description: '称重、装袋、贴标、装箱全流程展示。',
            poster: '/media/images/video-poster-1.svg',
            src: '/media/videos/processed-3.mp4',
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
