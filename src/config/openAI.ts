import OpenAI from "openai";
import config from "./index";

const openai = new OpenAI({
  apiKey: config.openai.openai_api_key
});

export default openai;

