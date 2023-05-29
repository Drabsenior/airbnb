"use client";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import useRegisterModal from "@/app/hooks/userRegisterModal";
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";

import { signIn } from "next-auth/react";
const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => registerModal.onClose)
      .catch((error) => {
        toast.error("Somthing went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        register={register}
        errors={errors}
        required
      />
    </div>
  );
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Coutinue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Coutinue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row justify-center items-center gap-2">
          <div>Aleady have an account?</div>
          <div
            className="text-neutral-800 cursor-pointer hover:underline  "
            onClick={registerModal.onClose}
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      title="Register"
      isOpen={registerModal.isOpen}
      actionLabel="Coutinue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />

    // <Modal isOpen title="hellow world" actionLabel="Submit" />
  );
};

export default RegisterModal;
