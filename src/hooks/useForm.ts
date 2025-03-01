import { useState, ChangeEvent } from "react";

export const useForm = <T extends Record<string, unknown>>(initialValues: T) => {
  const [form, setForm] = useState({...initialValues});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    setForm({ ...form, [target.name]: target.type === "checkbox" ? target.checked : target.value });
  };
  const resetForm = () => {
    setForm({...initialValues});
  };
  const clearForm = () => {
    setForm({...initialValues});
  };

  return { form, setForm, handleChange, resetForm, clearForm };
};


