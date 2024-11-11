import { BaseParams } from "@/types";

export function filterGroupString(name: string, path: string, operator: string, value: string | number) {
  return `filter[${name}-filter][condition][path]=${path}&
          filter[${name}-filter][condition][operator]=${operator}&
          filter[${name}-filter][condition][value]=${value}&`
}

export function handlePageOption(query: string, options: BaseParams) {
  const { pageLimit, currentPage } = options;
  return `${query}page[limit]=${pageLimit ?? 10}&page[offset]=${((currentPage ?? 1) - 1) * (pageLimit ?? 10)}&`;
}

export function handleSortsOption(query: string, sorts: string[] | undefined) {
  if (!sorts || !sorts.length) return query;
  return `${query}${sorts.map((sort) => `sort=${sort}`).join('&')}&`;
}

export function handleFieldsOption(query: string, type: string, fields: string[] | undefined) {
  if (!fields ||!fields.length) return query;
  return `${query}fields[${type}]=${fields.join(',')}&`;
}

export function handleFilterOption(query: string, type: string, operator: string, filters: string[] | number[] | undefined) {
  if (!filters ||!filters.length) return query;
  return `${query}filter[${type}-group][group][conjunction]=OR&
          ${filters.map((filter,index) => `
          ${filterGroupString(`${type}-${index}`, `field_${type}.meta.drupal_internal__target_id`, operator, filter)}
          &filter[${type}-${index}][condition][memberOf]=${type}-group
          `)}`;
}

export function handleLikeOption(query: string, type: string, like: string | undefined) {
  if (!like) return query;
  return `${query}${filterGroupString(type, type, 'STARTS_WITH', like)}`;
}

export function handleStickyOption(query: string, sticky: boolean | undefined) {
  if (!sticky) return query;
  return `${query}${filterGroupString('sticky', 'sticky', '%3D', 1)}`;
}