import Image from "next/image";
import { FC, useContext } from "react";
import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import type { MyScore as TypMyScore } from "~/types/leaderboard";

const ScoreBadge: FC<{ rank: number }> = ({ rank }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <HStack h="24px" p="4px 8px" spacing="8px" borderRadius="8px" bgColor={colorMode === "light" ? "warmgrey.80" : "grey.900"}>
      <Text textStyle="label-1" color={colorMode === "light" ? "warmgrey.60" : "warmgrey.50"}>
        Ranked
      </Text>
      <Text textStyle="label-1" color={colorMode === "light" ? "warmgrey.40" : "white"}>
        {rank.toLocaleString()}
      </Text>
    </HStack>
  );
};

const ScoreCard: FC<{ title: string; score: number; rank: number }> = ({ title, score, rank }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <VStack w="200px" h="80px" spacing="4px" align="flex-start">
      <Text textStyle="label-1" color="grey.500">
        {title}
      </Text>
      <Text textStyle="headline-1" color={colorMode === "light" ? "grey.900" : "white"}>
        {score.toFixed(2)}
      </Text>
      <ScoreBadge rank={rank} />
    </VStack>
  );
};

const MyScore: FC<{ ens: string; myScore: TypMyScore }> = ({ ens, myScore }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <HStack w="full" h="128px" spacing="24px">
      <Avatar
        w="128px"
        h="128px"
        bgColor={colorMode === "light" ? "purple.150" : "red.150"}
        icon={
          <Box position="absolute" top="16px">
            <Image width="112px" height="112px" src="/icons/dotty.svg" alt="" quality={100} />
          </Box>
        }
      />
      <VStack spacing="16px" align="flex-start">
        <Text textStyle="headline-1" color={colorMode === "light" ? "grey.900" : "white"}>
          {ens}
        </Text>
        <HStack spacing="16px">
          <ScoreCard title="Active Score" score={myScore.activity} rank={myScore.activityRank} />
          <ScoreCard title="Social Score" score={NaN} rank={NaN} />
          <ScoreCard title="Attention Score" score={NaN} rank={NaN} />
        </HStack>
      </VStack>
    </HStack>
  );
};

export default MyScore;
