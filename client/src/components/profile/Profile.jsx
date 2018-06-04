import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
Material UI
*/
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

/*
Styles
*/
const styles = {
  card: {
  },
  media: {
    height: 200,
  },
};

class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: null
    }
  }

  componentDidMount() {
    fetch('/api/v1/backoffice/postsTable')
      .then(response => response.json())
      .then(item => this.setState({ posts: item }));
  }

  render() {
    const { classes } = this.props;
    if (this.state.posts) {
      return (
        <div className="listsContainer">
          <div className="listHeader">


            <h1>Experience the flow of other people</h1>
            <div className="listsubHeader">


              <div className="listCategories" >
                <h1>CATEGORIES &#9660;</h1>
              </div>

              <div className="listsubCategories">
                <button className="listsubCategory">
                  POPULAR
                </button>
                <button className="listsubCategory">
                  RISING
                </button>
                <button className="listsubCategory">
                  NEW
                </button>
              </div>


            </div>


            <div className="listPostsContainer">
              <div className="listPost">
                <div className="listPostImg">
                </div>
                <div className="listPostContent">
                  <div>TITLE</div>
                  <div>MADE BY</div>
                  <div className="listPostIcons">
                    <i className="fas fa-bars" />hello
                  <i className="fas fa-bars" />hello
                  <i className="fas fa-bars" />hello
                </div>
                  <div>DESCRIPTION Ho ho ho</div>
                </div>
              </div>
              <div className="listPost">
                <div className="listPostImg">
                </div>
                <div className="listPostContent">
                  <div>TITLE</div>
                  <div>MADE BY</div>
                  <div className="listPostIcons">
                    <i className="fas fa-bars" />hello
                  <i className="fas fa-bars" />hello
                  <i className="fas fa-bars" />hello
                </div>
                  <div>DESCRIPTION Ho ho ho</div>
                </div>
              </div>
              <div className="listPost">
                <div className="listPostImg">
                </div>
                <div className="listPostContent">
                  <div>TITLE</div>
                  <div>MADE BY</div>
                  <div className="listPostIcons">
                    <i className="fas fa-bars" />hello
                  <i className="fas fa-bars" />hello
                  <i className="fas fa-bars" />hello
                </div>
                  <div>DESCRIPTION Ho ho ho</div>
                </div>
              </div>
              
              <div className="listPost">
                <div className="listPostImg">
                </div>
                <div className="listPostContent">
                  <div>TITLE</div>
                  <div>MADE BY</div>
                  <div className="listPostIcons">
                    <i className="fas fa-bars" />hello
                  <i className="fas fa-bars" />hello
                  <i className="fas fa-bars" />hello
                </div>
                  <div>DESCRIPTION Ho ho ho</div>
                </div>
              </div>
              
              
            </div>


          </div>
          <div className="row">
            {this.state.posts.map((element, i) => (
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3" key={i}>
                <Card className={classes.card} key={element._id}>
                  <CardMedia
                    className={classes.media}
                    image="https://material-components-web.appspot.com/images/16-9.jpg"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                      {element.title}
                    </Typography>
                    <Typography component="p">
                      {element.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      {(element._category) ? element.categories.name : 'Uncategorized'}
                    </Button>
                  </CardActions>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div>

        </div>
      )
    }
  }
}

PostsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostsList);