using InsuranceContracting.Models;
using System.Collections.Generic;
using System.Linq;

namespace InsuranceContracting.Helpers
{
    public class ShortestChain : IShortestChain
    {
        public List<string> FindShortestChain(List<Contract> contracts, string source, string destination)
        {
            Dictionary<string, int> items = new Dictionary<string, int>();
            List<string> shortestDistanceIds = new List<string>();
            int counter = 0;

            foreach (Contract contract in contracts)
            {
                if (!items.ContainsKey(contract.FirstContractorId))
                {
                    items.Add(contract.FirstContractorId, counter);
                    counter++;
                }

                if (!items.ContainsKey(contract.SecondContractorId))
                {
                    items.Add(contract.SecondContractorId, counter);
                    counter++;
                }
            }

            if (!items.Any())
            {
                return shortestDistanceIds;
            }

            int src = items[source];
            int dest = items[destination];

            // Adjacency list for storing
            // which vertices are connected
            int verticesNumber = items.Count;

            List<List<int>> adj = new List<List<int>>(verticesNumber);
            for (int i = 0; i < verticesNumber; i++)
            {
                adj.Add(new List<int>());
            }

            // add_edge function takes adjacency list,
            // source and destination vertex
            // as argument and forms an edge
            // between them.
            foreach (Contract contract in contracts)
            {
                int firstItemValue = items[contract.FirstContractorId];
                int secondItemValue = items[contract.SecondContractorId];
                AddEdge(adj, firstItemValue, secondItemValue);
            }

            List<int> shortestDistance = FindShortestDistance(adj, src, dest, verticesNumber);
            if (shortestDistance.Any())
            {
                foreach (int item in shortestDistance)
                {
                    shortestDistanceIds.Add(items.FirstOrDefault(x => x.Value == item).Key);
                }

                shortestDistanceIds.Reverse();
            }

            return shortestDistanceIds;
        }

        // function to form edge between
        // two vertices source and dest
        private static void AddEdge(List<List<int>> adj, int i, int j)
        {
            adj[i].Add(j);
            adj[j].Add(i);
        }

        // function to print the shortest
        // distance and path between source
        // vertex and destination vertex
        private static List<int> FindShortestDistance(List<List<int>> adj, int s, int dest, int v)
        {
            // predecessor[i] array stores
            // predecessor of i and distance
            // array stores distance of i
            // from s
            int[] pred = new int[v];
            int[] dist = new int[v];

            if (BFS(adj, s, dest,
                    v, pred, dist) == false)
            {
                return new List<int>();
            }

            // List to store path
            List<int> path = new List<int>();
            int crawl = dest;
            path.Add(crawl);

            while (pred[crawl] != -1)
            {
                path.Add(pred[crawl]);
                crawl = pred[crawl];
            }

            return path;
        }

        private static bool BFS(List<List<int>> adj, int src, int dest, int v, int[] pred, int[] dist)
        {
            // a queue to maintain queue of
            // vertices whose adjacency list
            // is to be scanned as per normal
            // BFS algorithm using List of int type
            List<int> queue = new List<int>();

            // bool array visited[] which
            // stores the information whether
            // ith vertex is reached at least
            // once in the Breadth first search
            bool[] visited = new bool[v];

            // initially all vertices are
            // unvisited so v[i] for all i
            // is false and as no path is
            // yet constructed dist[i] for
            // all i set to infinity
            for (int i = 0; i < v; i++)
            {
                visited[i] = false;
                dist[i] = int.MaxValue;
                pred[i] = -1;
            }

            // now source is first to be
            // visited and distance from
            // source to itself should be 0
            visited[src] = true;
            dist[src] = 0;
            queue.Add(src);

            // bfs Algorithm
            while (queue.Count != 0)
            {
                int u = queue[0];
                queue.RemoveAt(0);

                for (int i = 0;
                         i < adj[u].Count; i++)
                {
                    if (visited[adj[u][i]] == false)
                    {
                        visited[adj[u][i]] = true;
                        dist[adj[u][i]] = dist[u] + 1;
                        pred[adj[u][i]] = u;
                        queue.Add(adj[u][i]);

                        // stopping condition (when we
                        // find our destination)
                        if (adj[u][i] == dest)
                            return true;
                    }
                }
            }
            return false;
        }
    }
}