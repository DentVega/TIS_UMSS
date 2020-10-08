import React from 'react';
import { connect } from 'react-redux';
import { changeTabIndex, cleanAllReducers } from '../redux/actions/index.actions';

function TestReducer(props) {
    const { tab } = props.configReducerX;
    const aumentarValor = () => {
        props.changeTabIndex(tab + 1);
    };

    const cleanReducer = () => {
        props.cleanReducer();
    };

    return (
        <div>
            <p>
                Tab number 2: {tab}
            </p>
            <button onClick={aumentarValor}>Aumentar Valor Tab</button>
            <button onClick={cleanReducer}>Limpiaar Reducer</button>
        </div>
    );
}

const mapStateToProps = (state) => ({
    configReducerX: state.configReducer
});

const mapDispatchToProps = (dispatch) => ({
    changeTabIndex: (valorTab) => dispatch(changeTabIndex(valorTab)),
    cleanReducer: () => dispatch(cleanAllReducers())
});

export default connect(mapStateToProps, mapDispatchToProps)(TestReducer);
