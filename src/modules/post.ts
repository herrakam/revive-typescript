import axios  from "axios"
import { Dispatch } from "redux"
import {  GithubProfile } from "../api/github"


const GET_PROFILE = 'post/GET_PROFILE'as const
const GET_PROFILE_SUCCESS = 'post/GET_PROFILE_SUCCESS' as const
const GET_PROFILE_ERROR = 'post/GET_PROFILE_ERROR' as const

//typesafe-actions 사용시
// const GET_PROFILE = 'post/GET_PROFILE'
// const GET_PROFILE_SUCCESS = 'post/GET_PROFILE_SUCCESS' 
// const GET_PROFILE_ERROR = 'post/GET_PROFILE_ERROR'



const getProfile = ()=> ({type:GET_PROFILE})
const getProfileSuccess = (post:GithubProfile)=> ({type:GET_PROFILE_SUCCESS, payload: post })
const getProfileError = (e:any)=> ({type:GET_PROFILE_ERROR,payload: e})

export const getProfileAsync = (username:string)=> async( dispatch: Dispatch)=>{
    dispatch(getProfile())
    try{
        const post = await axios.get<GithubProfile>(`https://api.github.com/users/${username}`)
        const data = post.data
      dispatch(getProfileSuccess(data))
    }
    catch(e:any){
      dispatch(getProfileError(e))
    }
    }

    type PostAction = 
        |ReturnType<typeof getProfile>
        |ReturnType<typeof getProfileSuccess>
        |ReturnType<typeof getProfileError>
    
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
    function post (state:GithubState = initialState, action:PostAction){
        switch(action.type){
            case GET_PROFILE:
                return{
                    ...state,
                    userProfile:{
                        loading:true,
                        data:null,
                        error:null
                    }
                }
            case GET_PROFILE_SUCCESS:
                return{
                    ...state,
                    userProfile:{
                        loading:false,
                        data: action.payload,
                        error:null
                    }
                }
            case GET_PROFILE_ERROR:
                return{
                ...state,
                userProfile:{
                    loading:false,
                    data:null,
                    error:action.payload
                }
            }
            default:
                return state
        }
    }
 
   export default post;