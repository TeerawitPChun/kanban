import path from "path";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import mockData from "./mock-data";
import data from "./default-data";
import config from "../config";

const filePath = path.resolve(`data/${config.db}`);
// console.log("db location:", filePath);

const defaultData = data;
const lowdb = new Low(new JSONFile(filePath), defaultData);

export default lowdb;
