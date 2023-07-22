import engageCustomerImg from "@/assets/imgs/engage-customers.jpg";
import customer from "@/assets/imgs/customers.jpg";
import purchase from "@/assets/imgs/purchase.jpg";
import { StaticImageData } from "next/image";

export const heroImg: Array<{
  url: string | StaticImageData;
  title: string;
  alt: string;
}> = [
  {
    url: customer,
    title: "Increase Customer Retention",
    alt: "customer retention",
  },
  {
    url: purchase,
    title: "Drive Repeat Purchases",
    alt: "purchase",
  },
  {
    url: engageCustomerImg,
    title: "Enagage your customers",
    alt: "engagement",
  },
];
