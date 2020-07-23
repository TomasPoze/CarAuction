import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import FormikState from "../../components/FormikState/FormikState";
import { useHistory, useLocation } from 'react-router-dom';
import userApi from '../../api/userApi';
import { setCredentials } from '../../api';
import { UserContext } from '../../App';

import { useTranslation } from "react-i18next";
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TextField } from 'formik-material-ui'
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const initialValues = {
  username: '',
  name: '',
  lastName: '',
  city: '',
  password: ''
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/about">
        Car-Auction
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default () => {
  const classes = useStyles();
  const { i18n } = useTranslation()
  const { t } = useTranslation("registration")

  const { login } = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/login' } }

  const onSubmit = values => {
    // setCredentials(values)
    // userApi.getUser()
    //   .then(({ data }) => {
    //     login(data)
    //     history.push(from)
    //   })
    userApi.createUser(values)
    history.push(from)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}>
      {(props) => (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("signUp")}
                        </Typography>
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    name="username"
                    type="text"
                    component={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    label={t("username")}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    name="name"
                    label={t("name")}
                    type="text"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    name="lastName"
                    label={t("lastName")}
                    type="text"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    name="city"
                    label={t("city")}
                    type="text"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label={t("password")}
                    type="password"
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {t("signUp")}
                </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    {t("acc")}
              </Link>
                </Grid>
              </Grid>
              {/* <FormikState {...props} /> */}
            </Form>
          </div>
          <Box mt={44}>
            <Copyright />
          </Box>
        </Container>
      )}
    </Formik>
  )
}