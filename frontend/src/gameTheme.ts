export type TraitOption = {
    id: string;
    name: string;
    description: string;
    cost: number;
    type: 'AGENT' | 'SILO';
};

type DepartmentTheme = {
    name: string;
    description: string;
};

export const GAME_THEME = {
    title: 'MartialArtSchool',
    schoolLabel: '武校',
    campusLabel: '分院',
    playerLabel: '弟子',
    departmentLabel: '堂口',
    mapLabel: '校区分布',
    factionLabel: '势力',
    defaultPlayerName: '林青',
    debugCampusNumber: 20,
    debugYearLabel: '开山纪元',
};

export const DEPARTMENT_THEME: Record<string, DepartmentTheme> = {
    Mayor: {
        name: '山长',
        description: '行动会显著抬高关注度，但拥有最高初始声望与跨堂口人脉。',
    },
    Judicial: {
        name: '戒律堂',
        description: '负责门规执行。开局声望较低，但掌握处置与裁断权。',
    },
    IT: {
        name: '藏经阁',
        description: '掌管秘籍与情报。行动隐蔽，但会抬高秘库失控风险。',
    },
    Police: {
        name: '执法队',
        description: '负责巡查与维稳。与山长关系紧密，擅长压低行动暴露。',
    },
    Medical: {
        name: '药庐',
        description: '负责疗伤与丹药。会逐步获得额外线索与人物关系。',
    },
    Supply: {
        name: '膳房',
        description: '负责粮草与供给。与基层弟子联系最广，适合稳住局面。',
    },
    Mechanical: {
        name: '器械房',
        description: '负责机关与兵器维护。组织基层力量时拥有更高效率。',
    },
    Mines: {
        name: '采石场',
        description: '负责采石与粗重劳作。行动低调，但初始威望极低。',
    },
    Agricultural: {
        name: '药圃',
        description: '负责种植与药材培养。当前作为均衡型基础堂口。',
    },
};

export const SETUP_TRAITS: TraitOption[] = [
    { id: 'shadowy', name: '行踪缥缈', description: '行动产生的怀疑度降低 20%。', cost: 3, type: 'AGENT' },
    { id: 'charismatic', name: '宗师风范', description: '增加初始威望和人脉建立速度，并在组织势力时获得额外增益。', cost: 4, type: 'AGENT' },
    { id: 'native', name: '本门嫡传', description: '开局获得自己所属阶层各堂口额外 10-15% 的人脉值。', cost: 3, type: 'AGENT' },
    { id: 'abundant', name: '库藏丰厚', description: '初始食物与能源资源翻倍。', cost: 3, type: 'SILO' },
    { id: 'leak', name: '秘籍走漏', description: '基层堂口的外向思潮在开局时更活跃。', cost: 2, type: 'SILO' },
    { id: 'psychoactive_meds', name: '偏门心法流行', description: '各堂口思潮会逐渐向藏经阁偏移。', cost: 3, type: 'SILO' },
];

export const CAMPUS_OPTIONS = Array.from({ length: 50 }, (_, i) => i + 2)
    .filter((num) => num !== 17 && num !== 18 && num !== 40)
    .map((num) => ({
        label: `${GAME_THEME.campusLabel} ${num}`,
        number: num,
        color: `hsl(${(num * 137.5) % 360}, 70%, 50%)`,
    }));

export function getDepartmentName(id: string): string {
    return DEPARTMENT_THEME[id]?.name || id;
}

export function getDepartmentDescription(id: string): string {
    return DEPARTMENT_THEME[id]?.description || '';
}

export function formatFragmentLabel(fragment: string): string {
    const [prefix, suffix] = fragment.split('_');
    if (!suffix) {
        return fragment;
    }
    return `${getDepartmentName(prefix)}_${suffix}`;
}

export function getResourceLabel(resource: string): string {
    switch (resource) {
        case 'Energy':
            return '内力';
        case 'Materials':
            return '器材';
        case 'Supplies':
            return '粮草';
        default:
            return resource;
    }
}
