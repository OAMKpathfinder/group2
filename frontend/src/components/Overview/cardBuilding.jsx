import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { Link } from 'react-router-dom'
import '../../styles/cardBuilding.scss';


class MediaCard extends Component {
  state = { 

    title: "",
    year: "",
    country: "",
    EE: "",
    color: "",
    green: "darkgreen",
    orange: "orange",
    red: "red"

    
   }

  constructor(props){ 
    super(props)
    this.state.title = this.props.title
    this.state.year = this.props.year
    this.state.country = this.props.country
    this.state.EE = this.props.EE

    if (this.state.EE <= 35) {
      this.state.color = this.state.red;
    } else if (this.state.EE <= 70) {
      this.state.color = this.state.orange;
    } else if (this.state.EE >= 70) {
      this.state.color = this.state.green;
    }
      
  }
  render() { 
    return ( <Link to="/building123">
    <Card className="card" >
      <CardActionArea>
        <CardMedia
          className="media"
          image="https://jooinn.com/images/old-house-35.jpg"
          title="Good House"
        />
        <CardContent>
          <div className = "buildingCardContent">
          <div className = "buildingCardConLeft">
          <Typography gutterBottom variant="h5" component="h2">
            {this.state.title}
          </Typography>
          <Typography variant="subtitle1" component="p">
            {this.state.year}
          </Typography>
          <Typography variant="subtitle1" component="p">
            {this.state.country}
          </Typography>
          </div>
          <div className = "buildingCardConRight">
          <div
              className="conCircle"
              style={{ backgroundColor: this.state.color }}
            >
              {this.state.EE}%
            </div>
          

          </div>
          </div>
          
         
            
        </CardContent>
      </CardActionArea>
    </Card>
    </Link> );
  }
}
 
export default MediaCard;


