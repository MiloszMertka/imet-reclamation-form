import styled from "styled-components";
import { FieldArray, useFormikContext } from "formik";

import Input from "./input";
import AddButton from "./add-button";
import Dropdown from "./dropdown";
import FileInput from "./file-input";
import Textarea from "./textarea";
import Button from "./button";
import RemoveButton from "./remove-button";
import { useCallback, useMemo } from "react";

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

const Products = ({ reclamationReasons }) => {
  const { errors, touched, setFieldTouched, values } = useFormikContext();
  const { products, attachments } = values;

  const buttonDisabled = useMemo(() => {
    const productsFieldsTouched =
      touched?.products?.every(
        (product) =>
          product.productSymbol &&
          product.productName &&
          product.reclamationReason &&
          (product?.dateOfSale ?? true) &&
          (product?.receiptOrInvoiceNumber ?? true) &&
          (product?.damageDescription ?? true)
      ) ?? false;
    const productsFieldsInvalid =
      errors?.products?.some(
        (product) =>
          product?.productName ||
          product?.productSymbol ||
          product?.reclamationReason ||
          product?.quantity ||
          product?.dateOfSale ||
          product?.receiptOrInvoiceNumber ||
          product?.damageDescription
      ) ?? false;

    return (
      productsFieldsInvalid ||
      errors.invoiceNumber ||
      errors.dateOfPurchase ||
      errors.comments ||
      !productsFieldsTouched ||
      !touched.invoiceNumber ||
      !touched.dateOfPurchase
    );
  }, [
    errors.invoiceNumber,
    errors.dateOfPurchase,
    errors.comments,
    errors.products,
    touched.invoiceNumber,
    touched.dateOfPurchase,
    touched.products,
  ]);

  const handleNavigationFailure = useCallback(() => {
    setFieldTouched("invoiceNumber");
    setFieldTouched("dateOfPurchase");
    setFieldTouched("comments");

    products.forEach((product, index) => {
      setFieldTouched(`products.${index}.productSymbol`);
      setFieldTouched(`products.${index}.productName`);
      setFieldTouched(`products.${index}.reclamationReason`);

      if (product.reclamationReason === "Reklamacja - klient ostateczny") {
        setFieldTouched(`products.${index}.dateOfSale`);
        setFieldTouched(`products.${index}.receiptOrInvoiceNumber`);
        setFieldTouched(`products.${index}.damageDescription`);
      } else if (product.reclamationReason === "Reklamacja przedsprzedażna") {
        setFieldTouched(`products.${index}.damageDescription`);
      }
    });
  }, [setFieldTouched, products]);

  return (
    <>
      <Input name="invoiceNumber" label="Numer faktury" />
      <Input type="date" name="dateOfPurchase" label="Data zakupu" />
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
                  name={`products.${index}.productSymbol`}
                  label="Symbol produktu"
                />
                <Input
                  name={`products.${index}.productName`}
                  label="Nazwa produktu"
                />
                <Dropdown
                  name={`products.${index}.reclamationReason`}
                  label="Przyczyna zwrotu"
                  options={reclamationReasons}
                />
                <Input
                  type="number"
                  min={1}
                  name={`products.${index}.quantity`}
                  label="Ilość"
                />
                {product.reclamationReason ===
                  "Reklamacja - klient ostateczny" && (
                  <>
                    <Input
                      type="date"
                      name={`products.${index}.dateOfSale`}
                      label="Data sprzedaży"
                    />
                    <Input
                      type="text"
                      name={`products.${index}.receiptOrInvoiceNumber`}
                      label="Numer paragonu/faktury (dokument sprzedaży należy przesłać w załączniku)"
                    />
                    <Textarea
                      name={`products.${index}.damageDescription`}
                      label="Opis uszkodzenia"
                      rows={5}
                    />
                  </>
                )}
                {product.reclamationReason === "Reklamacja przedsprzedażna" && (
                  <Textarea
                    name={`products.${index}.damageDescription`}
                    label="Opis uszkodzenia"
                    rows={5}
                  />
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
      <Textarea name="comments" label="Uwagi" rows={5} />
      <FileInput
        name="attachments"
        heading="Załączniki"
        label="Wybierz pliki"
        info="Max 10 plików typu jpg, png lub pdf o rozmiarze max 10 MB każdy"
        files={attachments}
        multiple
      />
      <ButtonsContainer>
        <Button link="/dane-firmy">Wstecz</Button>
        <Button
          link="/dane-kontaktowe"
          disabled={buttonDisabled}
          onFailure={handleNavigationFailure}
        >
          Dalej
        </Button>
      </ButtonsContainer>
    </>
  );
};

export default Products;
