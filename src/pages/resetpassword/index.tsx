import React from "react";
import { Form, Input, Button } from "antd";
import { useRouter } from "next/router";
import ButtonComponent from "@/components/atoms/button";
import AuthLayout from "@/components/layouts/authLayout";

const ResetPassword = () => {
  const router = useRouter();
  return (
    <AuthLayout>
      <Form requiredMark="optional" className="max-w-[463px] ">
        <h1 className="text-2xl font-medium mb-2">Reset your password?</h1>
        <p className="text-dim-grey mb-[44px]">
          Make sure it is something you won’t forget
        </p>
        <Form.Item
          className="mb-2 text-dim-grey"
          name="password"
          label="New Pasword"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[
            { required: true, message: "Please input your new password" },
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

export default ResetPassword;
