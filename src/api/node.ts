import { ArticleParams } from "@/types";
import { handleFieldsOption, handleFilterOption, handleLikeOption, handlePageOption, handleSortsOption, handleStickyOption } from "@/util/apiOptHandler";
import axios from "@/plugins/axios";

export const getArticleList = async (params: ArticleParams) => {
  const { pageLimit, currentPage, filter, like } = params;
  let query = handlePageOption('?', { pageLimit, currentPage });
  query = handleFieldsOption(query, 'node--article', filter?.fields);
  query = handleSortsOption(query, filter?.sorts);
  query = handleFilterOption(query, 'category', '%3D', filter?.categories);
  query = handleFilterOption(query, 'tags', 'IN', filter?.tags);
  query = handleLikeOption(query, 'title', like?.title, true);
  query = handleLikeOption(query, 'body.value', like?.body, !like?.title);
  query = handleStickyOption(query, filter?.sticky);
  if (query.slice(-1) === '&') query = query.slice(0, -1);

  return axios({
    url: `/api/node/article${query}`,
    method: 'GET',
  });
}

export const getAllTagsList = async (fileds: string[]) => {
  let query = handleFieldsOption('?', 'taxonomy_term--tags', fileds);
  if (query.slice(-1) === '&') query = query.slice(0, -1);

  return axios({
    url: `/api/taxonomy_term/tags${query}`,
    method: 'GET',
  });
}

export const getAllCategoriesList = async (fileds: string[]) => {
  let query = handleFieldsOption('?', 'taxonomy_term--field_category', fileds);
  if (query.slice(-1) === '&') query = query.slice(0, -1);

  return axios({
    url: `/api/taxonomy_term/field_category${query}`,
    method: 'GET',
  });
}