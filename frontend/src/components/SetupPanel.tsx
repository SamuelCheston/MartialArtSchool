import React, { useState } from 'react';
import { Box, Button, Text, VStack, HStack, Heading, SimpleGrid, Badge } from '@chakra-ui/react';
import { DEPARTMENT_THEME, GAME_THEME, SETUP_TRAITS } from '../gameTheme';

interface SetupPanelProps {
    onComplete: (selectedTraitIds: string[], profession: string) => void;
}

export const SetupPanel: React.FC<SetupPanelProps> = ({ onComplete }) => {
    const [selected, setSelected] = useState<string[]>([]);
    const [profession, setProfession] = useState<string>('Mechanical');
    const MAX_POINTS = 10;

    const currentPoints = selected.reduce((acc, id) => {
        const trait = SETUP_TRAITS.find(t => t.id === id);
        return acc + (trait ? trait.cost : 0);
    }, 0);

    const remainingPoints = MAX_POINTS - currentPoints;

    const toggleTrait = (id: string) => {
        if (selected.includes(id)) {
            setSelected(selected.filter(t => t !== id));
        } else {
            const trait = SETUP_TRAITS.find(t => t.id === id);
            if (trait && currentPoints + trait.cost <= MAX_POINTS) {
                setSelected([...selected, id]);
            }
        }
    };

    const agentTraits = SETUP_TRAITS.filter(t => t.type === 'AGENT');
    const siloTraits = SETUP_TRAITS.filter(t => t.type === 'SILO');

    return (
        <VStack gap={6} w="full" p={6} bg="white" borderRadius="lg" boxShadow="sm" border="1px solid" borderColor="gray.200">
            <Heading size="md" color="blue.700">定制你的开局</Heading>
            <HStack w="full" justify="space-between" bg="blue.50" p={4} borderRadius="md" border="1px solid" borderColor="blue.100">
                <Text fontSize="lg" fontWeight="bold" color="blue.800">
                    可用选择点数:
                </Text>
                <Badge colorPalette={remainingPoints > 0 ? "blue" : "red"} fontSize="xl" px={3} py={1} borderRadius="full">
                    {remainingPoints} / {MAX_POINTS}
                </Badge>
            </HStack>

            <Box w="full">
                <Heading size="sm" mb={4} color="gray.700" borderBottom="2px solid" borderColor="gray.100" pb={2}>
                    选择你的所属堂口
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
                    {Object.entries(DEPARTMENT_THEME).map(([id, dept]) => {
                        const isSelected = profession === id;
                        return (
                            <Box 
                                key={id}
                                p={3} 
                                borderWidth="2px" 
                                borderRadius="md" 
                                cursor="pointer"
                                borderColor={isSelected ? "blue.500" : "gray.200"}
                                bg={isSelected ? "blue.50" : "white"}
                                onClick={() => setProfession(id)}
                                transition="all 0.2s"
                                _hover={{ borderColor: isSelected ? "blue.500" : "blue.300", transform: "translateY(-1px)" }}
                            >
                                <Text fontWeight="bold" color={isSelected ? "blue.800" : "gray.700"} fontSize="sm" mb={1}>
                                    {dept.name}
                                </Text>
                                <Text fontSize="xs" color="gray.500">
                                    {dept.description}
                                </Text>
                            </Box>
                        );
                    })}
                </SimpleGrid>
            </Box>

            <Box w="full">
                <Heading size="sm" mb={4} color="gray.700" borderBottom="2px solid" borderColor="gray.100" pb={2}>
                    弟子特质
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                    {agentTraits.map(trait => {
                        const isSelected = selected.includes(trait.id);
                        const canSelect = isSelected || currentPoints + trait.cost <= MAX_POINTS;
                        return (
                            <Box 
                                key={trait.id} 
                                p={4} 
                                borderWidth="2px" 
                                borderRadius="md" 
                                cursor={canSelect ? "pointer" : "not-allowed"}
                                borderColor={isSelected ? "blue.500" : "gray.200"}
                                bg={isSelected ? "blue.50" : (canSelect ? "white" : "gray.50")}
                                opacity={canSelect ? 1 : 0.6}
                                onClick={() => canSelect && toggleTrait(trait.id)}
                                transition="all 0.2s"
                                _hover={canSelect ? { borderColor: "blue.400", transform: "translateY(-2px)" } : {}}
                            >
                                <HStack justify="space-between" mb={2}>
                                    <Text fontWeight="bold" color="gray.800">{trait.name}</Text>
                                    <Badge colorPalette={trait.cost > 0 ? "purple" : "green"}>
                                        {trait.cost > 0 ? `Cost: ${trait.cost}` : `Gain: ${-trait.cost}`}
                                    </Badge>
                                </HStack>
                                <Text fontSize="sm" color="gray.600">{trait.description}</Text>
                            </Box>
                        );
                    })}
                </SimpleGrid>
            </Box>

            <Box w="full">
                <Heading size="sm" mb={4} color="gray.700" borderBottom="2px solid" borderColor="gray.100" pb={2}>
                    {GAME_THEME.schoolLabel}初始状况
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                    {siloTraits.map(trait => {
                        const isSelected = selected.includes(trait.id);
                        const canSelect = isSelected || currentPoints + trait.cost <= MAX_POINTS;
                        return (
                            <Box 
                                key={trait.id} 
                                p={4} 
                                borderWidth="2px" 
                                borderRadius="md" 
                                cursor={canSelect ? "pointer" : "not-allowed"}
                                borderColor={isSelected ? "green.500" : "gray.200"}
                                bg={isSelected ? "green.50" : (canSelect ? "white" : "gray.50")}
                                opacity={canSelect ? 1 : 0.6}
                                onClick={() => canSelect && toggleTrait(trait.id)}
                                transition="all 0.2s"
                                _hover={canSelect ? { borderColor: "green.400", transform: "translateY(-2px)" } : {}}
                            >
                                <HStack justify="space-between" mb={2}>
                                    <Text fontWeight="bold" color="gray.800">{trait.name}</Text>
                                    <Badge colorPalette={trait.cost > 0 ? "purple" : "green"}>
                                        {trait.cost > 0 ? `Cost: ${trait.cost}` : `Gain: ${-trait.cost}`}
                                    </Badge>
                                </HStack>
                                <Text fontSize="sm" color="gray.600">{trait.description}</Text>
                            </Box>
                        );
                    })}
                </SimpleGrid>
            </Box>

            <Button 
                colorPalette="blue" 
                size="lg" 
                w="full" 
                mt={4} 
                onClick={() => onComplete(selected, profession)}
            >
                确认选择并入门
            </Button>
        </VStack>
    );
};
