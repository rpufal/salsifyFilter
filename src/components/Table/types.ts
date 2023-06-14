interface PropertyValue {
    property_id: number;
    value: string | number;
  }
  
  interface Product {
    id: number;
    property_values: PropertyValue[];
  }

  interface Property {
    id: number;
    name: string;
    type: string;
    values?: string[];
  }
  
  interface ProductTableProps {
    products: Product[];
    properties: Property[]
  }
  
  export default ProductTableProps;