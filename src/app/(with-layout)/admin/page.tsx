import { getNewUsersStats, getPurchasedCoursesStats } from "@/actions/stats";
import { StatsCharts } from "@/components/admin/stats.charts";

export default async function AdminPage() {
  const newUsersStats = await getNewUsersStats();
  const purchasedCoursesStats = await getPurchasedCoursesStats();

  return (
    <StatsCharts
      newUsersStats={newUsersStats}
      purchasedCoursesStats={purchasedCoursesStats}
    />
  );
}
