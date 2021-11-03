import axios, { AxiosError }  from "axios"
import { Dispatch } from "redux"
import { ActionType, createAsyncAction, createReducer } from "typesafe-actions"
import {  GithubProfile } from "../api/github"


// const GET_PROFILE = 'post/GET_PROFILE'as const
// const GET_PROFILE_SUCCESS = 'post/GET_PROFILE_SUCCESS' as const
// const GET_PROFILE_ERROR = 'post/GET_PROFILE_ERROR' as const

// 액션 타입 선언
const GET_PROFILE = 'post/GET_PROFILE'
const GET_PROFILE_SUCCESS = 'post/GET_PROFILE_SUCCESS' 
const GET_PROFILE_ERROR = 'post/GET_PROFILE_ERROR'

const getProfileAsync= createAsyncAction(
    GET_PROFILE,GET_PROFILE_SUCCESS,GET_PROFILE_ERROR)<undefined, GithubProfile, AxiosError>()


// const getProfile = ()=> ({type:GET_PROFILE})
// const getProfileSuccess = (post:GithubProfile)=> ({type:GET_PROFILE_SUCCESS, payload: post })
// const getProfileError = (e:any)=> ({type:GET_PROFILE_ERROR,payload: e})

// export const getProfileAsync = (username:string)=> async( dispatch: Dispatch)=>{
//     dispatch(getProfile())
//     try{
//         const post = await axios.get<GithubProfile>(`https://api.github.com/users/${username}`)
//         const data = post.data
//       dispatch(getProfileSuccess(data))
//     }
//     catch(e:any){
//       dispatch(getProfileError(e))
//     }
//     }

export function getUserProfileAsync(username: string){
    return async (dispatch:Dispatch)=>{
        const {request, success, failure} = getProfileAsync
        dispatch(request())
        try{
            const response = await axios.get(`https://api.github.com/users/${username}`)
            const data = response.data
            dispatch(success(data))
        }
        catch(e:any){
            dispatch(failure(e))
        }
    }
}

const combineActions ={getProfileAsync} 
type PostAction = ActionType<typeof combineActions>
    // type PostAction = 
    //     |ReturnType<typeof getProfile>
    //     |ReturnType<typeof getProfileSuccess>
    //     |ReturnType<typeof getProfileError>
    
    type GithubState = {
        userProfile: {
            loading: boolean;
            error: Error | null;
            data: GithubProfile | null;
        };
    };

    const initialState: GithubState = {
        userProfile:{
        loading:false,
        error:null,
        data:null
        }
    }

    export const post = createReducer<GithubState, PostAction>(initialState, {
        [GET_PROFILE]:(state)=>({
   ...state,
   userProfile:{
       loading:true,
       data:null,
       error:null
   } 
        }),
        [GET_PROFILE_SUCCESS]:(state,action)=>({
            ...state,
            userProfile:{
                loading:false,
                data:action.payload,
                error:null
            }
        }),
        [GET_PROFILE_ERROR]:(state,action)=>({
            ...state,
            userProfile:{
                loading:false,
                data:null,
                error:action.payload
            }
        })
    })
    // function post (state:GithubState = initialState, action:PostAction){
    //     switch(action.type){
    //         case GET_PROFILE:
    //             return{
    //                 ...state,
    //                 userProfile:{
    //                     loading:true,
    //                     data:null,
    //                     error:null
    //                 }
    //             }
    //         case GET_PROFILE_SUCCESS:
    //             return{
    //                 ...state,
    //                 userProfile:{
    //                     loading:false,
    //                     data: action.payload,
    //                     error:null
    //                 }
    //             }
    //         case GET_PROFILE_ERROR:
    //             return{
    //             ...state,
    //             userProfile:{
    //                 loading:false,
    //                 data:null,
    //                 error:action.payload
    //             }
    //         }
    //         default:
    //             return state
    //     }
    // }
 
   export default post;