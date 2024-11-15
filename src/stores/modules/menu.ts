import { getAllCategoriesList, getAllTagsList, getArticleList } from '@/api/node';
import { IArticle, ICategory, ITag } from '@/types';
import { defineStore } from 'pinia';
import Message from '@/plugins/message/message';

export const useMenuStore = defineStore('menu', {
  state: () => ({
    allTagsList: [] as ITag[],
    allCategoriesList: [] as ICategory[],
    tagsCount: 0 as number,
    categoriesCount: 0 as number,
    articlesCount: 0 as number,
    stickyArticles: [] as IArticle[],
    urlPrefix: '' as string,
    loadingTags: false as boolean,
    loadingCategories: false as boolean,
  }),

  getters: {
    tagsIdMap: state => ((
      state.allTagsList.reduce((map, tag) => {
        return {
          ...map,
          [tag.attributes.drupal_internal__tid]: {
            name: tag.attributes.name,
            color: tag.attributes.field_color,
          } 
        }
      }, {})
    ) as {[key: number]: {
      name: string,
      url: string | undefined | null,
    }}),
    categoriesIdMap: state => ((
      state.allCategoriesList.reduce((map, category) => {
        return {
          ...map,
          [category.attributes.drupal_internal__tid]: {
            name: category.attributes.name,
            url: category.attributes.field_image_link?.uri,
          }
        }
      }, {})
    ) as {[key: number]: {
      name: string,
      url: string | undefined | null,
    }})
  },

  actions: {
    async initTagsData (refresh = false) {
      if (this.allTagsList.length && !refresh) {
        return this.allTagsList;
      } else {
        this.loadingTags = true;
        try {
          const { data, meta } = await getAllTagsList(['name','field_color','drupal_internal__tid']);
          this.allTagsList = data;
          this.tagsCount = meta?.count ?? 0;
        } catch (error: any) {
          Message.error('加载标签失败: ' + error.message || error.toString());
          console.error('[initTagData]', error);
        } finally {
          this.loadingTags = false;
        }
      }
    },

    async initCategoriesData (refresh = false) {
      if (this.allCategoriesList.length && !refresh) {
        return this.allCategoriesList;
      } else {
        this.loadingCategories = true;
        try {
          const { data, meta, links } = await getAllCategoriesList(['name', 'field_image_link', 'drupal_internal__tid']);
          this.allCategoriesList = data;
          this.categoriesCount = meta?.count ?? 0;
          this.urlPrefix = links?.self?.href?.split('/jsonapi')[0] || '';
        } catch (error: any) {
          Message.error('加载分类失败: ' + error.message || error.toString());
          console.error('[initCategoriesData]', error);
        } finally {
          this.loadingCategories = false;
        }
      }
    },

    async initArticlesCount (refresh = false) {
      if (this.articlesCount &&!refresh) {
        return this.articlesCount;
      } else {
        try {
          const { meta } = await getArticleList({
            pageLimit: 1,
            currentPage: 1,
            filter: {
              fields: ['drupal_internal__nid']
            }
          });
          this.articlesCount = meta?.count ?? 0;
        } catch (error: any) {
          Message.error('加载文章总数失败: ' + error.message || error.toString());
          console.error('[initArticlesCount]', error);
        }
      }
    },

    async initStickyArticles (refresh = false) {
      if (this.stickyArticles.length && !refresh) {
        return this.stickyArticles;
      } else {
        try {
          const { data } = await getArticleList({
            pageLimit: 5,
            currentPage: 1,
            filter: {
              sticky: true,
              fields: ['title', 'drupal_internal__nid']
            }
          });
          this.stickyArticles = data;
        } catch (error: any) {
          Message.error('加载文章失败: ' + error.message || error.toString());
          console.error('[initArticlesCount]', error);
        }
      }
    }
  },
});