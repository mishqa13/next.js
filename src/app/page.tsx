"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";

type RegisterFormData = {
  user_name: string;
  email: string;
  age: number;
  password: string;
  confirm_password: string;
};

const schema = yup.object({
  user_name: yup
      .string()
      .min(3, "Минимум 3 символа")
      .required("Обязательное поле"),
  email: yup
      .string()
      .email("Некорректный email")
      .required("Обязательное поле"),
  age: yup
      .number()
      .typeError("Укажите возраст")
      .positive("Должен быть положительным")
      .integer("Целое число")
      .min(1).max(120)
      .required("Обязательное поле"),
  password: yup
      .string()
      .min(6, "Минимум 6 символов")
      .required("Обязательное поле"),
  confirm_password: yup
      .string()
      .oneOf([yup.ref("password")], "Пароли не совпадают")
      .required("Обязательное поле"),
}).required();

export default function RegisterPage() {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
      useForm<RegisterFormData>({ resolver: yupResolver(schema) });

  const onSubmit = async () => {
    router.push("/posts");
  };

  return (
      <div className="register-layout">
        <div className="register-left">
          <div>
            <div className="register-logo">Next.js / Lab 6</div>
            <h1 className="register-headline">
              Добро<br />пожало<em>вать</em>
            </h1>
            <p className="register-desc">
              Создайте аккаунт, чтобы начать работу с системой публикаций.
            </p>
          </div>
          <div className="register-footer">© 2025 Lab 6 — Validation</div>
        </div>

        <div className="register-right">
          <div className="register-form-wrap">
            <div className="form-section-label">Новый аккаунт</div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="field">
                <label>Имя пользователя</label>
                <input
                    {...register("user_name")}
                    placeholder="ivan_petrov"
                    className={errors.user_name ? "error" : ""}
                />
                {errors.user_name && (
                    <p role="alert" className="error-msg">{errors.user_name.message}</p>
                )}
              </div>

              <div className="field">
                <label>Email</label>
                <input
                    {...register("email")}
                    type="email"
                    placeholder="ivan@example.com"
                    className={errors.email ? "error" : ""}
                />
                {errors.email && (
                    <p role="alert" className="error-msg">{errors.email.message}</p>
                )}
              </div>

              <div className="field">
                <label>Возраст</label>
                <input
                    {...register("age")}
                    type="number"
                    placeholder="18"
                    className={errors.age ? "error" : ""}
                />
                {errors.age && (
                    <p role="alert" className="error-msg">{errors.age.message}</p>
                )}
              </div>

              <div className="field-pair">
                <div className="field" style={{ marginBottom: 0 }}>
                  <label>Пароль</label>
                  <input
                      {...register("password")}
                      type="password"
                      placeholder="••••••"
                      className={errors.password ? "error" : ""}
                  />
                  {errors.password && (
                      <p role="alert" className="error-msg">{errors.password.message}</p>
                  )}
                </div>
                <div className="field" style={{ marginBottom: 0 }}>
                  <label>Повторите</label>
                  <input
                      {...register("confirm_password")}
                      type="password"
                      placeholder="••••••"
                      className={errors.confirm_password ? "error" : ""}
                  />
                  {errors.confirm_password && (
                      <p role="alert" className="error-msg">{errors.confirm_password.message}</p>
                  )}
                </div>
              </div>

              <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
              >
                {isSubmitting ? "Загрузка..." : "Создать аккаунт →"}
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}