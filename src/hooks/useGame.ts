import { useContext } from "react"
import { GameContext } from "../context/GameContext"

const useGame = ()=>{
    const context = useContext(GameContext)
    if (!context) {
        throw new Error("useGame should be used within a Game Provider.");
      }
      return context;


}

export default useGame