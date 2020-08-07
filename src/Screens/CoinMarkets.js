import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Market from "../Components/CoinMarket";
import Loader from "../Components/Loader";
import { withRouter } from "react-router-dom";
import {getCoinMarkets} from "../api";

const useCoinMarkets = id => {
    const [loading, setLoading] = useState(true);
    const [markets, setMarkets] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const {data : results} = await getCoinMarkets(id);
                setMarkets(results);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [id]);

    return {loading, markets};
}

const CoinMarkets = withRouter(({ location: { pathname } }) => {
    const {loading, markets} = useCoinMarkets(pathname.split("/")[2]);

    return loading ? (
        <Loader />
    ) : (
        markets
            .filter((market) => market.market_url)
            .map((market, index) => (
                <Market
                    key={market.id || index}
                    url={market.market_url}
                    name={market.exchange_name}
                />
            ))
    );
});

CoinMarkets.propTypes = {
    markets: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ),
};

export default CoinMarkets;
