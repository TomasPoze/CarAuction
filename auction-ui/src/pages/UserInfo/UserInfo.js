import React, { useContext } from 'react';
import { useTranslation } from "react-i18next";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { UserContext } from '../../App';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Field, Formik, Form } from 'formik';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


export default function SimpleContainer() {
  const classes = useStyles();
  const { i18n } = useTranslation()
  const { t } = useTranslation("registration")
  const { user } = useContext(UserContext)
  
  const initialState = {
    username: user.username
  }

  const onSubmit = values => {

  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <h4 className="mt-3">{t("details")}</h4>
        <hr />
        <Formik
        initialValues={initialState}
        onSubmit={onSubmit}
        >
          <Form>


            <div>
              <h5>{t("username")}: {user.username} 
              <Field
              name="username"
              type="text"
              variant="outlined"
              label={user.username}
              placeholder={user.username}
              />
              </h5>

            </div>
            <div>
              <h5>{t("name")}: {user.name}
              <Field
              name="name"
              type="text"
              variant="outlined"
              label={user.name}
              placeholder={user.name}
              />
              </h5>
            </div>
            <div>
              <h5>{t("lastName")}: {user.lastName}
              <Field
              name="lastName"
              type="text"
              variant="outlined"
              label={user.lastName}
              placeholder={user.lastName}
              />
              </h5>
            </div>
            <div>
              <h5>{t("city")}: {user.city}
              <Field
              name="city"
              type="text"
              variant="outlined"
              label={user.city}
              placeholder={user.city}
              />
              </h5>
            </div>
        <hr />
        <Button variant="contained" color="primary">
          {t("update")}
        </Button>
          </Form>
        </Formik>
      </Container>
    </React.Fragment>
  );
}