import React, { useEffect, useState } from 'react'

const Form = () => {

    useEffect(() => {
        getCountries();
        getFirstLevel();
    }, [])

    // Array
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [firstLevel, setlevelone] = useState([]);
    const [secondLevel, setleveltwo] = useState([]);
    const [thirdLevel, setlevelthree] = useState([]);

    // Selected Data

    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [country, setCountry] = useState("")
    const [phone, setphone] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [levelfirst, setlevelfirst] = useState("")
    const [levelsecond, setlevelsecond] = useState("")
    const [levelthird, setlevelthird] = useState("")
    const [massage, setmassage] = useState("")



    // State City and Country

    const getCountries = async () => {
        let res = await fetch('http://localhost:5000/get-country');
        let data = await res.json();
        setCountries(data);
    }

    const selectCountry = async (e) => {
        let country = e.target.value
        setCountry(country)
        console.log(country);

        let res = await fetch('http://localhost:5000/get-State/' + country);
        let data = await res.json();
        setStates(data)
    }
    const selectState = async (e) => {
        let state = e.target.value
        setState(state)

        let res = await fetch('http://localhost:5000/get-City/' + state);
        let data = await res.json();
        setCities(data)
    }


    const allCountry = (country) => {
        return <option value={country.id}>{country.phonecode} {country.name}</option>
    }

    const allState = (state) => {
        return <option value={state.id}>{state.name}</option>
    }
    const allCities = (city) => {
        return <option value={city.name} />
    }

    // Product Levels



    const getFirstLevel = async () => {
        let res = await fetch('http://localhost:5000/get-firstLevel');
        let data = await res.json();
        setlevelone(data)
    }
    const firstLevelElements = (items) => {
        return <option value={items.id}>{items.name}</option>
    }

    const selectLevelone = async (e) => {
        let levelone = e.target.value
        setlevelfirst(levelone)

        let res = await fetch('http://localhost:5000/get-secondlevel/' + levelone);
        let data = await res.json();
        setleveltwo(data)
    }

    const secondLevelElements = (items) => {
        return <option value={items.srno}>{items.name}</option>
    }

    const selectLeveltwo = async (e) => {
        let leveltwo = e.target.value
        setlevelsecond(leveltwo)

        let res = await fetch('http://localhost:5000/get-thirdlevel/' + leveltwo);
        let data = await res.json();
        setlevelthree(data)
    }

    const thirdLevelElements = (items) => {
        return <option value={items.srno}>{items.name}</option>
    }

        const submitform = async () => {


            const res = await fetch('http://localhost:5000/getInquiry', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    fname: fname,
                    lname: lname,
                    country: country,
                    phone: phone,
                    state: state,
                    city: city,
                    levelone: levelfirst,
                    leveltwo: levelsecond,
                    levelthree: levelthird,
                    massage: massage
                })
            })
            const data = await res.json();
            if(data){
                alert("Thank you for connecting with us...")
            }
        }

    return (
        <div className='container form_container mt-5'>
            <h1 className="mb-3">Contact Us</h1>

            <div className="row">
                <div className="col">
                    <input type="text" className="form-control" placeholder="First name" aria-label="First name" onChange={(event) => setfname(event.target.value)} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Last name" aria-label="Last name" onChange={(event) => setlname(event.target.value)} />
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-lg-3">
                    <select className="form-select" aria-label="Default select example" name="country" onChange={selectCountry}>
                        <option selected value={null}>ISD</option>
                        {countries.map(allCountry)}
                    </select>
                </div>

                <div className="col-lg-9">
                    <input type="number" className="form-control" placeholder='Contact No' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(event) => setphone(event.target.value)} />
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-lg-6">
                    <select className="form-select" aria-label="Default select example" onChange={selectState}>
                        <option selected value={null}>Select State</option>
                        {states.map(allState)}
                    </select>
                </div>

                <div className="col-lg-6">
                    <input list="browsers" name="city" placeholder='Select City' className="form-control" onChange={(event) => setCity(event.target.value)} />
                    <datalist id="browsers">
                        {cities.map(allCities)}
                    </datalist>


                </div>
            </div>

            <div className="mt-4">
                <select className="form-select" aria-label="Default select example" onChange={selectLevelone}>
                    <option selected>I am Looking for</option>
                    {firstLevel.map(firstLevelElements)}
                </select>
            </div>

            <div className="row mt-4">
                <div className="col-lg-6">
                    <select className="form-select" aria-label="Default select example" onChange={selectLeveltwo}>
                        <option selected>Level 2</option>
                        {secondLevel.map(secondLevelElements)}
                    </select>
                </div>

                <div className="col-lg-6">
                    <select className="form-select" aria-label="Default select example" onChange={(event) => setlevelthird(event.target.value)}>
                        <option selected value={null}>Level 3</option>
                        {thirdLevel.map(thirdLevelElements)}
                    </select>
                </div>
            </div>

            <div className="mt-4">
                <label for="exampleFormControlTextarea1" className="form-label">Massage</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(event) => setmassage(event.target.value)}></textarea>
            </div>

            <button className="btn btn-primary mt-4" onClick={submitform}>Submit</button>
        </div>
    )
}

export default Form