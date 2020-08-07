import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Loader from "../Components/Loader";
import { getPrices } from "../api";
import Price from "../Components/Price";

const usePrices = () => {
    const [loading, setLoading] = useState(true);
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const {data : results} = await getPrices();
                setPrices(results);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    return {loading, prices};
}

function Prices() {
    const {loading, prices} = usePrices();

    return loading ? (
        <Loader />
    ) : (
        prices.map((price) => <Price key={price.id} {...price} />)
    );
}

Prices.propType = {
    prices: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            symbol: PropTypes.string.isRequired,
            quotes: PropTypes.shape({
                USD: PropTypes.shape({
                    price: PropTypes.number.isRequired,
                }).isRequired,
            }).isRequired,
        }).isRequired
    ).isRequired,
};

export default Prices;
