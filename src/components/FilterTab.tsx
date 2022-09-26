import { Tabs, Tab, Stack } from "@mui/material";

export const FilterTab = ({
  tabs,
  sx,
  defaultValue,
  onChangeTab,
}: {
  tabs: { label: string; value: number }[];
  defaultValue: number;
  sx?: Object;
  onChangeTab: (event: React.SyntheticEvent, value: number) => void;
}) => {
  return (
    <Stack sx={sx}>
      <Tabs onChange={onChangeTab} value={defaultValue}>
        {tabs.map((tab, i) => (
          <Tab key={i} label={tab.label} value={tab.value} />
        ))}
      </Tabs>
    </Stack>
  );
};
