import { getAllCategoriesList, getAllTagsList, getArticleList } from '@/api/node';
import { IArticle, ICategory, ITag } from '@/types';
import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
  state: () => ({
    allTagsList: [] as ITag[],
    allCategoriesList: [] as ICategory[],
    tagsCount: 0 as number,
    categoriesCount: 0 as number,
    articlesCount: 0 as number,
    stickyArticles: [] as IArticle[],
  }),

  getters: {
    tagsIdMap: state => (
      state.allTagsList.reduce((map, tag) => {
        return {
          ...map,
          [tag.attributes.drupal_internal__tid]: {
            name: tag.attributes.name,
            color: tag.attributes.field_color,
          } 
        }
      }, {})
    ),
    categoriesIdMap: state => (
      state.allCategoriesList.reduce((map, category) => {
        return {
          ...map,
          [category.attributes.drupal_internal__tid]: category.attributes.name
        }
      }, {})
    )
  },

  actions: {
    async initTagsData (refresh = false) {
      if (this.allTagsList.length && !refresh) {
        return this.allTagsList;
      } else {
        try {
          const { data, meta } = await getAllTagsList(['name','field_color','drupal_internal__tid']);
          this.allTagsList = data;
          this.tagsCount = meta?.count ?? 0;
        } catch (error) {
          console.error('[initTagData]', error);
        }
      }
    },

    async initCategoriesData (refresh = false) {
      if (this.allCategoriesList.length && !refresh) {
        return this.allCategoriesList;
      } else {
        try {
          const { data, meta } = await getAllCategoriesList(['name', 'field_image', 'drupal_internal__tid']);
          this.allCategoriesList = data;
          this.categoriesCount = meta?.count ?? 0;
        } catch (error) {
          console.error('[initCategoriesData]', error);
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
        } catch (error) {
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
        } catch (error) {
          console.error('[initArticlesCount]', error);
        }
      }
    }
  },
});