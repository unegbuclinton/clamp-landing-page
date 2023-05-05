import React from "react";
import { Form, Input, Button } from "antd";
import { useRouter } from "next/router";
import ButtonComponent from "@/components/atoms/button";
import AuthLayout from "@/components/layouts/authLayout";

const ForgotPassword = () => {
  const router = useRouter();
  return (
    <AuthLayout>
      <Form requiredMark="optional" className="max-w-[463px] ">
        <h1 className="text-2xl font-medium mb-2">Forgot your password?</h1>
        <p className="text-dim-grey mb-[44px]">
          Enter the email address associated with your account and we’ll send
          you a link to reset your password.
        </p>
        <Form.Item
          className="mb-2 text-dim-grey"
          name="email"
          label="Email Address"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[
            { required: true, message: "Please input your Email Address!" },
            { min: 4, message: "Username must be at least 4 characters!" },
          ]}
        >
          <Input className="py-4 px-8" />
        </Form.Item>

        <ButtonComponent
          text="Send reset link"
          type="submit"
          className="mt-6 w-full"
          height="h-16"
        />
      </Form>

      <span
        onClick={() => router.push("/signin")}
        className="font-semibold hover:underline cursor-pointer"
      >
        Return to log in
      </span>
    </AuthLayout>
  );
};

export default ForgotPassword;
