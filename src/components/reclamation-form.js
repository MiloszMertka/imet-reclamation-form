import styled from "styled-components";
import { Formik, Form } from "formik";
import { Switch, Route, Redirect } from "react-router-dom";
import * as Yup from "yup";

import CompanyData from "./company-data";
import Products from "./products";
import ContactInfo from "./contact-info";
import Summary from "./summary";

const initialValues = {
  companyNIP: "",
  companyName: "",
  invoiceNumber: "",
  attachments: {},
  comments: "",
  products: [
    {
      productSymbol: "",
      productName: "",
      reclamationReason: "",
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
  attachments: Yup.object(),
  comments: Yup.string()
    .trim()
    .max(2000, "Wprowadzono za dużo znaków (max 2000)"),
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

const ReclamationForm = () => {
  return (
    <>
      <Heading>Formularz zwrotu i reklamacji</Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={reclamationSchema}
        onSubmit={() => {
          //
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          errors,
          touched,
        }) => (
          <Form encType="multipart/form-data">
            <Switch>
              <Redirect from="/" to="/dane-firmy" exact />
              <Route path="/dane-firmy" exact>
                <CompanyData
                  nip={values.companyNIP}
                  name={values.companyName}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                />
              </Route>
              <Route path="/produkty" exact>
                <Products
                  products={values.products}
                  reclamationReasons={reclamationReasons}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  invoiceNumber={values.invoiceNumber}
                  comments={values.comments}
                />
              </Route>
              <Route path="/dane-kontaktowe" exact>
                <ContactInfo
                  email={values.email}
                  name={values.name}
                  phoneNumber={values.phoneNumber}
                  regulationsAgreement={values.regulationsAgreement}
                  privacyPolicyAgreement={values.privacyPolicyAgreement}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              </Route>
              <Route path="/podsumowanie" exact>
                <Summary />
              </Route>
            </Switch>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ReclamationForm;
