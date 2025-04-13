import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.post("/api/waitlist", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      console.log("Email not provided");

      return res
        .status(400)
        .json({ success: false, message: "Email required" });
    }

    console.log(email);

    const { data: existingEmail, error: fetchError } = await supabase
      .from("waitlist")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (existingEmail) {
      console.log("Email already exists");
      return res.status(409).json({
        success: "false",
        message: "Email already exists in waitlist",
      });
    }

    if (fetchError) {
      // not just "no rows", but some real error
      console.log("Error in adding email to waitlist", fetchError);

      return res
        .status(500)
        .json({ success: "false", message: fetchError.message });
    }

    // Step 2: Insert new email
    const { data, error } = await supabase.from("waitlist").insert([{ email }]);

    if (error) {
      console.log("Error adding email to waitlist", error);
      return res.status(500).json({ success: "false", message: error.message });
    }

    console.log("Email added successfully"); 
    return res.status(200).json({
      success: "true",
      message: "Successfully added to waitlist!",
      data: data,
    });
  } catch (error) {
    console.log("Error adding email to the waitlist", error);
    return res.status(500).json({
      success: "false",
      message: "Error adding email to the waitlist",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
