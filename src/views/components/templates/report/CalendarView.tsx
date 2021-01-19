export default  () => null
// import React from 'react'
// import FullCalendar, { EventInput } from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
// import InputTitle from 'views/components/molecules/report/InputTitle';
// import CalendarEvent from 'views/components/organisms/report/CalendarEvent';

// type Props = {
//     events: EventInput[]
//     setEvents: React.Dispatch<React.SetStateAction<EventInput[]>>
// }

// export default function CalendarView(props: Props){
//     function handleDateClick(arg: DateClickArg){ // bind with an arrow function
//         console.log(JSON.stringify(arg.dateStr))
//     }
//     return (
//         <div>
//             <FullCalendar
//                 plugins={[ dayGridPlugin, interactionPlugin ]}
//                 initialView="dayGridMonth"
//                 dateClick={handleDateClick}
//                 events={props.events}
//                 eventContent={(CalendarEvent)}
//             />
//             <InputTitle onChange={(event:any)=> console.log(event)}/>
//         </div>
//     )
// }