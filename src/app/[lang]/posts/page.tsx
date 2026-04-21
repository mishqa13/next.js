import Link from "next/link";
import { getT } from "@/i18n/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default async function PostsPage({
                                          params,
                                        }: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const { t } = await getT("common", lang);

  const date = new Date().toISOString();
  const count = 42;
  const postsCountText = t("posts.postsCount", { count });

  return (
      <div className="posts-page">
        <header className="topbar">
          <span className="topbar-logo">Lab 7</span>
          <span className="topbar-route">/posts</span>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <LanguageSwitcher />
            <Link href={`/${lang}/posts/create`} className="topbar-link">
              + {t("nav.createPost")}
            </Link>
          </div>
        </header>

        <div className="posts-body">
          <div className="posts-center">
            <p className="posts-eyebrow">{t("posts.lastUpdated")}</p>
            <p className="posts-date">{date}</p>
            <div className="posts-divider" />
            <p className="posts-note">
              {t("posts.templateNote_text")}{" "}
              <code>template.tsx</code>
            </p>
            <p className="posts-note">{postsCountText}</p>
            <Link href={`/${lang}/posts/create`} className="create-big-link">
              <span>+</span> {t("posts.writePost")}
            </Link>
          </div>
        </div>
      </div>
  );
}