import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import type { TopScoreList } from "~/types/leaderboard";

type Rank = "activity" | "social" | "attention";

const RankingTable: FC<{ rank: Rank; topScoreList: TopScoreList; onClose: () => void }> = ({ rank, topScoreList, onClose }) => {
  const router = useRouter();
  const { colorMode } = useContext(AppContext);

  return (
    <TableContainer minH="396px" borderRadius="16px" bgColor={colorMode === "light" ? "white" : "grey.900"}>
      <Table variant="unstyled">
        <Thead textStyle="label-2" color="grey.500">
          <Tr>
            <Th textTransform="none">Rank</Th>
            <Th textTransform="none">User</Th>
            <Th textTransform="none">{rank.replace(/^[a-z]/g, (char) => char.toUpperCase())}</Th>
          </Tr>
        </Thead>
        <Tbody textStyle="paragraph-2" color={colorMode === "light" ? "grey.900" : "white"}>
          {topScoreList[rank].map((_, i) => (
            <Tr
              key={i}
              cursor="pointer"
              _hover={{ bgColor: colorMode === "light" ? "warmgrey.90" : "dark.grey700" }}
              onClick={() => {
                router.push(topScoreList[rank][i].name + ".eth", undefined, { shallow: true });
                onClose();
              }}
            >
              <Td w="120px">{i + 1}</Td>
              <Td w="480px" maxW="480px" overflowX="hidden" textOverflow="ellipsis">
                {topScoreList[rank][i].name + ".eth"}
              </Td>
              <Td>{topScoreList[rank][i] ? topScoreList[rank][i].value.toFixed(0) : "-"}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default RankingTable;
