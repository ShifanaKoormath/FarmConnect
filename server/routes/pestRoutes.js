const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

// 🐛 Pest Solutions Database (Local)
const pestSolutions = {
  // Common Pests
  aphids: "Spray neem oil or soapy water.",
  caterpillars: "Pick them off or use BT spray.",
  mites: "Spray water with mild soap.",
  whiteflies: "Use yellow sticky traps and neem oil.",
  fungal: "Use copper spray or remove sick plants.",
  ants: "Use cinnamon, vinegar, or diatomaceous earth to repel.",

  // Leaf-eating Insects
  armyworms: "Use BT spray or bring in ladybugs.",
  cabbageLoopers: "Spray neem oil or cover plants.",
  cutworms: "Put plant collars and sprinkle diatomaceous earth.",
  diamondbackMoth: "Cover plants and spray neem oil.",
  leafminers: "Remove bad leaves and spray neem oil.",

  // Sap-Sucking Insects
  mealybugs: "Use alcohol wipes or spray neem oil.",
  thrips: "Use blue sticky traps and neem oil.",
  scaleInsects: "Use oil spray or scrape them off.",
  stinkBugs: "Pick them off and spray soap water.",
  psyllids: "Spray neem oil or bring in ladybugs.",

  // Root & Soil Pests
  wireworms: "Rotate crops and plant mustard.",
  rootMaggots: "Use row covers and tiny helpful worms.",
  grubs: "Add milky spore disease and tiny worms.",
  nematodes: "Plant marigolds to keep them away.",
  fleaBeetles: "Use row covers and sprinkle diatomaceous earth.",

  // Beetles
  ColoradoPotatoBeetle: "Pick them off and spray neem oil.",
  JapaneseBeetles: "Use traps and add tiny worms to soil.",
  blisterBeetles: "Pick them off or spray neem oil.",
  cucumberBeetles: "Use kaolin clay or row covers.",
  asparagusBeetle: "Bring in ladybugs or lacewings.",

  // Borers & Stem Pests
  cornBorer: "Use BT spray or tiny wasps.",
  squashVineBorer: "Inject BT and cover plants.",
  sugarcaneBorer: "Use insect spray like spinosad.",
  coffeeBerryBorer: "Use helpful fungus spray.",
  stemBorer: "Spray neem oil and cut off bad parts.",

  // Grain & Storage Pests
  riceWeevil: "Keep grains sealed and use diatomaceous earth.",
  grainMoth: "Use traps and store grains in dry places.",
  flourBeetle: "Freeze flour for 3 days to kill bugs.",
  warehouseMoth: "Use bay leaves or lavender in storage.",
  khapraBeetle: "Clean storage well and fumigate if needed.",

  // Flying & Other Pests
  mosquitoes: "Remove standing water and plant citronella.",
  grasshoppers: "Spray garlic water or attract birds.",
  locusts: "Use fungus spray to stop swarms.",
  leafhoppers: "Spray neem oil or soapy water.",
  earwigs: "Trap them with rolled-up paper and move away.",

  // Rodents & Birds
  rats: "Use traps, peppermint oil, and clean areas.",
  fieldMice: "Get owls or use sound repellents.",
  birds: "Use netting or shiny tapes.",
  squirrels: "Spray pepper spray or use wire mesh.",
  wildBoars: "Put up strong fences and noise makers.",

  // Fungal Diseases
  powderyMildew: "Use baking soda spray or sulfur spray.",
  downyMildew: "Use copper spray and let air flow.",
  lateBlight: "Use Bordeaux spray or plant strong types.",
  rust: "Use sulfur spray and remove sick leaves.",
  anthracnose: "Use copper spray and don’t water from above.",

  // Bacterial Diseases
  bacterialWilt: "Remove sick plants and plant strong types.",
  fireBlight: "Cut off sick branches and spray copper.",
  softRot: "Make sure soil drains well and use copper spray.",
  leafSpot: "Spray neem oil or copper spray.",
  crownGall: "Remove sick plants and clean tools.",

  // Viral Diseases
  mosaicVirus: "Remove sick plants and stop aphids.",
  leafCurlVirus: "Use shiny mulch and stop whiteflies.",
  tomatoYellowLeafCurl: "Plant strong types and spray neem oil.",
  bananaBunchyTopVirus: "Remove sick plants and plant clean ones.",
  cucumberMosaicVirus: "Control aphids and rotate crops.",

  // Aquatic & Paddy Pests
  ricePlanthopper: "Bring in spiders and good bugs.",
  goldenAppleSnail: "Use ducks or pick them by hand.",
  paddyStemFly: "Use neem spray and good bugs.",
  aquaticWeeds: "Use plant-eating fish or pull weeds.",
  leafFolder: "Use light traps and neem oil early.",

  // Greenhouse & Indoor Pests
  spiderMites: "Spray mist often and get tiny predator mites.",
  fungusGnats: "Use sticky traps and let soil dry a bit.",
  springtails: "Keep things dry and use diatomaceous earth.",
  whiteMold: "Improve air flow and use organic sprays.",
  mealybugDestroyer: "Use tiny ladybugs to eat mealybugs.",

  // Livestock-Related Pests
  ticks: "Spray neem oil and keep areas clean.",
  fleas: "Sprinkle diatomaceous earth on bedding.",
  flies: "Use traps and spray citronella.",
  mosquitoes_livestock: "Use fans and plant lavender.",
  lice: "Use organic powders or neem shampoos.",

  // Post-Harvest Pests
  coffeeBeanBorer: "Use strong coffee types and keep clean.",
  driedFruitMoth: "Freeze dried fruit for 2 days.",
  warehouseGrainBeetle: "Use diatomaceous earth in storage.",
  almondMoth: "Use traps and keep dry food sealed.",
  storedProductMites: "Keep storage dry and clean."
};


// **✅ API: Pest Issue Analysis (Text-Based - Local + Kindwise API)**
router.post("/check", async (req, res) => {
  const { issue, crop } = req.body;

  if (!issue) {
    return res.status(400).json({ message: "❌ Please describe the issue." });
  }

  let recommendation = "No known pest issue detected.";

  // ✅ Check Local Pest Database First
  for (const pest in pestSolutions) {
    if (issue.toLowerCase().includes(pest)) {
      recommendation = pestSolutions[pest];
      return res.json({ message: "✅ Pest analysis completed", recommendation });
    }
  }

  // 🔍 Call Kindwise API if crop is provided
  if (crop) {
    try {
      console.log(`🌱 Fetching pest details from Kindwise API for crop: ${crop}, pest: ${issue}`);

      const response = await axios.get(`${process.env.KINDWISE_API_URL}/pests`, {
        params: { crop, pest: issue },
        headers: { Authorization: `Bearer ${process.env.KINDWISE_API_KEY}` },
      });

      if (response.data && response.data.pest_details) {
        return res.json({ message: "✅ Pest details retrieved from Kindwise API", data: response.data.pest_details });
      }
    } catch (error) {
      console.error("🚨 Kindwise API Error:", error.response?.data || error.message);
    }
  }

  res.json({ message: "⚠️ No specific treatment found in local database or Kindwise API." });
});

// ❌ Removed: Image-based Pest Detection (Roboflow API)

module.exports = router;
