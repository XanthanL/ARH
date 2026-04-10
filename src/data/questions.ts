export type Axis = 'economy' | 'power' | 'culture' | 'identity' | 'ecology' | 'tech';

export interface Question {
  id: number;
  text: string;
  axis: Axis;
  direction: 1 | -1;
}

export const QUESTIONS: Question[] = [
  // 第一部分：经济与阶级轴 (1-10)
  { id: 1, text: "医疗、教育、供水和交通是基本人权，应当由国家完全免费提供，禁止私人企业从中盈利。", axis: 'economy', direction: -1 },
  { id: 2, text: "只要员工和老板自愿签订合同，交易就是完全公平的。", axis: 'economy', direction: 1 },
  { id: 3, text: "亿万富翁的存在本身就是制度失败的象征，应当通过极高的财产税来消灭超级富豪。", axis: 'economy', direction: -1 },
  { id: 4, text: "哪怕是警察、法院和国防，未来也完全可以由私人安保公司通过市场竞争来提供服务。", axis: 'economy', direction: 1 },
  { id: 5, text: "商品的价值来自于工人付出的劳动，而不是市场的供需关系。", axis: 'economy', direction: -1 },
  { id: 6, text: "无论出于何种目的，“税收”在本质上就是政府对个人合法财产的合法抢劫。", axis: 'economy', direction: 1 },
  { id: 7, text: "大型企业不应只由股东说了算，工会代表必须在公司董事会中拥有决策权和一票否决权。", axis: 'economy', direction: -1 },
  { id: 8, text: "最低工资法和过于严格的劳动法实际上伤害了经济，导致了更多的失业，应当被废除。", axis: 'economy', direction: 1 },
  { id: 9, text: "面对经济危机，应当将银行、能源等核心骨干企业实行国有化，交由全民所有。", axis: 'economy', direction: -1 },
  { id: 10, text: "应该大幅削减穷人的社会福利，因为过高的福利会养懒汉，破坏人们努力工作的动力。", axis: 'economy', direction: 1 },

  // 第二部分：权力与国家轴 (11-20)
  { id: 11, text: "为了防范恐怖主义和犯罪，政府有权监控公民的网络聊天记录和行踪，哪怕这侵犯了隐私。", axis: 'power', direction: 1 },
  { id: 12, text: "国家和政府本质上都是用暴力维持的压迫机构，人类完全可以在没有政府的情况下自治。", axis: 'power', direction: -1 },
  { id: 13, text: "一个果断且强有力的领导人，比民主选举和天天吵架的议会更能有效地治理国家。", axis: 'power', direction: 1 },
  { id: 14, text: "只要不直接伤害他人，个人对自己身体有绝对支配权，吸毒、卖淫、安乐死都应完全合法化。", axis: 'power', direction: -1 },
  { id: 15, text: "散布谣言、破坏社会稳定的言论不属于言论自由的保护范围，必须被严厉惩罚。", axis: 'power', direction: 1 },
  { id: 16, text: "公民拥有持有武器（包括枪支）的绝对神圣权利，这是为了防止政府演变成暴政。", axis: 'power', direction: -1 },
  { id: 17, text: "即使是私人企业，在遇到紧急情况时，政府也有权以“国家利益”为由直接接管。", axis: 'power', direction: 1 },
  { id: 18, text: "任何形式的强制征兵都是奴隶制的一种表现，个人没有义务被迫为国家打仗。", axis: 'power', direction: -1 },
  { id: 19, text: "国家不仅要管理经济，还有责任引导国民的道德观念和精神面貌，封杀低俗文化。", axis: 'power', direction: 1 },
  { id: 20, text: "如果某项法律是不公正的，公民完全有权并且应该通过“公民抗命”来违抗它。", axis: 'power', direction: -1 },

  // 第三部分：文化与价值观轴 (21-30)
  { id: 21, text: "现代社会深深根植于系统性的父权制和种族歧视中，我们必须彻底解构这些传统的权力结构。", axis: 'culture', direction: 1 },
  { id: 22, text: "传统的家庭结构（一夫一妻、男女明确的角色分工）是人类文明的基石，不容破坏。", axis: 'culture', direction: -1 },
  { id: 23, text: "性别不仅限于生理上的男女，社会应当全面承认并保护跨性别者和非二元性别者的身份和权利。", axis: 'culture', direction: 1 },
  { id: 24, text: "无论在什么情况下，堕胎在本质上都是对未出生婴儿的谋杀，应当被法律严格禁止。", axis: 'culture', direction: -1 },
  { id: 25, text: "历史上的“伟人”如果参与过蓄奴或殖民，他们的雕像和纪念碑就应当被推翻和移除。", axis: 'culture', direction: 1 },
  { id: 26, text: "人类社会在上个世纪的道德状态，比现在堕落混乱的现代社会要美好得多。", axis: 'culture', direction: -1 },
  { id: 27, text: "监狱系统的目的不应该是惩罚和报复，而应该是教育和改造，甚至我们最终应该废除监狱。", axis: 'culture', direction: 1 },
  { id: 28, text: "婚前性行为、滥交和色情产业的泛滥，正在从内部摧毁我们社会的道德纤维。", axis: 'culture', direction: -1 },
  { id: 29, text: "为了弥补历史上对少数群体的压迫，在升学和就业中实行“配额制”是绝对必要的。", axis: 'culture', direction: 1 },
  { id: 30, text: "宗教信仰和传统习俗比那些虚无缥缈的“现代进步理念”更有助于一个人找到生命的意义。", axis: 'culture', direction: -1 },

  // 第四部分：认同与归属轴 (31-40)
  { id: 31, text: "国家的边界线是人为制造的隔阂，最终全人类应该建立一个统一的“全球政府”。", axis: 'identity', direction: 1 },
  { id: 32, text: "外来移民必须完全放弃他们原有的语言和习俗，彻底同化并服从于我们本国的主流文化。", axis: 'identity', direction: -1 },
  { id: 33, text: "多元文化是社会的巨大财富，我们应该鼓励不同民族保留自己的传统。", axis: 'identity', direction: 1 },
  { id: 34, text: "一个国家的根基在于主体民族的“血缘和基因”，非本族血统的人永远无法真正成为我们的一员。", axis: 'identity', direction: -1 },
  { id: 35, text: "发达国家有不可推卸的道德义务去接纳来自战乱或贫困地区的难民。", axis: 'identity', direction: 1 },
  { id: 36, text: "所谓的“全球化”实际上是一场骗局，它让跨国精英发了大财，却夺走了本国工人的饭碗。", axis: 'identity', direction: -1 },
  { id: 37, text: "联合国、世界卫生组织等国际机构的权威，应当高于单个主权国家的法律。", axis: 'identity', direction: 1 },
  { id: 38, text: "学校的教科书应当着重培养学生的爱国主义，而不是过分强调本国历史上的黑暗面。", axis: 'identity', direction: -1 },
  { id: 39, text: "我更倾向于认为自己是“地球公民”，而不是某个特定国家的国民。", axis: 'identity', direction: 1 },
  { id: 40, text: "在购买商品和分配工作时，“本国人优先”是一条天经地义的原则。", axis: 'identity', direction: -1 },

  // 第五部分：生态与环境轴 (41-50)
  { id: 41, text: "追求无止境的经济增长是地球的灾难，人类必须主动降低生活水平和消费欲望。", axis: 'ecology', direction: 1 },
  { id: 42, text: "大自然的存在主要是为了被人类开发和利用，人类的福祉永远高于环境保护。", axis: 'ecology', direction: -1 },
  { id: 43, text: "资本主义对利润的贪婪是气候危机的唯一根源。不消灭资本主义，就无法拯救地球。", axis: 'ecology', direction: 1 },
  { id: 44, text: "我们完全可以依靠市场机制和科技突破来解决环境危机，不需要改变现有的生活方式。", axis: 'ecology', direction: -1 },
  { id: 45, text: "为了保护地球，必须采取强硬的手段来大幅减少人类总人口。", axis: 'ecology', direction: 1 },
  { id: 46, text: "相比于把巨额资金投入到环保减排，不如把钱花在太空探索上，寻找下一个家园。", axis: 'ecology', direction: -1 },
  { id: 47, text: "动物应当拥有与人类相似的基本法律权利，工厂化的养殖业是现代社会的纳粹集中营。", axis: 'ecology', direction: 1 },
  { id: 48, text: "如果开采化石能源能让老百姓用上便宜的能源，那么一点点环境污染是可以接受的代价。", axis: 'ecology', direction: -1 },
  { id: 49, text: "为了阻止企业对生态的破坏，采取激进的行动（如破坏工厂设备）在道德上是正当的。", axis: 'ecology', direction: 1 },
  { id: 50, text: "很多关于“气候变化带来世界末日”的言论是被夸大的恐慌营销。", axis: 'ecology', direction: -1 },

  // 第六部分：科技与未来轴 (51-60)
  { id: 51, text: "我们应该大力发展基因编辑和脑机接口技术，让人类彻底摆脱生老病死的肉体限制。", axis: 'tech', direction: 1 },
  { id: 52, text: "工业革命及其带来的后果对人类社会来说是一场彻底的灾难。", axis: 'tech', direction: -1 },
  { id: 53, text: "未来的社会应当交给极其聪明的人工智能系统和顶尖科学家（技术官僚）来管理。", axis: 'tech', direction: 1 },
  { id: 54, text: "人工智能最终会摧毁人类的灵魂，政府必须颁布严厉的禁令来阻止其研发。", axis: 'tech', direction: -1 },
  { id: 55, text: "互联网应当是一个不受任何国家法律管辖的绝对自由空间，代码就是我们的法律。", axis: 'tech', direction: 1 },
  { id: 56, text: "如果人类能回归到农业社会甚至狩猎采集时代，我们会活得更快乐、更真实。", axis: 'tech', direction: -1 },
  { id: 57, text: "用最理性、最看重数据回报率的科学方法来决定如何做慈善，比靠同情心更伟大。", axis: 'tech', direction: 1 },
  { id: 58, text: "智能手机和社交媒体正在摧毁人类的情感共鸣，让年轻人变得抑郁和孤独。", axis: 'tech', direction: -1 },
  { id: 59, text: "知识产权、专利和版权阻碍了人类科技的加速，所有的设计图纸都应当完全开源。", axis: 'tech', direction: 1 },
  { id: 60, text: "传统的自然疗法往往比冷冰冰的现代西医机器和化学药物更有效且更人道。", axis: 'tech', direction: -1 },
];
