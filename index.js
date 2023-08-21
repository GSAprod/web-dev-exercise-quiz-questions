import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const API_URL = "https://opentdb.com";
let categories;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function analyseResponse(response) {
  let questionData = response.data["results"][0];
  questionData["incorrect_answers"].push(questionData["correct_answer"]);

  let answers = shuffle(questionData["incorrect_answers"]);

  let correctIndex = answers.findIndex(
    (elem) => elem === questionData["correct_answer"]
  );

  let question = {
    category: questionData["category"],
    difficulty: questionData["difficulty"],
    question: questionData["question"],
    answers: answers,
    correctIndex: correctIndex,
  };

  return question;
}

// Get a random question when the user loads up the page
app.get("/", async (req, res) => {
  try {
    let response = await axios.get(
      API_URL + `/api.php?amount=1&` + `type=multiple`
    );
    if (response.data["response_code"] != '0') {
      throw response.data["response_code"];
    }
    let question = analyseResponse(response);
    res.render("index.ejs", { categories: categories, question: question, autofill: { category: '', difficulty: ''} });
  } catch (error) {
    if (error === '1') {
      res.render("index.ejs", { categories: categories, error: "There are no questions that match the chosen criteria."})
    } else if (error === '2') {
      res.render("index.ejs", { categories: categories, error: "The requested query is invalid."})
    } else {
      res.render("index.ejs", { categories: categories, error: error })
    }
  }
});

app.post("/", async (req, res) => {
  let categoryId = req.body["category"];
  let difficulty = req.body["difficulty"];

  try {
    let response = await axios.get(
      API_URL + `/api.php?amount=1&type=multiple&category=${categoryId}&difficulty=${difficulty}`
    );
    if (response.data["response_code"] !== 0) {
      throw response.data["response_code"];
    }
    let question = analyseResponse(response);
    res.render("index.ejs", { categories: categories, question: question, autofill: { category: `${categoryId}`, difficulty: `${difficulty}`}  })
  } catch (error) {
    if (error === '1') {
      res.render("index.ejs", { categories: categories, error: "There are no questions that match the chosen criteria." })
    } else if (error === '2') {
      res.render("index.ejs", { categories: categories, error: "The requested query is invalid."})
    } else {
      res.render("index.ejs", { categories: categories, error: error })
    }
  }
});

// Notify when the server is running
app.listen(port, async () => {
  try {
    let response = await axios.get(API_URL + "/api_category.php");
    categories = response.data["trivia_categories"];
  } catch (error) {
    console.log(error.response.data);
    throw error;
  }

  console.log(`Server running on port ${port}`);
});
