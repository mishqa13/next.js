"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter, useParams } from "next/navigation";
import { Trans } from "react-i18next";
import { useT, i18nClient } from "@/i18n/client";

type RegisterFormData = {
    user_name: string;
    email: string;
    age: number;
    password: string;
    confirm_password: string;
};

export default function RegisterPage() {
    const { t } = useT("auth");
    const router = useRouter();
    const { lang } = useParams();

    const schema = yup.object({
        user_name: yup
            .string()
            .min(3, t("errors.minLength", { count: 3 }))
            .required(t("errors.required")),
        email: yup
            .string()
            .email(t("errors.invalidEmail"))
            .required(t("errors.required")),
        age: yup
            .number()
            .typeError(t("errors.required"))
            .positive(t("errors.positiveNumber"))
            .integer(t("errors.integerNumber"))
            .required(t("errors.required")),
        password: yup
            .string()
            .min(6, t("errors.minLength", { count: 6 }))
            .required(t("errors.required")),
        confirm_password: yup
            .string()
            .oneOf([yup.ref("password")], t("errors.passwordMismatch"))
            .required(t("errors.required")),
    }).required();

    const { register, handleSubmit, formState: { errors, isSubmitting } } =
        useForm<RegisterFormData>({ resolver: yupResolver(schema) });

    const onSubmit = async () => {
        router.push(`/${lang}/posts`);
    };

    return (
        <div className="register-layout">
            <div className="register-left">
                <div>
                    <div className="register-logo">Next.js / Lab 7</div>
                    <h1 className="register-headline">
                        <Trans
                            i18nKey="register.welcome"
                            ns="auth"
                            i18n={i18nClient}
                            components={{ italic: <em /> }}
                        />
                    </h1>
                    <p className="register-desc">{t("register.description")}</p>
                </div>
                <div className="register-footer">{t("register.footer")}</div>
            </div>

            <div className="register-right">
                <div className="register-form-wrap">
                    <div className="form-section-label">{t("register.formTitle")}</div>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="field">
                            <label>{t("register.username")}</label>
                            <input
                                {...register("user_name")}
                                placeholder={t("register.usernamePlaceholder")}
                                className={errors.user_name ? "error" : ""}
                            />
                            {errors.user_name && (
                                <p role="alert" className="error-msg">{errors.user_name.message}</p>
                            )}
                        </div>

                        <div className="field">
                            <label>{t("register.email")}</label>
                            <input
                                {...register("email")}
                                type="email"
                                placeholder={t("register.emailPlaceholder")}
                                className={errors.email ? "error" : ""}
                            />
                            {errors.email && (
                                <p role="alert" className="error-msg">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="field">
                            <label>{t("register.age")}</label>
                            <input
                                {...register("age")}
                                type="number"
                                placeholder={t("register.agePlaceholder")}
                                className={errors.age ? "error" : ""}
                            />
                            {errors.age && (
                                <p role="alert" className="error-msg">{errors.age.message}</p>
                            )}
                        </div>

                        <div className="field-pair">
                            <div className="field" style={{ marginBottom: 0 }}>
                                <label>{t("register.password")}</label>
                                <input
                                    {...register("password")}
                                    type="password"
                                    placeholder={t("register.passwordPlaceholder")}
                                    className={errors.password ? "error" : ""}
                                />
                                {errors.password && (
                                    <p role="alert" className="error-msg">{errors.password.message}</p>
                                )}
                            </div>
                            <div className="field" style={{ marginBottom: 0 }}>
                                <label>{t("register.confirmPassword")}</label>
                                <input
                                    {...register("confirm_password")}
                                    type="password"
                                    placeholder={t("register.confirmPlaceholder")}
                                    className={errors.confirm_password ? "error" : ""}
                                />
                                {errors.confirm_password && (
                                    <p role="alert" className="error-msg">{errors.confirm_password.message}</p>
                                )}
                            </div>
                        </div>

                        <button type="submit" disabled={isSubmitting} className="btn-primary">
                            {isSubmitting ? t("register.submitting") : t("register.submit")}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}