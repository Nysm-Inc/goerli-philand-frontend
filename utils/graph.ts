import axios from "axios";
import { PHI_REGISTRY_GRAPH_ENDPOINT } from "~/constants";

type LogCreatePhiland = { id: string; sender: string; name: string };

export const fetchLogCreatedPhilands = async (name: string): Promise<LogCreatePhiland[]> => {
  const query = `
      {
        logCreatePhilands(first: 1, where: { name: "${name}" }) {
          id
          sender
          name
        }
      }
    `;
  const res = await axios.post<{ data: { logCreatePhilands: LogCreatePhiland[] } }>(PHI_REGISTRY_GRAPH_ENDPOINT, {
    query,
  });
  return res.data.data.logCreatePhilands;
};
