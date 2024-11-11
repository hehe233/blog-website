export interface IRelationShipFieldData {
  id: string;
  type: string;
  meta: {
    drupal_internal__target_id: number;
  }
}
export interface IArticle {
  id: string;
  type: string;
  attributes: {
    title: string;
    created: string;
    changed: string;
    drupal_internal__nid: number;
    // drupal_internal__vid: number;
    sticky: boolean;
    body: {
      value: string;
      summary: string;
    }
  },
  relationships: {
    field_tags: {
      data: IRelationShipFieldData[];
    };
    field_category: {
      data: IRelationShipFieldData;
    };
  }
}

export interface ITag {
  id: string;
  type: string;
  attributes: {
    name: string;
    drupal_internal__tid: number;
    field_color: string;
    revision_created: string;
    changed: string;
    description?: string;
  }
}

export interface ICategory{
  id: string;
  type: string;
  attributes: {
    name: string;
    drupal_internal__tid: number;
    revision_created: string;
    changed: string;
    description?: string;
    field_image_link: {
      uri: string;
    } | null;
  }
}