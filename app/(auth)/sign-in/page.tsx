import AuthForm from "@/components/AuthForm";
import React from "react";

const Signin = () => {
  return (
    <section className="flex items-center justify-center  max-sm:px-6">
      <AuthForm type="sign-in" />
    </section>
  );
};

export default Signin;
