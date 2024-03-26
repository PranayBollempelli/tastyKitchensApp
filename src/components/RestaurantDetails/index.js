import {Component} from 'react'
import Cookies from 'js-cookie'
import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar/NavBar'
import FoodItem from '../FoodItem/index'
import Footer from '../Footer'
import restaurantClass from './RestaurantDetails.module.css'

const restaurantsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetailsRoute extends Component {
  state = {
    apiStatus: restaurantsApiStatusConstants.initial,
    restaurantData: null,
    loadFooter: false,
  }

  componentDidMount() {
    this.getRestaurantData()
    window.scrollTo(0, 0)
  }

  convertItemsData = foodArray => ({
    cost: foodArray.cost,
    foodType: foodArray.food_type,
    id: foodArray.id,
    imageUrl: foodArray.image_url,
    name: foodArray.name,
    rating: foodArray.rating,
  })

  convertData = object => ({
    costForTwo: object.cost_for_two,
    cuisine: object.cuisine,
    foodItems: object.food_items.map(eachItem =>
      this.convertItemsData(eachItem),
    ),
    restaurantId: object.id,
    imageUrl: object.image_url,
    itemCount: object.items_count,
    location: object.location,
    name: object.name,
    opensAt: object.opens_at,
    rating: object.rating,
    reviewsCount: object.reviews_count,
  })

  getRestaurantData = async () => {
    this.setState({apiStatus: restaurantsApiStatusConstants.inProgress})

    try {
      const {match} = this.props
      const {params} = match
      const {id} = params
      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }

      const response = await fetch(apiUrl, options)

      if (response.ok) {
        const data = await response.json()
        const convertedData = this.convertData(data)
        this.setState({
          apiStatus: restaurantsApiStatusConstants.success,
          restaurantData: convertedData,
          loadFooter: true,
        })
      } else {
        throw new Error('Failed to fetch data')
      }
    } catch (error) {
      this.setState({apiStatus: restaurantsApiStatusConstants.failure})
    }
  }

  restaurantsDisplayLoading = () => (
    <div
      className={restaurantClass.Loader}
      data-testid="restaurant-details-loader"
    >
      <Loader type="ThreeDots" color="#0b69ff" height={50} width={50} />
    </div>
  )

  restaurantView = () => {
    // Render restaurant details based on state
    const {restaurantData} = this.state
    if (!restaurantData) {
      return null
    }

    // Extract data from restaurantData
    const {
      costForTwo,
      name,
      restaurantId,
      cuisine,
      imageUrl,
      location,
      rating,
      reviewsCount,
    } = restaurantData

    return (
      <div className={restaurantClass.MainContainer}>
        <div className={restaurantClass.RestaurantContainer} key={restaurantId}>
          <img
            src={imageUrl}
            alt="restaurant"
            className={restaurantClass.img}
          />
          <div className={restaurantClass.DetailsContainer}>
            <h1 className={restaurantClass.Name}>{name}</h1>
            <p className={restaurantClass.Cuisine}>{cuisine}</p>
            <p className={restaurantClass.Location}>{location}</p>
            <div className={restaurantClass.RatingAndCostContainer}>
              <div className={restaurantClass.RatingsContainer}>
                <div className={restaurantClass.Ratings}>
                  <AiFillStar className={restaurantClass.Star} />
                  <p className={restaurantClass.RatingPara}>{rating}</p>
                </div>
                <p className={restaurantClass.Reviews}>
                  {reviewsCount}+ Ratings
                </p>
              </div>
              <div className={restaurantClass.VerticalLine}>
                <p style={{display: 'none'}}>.</p>
              </div>
              <div className={restaurantClass.CostContainer}>
                <div className={restaurantClass.Cost}>
                  <BiRupee className={restaurantClass.Rupee} />
                  <p className={restaurantClass.CostForTwo}>{costForTwo}</p>
                </div>
                <p className={restaurantClass.CostPara}>Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        {this.foodItemsView()}
      </div>
    )
  }

  foodItemsView = () => {
    // Render food items based on state
    const {restaurantData} = this.state
    if (!restaurantData || !restaurantData.foodItems) {
      return null
    }

    return (
      <ul className={restaurantClass.FoodItemsContainer}>
        {restaurantData.foodItems.map(eachItem => (
          <FoodItem key={eachItem.id} foodItem={eachItem} />
        ))}
      </ul>
    )
  }

  onRenderDisplayRestaurantDetails = () => {
    // Switch based on apiStatus and render appropriate view
    const {apiStatus} = this.state

    switch (apiStatus) {
      case restaurantsApiStatusConstants.success:
        return this.restaurantView()
      case restaurantsApiStatusConstants.inProgress:
        return this.restaurantsDisplayLoading()
      case restaurantsApiStatusConstants.failure:
        return null
      default:
        return null
    }
  }

  render() {
    const {loadFooter} = this.state
    return (
      <div className={restaurantClass.BackgroundContainer}>
        <NavBar />
        {this.onRenderDisplayRestaurantDetails()}
        {loadFooter && <Footer />}
      </div>
    )
  }
}

export default RestaurantDetailsRoute
