import { FC } from "react";
import ProductTableProps from "./types";
import "./styles.css";

export const Table: FC<ProductTableProps> = ({products, properties}) => {
  return (
    <table className="product-table">
      <thead>
        <tr>
            {properties.map((property, index) => (
                <th key={property.id + index}>{property.name}</th>
            ))}
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} data-testid={"table-row"} >
            {product.property_values.map((property, index) => (
              <td key={property.property_id + index}>{property.value}</td> 
            ))}
            {Array.from({length: properties.length - product.property_values.length}).map((_item, index) => <td key={index + "NA"}></td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}