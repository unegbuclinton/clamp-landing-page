import AuthLayout from "@/components/layouts/authLayout";
import { authOptions } from "@/utilities/data/authoptions";
import { Card } from "antd";
import { useRouter } from "next/navigation";
import CreateCampaign from "./createCampaign";
import CreateCampaignTwo from "./createCampaign/createCampaignStep2";
export default function Home() {
  const router = useRouter();
  return (
    // <AuthLayout>
    //   {authOptions?.map(({ title, subtitle, route }, idx) => (
    //     <Card
    //       key={idx}
    //       onClick={() => router.push(route)}
    //       className="w-[462px] cursor-pointer hover:bg-gray-50"
    //     >
    //       <h1 className="font-semibold"> {title}</h1>
    //       <p className="text-dim-grey">{subtitle}</p>
    //     </Card>
    //   ))}
    // </AuthLayout>
    <>
      <CreateCampaignTwo />
    </>
  );
}
