import { IArticle, IArticleParams, IListResponse } from "@/app/types";
import { faker } from "@faker-js/faker";

const generateContents = ({ length = 100 }): IArticle[] => {
  const contents = Array.from({ length }).map((_, index: number) => {
    const contentId = (index + 1).toString().padStart(3, "0");

    return {
      id: `${contentId}__${faker.random.alpha(10)}`,
      title: `${contentId}__${faker.address.cardinalDirection()} ${faker.address.cityName()}`,
    };
  });

  return contents;
};

export const mockController = {
  mockContents: generateContents({ length: 100 }),
  getContent(params: IArticleParams): IListResponse<IArticle> {
    const filteredContents = this.mockContents.filter((item: IArticle) => {
      if (!params?.filters) return true;

      return item.title.includes(params?.filters);
    });

    const totalItems = filteredContents.length;

    const from = Number(params.offset);
    const to = Math.min(
      Number(params.offset) + Number(params.limit),
      totalItems
    );

    return {
      contents: filteredContents.slice(from, to),
      offset: Number(params.offset),
      limit: Number(params.limit),
      totalCount: totalItems,
    };
  },
};

mockController.mockContents;
