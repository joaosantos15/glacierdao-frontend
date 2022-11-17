import { SPStage0 } from "./stage0/sp"
import { SPStage1 } from "./stage1/sp"
import { SPStage2 } from "./stage2/sp"
import { UserStage0 } from "./stage0/user"
import { UserStage1 } from "./stage1/user"
import { UserStage2 } from "./stage2/user"

export const Pages = {
    stage0: {
      user: UserStage0,
      sp: SPStage0,
    },
    stage1: {
      user: UserStage1,
      sp: SPStage1,
    },
    stage2: {
      user: UserStage2,
      sp: SPStage2,
    },
  }