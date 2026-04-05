// lib/stations.ts
// ============================================================
// Taipei MRT stations — 100% Official Routes & Coordinates
// ============================================================

import type { MrtStation } from './types';

export const MRT_STATIONS: MrtStation[] = [
  // 🔵 藍線 - 板南線 (BL)
  { id: 'BL01', name: '頂埔', nameEn: 'Dingpu', line: 'BL', location: { lat: 24.9593, lng: 121.4198 } },
  { id: 'BL02', name: '永寧', nameEn: 'Yongning', line: 'BL', location: { lat: 24.9667, lng: 121.4361 } },
  { id: 'BL03', name: '土城', nameEn: 'Tucheng', line: 'BL', location: { lat: 24.9732, lng: 121.4443 } },
  { id: 'BL04', name: '海山', nameEn: 'Haishan', line: 'BL', location: { lat: 24.9834, lng: 121.4487 } },
  { id: 'BL05', name: '亞東醫院', nameEn: 'Far Eastern Hospital', line: 'BL', location: { lat: 24.9983, lng: 121.4524 } },
  { id: 'BL06', name: '府中', nameEn: 'Fuzhong', line: 'BL', location: { lat: 25.0085, lng: 121.4593 } },
  { id: 'BL07', name: '板橋', nameEn: 'Banqiao', line: 'BL', location: { lat: 25.0143, lng: 121.4622 } },
  { id: 'BL08', name: '新埔', nameEn: 'Xinpu', line: 'BL', location: { lat: 25.0227, lng: 121.4666 } },
  { id: 'BL09', name: '江子翠', nameEn: 'Jiangzicui', line: 'BL', location: { lat: 25.0301, lng: 121.4724 } },
  { id: 'BL10', name: '龍山寺', nameEn: 'Longshan Temple', line: 'BL', location: { lat: 25.0353, lng: 121.4994 } },
  { id: 'BL11', name: '西門', nameEn: 'Ximen', line: 'BL', location: { lat: 25.0421, lng: 121.5083 } },
  { id: 'BL12', name: '台北車站', nameEn: 'Taipei Main Station', line: 'BL', location: { lat: 25.0463, lng: 121.5174 } },
  { id: 'BL13', name: '善導寺', nameEn: 'Shandao Temple', line: 'BL', location: { lat: 25.0447, lng: 121.5230 } },
  { id: 'BL14', name: '忠孝新生', nameEn: 'Zhongxiao Xinsheng', line: 'BL', location: { lat: 25.0418, lng: 121.5328 } },
  { id: 'BL15', name: '忠孝復興', nameEn: 'Zhongxiao Fuxing', line: 'BL', location: { lat: 25.0416, lng: 121.5436 } },
  { id: 'BL16', name: '忠孝敦化', nameEn: 'Zhongxiao Dunhua', line: 'BL', location: { lat: 25.0415, lng: 121.5516 } },
  { id: 'BL17', name: '國父紀念館', nameEn: 'Sun Yat-Sen Memorial Hall', line: 'BL', location: { lat: 25.0413, lng: 121.5576 } },
  { id: 'BL18', name: '市政府', nameEn: 'Taipei City Hall', line: 'BL', location: { lat: 25.0411, lng: 121.5651 } },
  { id: 'BL19', name: '永春', nameEn: 'Yongchun', line: 'BL', location: { lat: 25.0407, lng: 121.5768 } },
  { id: 'BL20', name: '後山埤', nameEn: 'Houshanpi', line: 'BL', location: { lat: 25.0448, lng: 121.5828 } },
  { id: 'BL21', name: '昆陽', nameEn: 'Kunyang', line: 'BL', location: { lat: 25.0505, lng: 121.5927 } },
  { id: 'BL22', name: '南港', nameEn: 'Nangang', line: 'BL', location: { lat: 25.0531, lng: 121.6069 } },
  { id: 'BL23', name: '南港展覽館', nameEn: 'Nangang Exhib. Center', line: 'BL', location: { lat: 25.0549, lng: 121.6166 } },

  // 🟠 橘線 - 中和新蘆線 (O)
  { id: 'O01', name: '南勢角', nameEn: 'Nanshijiao', line: 'O', location: { lat: 24.9898, lng: 121.5097 } },
  { id: 'O02', name: '景安', nameEn: 'Jingan', line: 'O', location: { lat: 24.9935, lng: 121.5069 } },
  { id: 'O03', name: '永安市場', nameEn: 'Yongan Market', line: 'O', location: { lat: 25.0023, lng: 121.5113 } },
  { id: 'O04', name: '頂溪', nameEn: 'Dingxi', line: 'O', location: { lat: 25.0125, lng: 121.5154 } },
  { id: 'O05', name: '古亭', nameEn: 'Guting', line: 'O', location: { lat: 25.0264, lng: 121.5229 } },
  { id: 'O06', name: '東門', nameEn: 'Dongmen', line: 'O', location: { lat: 25.0339, lng: 121.5283 } },
  { id: 'O07', name: '忠孝新生', nameEn: 'Zhongxiao Xinsheng', line: 'O', location: { lat: 25.0418, lng: 121.5328 } },
  { id: 'O08', name: '松江南京', nameEn: 'Songjiang Nanjing', line: 'O', location: { lat: 25.0519, lng: 121.5326 } },
  { id: 'O09', name: '行天宮', nameEn: 'Xingtian Temple', line: 'O', location: { lat: 25.0593, lng: 121.5332 } },
  { id: 'O10', name: '中山國小', nameEn: 'Zhongshan Elementary School', line: 'O', location: { lat: 25.0628, lng: 121.5262 } },
  { id: 'O11', name: '民權西路', nameEn: 'Minquan W. Rd.', line: 'O', location: { lat: 25.0629, lng: 121.5193 } },
  { id: 'O12', name: '大橋頭', nameEn: 'Daqiaotou', line: 'O', location: { lat: 25.0634, lng: 121.5133 } },
  // 新莊迴龍段
  { id: 'O13', name: '台北橋', nameEn: 'Taipei Bridge', line: 'O', location: { lat: 25.0633, lng: 121.5008 } },
  { id: 'O14', name: '菜寮', nameEn: 'Cailiao', line: 'O', location: { lat: 25.0607, lng: 121.4925 } },
  { id: 'O15', name: '三重', nameEn: 'Sanchong', line: 'O', location: { lat: 25.0559, lng: 121.4819 } },
  { id: 'O16', name: '先嗇宮', nameEn: 'Xianse Temple', line: 'O', location: { lat: 25.0463, lng: 121.4722 } },
  { id: 'O17', name: '頭前庄', nameEn: 'Touqianzhuang', line: 'O', location: { lat: 25.0398, lng: 121.4601 } },
  { id: 'O18', name: '新莊', nameEn: 'Xinzhuang', line: 'O', location: { lat: 25.0361, lng: 121.4526 } },
  { id: 'O19', name: '輔大', nameEn: 'Fu Jen University', line: 'O', location: { lat: 25.0327, lng: 121.4354 } },
  { id: 'O20', name: '丹鳳', nameEn: 'Danfeng', line: 'O', location: { lat: 25.0285, lng: 121.4230 } },
  { id: 'O21', name: '迴龍', nameEn: 'Huilong', line: 'O', location: { lat: 25.0220, lng: 121.4116 } },
  // 蘆洲段
  { id: 'O50', name: '三重國小', nameEn: 'Sanchong Elementary School', line: 'O', location: { lat: 25.0699, lng: 121.4965 } },
  { id: 'O51', name: '三和國中', nameEn: 'Sanhe Junior High School', line: 'O', location: { lat: 25.0763, lng: 121.4877 } },
  { id: 'O52', name: '徐匯中學', nameEn: 'St. Ignatius High School', line: 'O', location: { lat: 25.0805, lng: 121.4800 } },
  { id: 'O53', name: '三民高中', nameEn: 'Sanmin Senior High School', line: 'O', location: { lat: 25.0858, lng: 121.4735 } },
  { id: 'O54', name: '蘆洲', nameEn: 'Luzhou', line: 'O', location: { lat: 25.0921, lng: 121.4646 } },

  // 🔴 紅線 - 淡水信義線 (R)
  { id: 'R02', name: '象山', nameEn: 'Xiangshan', line: 'R', location: { lat: 25.0327, lng: 121.5694 } },
  { id: 'R03', name: '台北101/世貿', nameEn: 'Taipei 101/World Trade Center', line: 'R', location: { lat: 25.0330, lng: 121.5638 } },
  { id: 'R04', name: '信義安和', nameEn: 'Xinyi Anhe', line: 'R', location: { lat: 25.0329, lng: 121.5526 } },
  { id: 'R05', name: '大安', nameEn: 'Daan', line: 'R', location: { lat: 25.0330, lng: 121.5434 } },
  { id: 'R06', name: '大安森林公園', nameEn: 'Daan Park', line: 'R', location: { lat: 25.0331, lng: 121.5358 } },
  { id: 'R07', name: '東門', nameEn: 'Dongmen', line: 'R', location: { lat: 25.0339, lng: 121.5283 } },
  { id: 'R08', name: '中正紀念堂', nameEn: 'Chiang Kai-Shek Memorial Hall', line: 'R', location: { lat: 25.0341, lng: 121.5186 } },
  { id: 'R09', name: '台大醫院', nameEn: 'NTU Hospital', line: 'R', location: { lat: 25.0416, lng: 121.5165 } },
  { id: 'R10', name: '台北車站', nameEn: 'Taipei Main Station', line: 'R', location: { lat: 25.0463, lng: 121.5174 } },
  { id: 'R11', name: '中山', nameEn: 'Zhongshan', line: 'R', location: { lat: 25.0526, lng: 121.5202 } },
  { id: 'R12', name: '雙連', nameEn: 'Shuanglian', line: 'R', location: { lat: 25.0577, lng: 121.5204 } },
  { id: 'R13', name: '民權西路', nameEn: 'Minquan W. Rd.', line: 'R', location: { lat: 25.0629, lng: 121.5193 } },
  { id: 'R14', name: '圓山', nameEn: 'Yuanshan', line: 'R', location: { lat: 25.0712, lng: 121.5205 } },
  { id: 'R15', name: '劍潭', nameEn: 'Jiantan', line: 'R', location: { lat: 25.0844, lng: 121.5253 } },
  { id: 'R16', name: '士林', nameEn: 'Shilin', line: 'R', location: { lat: 25.0935, lng: 121.5262 } },
  { id: 'R17', name: '芝山', nameEn: 'Zhishan', line: 'R', location: { lat: 25.1026, lng: 121.5226 } },
  { id: 'R18', name: '明德', nameEn: 'Mingde', line: 'R', location: { lat: 25.1096, lng: 121.5186 } },
  { id: 'R19', name: '石牌', nameEn: 'Shipai', line: 'R', location: { lat: 25.1154, lng: 121.5152 } },
  { id: 'R20', name: '唭哩岸', nameEn: 'Qilian', line: 'R', location: { lat: 25.1207, lng: 121.5061 } },
  { id: 'R21', name: '奇岩', nameEn: 'Qiyan', line: 'R', location: { lat: 25.1255, lng: 121.5015 } },
  { id: 'R22', name: '北投', nameEn: 'Beitou', line: 'R', location: { lat: 25.1320, lng: 121.4984 } },
  { id: 'R22A', name: '新北投', nameEn: 'Xinbeitou', line: 'R', location: { lat: 25.1369, lng: 121.5031 } },
  { id: 'R23', name: '復興崗', nameEn: 'Fuxinggang', line: 'R', location: { lat: 25.1378, lng: 121.4851 } },
  { id: 'R24', name: '忠義', nameEn: 'Zhongyi', line: 'R', location: { lat: 25.1309, lng: 121.4735 } },
  { id: 'R25', name: '關渡', nameEn: 'Guandu', line: 'R', location: { lat: 25.1256, lng: 121.4667 } },
  { id: 'R26', name: '竹圍', nameEn: 'Zhuwei', line: 'R', location: { lat: 25.1368, lng: 121.4593 } },
  { id: 'R27', name: '紅樹林', nameEn: 'Hongshulin', line: 'R', location: { lat: 25.1542, lng: 121.4589 } },
  { id: 'R28', name: '淡水', nameEn: 'Tamsui', line: 'R', location: { lat: 25.1678, lng: 121.4456 } },

  // 🟢 綠線 - 松山新店線 (G)
  { id: 'G01', name: '新店', nameEn: 'Xindian', line: 'G', location: { lat: 24.9580, lng: 121.5376 } },
  { id: 'G02', name: '新店區公所', nameEn: 'Xindian City Hall', line: 'G', location: { lat: 24.9678, lng: 121.5414 } },
  { id: 'G03', name: '七張', nameEn: 'Qizhang', line: 'G', location: { lat: 24.9754, lng: 121.5428 } },
  { id: 'G04', name: '大坪林', nameEn: 'Dapinglin', line: 'G', location: { lat: 24.9830, lng: 121.5407 } },
  { id: 'G05', name: '景美', nameEn: 'Jingmei', line: 'G', location: { lat: 24.9930, lng: 121.5403 } },
  { id: 'G06', name: '萬隆', nameEn: 'Wanlong', line: 'G', location: { lat: 25.0022, lng: 121.5393 } },
  { id: 'G07', name: '公館', nameEn: 'Gongguan', line: 'G', location: { lat: 25.0146, lng: 121.5345 } },
  { id: 'G08', name: '台電大樓', nameEn: 'Taipower Building', line: 'G', location: { lat: 25.0205, lng: 121.5283 } },
  { id: 'G09', name: '古亭', nameEn: 'Guting', line: 'G', location: { lat: 25.0264, lng: 121.5229 } },
  { id: 'G10', name: '中正紀念堂', nameEn: 'Chiang Kai-Shek Memorial Hall', line: 'G', location: { lat: 25.0341, lng: 121.5186 } },
  { id: 'G11', name: '小南門', nameEn: 'Xiaonanmen', line: 'G', location: { lat: 25.0360, lng: 121.5076 } },
  { id: 'G12', name: '西門', nameEn: 'Ximen', line: 'G', location: { lat: 25.0421, lng: 121.5083 } },
  { id: 'G13', name: '北門', nameEn: 'Beimen', line: 'G', location: { lat: 25.0494, lng: 121.5098 } },
  { id: 'G14', name: '中山', nameEn: 'Zhongshan', line: 'G', location: { lat: 25.0526, lng: 121.5202 } },
  { id: 'G15', name: '松江南京', nameEn: 'Songjiang Nanjing', line: 'G', location: { lat: 25.0519, lng: 121.5326 } },
  { id: 'G16', name: '南京復興', nameEn: 'Nanjing Fuxing', line: 'G', location: { lat: 25.0522, lng: 121.5441 } },
  { id: 'G17', name: '台北小巨蛋', nameEn: 'Taipei Arena', line: 'G', location: { lat: 25.0517, lng: 121.5517 } },
  { id: 'G18', name: '南京三民', nameEn: 'Nanjing Sanmin', line: 'G', location: { lat: 25.0514, lng: 121.5647 } },
  { id: 'G19', name: '松山', nameEn: 'Songshan', line: 'G', location: { lat: 25.0504, lng: 121.5779 } },

  // 🟤 棕線 - 文湖線 (BR)
  { id: 'BR01', name: '動物園', nameEn: 'Taipei Zoo', line: 'BR', location: { lat: 24.9982, lng: 121.5793 } },
  { id: 'BR02', name: '木柵', nameEn: 'Muzha', line: 'BR', location: { lat: 24.9983, lng: 121.5731 } },
  { id: 'BR03', name: '萬芳社區', nameEn: 'Wanfang Community', line: 'BR', location: { lat: 24.9983, lng: 121.5662 } },
  { id: 'BR04', name: '萬芳醫院', nameEn: 'Wanfang Hospital', line: 'BR', location: { lat: 24.9992, lng: 121.5577 } },
  { id: 'BR05', name: '辛亥', nameEn: 'Xinhai', line: 'BR', location: { lat: 25.0054, lng: 121.5568 } },
  { id: 'BR06', name: '麟光', nameEn: 'Linguang', line: 'BR', location: { lat: 25.0185, lng: 121.5587 } },
  { id: 'BR07', name: '六張犁', nameEn: 'Liuzhangli', line: 'BR', location: { lat: 25.0238, lng: 121.5532 } },
  { id: 'BR08', name: '科技大樓', nameEn: 'Technology Building', line: 'BR', location: { lat: 25.0261, lng: 121.5435 } },
  { id: 'BR09', name: '大安', nameEn: 'Daan', line: 'BR', location: { lat: 25.0330, lng: 121.5434 } },
  { id: 'BR10', name: '忠孝復興', nameEn: 'Zhongxiao Fuxing', line: 'BR', location: { lat: 25.0416, lng: 121.5436 } },
  { id: 'BR11', name: '南京復興', nameEn: 'Nanjing Fuxing', line: 'BR', location: { lat: 25.0522, lng: 121.5441 } },
  { id: 'BR12', name: '中山國中', nameEn: 'Zhongshan Junior High School', line: 'BR', location: { lat: 25.0608, lng: 121.5442 } },
  { id: 'BR13', name: '松山機場', nameEn: 'Songshan Airport', line: 'BR', location: { lat: 25.0631, lng: 121.5518 } },
  { id: 'BR14', name: '大直', nameEn: 'Dazhi', line: 'BR', location: { lat: 25.0795, lng: 121.5469 } },
  { id: 'BR15', name: '劍南路', nameEn: 'Jiannan Rd.', line: 'BR', location: { lat: 25.0847, lng: 121.5555 } },
  { id: 'BR16', name: '西湖', nameEn: 'Xihu', line: 'BR', location: { lat: 25.0822, lng: 121.5673 } },
  { id: 'BR17', name: '港墘', nameEn: 'Gangqian', line: 'BR', location: { lat: 25.0800, lng: 121.5752 } },
  { id: 'BR18', name: '文德', nameEn: 'Wende', line: 'BR', location: { lat: 25.0786, lng: 121.5849 } },
  { id: 'BR19', name: '內湖', nameEn: 'Neihu', line: 'BR', location: { lat: 25.0837, lng: 121.5932 } },
  { id: 'BR20', name: '大湖公園', nameEn: 'Dahu Park', line: 'BR', location: { lat: 25.0838, lng: 121.6022 } },
  { id: 'BR21', name: '葫洲', nameEn: 'Huzhou', line: 'BR', location: { lat: 25.0728, lng: 121.6068 } },
  { id: 'BR22', name: '東湖', nameEn: 'Donghu', line: 'BR', location: { lat: 25.0671, lng: 121.6115 } },
  { id: 'BR23', name: '南港軟體園區', nameEn: 'Nangang Software Park', line: 'BR', location: { lat: 25.0601, lng: 121.6160 } },
  { id: 'BR24', name: '南港展覽館', nameEn: 'Nangang Exhib. Center', line: 'BR', location: { lat: 25.0549, lng: 121.6166 } },

  // 🟡 黃線 - 環狀線 (Y)
  { id: 'Y07', name: '大坪林', nameEn: 'Dapinglin', line: 'Y', location: { lat: 24.9830, lng: 121.5407 } },
  { id: 'Y08', name: '十四張', nameEn: 'Shisizhang', line: 'Y', location: { lat: 24.9836, lng: 121.5284 } },
  { id: 'Y09', name: '秀朗橋', nameEn: 'Xiulang Bridge', line: 'Y', location: { lat: 24.9868, lng: 121.5222 } },
  { id: 'Y10', name: '景平', nameEn: 'Jingping', line: 'Y', location: { lat: 24.9926, lng: 121.5165 } },
  { id: 'Y11', name: '景安', nameEn: 'Jingan', line: 'Y', location: { lat: 24.9935, lng: 121.5069 } },
  { id: 'Y12', name: '中和', nameEn: 'Zhonghe', line: 'Y', location: { lat: 25.0022, lng: 121.4916 } },
  { id: 'Y13', name: '橋和', nameEn: 'Qiaohe', line: 'Y', location: { lat: 25.0041, lng: 121.4851 } },
  { id: 'Y14', name: '中原', nameEn: 'Zhongyuan', line: 'Y', location: { lat: 25.0076, lng: 121.4828 } },
  { id: 'Y15', name: '板新', nameEn: 'Banxin', line: 'Y', location: { lat: 25.0142, lng: 121.4735 } },
  { id: 'Y16', name: '板橋', nameEn: 'Banqiao', line: 'Y', location: { lat: 25.0143, lng: 121.4622 } },
  { id: 'Y17', name: '新埔民生', nameEn: 'Xinpu Minsheng', line: 'Y', location: { lat: 25.0253, lng: 121.4665 } },
  { id: 'Y18', name: '頭前庄', nameEn: 'Touqianzhuang', line: 'Y', location: { lat: 25.0398, lng: 121.4601 } },
  { id: 'Y19', name: '幸福', nameEn: 'Xingfu', line: 'Y', location: { lat: 25.0505, lng: 121.4593 } },
  { id: 'Y20', name: '新北產業園區', nameEn: 'New Taipei Industrial Park', line: 'Y', location: { lat: 25.0615, lng: 121.4598 } }
];

// 將 ID 轉換為方便查找的 Map
export const STATION_MAP = new Map<string, MrtStation>(
  MRT_STATIONS.map(s => [s.id, s])
);

// 將車站依照「中文完整路線名稱」分組，讓下拉選單更易讀
export const STATIONS_BY_LINE = MRT_STATIONS.reduce<Record<string, MrtStation[]>>(
  (acc, station) => {
    let lineName: string = station.line;
    switch (station.line) {
      case 'BL': lineName = '藍線 (板南線)'; break;
      case 'O':  lineName = '橘線 (中和新蘆線)'; break;
      case 'R':  lineName = '紅線 (淡水信義線)'; break;
      case 'G':  lineName = '綠線 (松山新店線)'; break;
      case 'BR': lineName = '棕線 (文湖線)'; break;
      case 'Y':  lineName = '黃線 (環狀線)'; break;
    }
    
    if (!acc[lineName]) acc[lineName] = [];
    acc[lineName].push(station);
    return acc;
  },
  {}
);

export function getStation(id: string): MrtStation | undefined {
  return STATION_MAP.get(id);
}