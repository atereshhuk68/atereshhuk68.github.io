import { DEFAULT_LANG } from "@/constants/langs";
import { breadcrumbs } from "@/i18n/i18n-breadcrumbs";
import { type Locales } from "@/types";
import { getCollection } from "astro:content";
import { type BreadcrumbItem } from "node_modules/astro-breadcrumbs/src/breadcrumbs.types";

type BreadcrumbsBuilderOptions = {
  currentPath: string;
  currentLang: string;
  isPageLangVersion?: boolean;
};

const getPathSegmentsCount = (path: string): number => {
  return path.split("/").filter((item) => item.length).length;
};

const getLatestPathSegment = (path: string): string => {
  return (
    path
      .split("/")
      .filter((item) => item.length)
      .at(-1) || ""
  );
};

export const breadcrumbsBuilder = async ({
  currentPath,
  currentLang,
}: BreadcrumbsBuilderOptions): Promise<BreadcrumbItem[]> => {
  const homePageText = breadcrumbs.home[currentLang as Locales];

  const isJobsPage = currentPath.includes("jobs");

  const isPrivacyPolicyPage = currentPath.includes("privacy-policy");

  if (isJobsPage) {
    const jobsPageText = breadcrumbs.jobs[currentLang as Locales];

    const maxJobsPathSegments = DEFAULT_LANG === currentLang ? 2 : 3;

    if (getPathSegmentsCount(currentPath) >= maxJobsPathSegments) {
      const jobsCollection = await getCollection("jobs");

      const jobEntry = jobsCollection.find((post) =>
        post.id.includes(getLatestPathSegment(currentPath)),
      );

      const jobTitle = jobEntry?.data.title;

      if (jobTitle) {
        return [
          homePageText,
          jobsPageText,
          { text: jobTitle, href: currentPath },
        ];
      }
    }

    return [homePageText, jobsPageText];
  }

  if (isPrivacyPolicyPage) {
    const privacyPolicyPageText =
      breadcrumbs.privacyPolicy[currentLang as Locales];

    console.log(privacyPolicyPageText);

    return [homePageText, privacyPolicyPageText];
  }

  return [homePageText];
};
