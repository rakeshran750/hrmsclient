import { Divider, Typography, Box } from "@mui/material";

const SectionDivider = ({ title, children }) => {
    return (
<Box sx={{ position: "relative", p: 2,m:2, border: "1px dashed grey", borderRadius: 1}}>
      {/* Title positioned on the left side of the top border */}
      <Typography
        variant="overline"
        sx={{
          position: "absolute",
          top: 0,
          left: 12, // Adjust for padding
          transform: "translateY(-50%)", // Centers text on border
          backgroundColor: "white", // Matches background to avoid overlap
          px: 1, // Adds padding around text
          color: "text.secondary",
          fontWeight: "fontWeightMedium",
        }}
      >
        {title}
            </Typography>
            <Box sx={{padding:'5px'}}>
                {children}
                </Box>
    </Box>
    );
};

export default SectionDivider;
