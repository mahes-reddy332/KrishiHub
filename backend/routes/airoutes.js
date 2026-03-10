const express = require("express");
const Groq = require("groq-sdk");

const router = express.Router();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// POST endpoint for AI text generation
router.post("/chatboat", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const result = response.choices[0].message.content;
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Error generating AI response:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate AI response",
    });
  }
});

// POST endpoint for estimate
router.post("/estimate", async (req, res) => {
  try {
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ error: "Data is required" });
    }

    const prompt = `
      Estimate yield and suggestions based on the following details.
      Return only valid JSON format without markdown or explanations.
      try to give each answer with just 30 words at max
      {
        "Estimated_yield": "{your_data}",
        "Water_required": "{your_data}",
        "Diseases": "{your_data}",
        "Fertilizer": "{your_data}",
        "Remark": "{your_data}",
        "Estimated_Sales":"Rupees {your_data_number}",
        "Estimated_cost":"Rupees {your_data_number}"
      }

      Crop Details:
      - Crop Type: ${data.cropType}
      - Land Area: ${data.landArea}
      - Water Availability: ${data.waterAvailability}
      - Soil Type: ${data.soilType}
      - Fertilizer Type: ${data.fertilizerType}
      - Expected Yield: ${data.expectedYield}
      - Additional Info: ${data.additionalInfo}
    `;

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    let result = response.choices[0].message.content;

    result = result.replace(/```json|```/g, "").trim();

    try {
      result = JSON.parse(result);
    } catch (error) {
      console.error("Error parsing AI response:", error);
      return res.status(500).json({
        success: false,
        error:
          "Failed to parse AI response into JSON. AI may have returned unexpected formatting.",
      });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Error generating AI response:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate AI response",
    });
  }
});

// POST endpoint for crop data
router.post("/crop_data", async (req, res) => {
  try {
    const { crop } = req.body;

    if (!crop) {
      return res.status(400).json({ error: "Crop name is required" });
    }

    const prompt = `
      Provide agricultural data for the crop: ${crop}.
      Return only valid JSON format without markdown or explanations.
      Follow this structure:
      {
        "duration": "{growth duration in days}",
        "waterSchedule": [
          { "day": {day_number}, "amount": "{water amount}" }
        ],
        "fertilizerSchedule": [
          { "day": {day_number}, "type": "{fertilizer type}", "amount": "{amount}" }
        ],
        "stages": [
          { "name": "{stage name}", "day": {day_number} }
        ]
      }
    `;

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    let result = response.choices[0].message.content;

    result = result.replace(/```json|```/g, "").trim();

    try {
      result = JSON.parse(result);
    } catch (error) {
      console.error("Error parsing AI response:", error);
      return res.status(500).json({
        success: false,
        error:
          "Failed to parse AI response into JSON. AI may have returned unexpected formatting.",
      });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Error generating crop data:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate crop data",
    });
  }
});

module.exports = router;
