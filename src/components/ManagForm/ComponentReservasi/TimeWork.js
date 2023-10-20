import React from "react";

const dayNames = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

function generateTimeSlots(startTime, endTime, timeSlotLength) {
  const timeSlots = [];
  const start = new Date(`2023-10-05T${startTime}`);
  const end = new Date(`2023-10-05T${endTime}`);
  const step = timeSlotLength * 60000; // 15 minutes in milliseconds

  for (let time = start; time < end; time.setTime(time.getTime() + step)) {
    const formattedTime = time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    timeSlots.push(formattedTime);
  }

  return timeSlots;
}

function ClinicSchedule({ timeWork }) {
  return (
    <div>
      {timeWork.map((clinicWorkTime) => {
        const dayNum = parseInt(clinicWorkTime.day_num);
        const timeStart = clinicWorkTime.time_start_1;
        const timeEnd = clinicWorkTime.time_end_1;

        const dayName = dayNames[dayNum];
        const timeSlots = generateTimeSlots(
          timeStart,
          timeEnd,
          parseInt(clinicWorkTime.res_time_slot_length)
        );

        return (
          <div key={clinicWorkTime.id}>
            <div className="row">
              <div className="col-md-4 d-flex align-items-center justify-content-center">
                <div className="p-2 text-align-center">
                  <span>{dayName}</span>
                  <div style={{ fontSize: "30pt" }}>05</div>
                  <span>Oktober 2023</span>
                  {/* <img src='/assets/svg/{.svg' /> */}
                </div>
              </div>
              <div className="col-md-8 d-flex align-items-center justify-content-center">
                <div className="text-align-center">
                  <div className="row">
                    {timeSlots.map((timeSlot, index) => (
                      <div
                        key={index}
                        className="col-md-4 bg-app2 buttonClick"
                        style={{ border: "2px solid white" }}
                      >
                        <center>
                          <span className="bi bi-clock"></span>
                          <p>{timeSlot}</p>
                        </center>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ClinicSchedule;
