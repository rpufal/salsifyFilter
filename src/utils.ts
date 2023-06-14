
import { properties, products} from "./data.json";

export const handleOperatorFilter = (selectedOperator: string, selectedPropertyValue: string | number, selectedPropertyId: string, currentProp: {property_id: number, value :string | number}) => {
  if (selectedPropertyId === currentProp.property_id.toString()) {
    if (selectedOperator === "equals" &&  selectedPropertyValue.toString() === currentProp.value.toString()) return true;
    if (selectedOperator === "greater_than" &&  selectedPropertyValue < currentProp.value) return true;
    if (selectedOperator === "less_than" &&  selectedPropertyValue > currentProp.value) return true;
    if (selectedOperator === "contains" &&  currentProp.value.toString().includes(selectedPropertyValue.toString())) return true;
    if (selectedOperator === "in" &&  selectedPropertyValue.toString().split("|").includes(currentProp.value.toString())) return true;
    return false;
  }
  return false;
}

export const capitalizeWords = (str: string) =>  {
  const words = str.split(' ');
  const capitalizedWords = words.map(word => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1);
    return firstLetter + restOfWord;
  });
  const capitalizedString = capitalizedWords.join(' ');
  return capitalizedString;
}

export const notPermitedOperatorsIds = {
  notForString:["greater_than", "less_than"],
  notForNumber: ["contains"],
  notForEnumerated: ["greater_than", "less_than", "contains"],
};

export const noValueNeededOperator = ["any", "none"];
  
export const setPropertyValues = (selectedId: number, setPropertyValueOptions: React.Dispatch<React.SetStateAction<(string | number)[]>>) => {
  const propertyValues = products.map((product) => {
    const propertyValue = product.property_values.find((prop_value) => prop_value.property_id === selectedId);
    return propertyValue ? propertyValue.value : "";
  });
  const uniquePropertyValues = [...new Set(propertyValues)].filter(value => value !== "");
  uniquePropertyValues ?  setPropertyValueOptions(uniquePropertyValues) : setPropertyValueOptions([]);
}

export const setNotPermited = (selectedId: number, setNotPermitedList: React.Dispatch<React.SetStateAction<string[]>>) => {
  const property = properties.find((prop) => prop.id === selectedId);
  switch (property?.type) {
    case "enumerated":
      setNotPermitedList(notPermitedOperatorsIds.notForEnumerated);
      break;
    case "string":
      setNotPermitedList(notPermitedOperatorsIds.notForString);
      break;
    case "number":
      setNotPermitedList(notPermitedOperatorsIds.notForNumber);
      break;
    default:
      setNotPermitedList([]);
      break;
  };
}
  