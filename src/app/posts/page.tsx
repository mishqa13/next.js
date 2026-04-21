import Link from "next/link";

export default function PostsPage() {
  const date = new Date().toISOString();

  return (
      <div className="posts-page">
        <header className="topbar">
          <span className="topbar-logo">Lab 6</span>
          <span className="topbar-route">/posts</span>
          <Link href="/posts/create" className="topbar-link">
            + Новый пост
          </Link>
        </header>

        <div className="posts-body">
          <div className="posts-center">
            <p className="posts-label">Последнее обновление</p>
            <p className="posts-date">{date}</p>
            <p className="posts-note">
              Дата пересчитывается при каждом визите<br />
              (реализовано через <code>template.tsx</code>)
            </p>
            <Link href="/posts/create" className="create-big-link">
              <span>+</span> Написать пост
            </Link>
          </div>
        </div>
      </div>
  );
}