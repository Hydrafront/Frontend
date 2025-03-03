import { useState } from "react";
import DateTimePicker from "react-datetime-picker";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const DatePicker: React.FC = () => {
  const [value, onChange] = useState<Value>(new Date());

  return <DateTimePicker onChange={onChange} value={value} />;
};
export default DatePicker;
