import React, { useRef, useState } from 'react';
import { Box, Button, Text, VStack, SimpleGrid, Badge } from '@chakra-ui/react';
import { PrizeWheel, type PrizeWheelHandle } from 'react-prize-wheel-advanced';
import { GAME_THEME } from '../gameTheme';

interface TimeOption {
    label: string;
    year: number;
    color: string;
}

const TIME_OPTIONS: TimeOption[] = [
    { label: '开山前十年', year: 112, color: '#E53E3E' },
    { label: '开山前五年', year: 117, color: '#DD6B20' },
    { label: '开山当年', year: 122, color: '#38A169' },
    { label: '开山后五年', year: 127, color: '#3182CE' },
    { label: '开山后十年', year: 132, color: '#805AD5' },
];

interface TimeWheelProps {
    onSelect: (year: number) => void;
}

export const TimeWheel: React.FC<TimeWheelProps> = ({ onSelect }) => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [selectedOption, setSelectedOption] = useState<TimeOption | null>(null);
    const [showManual, setShowManual] = useState(false);
    const wheelRef = useRef<PrizeWheelHandle>(null);

    const spin = () => {
        if (isSpinning) return;

        setIsSpinning(true);
        setSelectedOption(null);
        setShowManual(false);

        // Trigger the wheel library's spin animation (winner is picked internally at random)
        wheelRef.current?.click();
    };

    const handleFinished = (index: number) => {
        setIsSpinning(false);
        setSelectedOption(TIME_OPTIONS[index]);
    };

    const handleConfirm = () => {
        if (selectedOption) {
            onSelect(selectedOption.year);
        }
    };

    const handleManualSelect = (option: TimeOption) => {
        setSelectedOption(option);
    };

    return (
        <VStack gap={6} w="full">
            <PrizeWheel
                ref={wheelRef}
                segments={TIME_OPTIONS.map(o => o.label)}
                segColors={TIME_OPTIONS.map(o => o.color)}
                onFinished={handleFinished}
                size={300}
                primaryColor="#3182CE"
                contrastColor="#FFFFFF"
                buttonText="抽签"
                spinDuration={1}
            />

            {!selectedOption && !isSpinning && (
                <Button
                    colorPalette="blue"
                    size="lg"
                    onClick={spin}
                    w="200px"
                >
                    抽取开局时间
                </Button>
            )}

            {isSpinning && (
                <Button colorPalette="blue" size="lg" loading loadingText="抽签中..." w="200px" disabled>
                    抽签中...
                </Button>
            )}

            {selectedOption && !isSpinning && (
                <VStack gap={4} w="full">
                    <Box textAlign="center" p={4} bg="gray.700" borderRadius="md" w="full">
                        <Badge colorPalette={showManual ? "orange" : "green"} mb={2}>
                            {showManual ? "手动改签" : "抽签结果"}
                        </Badge>
                        <Text fontSize="xl" fontWeight="bold">
                            {selectedOption.label}
                        </Text>
                        <Text fontSize="md" color="gray.400">
                            {GAME_THEME.debugYearLabel}：{selectedOption.year}
                        </Text>
                    </Box>

                    <VStack gap={2} w="full">
                        <Button colorPalette="green" size="lg" onClick={handleConfirm} w="full">
                            确认并继续
                        </Button>
                        
                        {!showManual ? (
                            <Button variant="ghost" size="sm" onClick={() => setShowManual(true)}>
                                不满意？手动选择
                            </Button>
                        ) : (
                            <VStack w="full" gap={3} mt={2}>
                                <Text fontSize="sm" color="gray.400">选择你偏好的开局时间：</Text>
                                <SimpleGrid columns={1} gap={2} w="full">
                                    {TIME_OPTIONS.map((option) => (
                                        <Button
                                            key={option.year}
                                            variant={selectedOption.year === option.year ? "solid" : "outline"}
                                            colorPalette={selectedOption.year === option.year ? "blue" : "gray"}
                                            size="sm"
                                            onClick={() => handleManualSelect(option)}
                                        >
                                            {option.label}（{option.year}）
                                        </Button>
                                    ))}
                                </SimpleGrid>
                            </VStack>
                        )}
                        
                        <Button variant="ghost" size="sm" onClick={spin} mt={2}>
                            重新抽签
                        </Button>
                    </VStack>

                    <Text fontSize="xs" fontStyle="italic" textAlign="center" color="gray.500">
                        这里决定的是你入门的时间切片。
                        <br />
                        后续剧情和势力状态都会从这个起点展开。
                    </Text>
                </VStack>
            )}
        </VStack>
    );
};
