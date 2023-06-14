interface DropdownProps {
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: 
    (string | number)[]
    |{
        id: number | string;
        text?: string;
        name?: string;
    }[];
    placeholderText: string;
}

export default DropdownProps;