/* eslint-disable react/prop-types */

import * as React from "react";
import dayjs from "dayjs";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

// import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { DatePicker, Stack } from "rsuite";
import { FaCalendar } from "react-icons/fa";
import { BsCalendar2MonthFill } from "react-icons/bs";
const ScheduleItems = ({
  food_name,
  price,
  amount,
  imageurl,
  handleAddChange,
  handleDateTimeChange,
}) => {
  let today = dayjs();

  return (
    <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
      <div className="shrink-0">
        <img
          className="h-24 w-24 max-w-full rounded-lg object-cover"
          src={imageurl}
          alt={food_name}
        />
      </div>

      <div className="relative flex flex-1 flex-col justify-between">
        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
          <div className="pr-8 sm:pr-5">
            <p className="text-base font-semibold text-gray-900">{food_name}</p>
            <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
              Quantity: {amount}
            </p>
          </div>

          <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
            <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
              Rs.{price}
            </p>

            <div className="sm:order-1">
              <div className="mx-auto flex h-20 items-stretch text-gray-600 flex-row">
                <input
                  name="add"
                  className="focus:outline-none px-3"
                  placeholder="Place, City, Province, Country"
                  onChange={(e) => handleAddChange(e.target.value)}
                />
              </div>
              <div className="mx-auto flex h-20 items-stretch text-gray-600">
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label={"give date and time"}
                    value={today}
                    onChange={handleDateTimeChange}
                  />
                </LocalizationProvider> */}

                <Stack spacing={10} direction="column" alignItems="flex-start">
                  <DatePicker
                    format="dd MMM yyyy hh:mm:ss aa"
                    showMeridian
                    caretAs={FaCalendar}
                    style={{ width: 220 }}
                    onChange={handleDateTimeChange}
                    value={today}
                  />
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ScheduleItems;
