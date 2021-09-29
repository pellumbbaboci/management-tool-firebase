import create from 'zustand'
import {devtools} from 'zustand/middleware'

type State = {
    currentUser: boolean;
    setCurrentUser: (currentUser: boolean) => void;
  };


const useCurrentUserStore = create<State>(devtools((set) => ({
    currentUser: false,
    setCurrentUser: (currentUser:boolean) => set(()=>({currentUser})),
    })))

export default useCurrentUserStore

