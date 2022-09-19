import { Box, Typography, Breadcrumbs as MUIBreadcrumbs } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";
import { LinkModel } from "models";

type HeaderBreadcumbsProps = {
  links: LinkModel[];
  action?: React.ReactNode;
  heading: string;
  sx?: Object;
};

export const HeaderBreadcumbs = ({
  links,
  action,
  heading,
  sx,
  ...props
}: HeaderBreadcumbsProps) => {
  const currentLink = links[links.length - 1].name;

  const listActiveLast = links.map((link) => (
    <Box
      key={link.name}
      sx={{
        fontSize: 14,
        color: "primary.main",
      }}
    >
      {link.name !== currentLink && link.to ? (
        <Link to={link.to}>{link.name}</Link>
      ) : (
        <Typography
          sx={{
            fontSize: "inherit",
            maxWidth: 260,
            overflow: "hidden",
            whiteSpace: "nowrap",
            color: "grey.600",
            textOverflow: "ellipsis",
          }}
        >
          {currentLink}
        </Typography>
      )}
    </Box>
  ));

  return (
    <Box sx={{ mb: 5, ...sx }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom fontWeight={600}>
            {heading}
          </Typography>

          <MUIBreadcrumbs
            sx={{ color: "primary.main" }}
            separator={<HiChevronRight />}
            {...props}
          >
            {listActiveLast}
          </MUIBreadcrumbs>
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Box>
    </Box>
  );
};
