import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { StructuredData, breadcrumbSchema } from "./StructuredData";

export interface Crumb {
  name: string;
  path: string;
}

/**
 * Visible breadcrumb trail + matching BreadcrumbList JSON-LD.
 * Improves Google's SERP rendering (site hierarchy) and internal linking.
 */
export const Breadcrumbs = ({ items }: { items: Crumb[] }) => {
  const full: Crumb[] = [{ name: "Home", path: "/" }, ...items];

  return (
    <>
      <StructuredData data={breadcrumbSchema(full)} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          {full.map((c, i) => {
            const last = i === full.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1">
                {i === 0 && <Home className="h-3.5 w-3.5" aria-hidden="true" />}
                {last ? (
                  <span aria-current="page" className="text-foreground font-medium">
                    {c.name}
                  </span>
                ) : (
                  <Link to={c.path} className="hover:text-primary transition-colors">
                    {c.name}
                  </Link>
                )}
                {!last && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};
