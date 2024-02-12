import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionDetails, Button, Icon, IconButton } from "@mui/material";
import CustomTimelineDot from "src/@core/components/mui/timeline-dot";
import { Box } from "@mui/system";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineSeparator,
  timelineItemClasses,
} from "@mui/lab";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForkIcon from "@mui/icons-material/ArrowForward";
const RoutesAccordion = () => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content"
        id="panel-header"
      >
        <div className="h-5 w-5 mt-1" >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3082/3082383.png"
            alt="icon"
            onError={(e) => console.error("Image load error:", e)}
          />
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ color: "text.secondary" }}>Route Info</Typography>
          <Typography sx={{ marginTop: "-9px" }}>
            <IconButton>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Typography>
        </Box>

        <Timeline
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          <TimelineItem>
            <TimelineSeparator>
              <CustomTimelineDot skin="light" color="primary">
                <ArrowForkIcon fontSize="small" />
              </CustomTimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ mt: "7px" }}>
              <Typography sx={{ display: "flex", mr: 2, mb: 2 }} variant="h6">
                Color:{" "}
                <Box
                  sx={{
                    width: 50,
                    height: 20,
                    marginLeft: "25px",
                    borderRadius: "15%",
                  }}
                />
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "text.primary",
                  fontSize: "14px",
                }}
              >
                <span>Sites: </span>
                <Button
                  variant="contained"
                  style={{
                    marginRight: "-15px",
                    fontSize: "14px",
                    padding: "10px",
                  }}
                >
                  Add site
                </Button>
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </AccordionDetails>
    </Accordion>
  );
};

export default RoutesAccordion;
