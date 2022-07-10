import Cryptr from "cryptr";

const cryptr = new Cryptr(process.env.SECRET_KEY);

export default cryptr;
