import HomeBanner from "../components/HomeBanner";
import ListCategory from "../components/ListCategory";

export default function Home() {
  return (
    <div className="w-full gap-4">
      <HomeBanner />
      <ListCategory />
    </div>
  );
}
