import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCarreras } from '../../redux/actions/indexthunk.actions';
import CardItem from '../../components/CardItem';

function UniversityCareers(props) {

  const { careers, loading } = props.careersReducer;

  useEffect(() => {
    if (loading) {
      props.getCareers();
    }
  }, [])

  const renderCareers = () => {
    return (
      <div>
        {careers.map((career) => {
          return <div key={career.idcarrera}>
            <CardItem
              text={career.namecarrera}
            />
          </div>
        })}
      </div>
    );
  };

  return (
    <div>
      <h1>Carrera Universitaria</h1>
      {careers.length > 0 ? renderCareers(): <div/> }
    </div>
  );
}

const mapStateToProps = state => ({
  careersReducer: state.careersReducer,
});

const mapDipatchToProps = dispatch => ({
  getCareers: () => dispatch(getCarreras()),
});

export default connect(mapStateToProps, mapDipatchToProps)(withRouter(UniversityCareers));
