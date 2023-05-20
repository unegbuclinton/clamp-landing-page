import ButtonComponent from "@/components/atoms/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter();
  return (
    <>
      <h1>This is the landing Page </h1>
      <ButtonComponent
        text="Get started"
        type="button"
        onClick={() => route.push("/overview")}
      />
    </>
  );
}
