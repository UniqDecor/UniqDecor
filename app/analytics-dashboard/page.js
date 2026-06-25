import AnalyticsDashboardClient from "./AnalyticsDashboardClient";

export const metadata = {
  title: "Analytics Performance Panel",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AnalyticsDashboardPage() {
  return <AnalyticsDashboardClient />;
}
