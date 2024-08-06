import { Label } from "../ui/label";
import { Input } from "../ui/input";

type Props = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
};
export default function FormInput(props: Props) {
  const { name, type, label, defaultValue, placeholder } = props;
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required
      />
    </div>
  );
}
