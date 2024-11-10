
interface BaseFilter {
  sorts?: string[];
  fields?: string[];
}

export interface BaseParams {
  pageLimit: number;
  currentPage: number;
}

interface ArticleFilter extends BaseFilter {
  categories?: string[];
  tags?: string[];
  sticky?: boolean;
}

interface ArticleLike {
  title?: string;
  body?: string;
}

export interface ArticleParams extends BaseParams {
  filter?: ArticleFilter;
  like?: ArticleLike;
}