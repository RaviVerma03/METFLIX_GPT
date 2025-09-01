import OpenAI from 'openai';
import { openAIKey } from './Constant';

const openai = new OpenAI({
  apiKey: openAIKey,
  dangerouslyAllowBrowser:true
});

export default openai