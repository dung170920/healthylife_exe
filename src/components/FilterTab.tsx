import { Tabs, Tab, Stack } from "@mui/material";

const FilterTab = ({
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
        {tabs.map((tab) => (
          <Tab label={tab.label} value={tab.value} />
        ))}
      </Tabs>
    </Stack>
  );
};

export default FilterTab;
