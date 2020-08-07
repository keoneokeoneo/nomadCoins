import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Loader from "../Components/Loader";
import { getCoins } from "../api";
import Coin from "../Components/Coin";

const useCoins = () => {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const {data : results} = await getCoins();
                setCoins(results);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    return {loading, coins};
}

function Coins() {
    const {loading, coins} = useCoins();
    return loading ? (
        <Loader />
    ) : (
        coins
            .filter(coin => coin.rank !== 0)
            .sort((first, second) => first.rank - second.rank)
            .map(coin => <Coin key={coin.id} {...coin} />)
    );
}

Coins.propType = {
    coins: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            symbol: PropTypes.string.isRequired,
            rank: PropTypes.number.isRequired
        }).isRequired
    ).isRequired,
};

export default Coins;
