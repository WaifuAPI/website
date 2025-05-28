import Link from "next/link";

export default function SubHeader({ breadcrumbs }) {
  return (
    <div className="border-t border-gray-600 bg-slate-800 text-gray-300 px-6 py-3 shadow-md">
      <nav className="text-sm">
        <ol className="flex space-x-2">
          {breadcrumbs.map((crumb, index) => (
            <li
              key={index}
              className={`breadcrumb-item ${
                index === breadcrumbs.length - 1
                  ? "text-white font-semibold"
                  : ""
              }`}
            >
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-sky-300 hover:text-gray-100 transition duration-200"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span>{crumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && (
                <span className="mx-2 text-gray-500">/</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
