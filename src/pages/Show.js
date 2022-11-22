/* eslint-disable no-console */
import React,{useEffect, useReducer} from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

// eslint-disable-next-line consistent-return
const reducer = (prevState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'FETCH_SUCCESS':{
            return {isLoading:false, error:false, show:action.show}
        }
        case 'FETCH_FAILED':{
            return {...prevState, isLoading:false, error:action.errror}
        }
    }
};

const initialState = {
    show:null,
    isLoading:true,
    error:null
}

const Show = () => {
    const {id} = useParams();
    const [{show, isLoading, error}, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        let isMount = true;
        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {
                if(isMount){
                    dispatch({type:'FETCH_SUCCESS', show:results});
                }
        }).catch(err =>{
            if(isMount){
                dispatch({type:'FETCH_FAILED', error:err.message})
            }
        });
        return () => {
            isMount = false;
        }
    },[id])
    console.log('show', show);
    if(isLoading){
        return <div>Data is being loading</div>
    }

    if(error){
        return <div>Error occured: {error}</div>
    }

  return (
    <div>This is Show page</div>
  )
}

export default Show;