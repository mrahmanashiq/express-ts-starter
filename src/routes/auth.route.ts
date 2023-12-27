import { Router } from "express";
import { login, registration } from '../controllers/auth';
import { test } from "../controllers/test.controller";
import { isAuthenticated } from "../middlewares/isAutheticated";

const router = Router();

router.post('/registration', registration);
router.post('/login', login);
router.get("/test", isAuthenticated, test);

export { router };
