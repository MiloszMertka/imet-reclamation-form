import styled from "styled-components";
import { Formik, Form } from "formik";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import * as Yup from "yup";

import { SERVER_URL } from "../environment-variables";

import CompanyData from "./company-data";
import Products from "./products";
import ContactInfo from "./contact-info";
import Summary from "./summary";
import LoadingIndicator from "./loading-indicator";

const initialValues = {
  companyNIP: "",
  companyName: "",
  invoiceNumber: "",
  dateOfPurchase: null,
  attachments: [],
  comments: "",
  products: [
    {
      productSymbol: "",
      productName: "",
      reclamationReason: "",
      quantity: 1,
      dateOfSale: null,
      receiptOrInvoiceNumber: null,
      damageDescription: null,
    },
  ],
  email: "",
  name: "",
  phoneNumber: "",
  regulationsAgreement: false,
  privacyPolicyAgreement: false,
};

const reclamationReasons = [
  { label: "", value: "" },
  {
    label: "Reklamacja - klient ostateczny",
    value: "Reklamacja - klient ostateczny",
  },
  {
    label: "Zwrot towaru",
    value: "Zwrot towaru",
  },
  {
    label: "Uszkodzony towar",
    value: "Uszkodzony towar",
  },
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
];

const reclamationReasonsValues = reclamationReasons.map(
  (reclamationReason) => reclamationReason.value
);

const reclamationSchema = Yup.object().shape({
  companyNIP: Yup.string()
    .trim()
    .matches(/^[0-9-\s]+$/, "Podany NIP jest nieprawidłowy")
    .min(10, "Wprowadzono za mało znaków")
    .max(20, "Wprowadzono za dużo znaków")
    .required("Należy wypełnić to pole"),
  companyName: Yup.string()
    .trim()
    .max(255, "Wprowadzono za dużo znaków")
    .required("Należy wypełnić to pole"),
  invoiceNumber: Yup.string()
    .trim()
    .max(255, "Wprowadzono za dużo znaków")
    .required("Należy wypełnić to pole"),
  dateOfPurchase: Yup.date().nullable().required("Należy wypełnić to pole"),
  attachments: Yup.array().max(10).nullable(),
  comments: Yup.string()
    .trim()
    .max(2000, "Wprowadzono za dużo znaków (max 2000)")
    .nullable(),
  products: Yup.array()
    .min(1, "Należy wskazać przynajmniej jeden produkt")
    .of(
      Yup.object().shape({
        productSymbol: Yup.string()
          .trim()
          .max(255, "Wprowadzono za dużo znaków")
          .required("Należy wypełnić to pole"),
        productName: Yup.string()
          .trim()
          .max(255, "Wprowadzono za dużo znaków")
          .required("Należy wypełnić to pole"),
        reclamationReason: Yup.string()
          .oneOf(reclamationReasonsValues)
          .required("Należy wypełnić to pole"),
        quantity: Yup.number()
          .integer("Należy podać liczbę całkowitą")
          .min(1, "Ilość musi wynosić co najmniej 1"),
        dateOfSale: Yup.date()
          .nullable()
          .when("reclamationReason", {
            is: "Reklamacja - klient ostateczny",
            then: Yup.date().nullable().required("Należy wypełnić to pole"),
          }),
        receiptOrInvoiceNumber: Yup.string()
          .nullable()
          .when("reclamationReason", {
            is: "Reklamacja - klient ostateczny",
            then: Yup.string().nullable().required("Należy wypełnić to pole"),
          }),
        damageDescription: Yup.string()
          .nullable()
          .when("reclamationReason", {
            is: "Reklamacja - klient ostateczny",
            then: Yup.string().nullable().required("Należy wypełnić to pole"),
          }),
      })
    ),
  email: Yup.string()
    .trim()
    .email("Należy podać poprawny adres e-mail")
    .max(255, "Wprowadzono za dużo znaków")
    .required("Należy wypełnić to pole"),
  name: Yup.string()
    .trim()
    .min(2, "Wprowadzono za mało znaków")
    .max(255, "Wprowadzono za dużo znaków")
    .required("Należy wypełnić to pole"),
  phoneNumber: Yup.string()
    .trim()
    .matches(/^[0-9-\s+]+$/, "Podany numer telefonu jest nieprawidłowy")
    .min(7, "Wprowadzono za mało znaków")
    .max(20, "Wprowadzono za dużo znaków")
    .required("Należy wypełnić to pole"),
  regulationsAgreement: Yup.bool().oneOf([true], "To pole jest wymagane"),
  privacyPolicyAgreement: Yup.bool().oneOf([true], "To pole jest wymagane"),
});

const Heading = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  margin-top: 2rem;
`;

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const ReclamationForm = ({ formRef }) => {
  const history = useHistory();

  return (
    <>
      <Heading>Formularz zwrotu i reklamacji</Heading>
      <Formik
        innerRef={formRef}
        initialValues={initialValues}
        validationSchema={reclamationSchema}
        onSubmit={async (values) => {
          const attachments = Array.from(values.attachments);

          let base64attachments = [];

          for await (const attachment of attachments) {
            await getBase64(attachment).then((data) =>
              base64attachments.push({
                data,
                name: attachment.name,
                type: attachment.type,
                size: attachment.size,
              })
            );
          }

          let data = values;
          data.attachments = base64attachments;
          data = JSON.stringify(data);

          try {
            const response = await fetch(`${SERVER_URL}/api/reclamation`, {
              body: data,
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            });
            const responseData = await response.json();
            history.push("/podsumowanie", {
              reclamationCode: responseData.reclamationCode,
            });
          } catch (error) {
            console.error(error);
            alert("Wystąpił błąd przy wysyłaniu zgłoszenia");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form encType="multipart/form-data">
            <LoadingIndicator isLoading={isSubmitting} />
            <Switch>
              <Redirect from="/" to="/dane-firmy" exact />
              <Route path="/dane-firmy" exact>
                <CompanyData />
              </Route>
              <Route path="/produkty" exact>
                <Products reclamationReasons={reclamationReasons} />
              </Route>
              <Route path="/dane-kontaktowe" exact>
                <ContactInfo />
              </Route>
              <Route path="/podsumowanie" exact>
                <Summary />
              </Route>
              <Redirect to="/dane-firmy" />
            </Switch>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ReclamationForm;
