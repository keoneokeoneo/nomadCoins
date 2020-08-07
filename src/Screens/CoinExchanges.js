import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Exchange from "../Components/CoinExchange";
import Loader from "../Components/Loader";
import { withRouter } from "react-router-dom";
import {getCoinExchanges} from "../api";

const useCoinExchanges = id => {
    const [loading, setLoading] = useState(true);
    const [exchanges, setExchanges] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const {data : results} = await getCoinExchanges(id);
                setExchanges(results);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [id]);

    return {loading, exchanges};
}

const CoinExchanges = withRouter(({ location: { pathname } }) => {
    const {loading, exchanges} = useCoinExchanges(pathname.split("/")[2]);

    return loading ? (
        <Loader />
    ) : (
        exchanges
            .filter(exchange => exchange.fiats.length > 0)
            .map(exchange => <Exchange key={exchange.id} {...exchange} />)
    );
});

CoinExchanges.propTypes = {
    exchanges: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            adjusted_volume_24h_share: PropTypes.number,
            fiats: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string,
                    symbol: PropTypes.string
                })
            )
        })
    )
};

export default CoinExchanges;
