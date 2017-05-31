import React from 'react';
import { uploadPhoto, getTopNNutrients } from './FirebaseAuth';
import { RecentPhotoHistory } from './NutritionHistory.js';
import { GoalsOverview } from './GoalsChallenges.js';
import { Link, hashHistory } from 'react-router';
import { nutixAppId, nutixAppKey } from './FirebaseConstants';

class SavePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      url: props.location.state.state["url"],
      fooditems: props.location.state.state["fooditems"],
      foodnutrients: {}
    };
  }

  /*
  getTopNutrients(json) {
    var topNutrients = [];
    console.log("DAILY VALUES:");
    console.log(dailyValues);
    console.log("JSON");
    console.log(json);
    var nutrientValues = json["hits"][0]["fields"];
    console.log("Nutrient Values");
    console.log(nutrientValues);
    return topNutrients;
  }
  */

  componentDidMount() {
    var foodItems = [];
    var thisComponent = this;
    /*
    for (var key in this.state.fooditems) {
      if (this.state.fooditems[key] === "greencard") {
        foodItems.push(key);
      }
    }
    */
    for (var key in this.props.location.state.state["fooditems"]) {
      if (this.props.location.state.state["fooditems"][key] === "greencard") {
        foodItems.push(key);
      }
    }
    uploadPhoto(this.state.url, foodItems);
    foodItems.map(function(foodItem) {
      fetch('https://api.nutritionix.com/v1_1/search/' + foodItem + '?results=0:1&cal_min=0&cal_max=800&fields=item_name,nf_calories,nf_total_fat,nf_cholesterol,nf_sodium,nf_total_carbohydrate,nf_dietary_fiber,nf_protein,nf_vitamin_a_dv,nf_vitamin_c_dv,nf_calcium_dv,nf_iron_dv,nf_potassium&appId=' + nutixAppId + '&appKey=' + nutixAppKey) 
        .then(function(response) {
          return response.json();
        }).then(function(json) {
          //console.log('parsed json', json);
          var changes = thisComponent.state;
          //var topNutrients = thisComponent.getTopNutrients(json);
          var topNutrients = getTopNNutrients(json, 5);
          changes["foodnutrients"][foodItem] = topNutrients;
          thisComponent.setState(changes);
          // console.log("CHANGES STATE:");
          // console.log(thisComponent.state);
        }).catch(function(ex) {
          console.log('parsing failed', ex)
        });
    });
  }

  handleClick(event) {
    event.preventDefault(); //don't submit
    hashHistory.push({
      pathname: '/goals'
    });
  }

  render() {
    console.log("STATE");
    console.log(this.state);
    var photoUrl = this.props.location.state.state["url"];
    /*
    var prevState = this.props.location.state.state;
    var keys = [];
    for (var k in prevState["fooditems"]) {
      keys.push(k);
    }
    var foodRows = keys.map(function(key) {
      if (prevState["fooditems"][key] === "greencard") {
        var fooditem = key;
        return (
          <FoodRow key={fooditem} item={fooditem} topnutrients={["test"]} />
        );
      }
    })
    */
    var keys = [];
    for (var k in this.state.foodnutrients) {
      keys.push(k);
    }
    var thisComponent = this;
    var foodRows = keys.map(function(key) {
      var foodItem = key;
      var nutrients = thisComponent.state.foodnutrients[foodItem];
      return (
        <FoodRow key={foodItem} item={foodItem} topnutrients={nutrients} />
      );
    })
    /*
    var foodItems = this.state.foodItems;
    var keys = [];
    for (var k in foodItems) {
      keys.push(k);
    }
    var foodRows = keys.map(function(key) {
      if (foodItems[key] === "greencard") {
        var fooditem = key;
        return (
          <FoodRow key={fooditem} item={fooditem} />
        );
      }
    })
    console.log(this.state.url);
    */
    return (
      <div>
          <h2>Your information has been saved!</h2>
          <div className="row">
            <div className="col-lg-6 col-sm-6 col-xs-12">
              <small>You just had:</small>
              <div className="card">
                <div className="content">
                  <img src={photoUrl} alt="Food Image" />
                  <div>
                  {foodRows}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-6 col-xs-12">
              <small>You recently had:</small>
              <div className="row">
                <RecentPhotoHistory numimgs={3} slim={false} />
              </div>
              <div className="row">
                <GoalsOverview />
              </div>
              <div className="row">
                <button className="btn btn-success btn-lg" type="button" onClick={(e) => this.handleClick(e)}>Goal Progress</button>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

class FoodRow extends React.Component {

  render() {
    //old nute info link
    //http://www.gmaonline.org/file-manager/images/healthandexercise/140_basic4%2B2.jpg
    //<img className="nutrientinfo" src="https://maxcdn.icons8.com/wp-content/uploads/2014/08/energy_calorie-1281.png" alt="nutrients" />
    //var topNutrients = ["vitamin a", "calorie", "protein", "fat", "calcium"];
    var topNutrients = this.props.topnutrients;
    return (
      <div className="row food-row">
        <div className="col-lg-4 col-sm-5 col-xs-6">
          <span className="nutrientname">{this.props.item}</span>
        </div>
        <div className="col-lg-8 col-sm-7 col-xs-6">
          <img className="nutrientinfo" src={"img/" + topNutrients[0].slice(3) + ".png"} alt={topNutrients[0]} />
          <img className="nutrientinfo" src={"img/" + topNutrients[1].slice(3) + ".png"} alt={topNutrients[1]} />
          <img className="nutrientinfo" src={"img/" + topNutrients[2].slice(3) + ".png"} alt={topNutrients[2]} />
          <img className="nutrientinfo" src={"img/" + topNutrients[3].slice(3) + ".png"} alt={topNutrients[3]} />
          <img className="nutrientinfo" src={"img/" + topNutrients[4].slice(3) + ".png"} alt={topNutrients[4]} />
        </div>
      </div>
    );
  }
}

export default SavePage;

export { FoodRow };