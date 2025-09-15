import Link from "next/link";
import AccountBalanceOutlined from "@mui/icons-material/AccountBalanceOutlined";
import LanguageOutlined from "@mui/icons-material/LanguageOutlined";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import WorkOutline from "@mui/icons-material/WorkOutline";
import TravelExploreOutlined from "@mui/icons-material/TravelExploreOutlined";

function Item({
  href,
  label,
  color,
  icon
}: {
  href: string;
  label: string;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center justify-center gap-4 px-6 py-12 text-center hover:bg-white/50 transition"
    >
      <div style={{ color }}>
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-current/30">
          <div className="text-4xl">{icon}</div>
        </div>
      </div>
      <div className="text-lg md:text-xl font-medium text-neutral-700">{label}</div>
    </Link>
  );
}

export default function ServiceIconGrid() {
  return (
    <div className="rounded-xl border overflow-hidden bg-[#F7F3EE]/80 backdrop-blur">
      <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-neutral-300">
        <Item
          href="/studium"
          label="Studium"
          color="#6AA4B3"
          icon={<AccountBalanceOutlined fontSize="inherit" />}
        />
        <Item
          href="/sprachkurs"
          label="Sprachkurs"
          color="#4B4B4B"
          icon={<LanguageOutlined fontSize="inherit" />}
        />
        <Item
          href="/aupair"
          label="Au-Pair"
          color="#B061C5"
          icon={
            <span className="relative inline-flex">
              <HomeOutlined fontSize="inherit" />
              <FavoriteBorder fontSize="inherit" className="absolute -bottom-1 -right-1 scale-75" />
            </span>
          }
        />
        <Item
          href="/arbeit"
          label="Arbeit"
          color="#7285D6"
          icon={<WorkOutline fontSize="inherit" />}
        />
        <Item
          href="/reise"
          label="Reise"
          color="#333333"
          icon={<TravelExploreOutlined fontSize="inherit" />}
        />
      </div>
    </div>
  );
}
