// export const useMatches = (
//   competitionCode: CompetitionCode
// ): UseMatchesReturn => {
//   const [matchesData, setMatchesData] = useState<ProcessedMatches>({
//     live: [],
//     upcoming: [],
//   });
//   const [currentMatchday, setCurrentMatchday] = useState<number>(0);
//   const [nextMatchday, setNextMatchday] = useState<number>(0);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [status, setStatus] = useState<
//     "idle" | "loading" | "success" | "error"
//   >("idle");

//   const fetchData = async () => {
//     try {
//       setStatus("loading");
//       setError(null);
//       setIsLoading(true);

//       const response = await axios.get<MatchesData>(
//         `/api/competitions/${competitionCode.toLowerCase()}`
//       );

//       console.log(response);
//       const {
//         processed,
//         currentMatchday: current,
//         nextMatchday: next,
//       } = processMatches(response.data);

//       setMatchesData(processed);
//       setCurrentMatchday(current);
//       setNextMatchday(next);
//       setStatus("success");
//     } catch (err: any) {
//       console.error("Error fetching data:", err);

//       if (axios.isAxiosError(err)) {
//         const errMsg =
//           err.response?.data?.message ||
//           err.message ||
//           "Failed to fetch matches";
//         console.error("Error Details:", {
//           status: err.response?.status,
//           statusText: err.response?.statusText,
//           message: errMsg,
//         });
//         setError(errMsg);
//       } else {
//         setError("An unexpected error occurred");
//       }
//       setStatus("error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();

//     // Update matches every 5 minutes (300000ms) to respect API rate limits
//     const interval = setInterval(() => {
//       fetchData();
//     }, 300000);

//     return () => {
//       clearInterval(interval);
//       setMatchesData({
//         live: [],
//         upcoming: [],
//       });
//       setCurrentMatchday(0);
//       setNextMatchday(0);
//       setError(null);
//       setIsLoading(false);
//       setStatus("idle");
//     };
//   }, [competitionCode]);

//   return {
//     matchesData,
//     currentMatchday,
//     nextMatchday,
//     error,
//     isLoading,
//     status,
//   };
// };
