import { mcn } from "../../utils/mcn";

export interface SelectOptionProps {
  value: string;
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const SelectOption = (props: SelectOptionProps) => {
  const { label, isSelected, onClick } = props;

  return (
    <div
      className={mcn(
        "px-4 py-2 text-sm cursor-pointer transition-colors hover:bg-gray-100",
        {
          "bg-gray-50": isSelected,
        }
      )}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

SelectOption.displayName = "SelectOption";
