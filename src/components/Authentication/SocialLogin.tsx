import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { ThemeContext } from '../../context/ThemeContext';
import firebase from '../../config/firebase';
import Facebook from '../Icons/Facebook';
import Google from '../Icons/Google';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    margin: theme.spacing(2, 0)
  },
  button: {
    margin: theme.spacing(1, 0)
  }
}));

function SocialLogin() {
  const classes = useStyles();
  const { setModal } = useContext(ThemeContext);

  async function handleSocialLogin(selectedProvider: any) {
    try {
      setModal(null);

      const provider = {
        facebook: new firebase.auth.FacebookAuthProvider(),
        google: new firebase.auth.GoogleAuthProvider()
      };
      // @ts-ignore
      await firebase.auth().signInWithPopup(provider[selectedProvider]);

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={classes.root}>
      <Typography>- OR -</Typography>
      <Button onClick={() => handleSocialLogin('facebook')} startIcon={<Facebook />} className={classes.button} fullWidth color="primary" variant="outlined">Continue with Facebook</Button>
      <Button onClick={() => handleSocialLogin('google')} startIcon={<Google />} className={classes.button} fullWidth color="default" variant="outlined">Continue with Google</Button>
    </div>
  );
}

export default SocialLogin;
