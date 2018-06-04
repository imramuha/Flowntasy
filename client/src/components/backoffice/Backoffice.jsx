import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    minHeight: 300,
    width: '80%',
    alignItems: 'center',
    margin: '30px 10%'
  },
  rootForm: {
    minWidth: 30,
    minHeight: 30,
    width: '80%',
    margin: '30px 10%',
    color: '#2B1C2D',
  },
  image: {
    position: 'relative',
    margin: '2px',
    height: 200,
    backgroundColor: '#2B1C2D',
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid white',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: '#2B1C2D',
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

const images = [
  {
    path: '/backoffice/usersTable/',
    title: 'USERS',
    width: '48%',
  },
  {
    path: '/backoffice/postsTable/',
    title: 'POSTS',
    width: '48%',
  },
  {
    path: '/backoffice/communitiesTable/',
    title: 'COMMUNITIES',
    width: '48%',
  },
  {
    path: '/backoffice/categoriesTable/',
    title: 'CATEGORIES',
    width: '48%',
  },
];

function Backoffice(props) {
  const { classes } = props;

  return (
    <div>
    <div className={classes.root}>
      {images.map(image => (
        <ButtonBase
          focusRipple
          key={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          href={image.path}
          style={{
            width: image.width,
          }}
        >
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subheading"
              color="inherit"
              className={classes.imageTitle}
            >
              {image.title}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      ))}
    </div>
    </div>
  );
}

Backoffice.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Backoffice);