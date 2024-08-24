export interface DropDownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    value?: string;
    data?: string[];
    label?: string;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
    className?: string;
  }
  