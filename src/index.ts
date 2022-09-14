import { app } from "./controller/app"
import { showRouter } from "./controller/routes/ShowRouter";
import { bandRouter } from "./controller/routes/BandRouter"
import { userRouter } from "./controller/routes/UserRouter"

app.use('/user/', userRouter)

app.use('/band/', bandRouter)

app.use("/show", showRouter)