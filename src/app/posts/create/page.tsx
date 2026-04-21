"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";

type PostFormData = {
  title: string;
  body: string;
};

const schema = yup.object({
  title: yup.string().min(3, "Минимум 3 символа").required("Обязательное поле"),
  body: yup.string().min(10, "Минимум 10 символов").required("Обязательное поле"),
}).required();

export default function CreatePostPage() {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
      useForm<PostFormData>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: PostFormData) => {
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, userId: 1 }),
    });
    router.push("/posts");
  };

  return (
      <div className="create-page">
        <header className="topbar">
          <span className="topbar-logo">Lab 6</span>
          <span className="topbar-route">/posts/create</span>
          <div />
        </header>

        <div className="create-body">
          <div className="create-wrap">
            <Link href="/posts" className="back-link">← /posts</Link>

            <h1 className="create-title">Новый пост</h1>
            <p className="create-subtitle">
              POST → <code>jsonplaceholder.typicode.com/posts</code>
            </p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="field">
                <label>Заголовок</label>
                <input
                    {...register("title")}
                    placeholder="Введите заголовок поста"
                    className={errors.title ? "error" : ""}
                />
                {errors.title && (
                    <p role="alert" className="error-msg">{errors.title.message}</p>
                )}
              </div>

              <div className="field">
                <label>Содержание</label>
                <textarea
                    {...register("body")}
                    placeholder="Текст поста..."
                    className={errors.body ? "error" : ""}
                />
                {errors.body && (
                    <p role="alert" className="error-msg">{errors.body.message}</p>
                )}
              </div>

              <div className="btn-row">
                <Link href="/posts" className="btn-ghost">Отмена</Link>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                >
                  {isSubmitting ? "Отправка..." : "Опубликовать →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}