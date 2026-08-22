// @ts-nocheck
import { useState, useEffect } from 'react';
import './App.css';
import { CreateGame, GetGameState, HasActiveGame, BeginPassTime, BeginAction, ProcessNextEvent } from "../wailsjs/go/main/App";
import { Box, Button, Heading, Input, Text, VStack, HStack, Badge, SimpleGrid, NativeSelect } from "@chakra-ui/react";
import { ProgressBar, ProgressRoot } from './components/ui/progress';
import { Tooltip } from './components/ui/tooltip';
import { TimeWheel } from './components/TimeWheel';
import { SiloWheel } from './components/SiloWheel';
import { SetupPanel } from './components/SetupPanel';
import { BunkerMap } from './components/BunkerMap';
import { FactionView } from './components/FactionView';
import { HeaderStats } from './components/HeaderStats';
import { Silo, Agent, AgentAction, AgentActionType, ACTION_COSTS, ACTION_DURATIONS, ALL_FRAGMENTS, GameState, AgentStats, PlayerActionMeta } from './logic/models';
import { LayoutGrid, Users } from 'lucide-react';
import { formatFragmentLabel, GAME_THEME, getDepartmentName, getResourceLabel } from './gameTheme';

function App() {
    const [resultText, setResultText] = useState(`请输入你的${GAME_THEME.playerLabel}名`);
    const [name, setName] = useState('');
    const [gameStarted, setGameStarted] = useState(false);
    const [showSetup, setShowSetup] = useState(false);
    const [showSiloWheel, setShowSiloWheel] = useState(false);
    const [startYear, setStartYear] = useState(122);
    const [siloNumber, setSiloNumber] = useState(40);
    const [silo, setSilo] = useState<Silo | null>(null);
    const [agent, setAgent] = useState<Agent | null>(null);
    const [agentStats, setAgentStats] = useState<AgentStats | null>(null);
    const [availableActions, setAvailableActions] = useState<PlayerActionMeta[]>([]);
    const [activeView, setActiveView] = useState<'map' | 'factions'>('map');
    const [pendingEvents, setPendingEvents] = useState(0);
    const [pendingOperation, setPendingOperation] = useState('');

    // Action Form State
    const [actionType, setActionType] = useState<AgentActionType>('GATHER_INFO');
    const [targetDept, setTargetDept] = useState<string>('');
    const [selectedFragments, setSelectedFragments] = useState<string[]>([]);
    const [professionActionId, setProfessionActionId] = useState<string>('');
    const [playerActionId, setPlayerActionId] = useState<string>('');
    const [resourceTarget, setResourceTarget] = useState<string>('');

    const toggleFragment = (f: string) => {
        setSelectedFragments(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
    };

    const getIdeologyLabel = (type: string, val: number) => {
        const v = val * 100;
        if (type === 'loyalty') {
            if (v <= 30) return "异见者";
            if (v <= 70) return "中立";
            return "亲信";
        }
        if (v <= 10) return "排外";
        if (v <= 40) return "中立排外";
        return "亲外";
    };

    const groupedActions = availableActions.reduce((acc, action) => {
        if (!acc[action.group]) {
            acc[action.group] = [];
        }
        acc[action.group].push(action);
        return acc;
    }, {} as Record<string, PlayerActionMeta[]>);

    const selectedActionMeta = availableActions.find((action) => {
        if (action.action_type !== actionType) return false;
        if (action.action_type === 'PROFESSION_ACTION') return action.id === professionActionId;
        if (action.action_type === 'PLAYER_EVENT') return action.id === playerActionId;
        return action.id === actionType;
    });
    const showDeptSelector = selectedActionMeta?.target_type === 'DEPT';
    const showResourceSelector = selectedActionMeta?.target_type === 'RESOURCE';

    // 应用后端返回的游戏状态快照
    const applyGameState = (state: GameState) => {
        setSilo(state.silo);
        setAgent(state.agent);
        setAgentStats(state.agent_stats);
        setAvailableActions(state.available_actions || []);
        setPendingEvents(0);
        setPendingOperation('');
        setGameStarted(true);
        setShowSetup(false);
    };

    const applyEventState = (state: any) => {
        setSilo(state.silo);
        setAgent(state.agent);
        setAgentStats(state.agent_stats);
        setAvailableActions(state.available_actions || []);
        setPendingEvents(state.pending_events || 0);
        setPendingOperation(state.pending_operation || '');
        setGameStarted(true);
        setShowSetup(false);
    };

    useEffect(() => {
        if (!availableActions.some((action) => {
            if (action.action_type !== actionType) return false;
            if (actionType === 'PROFESSION_ACTION') return action.id === professionActionId;
            if (actionType === 'PLAYER_EVENT') return action.id === playerActionId;
            return action.id === actionType;
        })) {
            const fallback = availableActions.find(action => action.enabled) || availableActions[0];
            if (!fallback) return;
            setActionType(fallback.action_type as AgentActionType);
            setProfessionActionId(fallback.action_type === 'PROFESSION_ACTION' ? fallback.id : '');
            setPlayerActionId(fallback.action_type === 'PLAYER_EVENT' ? fallback.id : '');
        }
    }, [availableActions, actionType, professionActionId, playerActionId]);

    // 启动时恢复进行中的游戏会话 (后端内存/缓存/SQLite 为唯一事实来源)
    useEffect(() => {
        HasActiveGame()
            .then(active => {
                if (!active) return;
                return GetGameState();
            })
            .then(state => {
                if (!state) return;
                applyGameState(state);
                setResultText(`已恢复 ${state.silo.name}。当前为${GAME_THEME.debugYearLabel} ${state.silo.current_year} 年 ${state.silo.current_month} 月。`);
            })
            .catch(err => updateResultText(`读取存档失败：${err}`));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateName = (e: any) => setName(e.target.value);
    const updateResultText = (result: string) => setResultText(result);

    const handleWheelSelect = (year: number) => {
        setStartYear(year);
        setShowSiloWheel(true);
        updateResultText(`接下来，让命运决定你将拜入哪座${GAME_THEME.campusLabel}。`);
    };

    const handleSiloSelect = (num: number) => {
        setSiloNumber(num);
        setShowSiloWheel(false);
        setShowSetup(true);
        updateResultText(`${GAME_THEME.campusLabel} ${num} 已选定。现在可以用点数定制你的${GAME_THEME.playerLabel}与${GAME_THEME.schoolLabel}开局。`);
    };

    const handleDebugStart = async () => {
        const agentName = name || GAME_THEME.defaultPlayerName;
        const siloName = `${GAME_THEME.campusLabel} ${GAME_THEME.debugCampusNumber}`;
        const debugYear = 122; // Just now
        const debugTraits = ['charismatic', 'native', 'leak'];
        const debugProfession = 'Mechanical';

        try {
            const state = await CreateGame({
                silo_name: siloName,
                start_year: debugYear,
                trait_ids: debugTraits,
                agent_name: agentName,
                profession: debugProfession,
            });
            applyGameState(state);
            updateResultText(`[DEBUG] 已快速开始于 ${state.silo.name}。当前年份：${state.silo.current_year}。`);
        } catch (err) {
            updateResultText(`Debug 启动失败: ${err}`);
        }
    };

    // 新建游戏：初始化/落库/缓存全部由 Go 后端完成
    const handleSetupComplete = async (selectedTraitIds: string[], profession: string) => {
        const agentName = name || GAME_THEME.defaultPlayerName;
        const siloName = `${GAME_THEME.campusLabel} ${siloNumber}`;

        try {
            const state = await CreateGame({
                silo_name: siloName,
                start_year: startYear,
                trait_ids: selectedTraitIds,
                agent_name: agentName,
                profession,
            });
            applyGameState(state);
            updateResultText(`欢迎加入 ${state.silo.name}。当前为${GAME_THEME.debugYearLabel} ${state.silo.current_year} 年 ${state.silo.current_month} 月。`);
        } catch (err) {
            updateResultText(`初始化${GAME_THEME.schoolLabel}失败：${err}`);
        }
    };

    const handlePassTime = async () => {
        if (!silo || !agent) return;

        try {
            const state = await BeginPassTime(1);
            applyEventState(state);
            updateResultText(`已排入 1 个月的时间推进。当前待处理事件：${state.pending_events}。`);
        } catch (err) {
            updateResultText(`推进时间失败：${err}`);
        }
    };

    // 表单提交：执行动作 (执行/结算/NPC 回合均在 Go)
    const handleExecuteAction = async () => {
        if (!silo || !agent) return;

        const selected = selectedActionMeta;
        const isGlobalAction = selected?.target_type === 'NONE';

        // 目标校验统一以后端下发的 action meta 为准
        let actionTarget: string | undefined = targetDept;
        if (selected?.target_type === 'DEPT') {
            if (!targetDept) {
                updateResultText(`请选择目标${GAME_THEME.departmentLabel}。`);
                return;
            }
        } else if (selected?.target_type === 'RESOURCE') {
            if (!resourceTarget) {
                updateResultText("请选择目标资源。");
                return;
            }
            actionTarget = resourceTarget;
        } else if (!isGlobalAction && !targetDept) {
            updateResultText(`请选择目标${GAME_THEME.departmentLabel}。`);
            return;
        }
        if (actionType === 'SHARE_INFO' && selectedFragments.length === 0) {
            updateResultText("请至少选择一条要传播的情报。");
            return;
        }

        const action: AgentAction = {
            type: actionType,
            action_id: actionType === 'PLAYER_EVENT' ? playerActionId : undefined,
            target_dept: isGlobalAction ? undefined : actionTarget,
            fragment_ids: actionType === 'SHARE_INFO' ? selectedFragments : undefined,
            profession_action: actionType === 'PROFESSION_ACTION' ? professionActionId : undefined,
            resource_target: selected?.target_type === 'RESOURCE' ? resourceTarget : undefined,
            cost: selected?.ap_cost ?? ACTION_COSTS[actionType]
        };

        try {
            const state = await BeginAction(action);
            applyEventState(state);
            updateResultText(`已排入行动 ${action.type}。当前待处理事件：${state.pending_events}。`);
        } catch (err) {
            updateResultText(`执行行动失败：${err}`);
        }
    };

    const handleProcessNextEvent = async () => {
        if (!gameStarted) return;

        try {
            const step = await ProcessNextEvent();
            applyEventState(step);

            if (step.game_over) {
                updateResultText(`结局触发：${step.silo.victory_status?.description || step.ending_narrative}`);
                return;
            }

            let message = `已处理 ${step.processed_event_type || "event"}`;
            if (step.action_result) {
                message += ` | ${step.action_result.executed ? "行动成功" : "行动失败"}: ${step.action_result.message}`;
            }
            if (step.stories?.length > 0) {
                message += ` | 事件[${step.stories[0].category || "uncategorized"}]: ${step.stories[0].title}`;
            }
            if (step.logs?.length > 0) {
                message += ` | 日志: ${step.logs.join(' | ')}`;
            }
            if (step.operation_complete) {
                message += ` | 本次操作已完成。`;
            } else {
                message += ` | 待处理事件：${step.pending_events}。`;
            }
            updateResultText(message);
        } catch (err) {
            updateResultText(`处理下一事件失败：${err}`);
        }
    };

    const groupOrder = ['common', 'profession', 'profession_group', 'faction_member', 'faction_leader'];
    const groupTitle: Record<string, string> = {
        common: '通用行动',
        profession: `堂口行动：${getDepartmentName(agent?.profession || '')}`,
        profession_group: '堂口协同行动',
        faction_member: '势力成员行动',
        faction_leader: '势力领袖行动',
    };
    const groupColor: Record<string, string> = {
        common: 'blue',
        profession: 'purple',
        profession_group: 'orange',
        faction_member: 'teal',
        faction_leader: 'red',
    };
    const orderedGroups = groupOrder.filter((group) => (groupedActions[group] || []).length > 0);
    const selectAction = (action: PlayerActionMeta) => {
        setActionType(action.action_type as AgentActionType);
        setProfessionActionId(action.action_type === 'PROFESSION_ACTION' ? action.id : '');
        setPlayerActionId(action.action_type === 'PLAYER_EVENT' ? action.id : '');
    };

    return (
        <Box minH="100vh" bg="white" color="gray.800" display="flex" flexDirection="column">
            {gameStarted && <HeaderStats agent={agent} silo={silo} agentStats={agentStats} />}
            
            <HStack align="stretch" flex={1} w="full" gap={0} overflow="hidden">
                {/* Sidebar */}
                {gameStarted && (
                    <VStack 
                        w="70px" 
                        bg="gray.50" 
                        borderRight="1px solid" 
                        borderColor="gray.200" 
                        py={6} 
                        gap={6} 
                        align="center"
                    >
                        <Tooltip content={GAME_THEME.mapLabel} placement="right">
                            <Button 
                                variant={activeView === 'map' ? "solid" : "ghost"} 
                                colorPalette="blue"
                                onClick={() => setActiveView('map')}
                                w="50px"
                                h="50px"
                                borderRadius="lg"
                                p={0}
                            >
                                <LayoutGrid size={24} />
                            </Button>
                        </Tooltip>

                        <Tooltip content={`${GAME_THEME.factionLabel}概览`} placement="right">
                            <Button 
                                variant={activeView === 'factions' ? "solid" : "ghost"} 
                                colorPalette="blue"
                                onClick={() => setActiveView('factions')}
                                w="50px"
                                h="50px"
                                borderRadius="lg"
                                p={0}
                            >
                                <Users size={24} />
                            </Button>
                        </Tooltip>
                    </VStack>
                )}

                {/* Main Content Area */}
                <Box flex={1} overflowY="auto" p={8}>
                    <VStack gap={8} w="full">
                        <Heading size="md" textAlign="center" color="blue.600">{resultText}</Heading>

                        {!gameStarted && !showSetup && !showSiloWheel && (
                            <VStack gap={6} w="full" maxW="400px">
                                <Input
                                    placeholder={`输入${GAME_THEME.playerLabel}名（如 ${GAME_THEME.defaultPlayerName}）`}
                                    value={name}
                                    onChange={updateName}
                                    size="md"
                                    bg="gray.100"
                                    border="1px solid"
                                    borderColor="gray.300"
                                    _focus={{ border: "1px solid", borderColor: "blue.500", bg: "white" }}
                                />
                                <TimeWheel onSelect={handleWheelSelect} />
                                <Button 
                                    colorPalette="red" 
                                    variant="outline" 
                                    size="sm" 
                                    w="full" 
                                    onClick={handleDebugStart}
                                >
                                    DEBUG: 快速开始（{GAME_THEME.campusLabel} {GAME_THEME.debugCampusNumber}）
                                </Button>
                            </VStack>
                        )}

                        {!gameStarted && !showSetup && showSiloWheel && (
                            <VStack gap={6} w="full" maxW="400px">
                                <SiloWheel onSelect={handleSiloSelect} />
                            </VStack>
                        )}

                        {!gameStarted && showSetup && !showSiloWheel && (
                            <SetupPanel onComplete={handleSetupComplete} />
                        )}

                        {gameStarted && (
                            <HStack align="start" gap={6} w="full" wrap="wrap">
                                {/* Left Side: View Content */}
                                <VStack gap={6} flex={{ base: "1 1 100%", lg: 2 }} w="full">
                                    {activeView === 'map' ? (
                                        silo && <BunkerMap silo={silo} agent={agent} />
                                    ) : (
                                        silo && <FactionView silo={silo} />
                                    )}
                                </VStack>

                                {/* Right Side: Operations */}
                                <VStack gap={6} flex={{ base: "1 1 100%", lg: 1 }} w="full" position="sticky" top="0px">
                                    {/* Actions Panel */}
                                    <Box w="full" p={5} bg="gray.50" borderRadius="md" border="1px solid" borderColor="gray.200" boxShadow="sm">
                                        <Heading size="sm" mb={4} color="gray.800" borderBottom="1px solid" borderColor="gray.200" pb={2}>{GAME_THEME.playerLabel}行动台</Heading>
                                        <VStack gap={5} align="stretch">
                                            {orderedGroups.map((group) => (
                                                <VStack key={group} align="start" gap={2}>
                                                    <Text fontSize="sm" fontWeight="bold" color={`${groupColor[group] || 'gray'}.700`}>
                                                        {groupTitle[group] || group}
                                                    </Text>
                                                    <SimpleGrid columns={2} gap={3} w="full">
                                                        {(groupedActions[group] || []).map((action) => {
                                                            const isSelected = selectedActionMeta?.id === action.id && selectedActionMeta?.action_type === action.action_type;
                                                            const palette = groupColor[group] || 'gray';
                                                            return (
                                                                <Button
                                                                    key={`${action.action_type}:${action.id}`}
                                                                    variant={isSelected ? "solid" : "outline"}
                                                                    colorPalette={isSelected ? palette : "gray"}
                                                                    onClick={() => selectAction(action)}
                                                                    h="80px"
                                                                    display="flex"
                                                                    flexDirection="column"
                                                                    justifyContent="center"
                                                                    alignItems="center"
                                                                    whiteSpace="normal"
                                                                    lineHeight="1.2"
                                                                    title={action.description}
                                                                    disabled={!action.enabled}
                                                                    opacity={action.enabled ? 1 : 0.55}
                                                                    bg={isSelected ? `${palette}.500` : "white"}
                                                                    _hover={{ bg: isSelected ? `${palette}.600` : "gray.50" }}
                                                                >
                                                                    <Text fontWeight="bold">{action.label}</Text>
                                                                    <Text fontSize="xs" mt={1}>({action.ap_cost} AP)</Text>
                                                                </Button>
                                                            );
                                                        })}
                                                    </SimpleGrid>
                                                </VStack>
                                            ))}

                                            {showDeptSelector && (
                                                <VStack align="start" gap={1}>
                                                    <Text fontSize="sm" fontWeight="bold" color="gray.700">目标{GAME_THEME.departmentLabel}：</Text>
                                                    <NativeSelect.Root size="md" w="full" bg="white">
                                                        <NativeSelect.Field value={targetDept} onChange={(e) => setTargetDept(e.target.value)}>
                                                            <option value="" disabled>请选择{GAME_THEME.departmentLabel}...</option>
                                                            {silo?.professions?.map(p => (
                                                                <option key={p.id} value={p.name}>{getDepartmentName(p.name)}</option>
                                                            ))}
                                                        </NativeSelect.Field>
                                                        <NativeSelect.Indicator />
                                                    </NativeSelect.Root>
                                                </VStack>
                                            )}

                                            {showResourceSelector && (
                                                <VStack align="start" gap={1}>
                                                    <Text fontSize="sm" fontWeight="bold" color="gray.700">目标资源：</Text>
                                                    <NativeSelect.Root size="md" w="full" bg="white">
                                                        <NativeSelect.Field value={resourceTarget} onChange={(e) => setResourceTarget(e.target.value)}>
                                                            <option value="" disabled>请选择资源...</option>
                                                            {['Energy', 'Materials', 'Supplies'].map(r => (
                                                                <option key={r} value={r}>{getResourceLabel(r)}</option>
                                                            ))}
                                                        </NativeSelect.Field>
                                                        <NativeSelect.Indicator />
                                                    </NativeSelect.Root>
                                                </VStack>
                                            )}

                                            {actionType === 'SHARE_INFO' && (
                                                <>
                                                    <VStack align="start" gap={1}>
                                                        <Text fontSize="sm" fontWeight="bold" color="gray.700">要传播的情报（真伪均可）：</Text>
                                                        <HStack wrap="wrap" gap={2} maxH="200px" overflowY="auto" p={2} border="1px solid" borderColor="gray.200" borderRadius="md" w="full">
                                                            {ALL_FRAGMENTS.map(f => {
                                                                const isSelected = selectedFragments.includes(f);
                                                                const isKnown = agent?.known_fragments?.includes(f);
                                                                return (
                                                                    <Badge
                                                                        key={f}
                                                                        colorPalette={isSelected ? (isKnown ? "blue" : "red") : (isKnown ? "gray" : "orange")}
                                                                        variant={isSelected ? "solid" : "subtle"}
                                                                        cursor="pointer"
                                                                        onClick={() => toggleFragment(f)}
                                                                        title={isKnown ? "真实情报" : "伪造情报（会提高怀疑度）"}
                                                                    >
                                                                        {formatFragmentLabel(f)} {!isKnown && "（伪）"}
                                                                    </Badge>
                                                                );
                                                            })}
                                                        </HStack>
                                                    </VStack>
                                                    <Text fontSize="xs" color="gray.600" mt={1}>
                                                        传播伪造情报能加快思潮扩散，但会大幅提高怀疑度并降低接受率。
                                                    </Text>
                                                </>
                                            )}

                                            <VStack gap={3} mt={2}>
                                                <Button colorPalette="blue" w="full" size="lg" onClick={handleExecuteAction} boxShadow="md" disabled={pendingEvents > 0 || !selectedActionMeta || !selectedActionMeta.enabled}>
                                                    排入行动
                                                </Button>
                                                <Button colorPalette="teal" variant="outline" w="full" size="md" onClick={handlePassTime} bg="white" disabled={pendingEvents > 0}>
                                                    推进 1 个月
                                                </Button>
                                                <Button colorPalette="orange" w="full" size="md" onClick={handleProcessNextEvent} disabled={pendingEvents <= 0}>
                                                    处理下一事件
                                                </Button>
                                                <Text fontSize="xs" color="gray.600">
                                                    队列：{pendingEvents} 个待处理{pendingOperation ? ` | ${pendingOperation}` : ''}
                                                </Text>
                                            </VStack>
                                        </VStack>
                                    </Box>
                                </VStack>
                            </HStack>
                        )}

                        <Box w="full" pt={4} borderTop="1px solid" borderColor="gray.200">
                            <Text color="gray.400" fontSize="sm" textAlign="center">
                                {GAME_THEME.title} Framework Console
                            </Text>
                        </Box>
                    </VStack>
                </Box>
            </HStack>
        </Box>
    )
}

export default App;
