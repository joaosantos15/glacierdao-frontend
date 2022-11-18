import { SPStage0 } from "./stage0/sp"
import { SPStage1 } from "./stage1/sp"
import { SPStage2 } from "./stage2/sp"
import { SPStage3 } from "./stage3/sp"
import { SPStage4 } from "./stage4/sp"
import { SPStage5 } from "./stage5/sp"
import { UserStage0 } from "./stage0/user"
import { UserStage1 } from "./stage1/user"
import { UserStage2 } from "./stage2/user"
import { UserStage3 } from "./stage3/user"
import { UserStage4 } from "./stage4/user"
import { UserStage5 } from "./stage5/user"

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
    stage3: {
      user: UserStage3,
      sp: SPStage3,
    },
    stage4: {
      user: UserStage4,
      sp: SPStage4,
    },
    stage5: {
      user: UserStage5,
      sp: SPStage5,
    },
  }