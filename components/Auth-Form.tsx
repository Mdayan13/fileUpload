"use client";
import React, { useState } from "react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { createAccount , signInUser} from "@/lib/actions/user.actions";
import OtpModel from "./OtpModel";

type FORM_TYPE = "sign-in" | "sign-up";
const AuthFormSChema = (formType: FORM_TYPE) => {
  return z.object({
    email: z.string().email(),
    fullName:
      formType === "sign-up"
        ? z.string().min(2).max(20)
        : z.string().optional(),
  });
};

const AuthForm = ({ type }: { type: FORM_TYPE }) => {
  const [isloading, setisloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState(null);
  const formSchema = AuthFormSChema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });
  
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setisloading(true);
    setErrorMessage("");
try {
  console.log("creating user");
  const user =
        type === "sign-up"
          ? await createAccount({
              fullName: values.fullName || "",
              email: values.email,
            })
          : await signInUser({ email: values.email });
  setAccountId(user.accountId);
} catch (error) {
  console.error("Error in handleSubmit:", error); // Log the full error
  setErrorMessage("Error while creating user: " + error);
} finally {
  setisloading(false);
}
  };
  console.log("ayansfdj")
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">
            {type === "sign-in" ? "sign-in" : "sign-up"}
          </h1>
          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="shad-form-label">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="enter your Full Name"
                        className="shad-input"
                        {...field}
                      />
                    </FormControl>
                  </div>

                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter your email"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="form-submit-button"
            disabled={isloading}
          >
            {type === "sign-in" ? "sign-in" : "sign-up"}
            {isloading && (
              <Image
                alt="loading"
                width={24}
                height={24}
                className="animate-spin ml-2"
                src="/assets/icons/loader.svg"
              />
            )}
          </Button>
          {errorMessage && <p>*{errorMessage}</p>}
          <div className="body-2 flex justify-center">
            <p>
              {type === "sign-in"
                ? "Don't have any account"
                : "Already Have an Account"}
            </p>
            <Link
              className="font-medium text-brand ml-2 "
              href={type === "sign-in" ? "/sign-up" : "sign-in"}
            >
              {type === "sign-up" ? "sign-in" : "sign-up"}
            </Link>
          </div>
        </form>
      </Form>
      {/* otp verfication */}
      {accountId && (
        <OtpModel email={form.getValues("email")} accountId={accountId} />
      )}
    </>
  );
};

export default AuthForm;
