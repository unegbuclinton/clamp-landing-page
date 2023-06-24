import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import AuthLayout from "@/components/layouts/authLayout";
import {
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiOutlineUnlock,
} from "react-icons/ai";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);
  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };

  return (
    <AuthLayout>
      <Form requiredMark="optional" className="max-w-[463px] pt-20">
        <h1 className="text-2xl font-medium mb-2">Sign In your account</h1>
        <p className="text-dim-grey mb-[44px]">
          Welcome back, enter your details to access your account
        </p>
        <Form.Item
          className="mb-2 text-dim-grey"
          name="email"
          label="Email Address"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[
            { required: true, message: "Please input your company name!" },
            { min: 4, message: "Username must be at least 4 characters!" },
          ]}
        >
          <Input className="py-4 px-8" />
        </Form.Item>

        <Form.Item
          className="mb-2 text-dim-grey"
          name="password"
          label="Password"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[
            { required: true, message: "Please input your Password!" },
            // { min: 4, message: "Username must be at least 4 characters!" },
          ]}
        >
          <Input.Password
            className="py-4 px-8"
            placeholder="**********"
            type={visible ? "text" : "password"}
            iconRender={
              visible
                ? () => (
                    <AiOutlineEyeInvisible
                      onClick={toggleVisibility}
                      className="cursor-pointer"
                    />
                  )
                : () => (
                    <AiOutlineEye
                      onClick={toggleVisibility}
                      className="cursor-pointer"
                    />
                  )
            }
          />
        </Form.Item>
        <div
          onClick={() => router.push("/forgotpassword")}
          className="flex items-center w-fit transition duration-200 cursor-pointer font-normal text-sm rounded-lg text-black hover:text-charcoal hover:underline"
        >
          <AiOutlineUnlock color="#000" />
          <span className="inline-block ml-1">Forgot Password ?</span>
        </div>
        <Button
          type="primary"
          htmlType="submit"
          className="bg-black w-full h-16 mt-6 text-white"
        >
          Login
        </Button>
      </Form>
      <p className="">
        Don’t have an account?{" "}
        <span
          onClick={() => router.push("/signup")}
          className="font-semibold hover:underline cursor-pointer"
        >
          Create your clamp account
        </span>
      </p>
    </AuthLayout>
  );
};

export default SignIn;
