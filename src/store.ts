import create from 'zustand'
import {devtools} from 'zustand/middleware'

type State = {
    currentUser: string;
    setCurrentUser: (currentUser: string) => void;
  };

type ErrorState = {
  error: string;
  setError: (error: string) => void;
};


const useCurrentUserStore = create<State>(devtools((set) => ({
    currentUser: '',
    setCurrentUser: (currentUser:string) => set(()=>({currentUser})),
    })))

const useSigninErrorStore = create<ErrorState>(devtools((set) => ({
  error: '',
  setError: (error:string) => set(()=>({error})),
  })))
  

export {useCurrentUserStore, useSigninErrorStore}

