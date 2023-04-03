import Layout from "@/components/Layout";
import "../styles/Navbar.module.css";
export default function Home() {
  return (
    <Layout>
      <div className="h-screen font-bold flex justify-center items-center text-3xl">
        Hello Clamp
      </div>
    </Layout>
  );
}
