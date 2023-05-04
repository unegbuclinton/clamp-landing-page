import AuthLayout from "@/components/layouts/authLayout";
import { authOptions } from "@/utilities/data/authoptions";
import { Card } from "antd";
import { useRouter } from "next/navigation";
import CreateCampaign from "./createCampaign";
import CreateCampaignTwo from "./createCampaign/createCampaignStep2";
export default function Home() {
  const router = useRouter();
  return (
    <>
      <CreateCampaignTwo />
    </>
  );
}
