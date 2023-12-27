import { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";

declare global {
  export declare namespace Express {
    export interface Request {
      user: {
        id: string;
        email: string;
      };
    }
  }

  export interface $jwtPayload extends JwtPayload {
    id: string;
    email: string;
  }

  export type $Request = Request
  export type $Response = Response
}