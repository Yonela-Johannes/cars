const axios = require('axios')

const Routes = () => {
    const home = async (req, res) => {
        // GETTING ALL CARS
        let cars = await axios.get('http://api-tutor.herokuapp.com/v1/cars')
            .then(res => res.data)
            // GETTING CARS COLORS
        let colors = await axios.get("http://api-tutor.herokuapp.com/v1/colors")
        .then(res => res.data)
        // GETTING CARWS MAKE
        let makes = await axios.get("https://api-tutor.herokuapp.com/v1/makes")
        .then(res => res.data)

        res.render('home', {
            cars,
            colors,
            makes
        })
    }

    const search = async (req, res) => {
        const {make, color} = req.body
        let cars = []

        if(make && color){
            await axios.get(`http://api-tutor.herokuapp.com/v1/cars/make/${make}/color/${color}`)
            .then((response) => {
                    cars = response.data
            })
        }else  if(make){
            await axios.get(`http://api-tutor.herokuapp.com/v1/cars/make/${make}`)
            .then((response) => {
                    cars = response.data
            })
        }else if(color){
            await axios.get(`http://api-tutor.herokuapp.com/v1/cars/color/${color}`)
            .then((response) => {
                    cars = response.data
            })
        }else{
            res.redirect('/')
        }
        let selectColors = await axios.get("http://api-tutor.herokuapp.com/v1/colors")
        .then(res => res.data)
        // GETTING CARWS MAKE
        let selectMake = await axios.get("https://api-tutor.herokuapp.com/v1/makes")
        .then((response) => response.data)
        res.render('search', {
            cars,
            selectMake,
            selectColors
        })
    }

    return {
        home,
        search
    }
}

module.exports = Routes
