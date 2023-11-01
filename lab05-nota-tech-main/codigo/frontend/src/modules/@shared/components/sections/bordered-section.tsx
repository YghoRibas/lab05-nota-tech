import { DeductComponentProps } from "src/modules/@shared/domain/utils/component";
import styles from "./bordered-section.module.scss";
import { Box, Typography } from "@mui/material";

export interface BorderedSectionProps {
  icon?: JSX.Element;
  title: string;
  children?: JSX.Element;
  borderColor?: string;
  titleColor?: string;
  containerProps?: DeductComponentProps<typeof Box>;
}

function BorderedSection({ 
  icon, 
  title, 
  titleColor,
  borderColor, 
  children, 
  ...other 
}: BorderedSectionProps) {
  if(borderColor &&
    !borderColor.includes('important'))
    borderColor += '!important';

  return (
    <Box
      className={styles.mainContainer}
      sx={{ borderColor }}
      {...other.containerProps}
    >
      <Box className={styles.header}>
        <Box className={styles.headerBorderBefore} sx={{ borderColor }}></Box>

        <Box className={styles.headerTitle}>
          {icon}

          <Typography className={styles.title} sx={{ color: titleColor }}>
            {title}
          </Typography>
        </Box>

        <Box className={styles.headerBorderAfter} sx={{ borderColor }}></Box>
      </Box>
      <Box className={styles.childrenContainer}>{children}</Box>
    </Box>
  );
}

export default BorderedSection;
