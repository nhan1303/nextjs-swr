import { mockController } from "@/app/mocks/MockController";
import { IArticle, IArticleParams, IListResponse } from "@/app/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = Object.fromEntries(searchParams.entries());

  const response = await new Promise<IListResponse<IArticle>>((resolve) => {
    const mockServerResponse = mockController.getContent(
      params as unknown as IArticleParams
    );

    setTimeout(() => {
      resolve(mockServerResponse);
    }, 1000);
  });

  return (Response as any).json(response);
}
