interface DropdownProps {
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>, multiple: boolean) => void;
    options: 
    (string | number)[]
    |{
        id: number | string;
        text?: string;
        name?: string;
    }[];
    placeholderText: string;
    multiple?: boolean;
}

export default DropdownProps;