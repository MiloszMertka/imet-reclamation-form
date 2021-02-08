import styled from "styled-components";
import { Formik, Form } from "formik";
import { Switch, Route, Redirect } from "react-router-dom";

import CompanyData from "./company-data";
import Products from "./products";
import ContactInfo from "./contact-info";
import Summary from "./summary";

const initialValues = {
  companyNIP: "",
  companyName: "",
  invoiceNumber: "",
  attachments: "",
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
        onSubmit={() => {
          //
        }}
      >
        {({ values, handleChange, handleBlur, setFieldValue }) => (
          <Form encType="multipart/form-data">
            <Switch>
              <Redirect from="/" to="/dane-firmy" exact />
              <Route path="/dane-firmy" exact>
                <CompanyData
                  nip={values.companyNIP}
                  name={values.companyName}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              </Route>
              <Route path="/produkty" exact>
                <Products
                  products={values.products}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
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
