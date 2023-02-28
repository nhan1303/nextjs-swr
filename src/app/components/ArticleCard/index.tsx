import { IArticle } from "@/app/types";
import { Box, Card, Stack } from "@mui/material";
import React from "react";

export interface IArticleCardProps {
  data: IArticle;
}

export const ArticleCard: React.FC<IArticleCardProps> = ({ data }) => {
  return (
    <Card variant="outlined">
      <Stack
        sx={{
          width: "300px",
          height: "100px",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",

          backgroundColor: "green",
        }}
      >
        <Box>
          {`Id: `}
          <h4>{`${data.id}`}</h4>
        </Box>
        <Box>{`Title: ${data.title}`}</Box>
      </Stack>
    </Card>
  );
};
