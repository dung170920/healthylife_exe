import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type RHFFormProps = {
  children: React.ReactNode;
  onSubmit: () => void;
  schema: any;
  defaultValues?: Object;
};

export const RHFForm = ({
  children,
  onSubmit,
  schema,
  defaultValues = {},
}: RHFFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>;
};
