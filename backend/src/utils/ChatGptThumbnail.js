import GPT from "openai";
import cloudinary from "../utils/Claoudinary.js";

const client = new GPT({
  apiKey:
    "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    ",
});

export const makeThump = async (subject,desc) => {
  try {
    const prompt = `
   Create a high-quality, eye-catching thumbnail image for an online Udemy course titled: '${subject}'. 

The design should be visually engaging, suitable for an educational platform, and clearly represent the course topic. 

${desc}

Use clean, modern aesthetics with bold colors, and avoid excessive text. Include relevant icons, symbolic imagery, or conceptual illustrations to capture the course theme. Leave some empty space for overlay text if needed. 
Aspect ratio: 16:9. No real faces or copyrighted logos.
    `;
    const image = await client.images.generate({
      model: "dall-e-3",
      prompt,
      n:1,
      style: "vivid",
    quality: "hd",
      size: "1024x1024",
    });
    console.log(image,"here");
    const thumbnail=await cloudinary.uploader.upload(image.data[0].url);
    console.log(thumbnail);
    return thumbnail?.secure_url?thumbnail.secure_url:null;
  } catch (error) {
    console.error(error);
  }
};
