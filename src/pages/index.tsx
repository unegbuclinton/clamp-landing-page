"use client";
import ButtonComponent from "@/components/atoms/button";
import GetAccessModalComponent from "@/components/molecules/GetAccess";
import Modal from "@/components/molecules/Modal";
import Footer from "@/components/molecules/Footer";
import { heroImg } from "@/utilities/data/heroImg";
import { useState } from "react";
import LandingNavbar from "@/components/molecules/LandingPageNav";
import Image from "next/image";
import retain from "@/assets/imgs/retain-customers.jpg";
import demo from "@/assets/imgs/demo.jpg";

export default function Home() {
  const [accessModal, setAccessModal] = useState<boolean>(false);

  return (
    <div className="overflow-auto pb-5">
      <LandingNavbar buttonClick={() => setAccessModal(true)} />
      <div className="w-full lg:max-w-[75%] my-0 mx-auto pb-4 pt-36">
        <div className="w-full flex flex-col lg:flex-row items-center gap-10 lg:h-[600px]">
          <div className="w-full px-10 lg:w-1/2">
            <h2 className="text-[48px] font-bold ">Retain your customers</h2>
            <p className="text-xl text-grey mt-5">
              Boost Customer Loyalty and Drive Repeat Purchases with Our Loyalty
              Management Platform.
            </p>

            <ButtonComponent
              text="Get early access"
              type="button"
              className="mt-5"
              onClick={() => setAccessModal(true)}
            />
          </div>
          <div className="hidden lg:block w-full lg:w-1/2 rounded-lg h-full">
            <Image
              src={retain}
              alt="happy customer"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-[10px] my-14">
          {heroImg?.map(({ url, title }, idx) => (
            <div
              key={idx}
              className="w-full p-5 border rounded-[10px] border-light-grey/20"
            >
              <Image
                src={url}
                alt=""
                className="h-[300px] rounded-[5px] w-full object-cover"
              />
              <p className="text-xl font-bold mt-2">{title}</p>
            </div>
          ))}
        </div>

        <div className="w-full flex flex-col-reverse lg:flex-row items-center gap-10 lg:h-[400px] my-14 px-10">
          <div className="w-full lg:w-1/2 rounded-lg h-full">
            <Image
              src={demo}
              alt="happy customer"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-[30px] font-bold ">
              Increase life time value.
            </h2>
            <p className="text-base text-grey mt-5">
              Ready to take your customer loyalty to the next level? Schedule a
              demo with our team today and see how Clamp Loyalty can help your
              business thrive!
            </p>
          </div>
        </div>
        <Footer />
      </div>
      {/* modal */}
      <Modal
        header="Get early access"
        isShown={accessModal}
        hide={() => setAccessModal(false)}
        className="h-fit w-full max-w-[400px]"
      >
        <GetAccessModalComponent />
      </Modal>
    </div>
  );
}
