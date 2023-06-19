import ButtonComponent from "@/components/atoms/button";
import AuthLayout from "@/components/layouts/authLayout";
import { Form, Input, Button } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignUp = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const router = useRouter();
  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <AuthLayout>
      <Form
        onFinish={onFinish}
        requiredMark="optional"
        className="max-w-[463px] pt-8 pb-5"
      >
        <h1 className="text-2xl font-medium mb-2">Create your clamp account</h1>
        <p className="text-dim-grey mb-[44px]">
          Let’s get you set up in 6 minutes
        </p>
        <Form.Item
          className="mb-2 text-dim-grey"
          name="companyName"
          label="Company Name"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[
            { required: true, message: "Please input your company name!" },
            { min: 4, message: "Username must be at least 4 characters!" },
          ]}
        >
          <Input className="py-2 px-8" />
        </Form.Item>

        <Form.Item
          className="mb-2 text-dim-grey"
          name="firstName"
          label="First Name"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[
            { required: true, message: "Please input your first name!" },
            { min: 4, message: "Username must be at least 4 characters!" },
          ]}
        >
          <Input className="py-2 px-8" />
        </Form.Item>
        <Form.Item
          className="mb-2 text-dim-grey"
          name="lastName"
          label="Last Name"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[
            { required: true, message: "Please input your first name!" },
            { min: 4, message: "Username must be at least 4 characters!" },
          ]}
        >
          <Input className="py-2 px-8" />
        </Form.Item>
        <Form.Item
          className="mb-2 text-dim-grey"
          name="country"
          label="Country"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[
            { required: true, message: "Please input your last name!" },
            { min: 4, message: "Username must be at least 4 characters!" },
          ]}
        >
          <Input className="py-2 px-8" />
        </Form.Item>
        <Form.Item
          className="mb-2 text-dim-grey"
          name="phone"
          label="Phone"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[
            { required: true, message: "Please input your country!" },
            { min: 4, message: "Username must be at least 4 characters!" },
          ]}
        >
          <Input className="py-2 px-8" />
        </Form.Item>
        <Form.Item
          className="mb-2 text-dim-grey"
          name="email"
          label="Email"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[
            { required: true, message: "Please input your email address!" },
            { min: 4, message: "Username must be at least 4 characters!" },
          ]}
        >
          <Input className="py-2 px-8" />
        </Form.Item>
        <Form.Item
          className="mb-2 text-dim-grey"
          name="password"
          label="Password"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[
            { required: true, message: "Please input your username!" },
            { min: 4, message: "Username must be at least 4 characters!" },
          ]}
        >
          <Input.Password
            className="py-2 px-8"
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
        <ButtonComponent
          type="submit"
          text=" Sign Up with Email"
          className="w-full mt-6"
        />

        <p className="p-3">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/signin")}
            className="font-semibold hover:underline cursor-pointer"
          >
            Sign into your clamp account
          </span>
        </p>
      </Form>
    </AuthLayout>
  );
};

export default SignUp;
