const root = 'https://www.macaotourism.gov.mo/';
const sources = {
  heritage: root + 'zh-hans/sightseeing/macao-world-heritage',
  museum: root + 'zh-hans/sightseeing/museums-and-galleries',
  other: root + 'zh-hans/sightseeing/other-attractions',
  family: root + 'zh-hans/shows-and-entertainment/family-fun',
  shows: root + 'zh-hans/shows-and-entertainment/shows',
  eight: root + 'zh-hans/events/whatson/8911',
  coloane: root + 'zh-hans/macao-full-of-fun/tranquility-tour-in-coloane-village',
  beach: root + 'en/shows-and-entertainment/sports-and-recreation/beaches-and-nautical-sports',
  venice: root + 'en/shopping/shopping-malls/shoppes-at-venetian',
  london: root + 'zh-hant/shopping/shopping-malls/shoppes-at-londoner',
  gardens: root + 'zh-hans/sightseeing/gardens',
  events: root + 'zh-hans/events/whatson',
  grandlisboa: root + 'zh-hans/accommodation/grand-lisboa-hotel/',
  hotels: root + 'zh-hans/accommodation/search/',
  temples: root + 'zh-hant/sightseeing/temples',
};
// Durations and planning allowances are editorial estimates, not operator quotes.
// id | area | zone | Chinese | English | Portuguese | minutes | theme | indoors | source | paid allowance
const rows = `
senado|1|old|议事亭前地|Senado Square|Largo do Senado|30|classic|0|heritage|0
civic|1|old|市政署大楼|Municipal Affairs Bureau Building|Edifício do IAM|25|heritage|1|heritage|0
mercy|1|old|仁慈堂大楼|Holy House of Mercy|Santa Casa da Misericórdia|20|heritage|0|heritage|0
samkai|1|old|三街会馆（关帝庙）|Sam Kai Vui Kun Temple|Templo Sam Kai Vui Kun|20|heritage|0|heritage|0
dominicsq|1|old|板樟堂前地|St Dominic's Square|Largo de São Domingos|15|heritage|0|heritage|0
dominic|1|old|玫瑰圣母堂（外观）|St Dominic's Church exterior|Exterior da Igreja de São Domingos|20|heritage|0|heritage|0
loukau|1|old|卢家大屋|Lou Kau Mansion|Casa de Lou Kau|30|heritage|1|heritage|0
cathedral|1|old|主教座堂|Cathedral|Sé Catedral|20|heritage|0|heritage|0
cathedralsq|1|old|大堂前地|Cathedral Square|Largo da Sé|15|heritage|0|heritage|0
ruins|1|old|大三巴牌坊|Ruins of St Paul's|Ruínas de São Paulo|40|classic|0|heritage|0
jesuitsq|1|old|耶稣会纪念广场|Company of Jesus Square|Largo da Companhia de Jesus|15|heritage|0|heritage|0
natacha|1|old|哪吒庙（大三巴）|Na Tcha Temple|Templo de Na Tcha|20|heritage|0|heritage|0
walls|1|old|旧城墙遗迹|Old City Walls|Troço das Antigas Muralhas|15|heritage|0|heritage|0
fortress|1|old|大炮台|Mount Fortress|Fortaleza do Monte|40|classic|0|heritage|0
museum|1|old|澳门博物馆|Macao Museum|Museu de Macau|75|heritage|1|museum|50
lover|1|old|恋爱巷|Travessa da Paixão|Travessa da Paixão|20|classic|0|eight|0
fulong|1|old|福隆新街|Rua da Felicidade|Rua da Felicidade|30|classic|0|eight|0
anthony|1|northold|圣安多尼堂|St Anthony's Church|Igreja de Santo António|25|heritage|0|heritage|0
casagarden|1|northold|东方基金会会址（贾梅士花园房屋）|Casa Garden|Casa Garden|25|heritage|0|heritage|0
cemetery|1|northold|基督教坟场|Protestant Cemetery|Cemitério Protestante|20|heritage|0|heritage|0
camoessq|1|northold|白鸽巢前地|Camões Square|Praça de Camões|20|heritage|0|heritage|0
ama|1|south|妈阁庙|A-Ma Temple|Templo de A-Má|45|classic|0|heritage|0
barrasq|1|south|妈阁庙前地|Barra Square|Largo da Barra|20|heritage|0|heritage|0
moorish|1|south|港务局大楼（摩尔兵营旧址外观）|Moorish Barracks exterior|Exterior do Quartel dos Mouros|20|heritage|0|heritage|0
lilau|1|south|亚婆井前地|Lilau Square|Largo do Lilau|20|heritage|0|heritage|0
mandarin|1|south|郑家大屋|Mandarin's House|Casa do Mandarim|60|heritage|1|heritage|0
lawrence|1|south|圣老楞佐堂|St Lawrence's Church|Igreja de São Lourenço|25|heritage|0|heritage|0
joseph|1|south|圣若瑟修院及圣堂|St Joseph's Seminary and Church|Seminário e Igreja de São José|25|heritage|0|heritage|0
augustinesq|1|south|岗顶前地|St Augustine's Square|Largo de Santo Agostinho|20|heritage|0|heritage|0
pedro|1|south|岗顶剧院|Dom Pedro V Theatre|Teatro Dom Pedro V|30|heritage|0|heritage|0
hotung|1|south|何东图书馆|Sir Robert Ho Tung Library|Biblioteca Sir Robert Ho Tung|40|heritage|1|heritage|0
augustine|1|south|圣奥斯定堂|St Augustine's Church|Igreja de Santo Agostinho|25|heritage|0|heritage|0
maritime|1|south|海事博物馆|Maritime Museum|Museu Marítimo|60|family|1|museum|40
penha|1|south|西望洋山与主教山小堂|Penha Hill and Chapel|Colina e Capela da Penha|45|coast|0|eight|0
tower|1|waterfront|澳门旅游塔|Macao Tower|Torre de Macau|90|classic|1|other|250
science|1|harbour|澳门科学馆|Macao Science Center|Centro de Ciência de Macau|120|family|1|museum|100
wharf|1|harbour|澳门渔人码头|Macao Fisherman's Wharf|Doca dos Pescadores|60|classic|0|other|0
grandprix|1|harbour|澳门大赛车博物馆|Macao Grand Prix Museum|Museu do Grande Prémio|90|family|1|museum|100
art|1|harbour|澳门艺术博物馆|Macao Museum of Art|Museu de Arte de Macau|75|heritage|1|museum|0
gifts|1|harbour|澳门回归贺礼陈列馆|Handover Gifts Museum|Museu das Ofertas sobre a Transferência de Soberania|45|heritage|1|museum|0
lotus|1|harbour|金莲花广场|Lotus Square|Praça Flor de Lótus|25|classic|0|other|0
kuniam|1|harbour|观音莲花苑|Kun Iam Ecumenical Centre|Centro Ecuménico Kun Iam|35|coast|0|other|0
guia|1|guia|东望洋炮台、灯塔及圣母雪地殿|Guia Fortress, Chapel and Lighthouse|Fortaleza, Capela e Farol da Guia|60|classic|0|heritage|0
cableguia|1|guia|二龙喉公园缆车|Guia Cable Car|Teleférico da Guia|35|family|0|family|20
cunha|2|taipa|官也街|Rua do Cunha|Rua do Cunha|50|classic|0|other|0
taipahouses|2|taipa|龙环葡韵|Taipa Houses|Casas da Taipa|50|classic|0|museum|0
ieclong|2|taipa|益隆炮竹厂旧址|Former Iec Long Firecracker Factory|Antiga Fábrica de Panchões Iec Long|50|heritage|0|museum|0
taipamuseum|2|taipa|路氹历史馆|Museum of Taipa and Coloane History|Museu da História da Taipa e Coloane|45|heritage|1|museum|0
carmel|2|taipa|嘉模圣母堂周边|Our Lady of Carmel Church area|Zona da Igreja de Nossa Senhora do Carmo|25|heritage|0|museum|0
pakta i|2|taipa|氹仔北帝庙|Pak Tai Temple|Templo de Pak Tai|25|heritage|0|temples|0
venice|3|cotai|威尼斯人大运河购物中心|Shoppes at Venetian|Shoppes at Venetian|75|classic|1|venice|0
london|3|cotai|伦敦人购物中心与英伦街景|Shoppes at Londoner|Shoppes at Londoner|60|classic|1|london|0
paris|3|cotai|巴黎人铁塔|Parisian Eiffel Tower exterior|Exterior da Torre Eiffel do Parisian|40|classic|0|shows|0
wynn|3|cotai|永利皇宫观光缆车与表演湖|Wynn Palace SkyCab and lake|Teleférico e lago do Wynn Palace|60|classic|0|shows|60
galaxy|3|cotai|澳门银河运财银钻|Galaxy Fortune Diamond|Fortune Diamond do Galaxy|30|shopping|1|shows|0
mgmcotai|3|cotai|美狮美高梅视博广场|MGM Cotai Spectacle|Spectacle do MGM Cotai|40|shopping|1|family|0
golden|3|studio|新濠影汇影汇之星|Studio City Golden Reel|Golden Reel do Studio City|60|family|1|family|150
waterpark|3|studio|新濠影汇水上乐园|Studio City Water Park|Parque Aquático do Studio City|240|family|0|family|600
teamlab|3|cotai|澳门teamLab超自然空间|teamLab SuperNature Macao|teamLab SuperNature Macau|120|family|1|family|350
palaceart|3|cotai|上葡京艺术文化展馆|Grand Lisboa Palace Art Gallery|Galeria de Arte do Grand Lisboa Palace|75|heritage|1|museum|100
coloane|4|village|路环村|Coloane Village|Vila de Coloane|60|coast|0|coloane|0
pier|4|village|路环码头|Coloane Pier|Cais de Coloane|25|coast|0|coloane|0
francis|4|village|圣方济各圣堂及恩尼斯总统前地|St Francis Xavier Chapel and square|Capela de São Francisco Xavier e largo|30|heritage|0|coloane|0
library|4|village|路环图书馆|Coloane Library|Biblioteca de Coloane|30|heritage|1|coloane|0
tamkung|4|village|路环谭公庙|Tam Kung Temple|Templo de Tam Kung|25|heritage|0|temples|0
beach|4|coast|黑沙海滩|Hác-Sá Beach|Praia de Hác-Sá|60|coast|0|beach|0
cheocvan|4|coast|竹湾海滩|Cheoc Van Beach|Praia de Cheoc Van|60|coast|0|beach|0
longchao|4|coast|黑沙龙爪角海岸径|Long Chao Kok Coastal Trail|Trilho Costeiro de Long Chao Kok|90|coast|0|eight|0
panda|4|panda|澳门大熊猫馆和珍稀动物馆|Macao Giant Panda Pavilion|Pavilhão do Panda Gigante|90|family|0|family|40
grandlisboa|1|waterfront|新葡京建筑外观|Grand Lisboa exterior|Exterior do Grand Lisboa|25|classic|0|grandlisboa|0
lisboa|1|waterfront|葡京酒店建筑外观|Hotel Lisboa exterior|Exterior do Hotel Lisboa|20|classic|0|hotels|0
wynnmacau|1|waterfront|永利澳门表演湖|Wynn Macau Performance Lake|Lago do Wynn Macau|30|classic|0|shows|0
wynntree|1|waterfront|永利澳门吉祥树|Wynn Macau Tree of Prosperity|Árvore da Prosperidade do Wynn Macau|30|shopping|1|shows|0
loulim|1|guia|卢廉若公园|Lou Lim Ieoc Garden|Jardim Lou Lim Ieoc|45|coast|0|gardens|0
camoesgarden|1|northold|白鸽巢公园|Camões Garden|Jardim de Camões|45|coast|0|gardens|0
lazarus|1|guia|疯堂斜巷与望德堂街区|St Lazarus neighbourhood|Bairro de São Lázaro|45|heritage|0|events|0
dancingwater|3|cotai|新濠天地《水舞间》|The House of Dancing Water|The House of Dancing Water|120|family|1|events|800
macau2049|3|cotai|《澳门2049》演出|Macau 2049 show|Espetáculo Macau 2049|120|heritage|1|events|400
zipline|3|cotai|澳门葡京人飞索|ZIPCITY Macao|ZIPCITY Macau|90|family|0|family|500
namvan|1|waterfront|南湾湖与西湾湖景观|Nam Van and Sai Van lake views|Lagos Nam Van e Sai Van|45|coast|0|eight|0
`;
export const catalog = rows.trim().split('\n').map((row, index) => {
  const [id, area, zone, zh, en, pt, duration, theme, indoor, source, allowance] = row.split('|');
  return { id: id.replaceAll(' ', ''), area: Number(area), zone,
    names: [zh, en, pt], duration: Number(duration), theme,
    indoor: indoor === '1', source: sources[source], allowance: Number(allowance),
    rank: index, bookingOnly: ['dancingwater', 'macau2049'].includes(id), minTime: id === 'wynn' ? 960 : 600,
    note: id === 'dominic' ? 'exterior' : '' };
});
