import Axios from "axios-observable";
import { environment } from "../environment/environment";


export const api = Axios.create({baseURL: environment.api})
