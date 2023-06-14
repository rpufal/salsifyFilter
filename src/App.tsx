import {operators, properties, products} from "./data.json";
import {Table, Dropdown} from "./components";
import { useState, useEffect } from 'react';
import "./App.css";
import { noValueNeededOperator, setNotPermited, setPropertyValues, handleOperatorFilter } from "./utils";

function App() {
  const [selectedPropertyId, setSelectedPropertyId] = useState('');
  const [selectedPropertyValue, setSelectedPropertyValue] = useState('');
  const [selectedOperator, setSelectedOperator] = useState('');
  const [propertyValueOptions, setPropertyValueOptions] = useState<(string | number)[]>([]);
  const [notPermittedOperatorList, setNotPermittedOperatorList] = useState<(string)[]>([]);
  const [productsToShow, setProductsToShow] = useState(products);

  const handleOperatorChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedOperator(event.target.value);
  };

  const handlePropertyChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    if (event.target.value === "") {
      setSelectedPropertyId("");
      return;
    };
    const selectedId = parseInt(event.target.value);
    setSelectedPropertyId(selectedId.toString());
    setNotPermited(selectedId, setNotPermittedOperatorList);
    setPropertyValues(selectedId, setPropertyValueOptions);
  };

  const handlePropertyValueChange = (event: React.ChangeEvent<HTMLSelectElement>, multiple: boolean): void => {
    if (multiple) {
      const updatedMultipleValue = Array.from(event.target.selectedOptions, (option: HTMLOptionElement) => option.value).join("|");
      setSelectedPropertyValue(updatedMultipleValue);
      return;
    }
    setSelectedPropertyValue(event.target.value);
  };

  const handleClear = () => {
    setSelectedPropertyId("");
    setSelectedPropertyValue("");
    setSelectedOperator("");
    setProductsToShow(products);
  }

  useEffect(() => {
    const noMainNullFilters = ![selectedOperator, selectedPropertyId].includes("");
    if (![selectedOperator, selectedPropertyId, selectedPropertyValue].includes("")) {
      const updatedListproducts = products.filter((product) => {
        return product.property_values.find((propValue) => handleOperatorFilter(selectedOperator, selectedPropertyValue, selectedPropertyId, propValue))
      });
      setProductsToShow(updatedListproducts);
    }
    if (noMainNullFilters && noValueNeededOperator.includes(selectedOperator)) {
      const updatedListproducts = products.filter((product) => {
        if (selectedOperator === "none") {
          return !product.property_values.some(propValue => propValue.property_id === parseInt(selectedPropertyId));
        }
        if (selectedOperator === "any") {
          return product.property_values.find((propValue) => propValue.property_id === parseInt(selectedPropertyId));
        }
      })
      setProductsToShow(updatedListproducts);
    }
  }, [selectedPropertyId, selectedPropertyValue, selectedOperator]);

  return (
    <>
      <div className="container">
        <div className="dropdown-section">
          <Dropdown  placeholderText="Select a Property" handleChange={handlePropertyChange} options={properties}/>
          {selectedPropertyId &&
          <Dropdown placeholderText="Select an Operator" handleChange={handleOperatorChange} options={operators.filter((operator) => !notPermittedOperatorList.includes(operator.id))}/>}
          {selectedPropertyId && selectedOperator && !noValueNeededOperator.includes(selectedOperator) && 
          <Dropdown placeholderText="Select a Value" handleChange={handlePropertyValueChange}
          multiple={selectedOperator === "in" ? true : false} options={propertyValueOptions}/>}
        </div>
        <button onClick={handleClear}>Clear</button>
      </div>
      <Table products={productsToShow} properties={properties}/>
    </>
  );
}

export default App;
