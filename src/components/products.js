import styled from "styled-components";
import { FieldArray } from "formik";

import Input from "./input";
import AddButton from "./add-button";
import Dropdown from "./dropdown";
import FileInput from "./file-input";
import Textarea from "./textarea";
import Button from "./button";
import RemoveButton from "./remove-button";

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
  reclamationReasons,
  handleChange,
  handleBlur,
  errors,
  touched,
  setFieldValue,
  invoiceNumber,
  dateOfPurchase,
  comments,
  attachments,
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
        error={errors.invoiceNumber}
        touched={touched.invoiceNumber}
      />
      <Input
        type="date"
        name="dateOfPurchase"
        label="Data zakupu"
        value={dateOfPurchase}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.dateOfPurchase}
        touched={touched.dateOfPurchase}
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
                  error={
                    errors.products &&
                    errors.products[index] &&
                    errors.products[index].productSymbol
                  }
                  touched={
                    touched.products &&
                    touched.products[index] &&
                    touched.products[index].productSymbol
                  }
                />
                <Input
                  type="text"
                  name={`products.${index}.productName`}
                  label="Nazwa produktu"
                  value={product.productName}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={
                    errors.products &&
                    errors.products[index] &&
                    errors.products[index].productName
                  }
                  touched={
                    touched.products &&
                    touched.products[index] &&
                    touched.products[index].productName
                  }
                />
                <Dropdown
                  name={`products.${index}.reclamationReason`}
                  label="Przyczyna zwrotu"
                  value={product.reclamationReason}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={
                    errors.products &&
                    errors.products[index] &&
                    errors.products[index].reclamationReason
                  }
                  touched={
                    touched.products &&
                    touched.products[index] &&
                    touched.products[index].reclamationReason
                  }
                  options={reclamationReasons}
                />
                <Input
                  type="number"
                  min={1}
                  name={`products.${index}.quantity`}
                  label="Ilość"
                  value={product.quantity}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={
                    errors.products &&
                    errors.products[index] &&
                    errors.products[index].quantity
                  }
                  touched={
                    touched.products &&
                    touched.products[index] &&
                    touched.products[index].quantity
                  }
                />
                {product.reclamationReason === "Reklamacja" && (
                  <>
                    <Input
                      type="date"
                      name={`products.${index}.dateOfSale`}
                      label="Data sprzedaży"
                      value={product.dateOfSale}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      error={
                        errors.products &&
                        errors.products[index] &&
                        errors.products[index].dateOfSale
                      }
                      touched={
                        touched.products &&
                        touched.products[index] &&
                        touched.products[index].dateOfSale
                      }
                    />
                    <Input
                      type="text"
                      name={`products.${index}.receiptOrInvoiceNumber`}
                      label="Numer paragonu/faktury"
                      value={product.receiptOrInvoiceNumber}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      error={
                        errors.products &&
                        errors.products[index] &&
                        errors.products[index].receiptOrInvoiceNumber
                      }
                      touched={
                        touched.products &&
                        touched.products[index] &&
                        touched.products[index].receiptOrInvoiceNumber
                      }
                    />
                    <Textarea
                      name={`products.${index}.damageDescription`}
                      label="Opis uszkodzenia"
                      value={product.damageDescription}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      error={
                        errors.products &&
                        errors.products[index] &&
                        errors.products[index].damageDescription
                      }
                      touched={
                        touched.products &&
                        touched.products[index] &&
                        touched.products[index].damageDescription
                      }
                      rows={5}
                    />
                  </>
                )}
              </Product>
            ))}
            <AddButton
              handleClick={() =>
                arrayHelpers.push({
                  productSymbol: "",
                  productName: "",
                  reclamationReason: "",
                  quantity: 1,
                  dateOfSale: null,
                  receiptOrInvoiceNumber: null,
                  damageDescription: null,
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
        error={errors.comments}
        touched={touched.comments}
        rows={5}
      />
      <FileInput
        name="attachments"
        heading="Załączniki"
        label="Wybierz pliki"
        info="Max 10 plików typu jpg, png lub pdf o rozmiarze max 10 MB każdy"
        files={attachments}
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
