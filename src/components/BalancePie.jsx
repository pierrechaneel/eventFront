// balance pie defintion

import { useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";

const BalancePie = ({ data }) => {
  const theme = useTheme();

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLabel={(d) => `${d.value} GB`}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={(d) => `${d.color}`}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={theme.palette.common.white}
      colors={[theme.palette.primary.main, theme.palette.common.black]}
      arcLinkLabel={(d) => `${d.label}`}
    />
  );
};

export default BalancePie;
