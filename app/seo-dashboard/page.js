import SeoDashboardClient from "./SeoDashboardClient";

export const metadata = {
  title: "SEO Auditing Panel",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SeoDashboardPage() {
  return <SeoDashboardClient />;
}
