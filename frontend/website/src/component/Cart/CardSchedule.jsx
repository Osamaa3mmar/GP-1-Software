// components/CardSchedule.jsx
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  ResourcesDirective,
  ResourceDirective,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import { useEffect, useState } from "react";
import { Box, Typography, Alert } from "@mui/material";
import PropTypes from "prop-types";

const CardSchedule = ({ cartItems = [] }) => {
  const [conflicts, setConflicts] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    if (!cartItems.length) return;

    const detectConflicts = (items) => {
      const conflicts = [];
      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          const course1 = items[i].course;
          const course2 = items[j].course;
          if (!course1.schedule || !course2.schedule) continue;
          const course1Start = new Date(course1.schedule.start);
          const course1End = new Date(course1.schedule.end);
          const course2Start = new Date(course2.schedule.start);
          const course2End = new Date(course2.schedule.end);

          if (
            (course1Start <= course2End && course1End >= course2Start) ||
            (course2Start <= course1End && course2End >= course1Start)
          ) {
            conflicts.push({
              course1: items[i].course.title,
              course2: items[j].course.title,
            });
          }
        }
      }
      return conflicts;
    };

    const newResources = cartItems.map((item) => ({
      Id: item.course.id,
      Name: item.course.title,
      Color: "#ff5722",
    }));

    setResources(newResources);
    setConflicts(detectConflicts(cartItems));
  }, [cartItems]);

  if (!cartItems.length) {
    return (
      <Box sx={{ p: 3, boxShadow: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Course Schedule
        </Typography>
        <Typography color="text.secondary">No courses in cart yet.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, boxShadow: 3, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Course Schedule
      </Typography>
      {conflicts.length > 0 && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Time conflicts detected between:{" "}
          {conflicts.map((c) => `${c.course1} and ${c.course2}`).join(", ")}
        </Alert>
      )}
      <ScheduleComponent
        height="550px"
        currentView="Week"
        selectedDate={new Date()}
        eventSettings={{
          dataSource: cartItems.map((item) => ({
            Id: item.course.id,
            Subject: item.course.title,
            StartTime: new Date(item.course.schedule.start),
            EndTime: new Date(item.course.schedule.end),
            ResourceID: item.course.id,
          })),
        }}
        group={{ resources: ["Resources"] }}
      >
        <ResourcesDirective>
          <ResourceDirective
            field="ResourceID"
            title="Resources"
            name="Resources"
            dataSource={resources}
            textField="Name"
            idField="Id"
            colorField="Color"
          />
        </ResourcesDirective>
        <ViewsDirective>
          <ViewDirective
            option="Week"
            showWeekend={false}
            startHour="08:00"
            endHour="22:00"
          />
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </Box>
  );
};

CardSchedule.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      course: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        title: PropTypes.string.isRequired,
        schedule: PropTypes.shape({
          start: PropTypes.string.isRequired,
          end: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    })
  ),
};

CardSchedule.defaultProps = {
  cartItems: [],
};

export default CardSchedule;
