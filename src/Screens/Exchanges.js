import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Loader from "../Components/Loader";
import {getExchanges} from "../api";
import Exchange from "../Components/Exchange";

const useExchanges = () => {
    const [loading, setLoading] = useState(true);
    const [exchanges, setExchanges] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const {data : results} = await getExchanges();
                setExchanges(results);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    return {loading, exchanges};
}

function Exchanges() {
    const {loading, exchanges} = useExchanges();

    return loading ? (
        <Loader />
    ) : (
        exchanges.map((exchange) => <Exchange key={exchange.id} {...exchange} />)
    );
}

Exchanges.propType = {
    exchanges: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
            links: PropTypes.shape({
                website: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
            }).isRequired
        }).isRequired
    ).isRequired,
};

export default Exchanges;
