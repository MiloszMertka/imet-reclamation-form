import styled from "styled-components";
import { FieldArray } from "formik";

import Input from "./input";
import AddButton from "./add-button";
import Dropdown from "./dropdown";
import FileInput from "./file-input";
import Textarea from "./textarea";
import Button from "./button";
import RemoveButton from "./remove-button";

const reclamationReasons = [
  { label: "", value: "" },
  {
    label: "Błąd w cenie",
    value: "Błąd w cenie",
  },
  {
    label: "Błąd w ilości sprzedanej",
    value: "Błąd w ilości sprzedanej",
  },
  {
    label: "Błąd w stawce podatku",
    value: "Błąd w stawce podatku",
  },
  {
    label: "Reklamacja",
    value: "Reklamacja",
  },
  {
    label: "Uszkodzony towar",
    value: "Uszkodzony towar",
  },
];

const ProductsList = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.primary};
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};
`;

const Product = styled.div`
  position: relative;

  &:not(&:first-of-type) {
    border-top: 1px solid ${(props) => props.theme.colors.primary};
  }

  //selector for first cross
  &:first-of-type > div {
    top: 0;
  }
`;

const RemoveProductButton = styled(RemoveButton)`
  position: absolute;
  right: 0;
  top: 1rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2.5rem 0;

  @media (min-width: 450px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Products = ({
  products,
  handleChange,
  handleBlur,
  setFieldValue,
  invoiceNumber,
  comments,
}) => {
  return (
    <>
      <Input
        type="text"
        name="invoiceNumber"
        label="Numer faktury"
        value={invoiceNumber}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
      <FieldArray
        name="products"
        render={(arrayHelpers) => (
          <ProductsList>
            {products.map((product, index) => (
              <Product key={index}>
                {products.length > 1 && (
                  <RemoveProductButton
                    handleClick={() => arrayHelpers.remove(index)}
                  />
                )}
                <Input
                  type="text"
                  name={`products.${index}.productSymbol`}
                  label="Symbol produktu"
                  value={product.productSymbol}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                <Input
                  type="text"
                  name={`products.${index}.productName`}
                  label="Nazwa produktu"
                  value={product.productName}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                <Dropdown
                  name={`products.${index}.reclamationReason`}
                  label="Przyczyna zwrotu"
                  value={product.reclamationReason}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  options={reclamationReasons}
                />
              </Product>
            ))}
            <AddButton
              handleClick={() =>
                arrayHelpers.push({
                  productSymbol: "",
                  productName: "",
                  reclamationReason: "",
                })
              }
            >
              Dodaj kolejny produkt
            </AddButton>
          </ProductsList>
        )}
      />
      <Textarea
        name="comments"
        label="Uwagi"
        value={comments}
        handleChange={handleChange}
        handleBlur={handleBlur}
        rows={5}
      />
      <FileInput
        name="attachments"
        label="Załączniki"
        setFieldValue={setFieldValue}
        multiple
      />
      <ButtonsContainer>
        <Button link="/dane-firmy">Wstecz</Button>
        <Button link="/dane-kontaktowe">Dalej</Button>
      </ButtonsContainer>
    </>
  );
};

export default Products;
