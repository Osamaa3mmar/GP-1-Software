import { ScheduleComponent , Inject , Week } from "@syncfusion/ej2-react-schedule";
export default function CartSchedule() {
  return (
    <ScheduleComponent
      height="550px"
      width="100%"
      // selectedDate={new Date(2023, 9, 1)}
    >
      <Inject services={ [Week] } />
    </ScheduleComponent>
  );
}