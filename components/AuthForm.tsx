"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "./ui/button";
import CustomInput from "./CustomInput";
import { Loader2 } from "lucide-react";

const authFormSchemaMaker = (type: string) =>
  z.object({
    email: z.string().email(),
    password: z.string().min(4).max(10),
    dateOfBirth: type == "sign-in" ? z.string().optional() : z.string().min(3),
    firstName: type == "sign-in" ? z.string().optional() : z.string().min(3),
    lastName: type == "sign-in" ? z.string().optional() : z.string().min(3),
    address: type == "sign-in" ? z.string().optional() : z.string().max(50),
    state:
      type == "sign-in" ? z.string().optional() : z.string().min(2).max(20),
    postalCode:
      type == "sign-in" ? z.string().optional() : z.string().min(6).max(6),
    ssn: type == "sign-in" ? z.string().optional() : z.string().min(3),
  });

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = authFormSchemaMaker(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(values);
  }
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link
          href="/"
          className=" cursor-pointer flex items-center gap-1 px-4 "
        >
          <Image src={"/icons/logo.svg"} width={34} height={34} alt="Logo" />
          <span className="2xl:text-[26px] font-ibm-plex-serif text-[26px] font-bold text-black-1 block">
            Horizon
          </span>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <span className="text-[24px] lg:text-4xl font-semibold text-gray-900 ">
            {user ? "Link account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <span className="block text-base font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </span>
          </span>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">PLAID</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      formControl={form.control}
                      name={"firstName"}
                      label={"First Name"}
                      placeholder={"Enter your first name"}
                      type={"text"}
                    />
                    <CustomInput
                      formControl={form.control}
                      name={"lastName"}
                      label={"Last Name"}
                      placeholder={"Enter your last name"}
                      type={"text"}
                    />
                  </div>
                  <CustomInput
                    formControl={form.control}
                    name={"address"}
                    label={"Address"}
                    placeholder={"Enter your Address"}
                    type={"text"}
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      formControl={form.control}
                      name={"state"}
                      label={"State"}
                      placeholder={"Ex. West Bengal"}
                      type={"text"}
                    />
                    <CustomInput
                      formControl={form.control}
                      name={"postalCode"}
                      label={"Postal Code"}
                      placeholder={"Ex. 700141"}
                      type={"text"}
                    />
                  </div>

                  <div className="flex gap-4">
                    <CustomInput
                      formControl={form.control}
                      name={"dateOfBirth"}
                      label={"Date of Birth"}
                      placeholder={"YYYY-MM-DD"}
                      type={"text"}
                    />
                    <CustomInput
                      formControl={form.control}
                      name={"ssn"}
                      label={"SSN"}
                      placeholder={"Ex. 1234"}
                      type={"text"}
                    />
                  </div>
                </>
              )}
              <CustomInput
                formControl={form.control}
                name={"email"}
                label={"Email"}
                placeholder={"Enter your email"}
                type={"text"}
              />

              <CustomInput
                formControl={form.control}
                name={"password"}
                label={"Password"}
                placeholder={"Enter your password"}
                type={"password"}
              />
              <div className="flex  flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      &nbsp; Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-sm font-normal text-gray-800">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account"}
            </p>
            <Link
              className="text-sm cursor-pointer font-medium text-bankGradient"
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
