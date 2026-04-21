"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useT } from "@/i18n/client";

type PostFormData = {
    title: string;
    body: string;
};

export default function CreatePostPage() {
    const { t } = useT("common");
    const router = useRouter();
    const { lang } = useParams();

    const schema = yup.object({
        title: yup.string().min(3, "Минимум 3 символа").required("Обязательное поле"),
        body: yup.string().min(10, "Минимум 10 символов").required("Обязательное поле"),
    }).required();

    const { register, handleSubmit, formState: { errors, isSubmitting } } =
        useForm<PostFormData>({ resolver: yupResolver(schema) });

    const onSubmit = async (data: PostFormData) => {
        await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...data, userId: 1 }),
        });
        router.push(`/${lang}/posts`);
    };

    return (
        <div className="create-page">
            <header className="topbar">
                <span className="topbar-logo">Lab 7</span>
                <span className="topbar-route">/posts/create</span>
                <div />
            </header>

            <div className="create-body">
                <div className="create-wrap">
                    <Link href={`/${lang}/posts`} className="back-link">
                        {t("create.backLink")}
                    </Link>

                    <h1 className="create-title">{t("create.title")}</h1>
                    <p className="create-subtitle">{t("create.subtitle")}</p>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="field">
                            <label>{t("create.titleField")}</label>
                            <input
                                {...register("title")}
                                placeholder={t("create.titlePlaceholder")}
                                className={errors.title ? "error" : ""}
                            />
                            {errors.title && (
                                <p role="alert" className="error-msg">{errors.title.message}</p>
                            )}
                        </div>

                        <div className="field">
                            <label>{t("create.bodyField")}</label>
                            <textarea
                                {...register("body")}
                                placeholder={t("create.bodyPlaceholder")}
                                className={errors.body ? "error" : ""}
                            />
                            {errors.body && (
                                <p role="alert" className="error-msg">{errors.body.message}</p>
                            )}
                        </div>

                        <div className="btn-row">
                            <Link href={`/${lang}/posts`} className="btn-ghost">
                                {t("create.cancel")}
                            </Link>
                            <button type="submit" disabled={isSubmitting} className="btn-primary">
                                {isSubmitting ? t("create.publishing") : t("create.publish")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}