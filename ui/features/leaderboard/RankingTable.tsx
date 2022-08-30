import { FC, useContext } from "react";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import type { TopScoreList } from "~/types/leaderboard";

const RankingTable: FC<{ topScoreList: TopScoreList }> = ({ topScoreList }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <TableContainer minH="396px" borderRadius="16px" bgColor={colorMode === "light" ? "white" : "grey.900"}>
      <Table variant="unstyled">
        <Thead textStyle="label-2" color="grey.500">
          <Tr>
            <Th>Rank</Th>
            <Th>User</Th>
            <Th>Active</Th>
            <Th>Social</Th>
            <Th>Attention</Th>
          </Tr>
        </Thead>
        <Tbody textStyle="paragraph-2" color={colorMode === "light" ? "grey.900" : "white"}>
          {topScoreList.activity.map((score, i) => (
            <Tr
              key={i}
              cursor="pointer"
              _hover={{ bgColor: colorMode === "light" ? "warmgrey.90" : "dark.grey700" }}
              onClick={() => (window.location.href = score.name + ".eth")}
            >
              <Td>{i + 1}</Td>
              <Td>{score.name}</Td>
              <Td>{score.value.toFixed(2)}</Td>
              <Td>{NaN}</Td>
              <Td>{NaN}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default RankingTable;
