import create from 'zustand'
import {devtools, persist} from 'zustand/middleware'

import { auth } from './config/fbConfig'

// auth.onAuthStateChanged((user) => {
//     if (user) {
//       setCurrentUser(true);
//     } else {
//       setCurrentUser(false);
//     }
//   });

type State = {
    currentUser: boolean;
    setCurrentUser: (currentUser: boolean) => void;
  };


const useCurrentUserStore = create<State>(devtools(persist((set) => ({
    currentUser: false,
    setCurrentUser: (currentUser:boolean) => set(()=>({currentUser})),
    }), {
    name: "currUser-storage", // unique name
    getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
  })))

export default useCurrentUserStore

