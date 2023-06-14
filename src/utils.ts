
import {operators, properties, products} from "./data.json"

export const notPermitedOperatorsIds = {
    notForString:["greater_than", "less_than"],
    notForNumber: ["contains"],
    notForEnumerated: ["greater_than", "less_than", "contains"],
  }
export const noValueNeededOperator = ["any", "none"]
  
export const setPropertyValues = (selectedId: number, setPropertyValueOptions: React.Dispatch<React.SetStateAction<(string | number)[]>>) => {
    const propertyValues = products.map((product) => {
      const propertyValue = product.property_values.find((prop_value) => prop_value.property_id === selectedId);
      return propertyValue ? propertyValue.value : "";
    });
    const uniquePropertyValues = [...new Set(propertyValues)].filter(value => value !== "");
    uniquePropertyValues ?  setPropertyValueOptions(uniquePropertyValues) : setPropertyValueOptions([]);
  }
export const setNotPermited = (selectedId: number, setNotPermitedList: React.Dispatch<React.SetStateAction<string[]>>) => {
    const property = properties.find((prop) => prop.id === selectedId)
    switch (property?.type) {
      case "enumerated":
        setNotPermitedList(notPermitedOperatorsIds.notForEnumerated)
        break;
      case "string":
        setNotPermitedList(notPermitedOperatorsIds.notForString)
        break;
      case "number":
        setNotPermitedList(notPermitedOperatorsIds.notForNumber)
        break;
      default:
        setNotPermitedList([])
        break;
    }
  }
  