import React, { useState, useEffect, useContext } from 'react';
import format from 'date-fns/format';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CategoriesPage from '../Shared/CategoriesPage';
import Spinner from '../Shared/Spinner';
import { AuthContext } from '../../context/AuthContext';
import { OptionsContext } from '../../context/OptionsContext';
import firebase from '../../config/firebase';

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: 'center',
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  }
}));

function QuestionsPage() {
  const classes = useStyles();
  const history = useHistory();
  const { authenticated, admin } = useContext(AuthContext);
  const { category, setCategory } = useContext(OptionsContext);
  const [data, setData] = useState([]);
  const [type, setType] = useState('truth_questions');
  const [state, setState] = useState({
    loading: true,
    error: ''
  });

  useEffect(() => {
    let unsubscribe = firebase.firestore().collection(type)
      .where('category', '==', category)
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot: any) => {

        const data = snapshot.docs.map((doc: any) => {
          return {
            ...doc.data(),
            id: doc.id
          };
        });

        setData(data);
        setState({ loading: false, error: '' });

      }, (err) => {
        console.error(err.message);
        setState({ loading: false, error: err.message });
      });

    return () => {
      unsubscribe();
    };
  }, [category, type]);

  async function deleteQuestion(id: string) {
    try {
      await firebase.firestore().collection(type).doc(id).delete();
    } catch (err) {
      console.error(err.message);
      setState({ loading: false, error: err.message });
    }
  }

  function dataSelection() {
    const newType = type === 'truth_questions' ? 'dare_questions' : 'truth_questions';
    setType(newType);
  }

  const disabledBtn = !authenticated && !admin;

  return (
    <Paper className={classes.paper}>
      <Button onClick={dataSelection} disabled={state.loading} color={type === 'dare_questions' ? 'primary' : 'secondary'} variant="contained" className={classes.button}>
        Show {type === 'dare_questions' ? 'truth' : 'dare'} questions
      </Button>
      <CategoriesPage label="Categories" category={category} setCategory={setCategory} select={true} />
      <Typography gutterBottom color='error'>{state.error}</Typography>
      <List dense>
        <TransitionGroup>
          {state.loading ? <Spinner thickness={2} /> :
            data?.map((q: any) => (
              <CSSTransition key={q.id} timeout={300} classNames="fade">
                <ListItem button onClick={() => history.push(`/update/${type}/${q.id}`)}>
                  <ListItemText primary={q.question} secondary={format(q.createdAt.toDate(), 'd MMMM yyyy')} />
                  <ListItemSecondaryAction>
                    <IconButton disabled={disabledBtn} edge="end" aria-label="delete" onClick={() => deleteQuestion(q.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </CSSTransition>
            ))}
        </TransitionGroup>
      </List>
    </Paper>
  );
}

export default QuestionsPage;
